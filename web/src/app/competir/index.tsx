import axios from 'axios';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

interface IModel {
    id: string;
    name: string;
}

const LS_PROVA = 'prova';

const CompetirView: React.FC = () => {
    const history = useHistory();
    const [models, setModels] = React.useState<IModel[]>([]);

    React.useEffect(() => {
        const provaStorage = localStorage.getItem(LS_PROVA);
        if (provaStorage) {
            history.push(`/competir/equipe`);
        }
    }, [history])

    const load = React.useCallback(() => {
        axios.create({ baseURL: 'https://localhost:61392' })
            .get('/api/prova')
            .then((response) => {
                setModels(response.data);
            });
    }, []);
    React.useEffect(load, [load]);

    const handleChange = React.useCallback((id: string) => {
        var m = models.filter(w => w.id === id)[0];
        localStorage.setItem(LS_PROVA, JSON.stringify(m));
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
