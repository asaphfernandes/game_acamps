import React from 'react';
import Topbar from '../ui/topbar';
import { api, IProvaModel, LS } from '../utils';
import { ContainerJss, ProvaJss } from './jss';

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
        <Topbar title='Prova' />
        <ContainerJss>
            {models.map((model) => {
                return (<ProvaJss key={model.id} >
                    {model.name}
                    <button onClick={() => { handleDelete(model.id); }}>Delete</button>
                </ProvaJss>)
            })}
            <ProvaJss>
                <input ref={inputRef} placeholder='Nome prova' />
                <button onClick={handleCreate}>Add</button>
            </ProvaJss>
        </ContainerJss>
    </>);
};

export default ProvaView;
