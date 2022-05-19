import React from 'react';
import { Link } from 'react-router-dom';
import { api, IProvaModel, LS } from '../utils';

const ProvaView: React.FC = () => {
    const [models, setModels] = React.useState<IProvaModel[]>([]);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const load = React.useCallback(() => {
        api.get('/api/prova')
            .then((response) => {
                localStorage.setItem(LS.PROVAS, JSON.stringify(response.data));
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
            api.post('/api/prova', {
                    name: inputRef.current.value
                })
                .then((response) => {
                    load();
                });
        }
    }, [load]);

    const handleDelete = React.useCallback((id: string) => {
        api.delete(`/api/prova/${id}`)
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
