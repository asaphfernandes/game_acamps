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

    const handleDelete = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { id } = event.currentTarget;
        api.delete(`/api/prova/${id}`)
            .then((response) => {
                load();
            });
    }, [load]);

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Prova
        </h1>
        <ul style={{ display: "flex", flexDirection: 'row', listStyle: "none" }}>
            {models.map((model) => {
                return (<li key={model.id} style={{ margin: 10 }}>
                    <span>
                        {model.name}
                    </span>
                    <button id={model.id} onClick={handleDelete}> Delete</button>
                </li>)
            })}
            <li style={{ margin: 10 }}>
                <input ref={inputRef} placeholder="Prova" width={200} style={{ marginRight: 2 }} />
                <button onClick={handleCreate} style={{ padding: 0, borderRadius: "50%", height: 25, width: 25, fontSize: 20, alignItems: "center", justifyContent: 'center' }}>+</button>
            </li>
        </ul>
    </>);
};

export default ProvaView;
