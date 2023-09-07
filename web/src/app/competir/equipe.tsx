import React, { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ButtonUi from '../ui/button';
import { api, IProvaModel, IResultadoModel, LS, maskTime } from '../utils';
import { EquipeStageJss, EquipeContainerJss, StartContainerJss, TransmitirContainerJss, EquipeJss, EquipeHeaderJss } from './jss';

interface IEquipeProps {
    prova: IProvaModel;
    resultado: IResultadoModel;
    setModel: (model?: IResultadoModel) => void;
    isMudar?: boolean;
}

const Equipe: React.FC<IEquipeProps> = ({
    prova, resultado, setModel, isMudar
}) => {

    const handleModel = () => {
        if (!!resultado.timeMiliseconds && prova.tipo === 1) return;
        isMudar ? setModel(undefined) : setModel(resultado);
    };

    return (<EquipeJss>
        <EquipeHeaderJss>
            <h3>{resultado.equipeNome}</h3>
            {prova.tipo === 1 && resultado.timeMiliseconds && <span className='display'>{maskTime(resultado.timeMiliseconds)}</span>}
            {prova.tipo === 2 && resultado.timeMiliseconds && <span className='display'>{resultado.timeMiliseconds / 1000}</span>}
            <span>{resultado.equipeLider}</span>

        </EquipeHeaderJss>

        {isMudar
            ? !resultado.timeMiliseconds && <ButtonUi onClick={handleModel}>Mudar</ButtonUi>
            : (!resultado.timeMiliseconds || prova.tipo === 2) && <ButtonUi onClick={handleModel}>Escolher</ButtonUi>
        }
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
        if (!(!!equipeEsquerda || !!equipeDireita)) return;
        equipeEsquerda && localStorage.setItem(LS.EQUIPE_1, equipeEsquerda.id);
        equipeDireita && localStorage.setItem(LS.EQUIPE_2, equipeDireita.id);
        if (prova.tipo === 1) {
            history.push('/competir/cronometro');
        } else {
            history.push('/competir/score');
        }
    }, [equipeEsquerda, equipeDireita, prova.tipo, history]);

    const handleMudarProva = React.useCallback((confirm: boolean) => {
        function navigate() {
            localStorage.removeItem(LS.PROVA);
            history.push('/competir');
        }

        if (confirm) {
            const msg = 'Deseja mudar de prova?\n\nIsso irá apagar os resultados atuais!';
            if (window.confirm(msg)) {
                navigate();
            }
        } else {
            navigate();
        }
    }, [history]);

    const handleTransmitir = React.useCallback(() => {
        function sendApi() {
            var resultadoStorage = localStorage.getItem(LS.RESULTADOS);
            if (resultadoStorage) {
                var request = {
                    provaNome: prova.name,
                    equipes: JSON.parse(resultadoStorage)
                };
                api.post('/api/resultado/transmitir', request)
                    .then((response) => {
                        handleMudarProva(false);
                    });
            }
        }

        const msg = 'Deseja transmitir os resultados?\n\nInsira o nome do juiz responsável pela prova';
        const nome = window.prompt(msg);
        if (nome) {
            sendApi();
        }
    }, [handleMudarProva, prova.name]);

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Competir {prova.name}
        </h1>

        <EquipeContainerJss>
            <h3>Equipe esquerda</h3>
            <EquipeStageJss>
                {equipeEsquerda && <Equipe prova={prova} resultado={equipeEsquerda} setModel={setEquipeEsquerda} isMudar />}
                {!equipeEsquerda && resultados.map((resultado) => {
                    return (<Equipe key={resultado.id} prova={prova} resultado={resultado} setModel={setEquipeEsquerda} />);
                })}
            </EquipeStageJss>

            {equipeEsquerda && <>
                <h3>Equipe direita</h3>
                <EquipeStageJss>
                    {equipeDireita && <Equipe prova={prova} resultado={equipeDireita} setModel={setEquipeDireita} isMudar />}
                    {!equipeDireita && resultados.filter(w => w.equipeNome !== equipeEsquerda.equipeNome).map((resultado) => {
                        return (<Equipe prova={prova} key={resultado.id} resultado={resultado} setModel={setEquipeDireita} />);
                    })}
                </EquipeStageJss>
            </>}
        </EquipeContainerJss>


        <StartContainerJss>
            <ButtonUi disabled={!(!!equipeEsquerda || !!equipeDireita)} onClick={toCronometro}>Competir</ButtonUi>
        </StartContainerJss>

        <TransmitirContainerJss>
            <ButtonUi onClick={handleTransmitir}>Transmitir</ButtonUi>
            <ButtonUi variant='secondary' onClick={() => { handleMudarProva(true) }} >Mudar prova</ButtonUi>
        </TransmitirContainerJss>
    </>);
};

export default CompetirEquipeView;
