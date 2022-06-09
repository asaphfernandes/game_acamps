import React from 'react';
import { useHistory } from 'react-router-dom';
import ButtonUi from '../ui/button';
import { calcDiff, IEquipeModel, IProvaModel, IResultadoModel, LS, maskTime } from '../utils';
import { ConcluirContainerJss, CronometroEquipeJss, CronometroHeader, CronometroTimer, HubEquipeJss, PunicaoJss } from './jss';

interface ICronometroProps {
    equipe: IEquipeModel;
    prova: IProvaModel;
    start: Date;
}

const Cronometro: React.FC<ICronometroProps> = ({
    equipe, prova, start
}) => {
    const [punicao, setPunicao] = React.useState(0);
    const [conclusao, setConclucao] = React.useState<number>();
    const [bonificacao, setBonificacao] = React.useState(0);

    const setPunir = React.useCallback((value: number) => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            const resultado = JSON.parse(resultadoStorage) as IResultadoModel;

            let equipeStorage = resultado.equipes.filter(w => w.id === equipe.id)[0];

            if (equipeStorage) {
                equipeStorage.penalidadeSeconds += value

                // Corrige para que a punição não fique menos que zero.
                if(equipeStorage.penalidadeSeconds < 0){
                    equipeStorage.penalidadeSeconds = 0;
                }
            } else {
                equipeStorage = {
                    id: equipe.id,
                    name: equipe.name,
                    penalidadeSeconds: 1,
                    bonusSeconds: 0,
                    timeMiliseconds: 0
                };
                resultado.equipes.push(equipeStorage);
            }

            localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));
            setPunicao(equipeStorage.penalidadeSeconds);
        }
    }, [equipe]);

    const addPunir = React.useCallback(() => {
        setPunir(+prova.punicao);
    }, [setPunir, prova]);

    const removePunir = React.useCallback(() => {
        setPunir(-prova.punicao);
    }, [setPunir, prova]);

    const setBonus = React.useCallback((value: number) => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            const resultado = JSON.parse(resultadoStorage) as IResultadoModel;

            let equipeStorage = resultado.equipes.filter(w => w.id === equipe.id)[0];

            if (equipeStorage) {
                equipeStorage.bonusSeconds += value

                // Corrige para que a bonificação não fique menos que zero.
                if(equipeStorage.bonusSeconds < 0){
                    equipeStorage.bonusSeconds = 0;
                }
            } else {
                equipeStorage = {
                    id: equipe.id,
                    name: equipe.name,
                    penalidadeSeconds: 0,
                    bonusSeconds: 1,
                    timeMiliseconds: 0
                };
                resultado.equipes.push(equipeStorage);
            }

            localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));
            setBonificacao(equipeStorage.bonusSeconds);
        }
    }, [equipe]);

    const addBonus = React.useCallback(() => {
        setBonus(+prova.bonus);
    }, [setBonus, prova]);

    const removeBonus = React.useCallback(() => {
        setBonus(-prova.bonus);
    }, [setBonus, prova]);

    const handleConcluir = React.useCallback(() => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            const resultado = JSON.parse(resultadoStorage) as IResultadoModel;

            const equipeStorage = resultado.equipes.filter(w => w.id === equipe.id)[0];

            const diff = calcDiff(start, new Date());

            if (equipeStorage) {
                equipeStorage.timeMiliseconds = diff;
            } else {
                resultado.equipes.push({
                    id: equipe.id,
                    name: equipe.name,
                    penalidadeSeconds: 0,
                    bonusSeconds: 0,
                    timeMiliseconds: diff
                });
            }

            localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));
            setConclucao(diff);
        }
    }, [equipe, start]);

    return (<HubEquipeJss>
        <b>{equipe.name}</b>
        <PunicaoJss>
            <span className='title'>Punição</span>
            <ButtonUi onClick={addPunir}>+</ButtonUi>
            <span className='display'>{punicao}s</span>
            <ButtonUi onClick={removePunir}>-</ButtonUi>
        </PunicaoJss>

        <ButtonUi className='concluir' variant='secondary' onClick={handleConcluir}>
            Concluir
            <br />
            {conclusao && maskTime(conclusao)}
        </ButtonUi>

        {prova.bonus && <PunicaoJss>
            <span className='title'>Bonus</span>
            <ButtonUi onClick={addBonus}>+</ButtonUi>
            <span className='display'>{bonificacao}s</span>
            <ButtonUi onClick={removeBonus}>-</ButtonUi>
        </PunicaoJss>}

    </HubEquipeJss>);
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
        if (window.confirm('Verifique se todas as equipes estão concluídas')) {
            history.push('/competir/equipe');
        }
    }, [history]);

    return (<>
        <CronometroHeader>
            Competir {prova.name}
        </CronometroHeader>

        <CronometroTimer>{maskTime(calcDiff(start, new Date()))}</CronometroTimer>

        <CronometroEquipeJss>
            <Cronometro equipe={equipe1} prova={prova} start={start} />
            <Cronometro equipe={equipe2} prova={prova} start={start} />
        </CronometroEquipeJss>

        <ConcluirContainerJss>
            <ButtonUi onClick={handleVoltar}>Voltar</ButtonUi>
        </ConcluirContainerJss>
    </>);
};

export default CompetirCronometroView;
