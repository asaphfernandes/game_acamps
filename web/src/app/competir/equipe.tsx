import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IEquipeModel, IProvaModel, IResultadoModel, LS } from '../utils';

interface IEquipeProps {
    resultado: IResultadoModel;
    setModel: (model?: IEquipeModel) => void;
    model: IEquipeModel | undefined;
    models: IEquipeModel[];
}

const Equipe: React.FC<IEquipeProps> = ({
    resultado, models, model, setModel
}) => {

    const handleModel = React.useCallback((model?: IEquipeModel) => {
        setModel(model);
    }, [setModel]);

    if (model) {
        return (<>
            <b>{model.name}</b>
            <div>
                <button onClick={() => { handleModel(undefined) }}>
                    Mudar
                </button>
            </div>
        </>)
    } else {
        return (<ul>
            {models.map((model) => {
                const disabled = resultado.equipes.findIndex(w => w.equipeId === model.id) > -1;
                return (<li key={model.id}>
                    <button disabled={disabled} onClick={() => { handleModel(model); }}>
                        {model.sort} - {model.name}
                    </button>
                </li>)
            })}
        </ul>);
    }
};

const CompetirEquipeView: React.FC = () => {
    const history = useHistory();

    const [equipe1, setModelPar] = React.useState<IEquipeModel>();
    const [equipe2, setModelImpar] = React.useState<IEquipeModel>();

    const model = React.useMemo(() => {
        const provaStorage = localStorage.getItem(LS.PROVA);
        if (provaStorage) {
            const prova = JSON.parse(provaStorage);
            return prova as IProvaModel;
        }
        return { name: '[SEM PROVA]', id: '' } as IProvaModel;
    }, []);

    const resultado = React.useMemo(() => {
        const resultadoStorage = localStorage.getItem(LS.RESULTADO);
        if (resultadoStorage) {
            const resultado = JSON.parse(resultadoStorage);
            return resultado as IResultadoModel;
        }
        return { provaId: '', equipes: [] } as IResultadoModel;
    }, []);

    const models = React.useMemo(() => {
        const provasStorage = localStorage.getItem(LS.EQUIPES);
        if (provasStorage) {
            return JSON.parse(provasStorage) as IEquipeModel[];
        }
        return new Array<IEquipeModel>();
    }, []);

    const handleStart = React.useCallback(() => {
        localStorage.setItem(LS.EQUIPE_1, JSON.stringify(equipe1));
        localStorage.setItem(LS.EQUIPE_2, JSON.stringify(equipe2));
        history.push('/competir/cronometro');
    }, [history, equipe1, equipe2]);

    const handleMudarProva = React.useCallback(() => {
        localStorage.removeItem(LS.PROVA);
        history.push('/competir');
    }, [history]);

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Competir {model.name}
        </h1>

        <h3>Equipes pares</h3>
        <Equipe resultado={resultado} setModel={setModelPar} model={equipe1}
            models={models.filter(w => w.sort % 2 === 1)} />

        <h3>Equipes impares</h3>
        <Equipe resultado={resultado} setModel={setModelImpar} model={equipe2}
            models={models.filter(w => w.sort % 2 === 0)} />

        <hr />
        <div>
            <button disabled={!equipe1 || !equipe2} onClick={handleStart}>Start</button>
        </div>

        <hr />
        <div>
            <button>Transmitir</button>
        </div>
        <div>
            <button onClick={handleMudarProva} >Mudar prova</button>
        </div>
    </>);
};

export default CompetirEquipeView;
