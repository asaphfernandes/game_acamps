import React, { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ButtonUi from '../ui/button';
import { api, IProvaModel, IResultadoModel, LS, maskTime } from '../utils';
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
        if (!!resultado.timeMiliseconds) return;
        isMudar ? setModel(undefined) : setModel(resultado);
    };

    return (<EquipeJss>
        <EquipeHeaderJss>
            <h3>{resultado.equipeNome}</h3>
            {resultado.timeMiliseconds && <span className='display'>{maskTime(resultado.timeMiliseconds)}</span>}
            <span>{resultado.equipeLider}</span>

        </EquipeHeaderJss>

        {!resultado.timeMiliseconds && isMudar && <ButtonUi onClick={handleModel}>Mudar</ButtonUi>}
        {!resultado.timeMiliseconds && !isMudar && <ButtonUi onClick={handleModel}>Escolher</ButtonUi>}
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

    const toCronometro = React.useCallback(() => {
        if (!equipeEsquerda || !equipeDireita) return;
        localStorage.setItem(LS.EQUIPE_1, equipeEsquerda.id);
        localStorage.setItem(LS.EQUIPE_2, equipeDireita.id);
        history.push('/competir/cronometro');
    }, [history, equipeEsquerda, equipeDireita]);

    const handleMudarProva = React.useCallback(() => {
        localStorage.removeItem(LS.PROVA);
        history.push('/competir');
    }, [history]);

    const handleTransmitir = React.useCallback(() => {
        var resultadoStorage = localStorage.getItem(LS.RESULTADOS);
        if (resultadoStorage) {
            var request = {
                provaNome: prova.name,
                equipes: JSON.parse(resultadoStorage)
            };
            api.post('/api/resultado/transmitir', request)
                .then((response) => {
                    handleMudarProva();
                });
        }
    }, [handleMudarProva, prova.name]);

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
            <ButtonUi disabled={!equipeEsquerda || !equipeDireita} onClick={toCronometro}>Competir</ButtonUi>
        </StartContainerJss>

        <TransmitirContainerJss>
            <ButtonUi onClick={handleTransmitir}>Transmitir</ButtonUi>
            <ButtonUi variant='secondary' onClick={handleMudarProva} >Mudar prova</ButtonUi>
        </TransmitirContainerJss>
    </>);
};

export default CompetirEquipeView;
