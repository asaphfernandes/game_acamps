import React from 'react';
import { useHistory } from 'react-router-dom';
import ButtonUi from '../ui/button';
import { calcDiff, IEquipeModel, IProvaModel, IResultadoModel, LS, maskTime } from '../utils';
import { ConcluirContainerJss, CronometroEquipeJss, CronometroHeader, CronometroTimer, HubEquipeJss, PunicaoJss } from './jss';

interface ICronometroProps {
    equipe: IResultadoModel;
    prova: IProvaModel;
    onConcluir: (equipe: IResultadoModel) => void;
    onPunir: (equipe: IResultadoModel, value: number) => void;
}

const Cronometro: React.FC<ICronometroProps> = ({
    equipe, prova, onConcluir, onPunir
}) => {

    const addPunir = React.useCallback(() => {
        onPunir(equipe, +prova.punicao);
    }, [equipe, prova, onPunir]);

    const removePunir = React.useCallback(() => {
        onPunir(equipe, -prova.punicao);
    }, [equipe, prova, onPunir]);

    const handleConcluir = React.useCallback(() => {
        onConcluir(equipe);
    }, [equipe, onConcluir]);

    return (<HubEquipeJss>
        <b>{equipe.equipeNome}</b>
        <PunicaoJss>
            <span className='title'>Punição</span>
            <ButtonUi onClick={removePunir}>-</ButtonUi>
            <span className='display'>{equipe ? equipe.penalidadeSeconds : 0}s</span>
            <ButtonUi onClick={addPunir}>+</ButtonUi>
        </PunicaoJss>

        <ButtonUi className='concluir' variant='secondary' onClick={handleConcluir}>
            Concluir
            <br />
            {equipe && equipe.timeMiliseconds && maskTime(equipe.timeMiliseconds)}
        </ButtonUi>

    </HubEquipeJss>);
};

const CompetirCronometroView: React.FC = () => {
    const history = useHistory();
    const urlVoltar = '/competir/equipe';

    const [, render] = React.useState(false);
    const [resultados, setResultado] = React.useState<IResultadoModel[]>(() => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADOS);
        if (resultadoStorage) {
            return JSON.parse(resultadoStorage) as IResultadoModel[];
        } else {
            return [];
        }
    });

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
            return prova as IResultadoModel;
        }
        return { equipeNome: '[SEM EQUIPE]', id: '' } as IResultadoModel;
    }, []);

    const equipe2 = React.useMemo(() => {
        const provaStorage = localStorage.getItem(LS.EQUIPE_2);
        if (provaStorage) {
            const prova = JSON.parse(provaStorage);
            return prova as IResultadoModel;
        }
        return { equipeNome: '[SEM EQUIPE]', id: '' } as IResultadoModel;
    }, []);

    const setPunir = (equipe: IResultadoModel, value: number) => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADOS);
        if (resultadoStorage) {
            const resultados = JSON.parse(resultadoStorage) as IResultadoModel[];

            let equipeStorage = resultados.filter(w => w.id === equipe.id)[0];

            if (equipeStorage) {
                equipeStorage.penalidadeSeconds += value

                // Corrige para que a punição não fique menos que zero.
                if (equipeStorage.penalidadeSeconds < 0) {
                    equipeStorage.penalidadeSeconds = 0;
                }
            }

            localStorage.setItem(LS.RESULTADOS, JSON.stringify(resultados));
            setResultado(resultados);
        }
    };

    const handleConcluir = (equipe: IResultadoModel) => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADOS);
        if (resultadoStorage) {
            const resultados = JSON.parse(resultadoStorage) as IResultadoModel[];

            const equipeStorage = resultados.filter(w => w.id === equipe.id)[0];

            const diff = calcDiff(start, new Date());

            if (equipeStorage) {
                if (equipeStorage.timeMiliseconds === undefined) {
                    equipeStorage.timeMiliseconds = diff;
                } else {
                    equipeStorage.timeMiliseconds = undefined;
                }
            } 

            localStorage.setItem(LS.RESULTADOS, JSON.stringify(resultados));
            setResultado(resultados);
        }
    };

    const handleConcluirTodos = () => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADOS);
        if (resultadoStorage) {
            const resultados = JSON.parse(resultadoStorage) as IResultadoModel[];

            const equipe1Storage = resultados.filter(w => w.id === equipe1.id)[0];
            const equipe2Storage = resultados.filter(w => w.id === equipe2.id)[0];

            let diff = 1000 * 60 * 5;

            if (equipe1Storage && !equipe1Storage.timeMiliseconds) {
                equipe1Storage.timeMiliseconds = diff;
            } 

            if (equipe2Storage && !equipe2Storage.timeMiliseconds) {
                equipe2Storage.timeMiliseconds = diff;
            } 

            localStorage.setItem(LS.RESULTADOS, JSON.stringify(resultados));
            history.push(urlVoltar);
        }
    };

    const handleVoltar = () => {
        const msg = 'Deseja limpar o resultado das equipes?';
        function clear() {
            const resultado1 = resultados.filter(w => w.id === equipe1.id)[0];
            const resultado2 = resultados.filter(w => w.id === equipe2.id)[0];
            localStorage.setItem(LS.RESULTADOS, JSON.stringify(resultados));
        }

        if (window.confirm(msg)) {
            clear();
            history.push(urlVoltar);
        }
    };

    return (<>
        <CronometroHeader>
            Competir {prova.name}
        </CronometroHeader>

        <CronometroTimer>{maskTime(calcDiff(start, new Date()))}</CronometroTimer>

        <CronometroEquipeJss>
            <Cronometro equipe={equipe1} prova={prova} onConcluir={handleConcluir} onPunir={setPunir} />
            <Cronometro equipe={equipe2} prova={prova} onConcluir={handleConcluir} onPunir={setPunir} />
        </CronometroEquipeJss>

        <ConcluirContainerJss>
            <ButtonUi onClick={handleConcluirTodos}>Concluir</ButtonUi>
            <ButtonUi onClick={handleVoltar}>Voltar</ButtonUi>
        </ConcluirContainerJss>
    </>);
};

export default CompetirCronometroView;
