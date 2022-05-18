import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

interface IModel {
    id: string;
    name: string;
}

const ProvaView: React.FC = () => {
    const [models, setModels] = React.useState<IModel[]>([]);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const load = React.useCallback(() => {
        axios.create({ baseURL: 'https://localhost:61392' })
            .get('/api/prova')
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

    const handleCreate = React.useCallback(() => {
        if (inputRef.current) {
            axios.create({ baseURL: 'https://localhost:61392' })
                .post('/api/prova', {
                    name: inputRef.current.value
                })
                .then((response) => {
                    load();
                });
        }
    }, [load]);

    const handleDelete = React.useCallback((id: string) => {
        axios.create({ baseURL: 'https://localhost:61392' })
            .delete(`/api/prova/${id}`)
            .then((response) => {
                load();
            });
    }, [load]);

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Prova
        </h1>
        <ul>
            {models.map((model) => {
                return (<li key={model.id} >
                    {model.name}
                    <button onClick={() => { handleDelete(model.id); }}>Delete</button>
                </li>)
            })}
            <li>
                <input ref={inputRef} />
                <button onClick={handleCreate}>Add</button>
            </li>
        </ul>
    </>);
};

export default ProvaView;
