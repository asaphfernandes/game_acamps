import React, { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ButtonUi from '../ui/button';
import { api, IProvaModel, IResultadoModel, LS } from '../utils';
import { EquipeStageJss, EquipeContainerJss, StartContainerJss, TransmitirContainerJss, EquipeJss, EquipeHeaderJss } from './jss';

interface IEquipeProps {
    resultado: IResultadoModel;
    setModel: (model?: IResultadoModel) => void;
    isMudar?: boolean;
}

const Equipe: React.FC<IEquipeProps> = ({
    resultado, setModel, isMudar
}) => {

    const handleModel = () => {
        if(!!resultado.timeMiliseconds) return;
        isMudar ? setModel(undefined) : setModel(resultado);
    };

    return (<EquipeJss>
        <EquipeHeaderJss>
            <b>{resultado.equipeNome}</b>
            <b>{resultado.equipeLider}</b>
        </EquipeHeaderJss>

        <ButtonUi onClick={handleModel} disabled={!!resultado.timeMiliseconds}>
            {isMudar ? 'Mudar' : 'Escolher'}
        </ButtonUi>
    </EquipeJss>)
};

const CompetirEquipeView: React.FC = () => {
    const history = useHistory();

    const [equipeEsquerda, setEquipeEsquerda] = React.useState<IResultadoModel>();
    const [equipeDireita, setEquipeDireita] = React.useState<IResultadoModel>();

    const prova = useMemo(() => {
        var provaStorage = localStorage.getItem(LS.PROVA);
        if (provaStorage) {
            return JSON.parse(provaStorage) as IProvaModel;
        }
        return {} as IProvaModel;
    }, []);

    const resultados = JSON.parse(localStorage.getItem(LS.RESULTADOS) || '{}') as IResultadoModel[];

    const handleStart = React.useCallback(() => {
        localStorage.setItem(LS.EQUIPE_1, JSON.stringify(equipeEsquerda));
        localStorage.setItem(LS.EQUIPE_2, JSON.stringify(equipeDireita));
        history.push('/competir/cronometro');
    }, [history, equipeEsquerda, equipeDireita]);

    const handleMudarProva = React.useCallback(() => {
        localStorage.removeItem(LS.PROVA);
        history.push('/competir');
    }, [history]);

    const handleTransmitir = React.useCallback(() => {
        var resultadoStorage = localStorage.getItem(LS.RESULTADOS);
        if (resultadoStorage) {
            var request = JSON.parse(resultadoStorage);
            api.post('/api/resultado/transmitir', request)
                .then((response) => {
                    handleMudarProva();
                });
        }
    }, [handleMudarProva]);

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Competir {prova.name}
        </h1>

        <EquipeContainerJss>
                <h3>Equipe esquerda</h3>
            <EquipeStageJss>
                {equipeEsquerda && <Equipe resultado={equipeEsquerda} setModel={setEquipeEsquerda} isMudar />}
                {!equipeEsquerda && resultados.map((resultado) => {
                    return (<Equipe key={resultado.id} resultado={resultado} setModel={setEquipeEsquerda} />);
                })}
            </EquipeStageJss>

            {equipeEsquerda && <>
                <h3>Equipe direita</h3>
                <EquipeStageJss>
                {equipeDireita && <Equipe resultado={equipeDireita} setModel={setEquipeDireita} isMudar />}
                {!equipeDireita && resultados.filter(w => w.equipeNome !== equipeEsquerda.equipeNome).map((resultado) => {
                    return (<Equipe key={resultado.id} resultado={resultado} setModel={setEquipeDireita} />);
                })}
            </EquipeStageJss>
            </>}
        </EquipeContainerJss>


        <StartContainerJss>
            <ButtonUi disabled={!equipeEsquerda || !equipeDireita} onClick={handleStart}>Start</ButtonUi>
        </StartContainerJss>

        <TransmitirContainerJss>
            <ButtonUi onClick={handleTransmitir}>Transmitir</ButtonUi>
            <ButtonUi variant='secondary' onClick={handleMudarProva} >Mudar prova</ButtonUi>
        </TransmitirContainerJss>
    </>);
};

export default CompetirEquipeView;
