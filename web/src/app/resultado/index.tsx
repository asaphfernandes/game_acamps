import React from 'react';
import { Link } from 'react-router-dom';
import { api, IRankEquipeModel, IRankModel } from '../utils';

const ResultadoView: React.FC = () => {
    const [model, setModel] = React.useState<IRankModel>({
        lastChange: '', equipes: []
    });

    const load = React.useCallback(() => {
        api.get('/api/resultado')
            .then((response) => {
                setModel(response.data);
                setTimeout(load, 5000);
            });
    }, []);

    React.useEffect(load, [load]);

    const equipe1: IRankEquipeModel | undefined = model.equipes.length >= 3 ? model.equipes[0] : undefined;
    const equipe2: IRankEquipeModel | undefined = model.equipes.length >= 3 ? model.equipes[1] : undefined;
    const equipe3: IRankEquipeModel | undefined = model.equipes.length >= 3 ? model.equipes[2] : undefined;

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Resultado <small style={{fontSize: '.5em'}} >{model.lastChange}</small>
        </h1>
        {equipe1
            && equipe2
            && equipe3
            && <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'end'
            }}>
                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    width: 250, height: 150, backgroundColor: '#8F9591'
                }}>
                    <h3>2º</h3>
                    <p>{equipe2.name}</p>
                    <p>{equipe2.total}</p>
                </div>

                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    width: 250, height: 200, backgroundColor: '#FFFF00'
                }}>
                    <h3>1º</h3>
                    <p>{equipe1.name}</p>
                    <p>{equipe1.total}</p>
                </div>

                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    width: 250, height: 100, backgroundColor: '#B7701E'
                }}>
                    <h3>3º</h3>
                    <p>{equipe3.name}</p>
                    <p>{equipe3.total}</p>
                </div>
            </div>}
        <ul>
            {model.equipes.map((equipe, i) => {
                return <li key={equipe.name}>{i} - {equipe.name} {equipe.total}</li>
            })}
        </ul>
    </>);
};

export default ResultadoView;
