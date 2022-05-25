import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IProvaModel, IResultadoModel, LS } from '../utils';

const CompetirView: React.FC = () => {
    const history = useHistory();

    React.useEffect(() => {
        const provaStorage = localStorage.getItem(LS.PROVA);
        if (provaStorage) {
            history.push(`/competir/equipe`);
        }
    }, [history])

    const models = React.useMemo(() => {
        const provasStorage = localStorage.getItem(LS.PROVAS);
        if (provasStorage) {
            return JSON.parse(provasStorage) as IProvaModel[];
        }
        return new Array<IProvaModel>();
    }, []);

    const handleChange = React.useCallback((id: string) => {
        var m = models.filter(w => w.id === id)[0];
        localStorage.setItem(LS.PROVA, JSON.stringify(m));

        const resultado: IResultadoModel = {
            id: id,
            equipes: []
        };

        localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));

        history.push(`/competir/equipe`);
    }, [history, models]);

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Competir
        </h1>
        <ul>
            {models.map((model) => {
                return (<li key={model.id} >
                    <button onClick={() => { handleChange(model.id); }}>{model.name}</button>
                </li>)
            })}
        </ul>
    </>);
};

export default CompetirView;
