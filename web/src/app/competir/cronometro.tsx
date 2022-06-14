import React from 'react';
import { useHistory } from 'react-router-dom';
import ButtonUi from '../ui/button';
import { calcDiff, IEquipeModel, IEquipeResultadoModel, IProvaModel, IResultadoModel, LS, maskTime } from '../utils';
import { ConcluirContainerJss, CronometroEquipeJss, CronometroHeader, CronometroTimer, HubEquipeJss, PunicaoJss } from './jss';

interface ICronometroProps {
    equipe: IEquipeModel;
    prova: IProvaModel;
    resultado?: IEquipeResultadoModel,
    onConcluir: (equipe: IEquipeModel) => void;
    onPunir: (equipe: IEquipeModel, value: number) => void;
    onBonus: (equipe: IEquipeModel, value: number) => void;
}

const Cronometro: React.FC<ICronometroProps> = ({
    equipe, prova, resultado, onConcluir, onPunir, onBonus
}) => {
    const addPunir = React.useCallback(() => {
        onPunir(equipe, +prova.punicao);
    }, [equipe, prova, onPunir]);

    const removePunir = React.useCallback(() => {
        onPunir(equipe, -prova.punicao);
    }, [equipe, prova, onPunir]);

    const addBonus = React.useCallback(() => {
        onBonus(equipe, +prova.bonus);
    }, [equipe, prova, onBonus]);

    const removeBonus = React.useCallback(() => {
        onBonus(equipe, -prova.bonus);
    }, [equipe, prova, onBonus]);

    const handleConcluir = React.useCallback(() => {
        onConcluir(equipe);
    }, [equipe, onConcluir]);

    return (<HubEquipeJss>
        <b>{equipe.name}</b>
        <PunicaoJss>
            <span className='title'>Punição</span>
            <ButtonUi onClick={removePunir}>-</ButtonUi>
            <span className='display'>{resultado ? resultado.penalidadeSeconds : 0}s</span>
            <ButtonUi onClick={addPunir}>+</ButtonUi>
        </PunicaoJss>

        <ButtonUi className='concluir' variant='secondary' onClick={handleConcluir}>
            Concluir
            <br />
            {resultado && resultado.timeMiliseconds && maskTime(resultado.timeMiliseconds)}
        </ButtonUi>

        {prova.bonus && <PunicaoJss>
            <span className='title'>Bonus</span>
            <ButtonUi onClick={removeBonus}>-</ButtonUi>
            <span className='display'>{resultado ? resultado.bonificacaoSeconds : 0}s</span>
            <ButtonUi onClick={addBonus}>+</ButtonUi>
        </PunicaoJss>}

    </HubEquipeJss>);
};

