import React from 'react';
import ButtonUi from '../ui/button';
import Topbar from '../ui/topbar';
import { api, IProvaModel } from '../utils';
import { ContainerJss, ManutencaoJss, ZerarJss } from './jss';
import { useHistory } from 'react-router-dom';

const ManutencaoView: React.FC = () => {
    const history = useHistory();
    
    const [models, setModels] = React.useState<IProvaModel[]>([]);

    const load = React.useCallback(() => {
        api.get('/api/prova')
            .then((response) => {
                setModels(response.data);
            });
    }, []);

    React.useEffect(load, [load]);

    const handleEdit = React.useCallback((name: string) => {
        history.push(`/manutencao/gerenciar/${name}`);
    }, [history]);

    const handleZerar = React.useCallback(() => {
        api.post('/api/resultado/zerar');
    }, []);

    return (<>
        <Topbar title='Manutencao' />
        <ContainerJss>
            {models.map((model) => {
                return (<ManutencaoJss key={model.id} >
                    Nome: {model.name} - Tempo: {model.tempo}s - Punição: {model.punicao}s
                    <ButtonUi variant='default' onClick={() => { handleEdit(model.name); }}>Gerenciar</ButtonUi>
                </ManutencaoJss>)
            })}
        </ContainerJss>
        <ZerarJss>
            <ButtonUi variant='default' onClick={handleZerar}>Zerar</ButtonUi>
        </ZerarJss>
    </>);
};

export default ManutencaoView;
