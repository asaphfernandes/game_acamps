import React from 'react';
import { useHistory } from 'react-router-dom';
import ButtonUi from '../ui/button';
import { IProvaModel, IResultadoModel, LS } from '../utils';
import { ConcluirContainerJss, CronometroEquipeJss, CronometroHeader, HubEquipeJss, PunicaoJss } from './jss';

interface ICronometroProps {
    resultado: IResultadoModel;
    prova: IProvaModel;
    onSetScore: (equipe: IResultadoModel) => void;
}

const Score: React.FC<ICronometroProps> = ({
    resultado, prova, onSetScore
}) => {
    const [ponto, setPonto] = React.useState((resultado.timeMiliseconds || 0) / 1000);

    const adicionar = React.useCallback(() => {
        const newPotno = ponto + prova.tempo;
        onSetScore({...resultado, tempo: newPotno});
        setPonto(newPotno);
    }, [ponto, prova.tempo, onSetScore, resultado]);

    const remover = React.useCallback(() => {
        const newPotno = ponto - prova.tempo;
        if(newPotno < 0) return;
        onSetScore({...resultado, tempo: newPotno});
        setPonto(newPotno);
    }, [ponto, prova.tempo, onSetScore, resultado]);

    return (<HubEquipeJss>
        <b>{resultado.equipeNome}</b>
        <PunicaoJss>
            <span className='title'>Ponto</span>
            <ButtonUi onClick={remover}>-</ButtonUi>
            <span className='display'>{ponto}</span>
            <ButtonUi onClick={adicionar}>+</ButtonUi>
        </PunicaoJss>

    </HubEquipeJss>);
};

const CompetirScoreView: React.FC = () => {
    const history = useHistory();
    const urlVoltar = '/competir/equipe';

    const [resultados, setResultado] = React.useState<IResultadoModel[]>([]);

    const [equipe1, setEquipe1] = React.useState<IResultadoModel>();
    const [equipe2, setEquipe2] = React.useState<IResultadoModel>();

    const prova = React.useMemo(() => {
        const provaStorage = localStorage.getItem(LS.PROVA);
        if (provaStorage) {
            return JSON.parse(provaStorage) as IProvaModel;
        }
        return {} as IProvaModel;
    }, []);


    React.useEffect(() => {
        if (!resultados.length) {
            const resultadosStorage = localStorage.getItem(LS.RESULTADOS);
            if (resultadosStorage) {
                setResultado(JSON.parse(resultadosStorage) as IResultadoModel[]);
            }
        }

        const equipe1Id = localStorage.getItem(LS.EQUIPE_1);
        if (equipe1Id) {
            setEquipe1(resultados.filter(w => w.id === equipe1Id)[0]);
        }

        const equipe2Id = localStorage.getItem(LS.EQUIPE_2);
        if (equipe2Id) {
            setEquipe2(resultados.filter(w => w.id === equipe2Id)[0]);
        }
    }, [resultados]);

    const setScore = (equipe: IResultadoModel) => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADOS);
        if (resultadoStorage) {
            const resultados = JSON.parse(resultadoStorage) as IResultadoModel[];

            let equipeStorage = resultados.filter(w => w.id === equipe.id)[0];

            equipeStorage.timeMiliseconds = equipe.tempo * 1000;

            localStorage.setItem(LS.RESULTADOS, JSON.stringify(resultados));
            setResultado(resultados);
        }
    };


    const handleVoltar = () => {
        localStorage.removeItem(LS.EQUIPE_1);
        localStorage.removeItem(LS.EQUIPE_2);
        history.push(urlVoltar);
    };

    return (<>
        <CronometroHeader>
            Competir {prova.name}
        </CronometroHeader>

        <CronometroEquipeJss>
            {equipe1 && <Score resultado={equipe1} prova={prova} onSetScore={setScore} />}
            {equipe2 && <Score resultado={equipe2} prova={prova} onSetScore={setScore} />}
        </CronometroEquipeJss>

        <ConcluirContainerJss>
            <ButtonUi variant='secondary' onClick={handleVoltar}>Voltar</ButtonUi>
        </ConcluirContainerJss>
    </>);
};

export default CompetirScoreView;
