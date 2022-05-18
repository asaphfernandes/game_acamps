import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

interface IModel {
    id: string;
    name: string;
}

const EquipeView: React.FC = () => {
    const [models, setModels] = React.useState<IModel[]>([]);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const load = React.useCallback(() => {
        axios.create({ baseURL: 'https://localhost:61392' })
            .get('/api/equipe')
            .then((response) => {
                setModels(response.data);
            });
    }, []);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    }, [models]);

    React.useEffect(load, [load]);

    const handleSortear = React.useCallback(() => {
        axios.create({ baseURL: 'https://localhost:61392' })
            .post(`/api/equipe/sortear`)
            .then((response) => {
                load();
            });
    }, [load]);

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Equipe
        </h1>
        <ul>
            {models.map((model) => {
                return (<li key={model.id} >
                    <input value={model.name} />
                    <button>Salvar</button>
                </li>)
            })}
            <li>
                <button onClick={handleSortear}>Sortear</button>
            </li>
        </ul>
    </>);
};

export default EquipeView;
