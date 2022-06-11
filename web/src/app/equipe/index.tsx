import React from 'react';
import ButtonUi from '../ui/button';
import Topbar from '../ui/topbar';
import { api, IEquipeModel, LS } from '../utils';
import { ContainerJss, EquipeContainerJss, EquipeJss } from './jss';

interface IEquipeProps {
    model: IEquipeModel;
    onReload: () => void;
}

const Equipe: React.FC<IEquipeProps> = ({
    model, onReload
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleEdit = React.useCallback(() => {
        let request: any = {
            id: model.id
        };

        if (inputRef.current) {
            request.name = inputRef.current.value;
        }

        if (request.name) {
            api.post('/api/equipe', request)
                .then((response) => {
                    onReload();
                });
        }
    }, [onReload, model.id]);

    return (<EquipeJss key={model.id}>
        <span>{model.sort} - {model.provaName}</span>
        <input ref={inputRef} defaultValue={model.name} />
        <ButtonUi onClick={handleEdit}>Salvar</ButtonUi>
    </EquipeJss>);
};

const EquipeView: React.FC = () => {
    const [models, setModels] = React.useState<IEquipeModel[]>([]);

    const load = React.useCallback(() => {
        api.get('/api/equipe')
            .then((response) => {
                localStorage.setItem(LS.EQUIPES, JSON.stringify(response.data));
                setModels(response.data);
            });
    }, []);

    React.useEffect(load, [load]);

    const handleSortear = React.useCallback(() => {
        api.post(`/api/equipe/sortear`)
            .then((response) => {
                load();
            });
    }, [load]);

    return (<>
        <Topbar title='Equipe' />

        <ContainerJss>
            <h3>Alfa</h3>
            <EquipeContainerJss>
                {models.filter(w => w.sort % 2 === 1).map((model) => {
                    return (<Equipe key={model.id} model={model} onReload={load} />)
                })}
            </EquipeContainerJss>

            <h3>Omega</h3>
            <EquipeContainerJss>
                {models.filter(w => w.sort % 2 === 0).map((model) => {
                    return (<Equipe key={model.id} model={model} onReload={load} />)
                })}
            </EquipeContainerJss>

            <div style={{ marginLeft: 10, marginTop: 30 }}>
                <ButtonUi onClick={handleSortear}>Sortear</ButtonUi>
            </div>
        </ContainerJss>
    </>);
};

export default EquipeView;
