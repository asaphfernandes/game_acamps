import React from 'react';
import { Link } from 'react-router-dom';
import { api, IEquipeModel, LS } from '../utils';
import Spinner from './Spinner';


const EquipeView: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const [models, setModels] = React.useState<IEquipeModel[]>([]);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const load = React.useCallback(() => {
        api.get('/api/equipe')
            .then((response) => {
                localStorage.setItem(LS.EQUIPES, JSON.stringify(response.data));
                setModels(response.data);
            }).finally(() => {
                setLoading(false);
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
        setLoading(true)
        api.post(`/api/equipe/sortear`)
            .then((response) => {
                load();
            });
    }, [load]);

    if (loading) {
        return (<>
            <h1>
                <Link to='/'>Voltar</Link> / Equipe
            </h1>
            <h5 style={{ alignItems: "center" }}>Carregando <Spinner /></h5>
        </>)
    }

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Equipe
        </h1>
        <ul style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", listStyle: 'none' }}>
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
