import React from 'react';
import ButtonUi from '../ui/button';
import Topbar from '../ui/topbar';
import { api, IEquipeModel, LS } from '../utils';
import { ContainerJss, EquipeJss } from './jss';

const EquipeView: React.FC = () => {
    const [models, setModels] = React.useState<IEquipeModel[]>([]);

    const nameRef = React.useRef<HTMLInputElement>(null);
    const liderRef = React.useRef<HTMLInputElement>(null);

    const load = React.useCallback(() => {
        api.get('/api/equipe')
            .then((response) => {
                localStorage.setItem('provas', JSON.stringify(response.data));
                setModels(response.data);
            });
    }, []);

    React.useEffect(() => {
        if (liderRef.current) {
            liderRef.current.value = "";
        }

        if (nameRef.current) {
            nameRef.current.value = "";
            nameRef.current.focus();
        }
    }, [models]);

    React.useEffect(load, [load]);

    const handleCreate = React.useCallback(() => {
        let request: any = {};

        if(nameRef.current){
            request.name = nameRef.current.value;
        }

        if(liderRef.current){
            request.lider = liderRef.current.value;
        }

        if (request.name) {
            api.post('/api/equipe', request)
                .then((response) => {
                    load();
                });
        }
    }, [load]);

    const handleDelete = React.useCallback((id: string) => {
        api.delete(`/api/equipe/${id}`)
            .then((response) => {
                load();
            });
    }, [load]);

    return (<>
        <Topbar title='Equipe' />
        <ContainerJss>
            {models.map((model) => {
                return (<EquipeJss key={model.id} >
                    Nome: {model.name} - Lider: {model.lider}
                    <ButtonUi variant='delete' onClick={() => { handleDelete(model.id); }}>Delete</ButtonUi>
                </EquipeJss>)
            })}
            <EquipeJss>
                <input ref={nameRef} placeholder='Nome equipe' />
                <input ref={liderRef} placeholder='Lider da equipe' />
                <ButtonUi onClick={handleCreate}>Add</ButtonUi>
            </EquipeJss>
        </ContainerJss>
    </>);
};

export default EquipeView;
