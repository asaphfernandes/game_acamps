import React from 'react';
import ButtonUi from '../ui/button';
import Topbar from '../ui/topbar';
import { api, IProvaModel, LS } from '../utils';
import { ContainerJss, ProvaJss } from './jss';

const ProvaView: React.FC = () => {
    const [models, setModels] = React.useState<IProvaModel[]>([]);

    const nameRef = React.useRef<HTMLInputElement>(null);
    const punicaoRef = React.useRef<HTMLInputElement>(null);
    const bonusRef = React.useRef<HTMLInputElement>(null);

    const load = React.useCallback(() => {
        api.get('/api/prova')
            .then((response) => {
                localStorage.setItem(LS.PROVAS, JSON.stringify(response.data));
                setModels(response.data);
            });
    }, []);

    React.useEffect(() => {
        if (punicaoRef.current) {
            punicaoRef.current.value = "";
        }

        if (bonusRef.current) {
            bonusRef.current.value = "";
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

        if(punicaoRef.current){
            request.punicao = parseInt(punicaoRef.current.value);
        }

        if(bonusRef.current){
            request.bonus = parseInt(bonusRef.current.value);
        }

        if (request.name) {
            api.post('/api/prova', request)
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
                    Nome: {model.name} - Punição: {model.punicao}s - Bonus: {model.bonus}s
                    <ButtonUi variant='delete' onClick={() => { handleDelete(model.id); }}>Delete</ButtonUi>
                </ProvaJss>)
            })}
            <ProvaJss>
                <input ref={nameRef} placeholder='Nome prova' />
                <input ref={punicaoRef} placeholder='Punição segundos' />
                <input ref={bonusRef} placeholder='Bonus segundos' />
                <ButtonUi onClick={handleCreate}>Add</ButtonUi>
            </ProvaJss>
        </ContainerJss>
    </>);
};

export default ProvaView;
