import React from 'react';
import { useHistory } from 'react-router-dom';
import { calcDiff, IEquipeModel, IProvaModel, IResultadoModel, LS, maskTime } from '../utils';

interface ICronometroProps {
    model: IEquipeModel;
    start: Date;
}

const Cronometro: React.FC<ICronometroProps> = ({
    model, start
}) => {
    const [punicao, setPunicao] = React.useState(0);
    const [conclusao, setConclucao] = React.useState<number>();

    const handlePunir = React.useCallback(() => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            const resultado = JSON.parse(resultadoStorage) as IResultadoModel;

            const equipe = resultado.equipes.filter(w => w.equipeId === model.id)[0];

            if (equipe) {
                ++equipe.punicaoSegundos
            } else {
                resultado.equipes.push({
                    equipeId: model.id,
                    punicaoSegundos: 1,
                    tempoMilisegundos: 0
                });
            }

            localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));
            setPunicao(s => ++s);
        }
    }, [model.id]);

    const handleConcluir = React.useCallback(() => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            const resultado = JSON.parse(resultadoStorage) as IResultadoModel;

            const equipe = resultado.equipes.filter(w => w.equipeId === model.id)[0];

            const diff = calcDiff(start, new Date());

            if (equipe) {
                equipe.tempoMilisegundos = diff;
            } else {
                resultado.equipes.push({
                    equipeId: model.id,
                    punicaoSegundos: 0,
                    tempoMilisegundos: diff
                });
            }

            localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));
            setConclucao(diff);
        }
    }, [model.id, start]);

    return (<div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        flex: 1
    }}>
        <b>{model.name}</b>
        <div>
            <button onClick={handlePunir}>
                Punição <br />
                {punicao}s
            </button>
        </div>
        <div>
            <button disabled={!!conclusao} onClick={handleConcluir}>
                Concluir
                <br />
                {conclusao && maskTime(conclusao)}
            </button>
        </div>
    </div>);
};

const CompetirCronometroView: React.FC = () => {
    const history = useHistory();
    const [, render] = React.useState(false);

    const start = React.useMemo(() => {
        return new Date();
    }, []);

    React.useEffect(() => {
        setInterval(() => {
            render(s => !s);
        }, 1000);
    }, []);

    const prova = React.useMemo(() => {
        const provaStorage = localStorage.getItem(LS.PROVA);
        if (provaStorage) {
            const prova = JSON.parse(provaStorage);
            return prova as IProvaModel;
        }
        return { name: '[SEM PROVA]', id: '' } as IProvaModel;
    }, []);

    const equipe1 = React.useMemo(() => {
        const provaStorage = localStorage.getItem(LS.EQUIPE_1);
        if (provaStorage) {
            const prova = JSON.parse(provaStorage);
            return prova as IEquipeModel;
        }
        return { name: '[SEM EQUIPE]', id: '' } as IEquipeModel;
    }, []);

    const equipe2 = React.useMemo(() => {
        const provaStorage = localStorage.getItem(LS.EQUIPE_2);
        if (provaStorage) {
            const prova = JSON.parse(provaStorage);
            return prova as IEquipeModel;
        }
        return { name: '[SEM EQUIPE]', id: '' } as IEquipeModel;
    }, []);

    const handleVoltar = React.useCallback(() => {
        history.push('/competir/equipe');
    }, [history]);

    return (<>
        <h1>
            Competir {prova.name}
        </h1>

        <h2>{maskTime(calcDiff(start, new Date()))}</h2>

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 50,
            marginTop: 50,
            marginBottom: 50
        }}>
            <Cronometro model={equipe1} start={start} />
            <Cronometro model={equipe2} start={start} />
        </div>

        <div>
            <button>Concluir</button>
        </div>
        <div>
            <button onClick={handleVoltar}>Voltar</button>
        </div>
    </>);
};

export default CompetirCronometroView;