const CompetirCronometroView: React.FC = () => {
    const history = useHistory();
    const urlVoltar = '/competir/equipe';

    const [, render] = React.useState(false);
    const [resultado, setResultado] = React.useState<IResultadoModel>(() => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            return JSON.parse(resultadoStorage) as IResultadoModel;
        } else {
            return {} as IResultadoModel;
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

    const setPunir = React.useCallback((equipe: IEquipeModel, value: number) => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            const resultado = JSON.parse(resultadoStorage) as IResultadoModel;

            let equipeStorage = resultado.equipes.filter(w => w.id === equipe.id)[0];

            if (equipeStorage) {
                equipeStorage.penalidadeSeconds += value

                // Corrige para que a punição não fique menos que zero.
                if (equipeStorage.penalidadeSeconds < 0) {
                    equipeStorage.penalidadeSeconds = 0;
                }
            } else {
                equipeStorage = {
                    id: equipe.id,
                    name: equipe.name,
                    penalidadeSeconds: 1,
                    bonificacaoSeconds: 0,
                    timeMiliseconds: undefined
                };
                resultado.equipes.push(equipeStorage);
            }

            localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));
            setResultado(resultado);
        }
    }, []);

    const setBonus = React.useCallback((equipe: IEquipeModel, value: number) => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            const resultado = JSON.parse(resultadoStorage) as IResultadoModel;

            let equipeStorage = resultado.equipes.filter(w => w.id === equipe.id)[0];

            if (equipeStorage) {
                equipeStorage.bonificacaoSeconds += value

                // Corrige para que a bonificação não fique menos que zero.
                if (equipeStorage.bonificacaoSeconds < 0) {
                    equipeStorage.bonificacaoSeconds = 0;
                }
            } else {
                equipeStorage = {
                    id: equipe.id,
                    name: equipe.name,
                    penalidadeSeconds: 0,
                    bonificacaoSeconds: 1,
                    timeMiliseconds: undefined
                };
                resultado.equipes.push(equipeStorage);
            }

            localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));
            setResultado(resultado);
        }
    }, []);

    const handleConcluir = React.useCallback((equipe: IEquipeModel) => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            const resultado = JSON.parse(resultadoStorage) as IResultadoModel;

            const equipeStorage = resultado.equipes.filter(w => w.id === equipe.id)[0];

            const diff = calcDiff(start, new Date());

            if (equipeStorage) {
                if (equipeStorage.timeMiliseconds === undefined) {
                    equipeStorage.timeMiliseconds = diff;
                } else {
                    equipeStorage.timeMiliseconds = undefined;
                }
            } else {
                resultado.equipes.push({
                    id: equipe.id,
                    name: equipe.name,
                    penalidadeSeconds: 0,
                    bonificacaoSeconds: 0,
                    timeMiliseconds: diff
                });
            }

            localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));
            setResultado(resultado);
        }
    }, [start]);

    const handleConcluirTodos = React.useCallback(() => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            const resultado = JSON.parse(resultadoStorage) as IResultadoModel;

            const equipe1Storage = resultado.equipes.filter(w => w.id === equipe1.id)[0];
            const equipe2Storage = resultado.equipes.filter(w => w.id === equipe2.id)[0];

            let diff = 1000 * 60 * 5;

            if (equipe1Storage && !equipe1Storage.timeMiliseconds) {
                equipe1Storage.timeMiliseconds = diff;
            } else if (!equipe1Storage) {
                resultado.equipes.push({
                    id: equipe1.id,
                    name: equipe1.name,
                    penalidadeSeconds: 0,
                    bonificacaoSeconds: 0,
                    timeMiliseconds: diff
                });
            }

            if (equipe2Storage && !equipe2Storage.timeMiliseconds) {
                equipe2Storage.timeMiliseconds = diff;
            } else if (!equipe2Storage) {
                resultado.equipes.push({
                    id: equipe2.id,
                    name: equipe2.name,
                    penalidadeSeconds: 0,
                    bonificacaoSeconds: 0,
                    timeMiliseconds: diff
                });
            }

            localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));
            history.push(urlVoltar);
        }
    }, [start, equipe1, equipe2, history]);

    const handleVoltar = React.useCallback(() => {
        const msg = 'Deseja limpar o resultado das equipes?';
        function clear() {
            resultado.equipes = resultado.equipes.filter(w => w.id !== equipe1.id);
            resultado.equipes = resultado.equipes.filter(w => w.id !== equipe2.id);
            localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));
        }

        if (resultado.equipes.length) {
            const resultadoEquipe1 = resultado.equipes[0];
            const resultadoEquipe2 = resultado.equipes[1];
            if (resultadoEquipe1 && resultadoEquipe2) {
                if (!!resultadoEquipe1.timeMiliseconds && !!resultadoEquipe2.timeMiliseconds) {
                    history.push(urlVoltar);
                } else if (!resultadoEquipe1.timeMiliseconds && !resultadoEquipe2.timeMiliseconds) {
                    clear();
                    history.push(urlVoltar);
                } else {
                    if (window.confirm(msg)) {
                        clear();
                        history.push(urlVoltar);
                    }
                }
            } else {
                if (resultadoEquipe1 || resultadoEquipe2) {
                    if (window.confirm(msg)) {
                        clear();
                        history.push(urlVoltar);
                    }
                }
            }
        } else {
            history.push(urlVoltar);
        }
    }, [history, resultado, equipe1, equipe2]);

    return (<>
        <CronometroHeader>
            Competir {prova.name}
        </CronometroHeader>

        <CronometroTimer>{maskTime(calcDiff(start, new Date()))}</CronometroTimer>

        <CronometroEquipeJss>
            <Cronometro equipe={equipe1} prova={prova} resultado={resultado.equipes.filter(w => w.id === equipe1.id)[0]}
                onConcluir={handleConcluir} onPunir={setPunir} onBonus={setBonus} />
            <Cronometro equipe={equipe2} prova={prova} resultado={resultado.equipes.filter(w => w.id === equipe2.id)[0]}
                onConcluir={handleConcluir} onPunir={setPunir} onBonus={setBonus} />
        </CronometroEquipeJss>

        <ConcluirContainerJss>
            <ButtonUi onClick={handleConcluirTodos}>Concluir</ButtonUi>
            <ButtonUi onClick={handleVoltar}>Voltar</ButtonUi>
        </ConcluirContainerJss>
    </>);
};

export default CompetirCronometroView;
