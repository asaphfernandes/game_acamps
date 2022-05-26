import React from 'react';
import Topbar from '../ui/topbar';
import { api, IEquipeModel, LS } from '../utils';
import { ContainerJss, EquipeJss } from './jss';

const EquipeView: React.FC = () => {
    const [models, setModels] = React.useState<IEquipeModel[]>([]);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const load = React.useCallback(() => {
        api.get('/api/equipe')
            .then((response) => {
                localStorage.setItem(LS.EQUIPES, JSON.stringify(response.data));
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
        api.post(`/api/equipe/sortear`)
            .then((response) => {
                load();
            });
    }, [load]);

    return (<>
        <Topbar title='Equipe' />

        <ContainerJss>
            {models.map((model) => {
                return (<EquipeJss key={model.id}>
                    <input ref={inputRef} defaultValue={model.name} />
                    <button>Salvar</button>
                </EquipeJss>)
            })}
        </ContainerJss>
        <div style={{ marginLeft: 10, marginTop: 30 }}>
            <button onClick={handleSortear} style={{ fontSize: 24, backgroundColor: "#546E7A", borderRadius: 5, width: "15%" }}>Sortear</button>
        </div>
    </>);
};

export default EquipeView;
