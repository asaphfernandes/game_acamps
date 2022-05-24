import React from 'react';
import { Link } from 'react-router-dom';
import { api, IEquipeModel, LS } from '../utils';

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
        <h1>
            <Link to='/'>Voltar</Link> / Equipe
        </h1>
        <ul style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
            {models.map((model) => {
                return (<li key={model.id} style={{ width: "40%", margin: 10 }}>
                    <input value={model.name} />
                    <button>Salvar</button>
                </li>)
            })}
        </ul>
        <div style={{ marginLeft: 10, marginTop: 30 }}>
            <button onClick={handleSortear} style={{ fontSize: 24, backgroundColor: "#546E7A", borderRadius: 5, width: "15%" }}>Sortear</button>
        </div>
    </>);
};

export default EquipeView;
