import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IEquipeModel, IProvaModel, LS } from '../utils';

interface IEquipeProps {
    models: IEquipeModel[];
    model?: IEquipeModel;
    setModel: (model?: IEquipeModel) => void;
}

const Equipe: React.FC<IEquipeProps> = ({
    models, model, setModel
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
                return (<li key={model.id}>
                    <button onClick={() => { handleModel(model); }}>
                        {model.sort} - {model.name}
                    </button>
                </li>)
            })}
        </ul>);
    }
};

const CompetirEquipeView: React.FC = () => {
    const history = useHistory();

    const [modelPar, setModelPar] = React.useState<IEquipeModel>();
    const [modelImpar, setModelImpar] = React.useState<IEquipeModel>();

    const model = React.useMemo(() => {
        const provaStorage = localStorage.getItem(LS.PROVA);
        if (provaStorage) {
            const prova = JSON.parse(provaStorage);
            return prova as IProvaModel;
        }
        return { name: '[SEM PROVA]', id: '' } as IProvaModel;
    }, []);

    const models = React.useMemo(() => {
        const provasStorage = localStorage.getItem(LS.EQUIPES);
        if (provasStorage) {
            return JSON.parse(provasStorage) as IEquipeModel[];
        }
        return new Array<IEquipeModel>();
    }, []);

    const handleStart = React.useCallback(() => {
        history.push('/competir/cronometro');
    }, [history]);

    const handleMudarProva = React.useCallback(() => {
        localStorage.removeItem(LS.PROVA);
        history.push('/competir');
    }, [history]);

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Competir {model.name}
        </h1>

        <h3>Equipes pares</h3>
        <Equipe models={models.filter(w => w.sort % 2 === 1)} model={modelPar} setModel={setModelPar} />

        <h3>Equipes impares</h3>
        <Equipe models={models.filter(w => w.sort % 2 === 0)} model={modelImpar} setModel={setModelImpar} />

        <hr />
        <div>
            <button disabled={!modelPar || !modelImpar} onClick={handleStart}>Start</button>
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
