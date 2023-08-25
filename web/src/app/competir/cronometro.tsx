import React from 'react';
import { useHistory } from 'react-router-dom';
import ButtonUi from '../ui/button';
import { calcDiff, IProvaModel, IResultadoModel, LS, maskTime } from '../utils';
import { ConcluirContainerJss, CronometroEquipeJss, CronometroHeader, CronometroTimerJss, HubEquipeJss, PunicaoJss } from './jss';

interface ICronometroProps {
    resultado: IResultadoModel;
    prova: IProvaModel;
    onConcluir: (equipe: IResultadoModel) => void;
    onPunir: (equipe: IResultadoModel, value: number) => void;
}

const Cronometro: React.FC<ICronometroProps> = ({
    resultado, prova, onConcluir, onPunir
}) => {

    const addPunir = React.useCallback(() => {
        onPunir(resultado, +prova.punicao);
    }, [resultado, prova, onPunir]);

    const removePunir = React.useCallback(() => {
        onPunir(resultado, -prova.punicao);
    }, [resultado, prova, onPunir]);

    const handleConcluir = React.useCallback(() => {
        onConcluir(resultado);
    }, [resultado, onConcluir]);

    return (<HubEquipeJss>
        <b>{resultado.equipeNome}</b>
        <PunicaoJss>
            <span className='title'>Punição</span>
            <ButtonUi onClick={removePunir}>-</ButtonUi>
            <span className='display'>{resultado.penalidadeSeconds || 0}s</span>
            <ButtonUi onClick={addPunir}>+</ButtonUi>
        </PunicaoJss>

        <ButtonUi className='concluir' variant='secondary' onClick={handleConcluir}>
            Concluir
            <br />
            {resultado && resultado.timeMiliseconds && maskTime(resultado.timeMiliseconds)}
        </ButtonUi>

    </HubEquipeJss>);
};

const CompetirCronometroView: React.FC = () => {
    const history = useHistory();
    const urlVoltar = '/competir/equipe';

    const [, render] = React.useState(false);
    const [resultados, setResultado] = React.useState<IResultadoModel[]>([]);

    const start = React.useRef<Date>();

    React.useEffect(() => {
        setInterval(() => {
            render(s => !s);
        }, 1000);
    }, []);

    const equipe1 = React.useRef<IResultadoModel>();
    const equipe2 = React.useRef<IResultadoModel>();

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
            equipe1.current = resultados.filter(w => w.id === equipe1Id)[0];
        }

        const equipe2Id = localStorage.getItem(LS.EQUIPE_2);
        if (equipe2Id) {
            equipe2.current = resultados.filter(w => w.id === equipe2Id)[0];
        }
    }, [resultados]);

    const setPunir = (equipe: IResultadoModel, value: number) => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADOS);
        if (resultadoStorage) {
            const resultados = JSON.parse(resultadoStorage) as IResultadoModel[];

            let equipeStorage = resultados.filter(w => w.id === equipe.id)[0];

            if (!equipeStorage.penalidadeSeconds) {
                equipeStorage.penalidadeSeconds = 0;
            }

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

    const handleStart = () => {
        start.current = new Date();
    };

    const handleConcluir = (equipe: IResultadoModel) => {
        if (!start.current) {
            return;
        }

        const resultadoStorage = localStorage.getItem(LS.RESULTADOS);
        if (resultadoStorage) {
            const resultados = JSON.parse(resultadoStorage) as IResultadoModel[];

            const equipeStorage = resultados.filter(w => w.id === equipe.id)[0];

            const diff = calcDiff(start.current, new Date());

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
        if (!start.current || !equipe1.current || !equipe2.current) {
            return;
        }

        const resultadoStorage = localStorage.getItem(LS.RESULTADOS);
        if (resultadoStorage) {
            const resultados = JSON.parse(resultadoStorage) as IResultadoModel[];

            const equipe1Storage = resultados.filter(w => w.id === equipe1.current?.id)[0];
            const equipe2Storage = resultados.filter(w => w.id === equipe2.current?.id)[0];

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
        if (!start.current || !equipe1.current || !equipe2.current) {
            history.push(urlVoltar);
            return;
        }

        const msg = 'Deseja limpar o resultado das equipes?';
        function clear() {
            const resultado1 = resultados.filter(w => w.id === equipe1.current?.id)[0];
            resultado1.timeMiliseconds = undefined;
            const resultado2 = resultados.filter(w => w.id === equipe2.current?.id)[0];
            resultado2.timeMiliseconds = undefined;
            
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

        {!start.current && <CronometroTimerJss>Cronômetro não inciado</CronometroTimerJss>}
        {start.current && <CronometroTimerJss>{maskTime(calcDiff(start.current, new Date()), true)}</CronometroTimerJss>}

        <CronometroEquipeJss>
            {equipe1.current && <Cronometro resultado={equipe1.current} prova={prova} onConcluir={handleConcluir} onPunir={setPunir} />}
            {equipe2.current && <Cronometro resultado={equipe2.current} prova={prova} onConcluir={handleConcluir} onPunir={setPunir} />}
        </CronometroEquipeJss>

        <ConcluirContainerJss>
            {!start.current && <ButtonUi onClick={handleStart}>Start</ButtonUi>}
            {start.current && <ButtonUi onClick={handleConcluirTodos}>Concluir</ButtonUi>}
            <ButtonUi variant='secondary' onClick={handleVoltar}>Voltar</ButtonUi>
        </ConcluirContainerJss>
    </>);
};

export default CompetirCronometroView;
