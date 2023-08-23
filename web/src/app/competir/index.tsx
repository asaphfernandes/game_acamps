import React from 'react';
import { useHistory } from 'react-router-dom';
import ButtonUi from '../ui/button';
import Topbar from '../ui/topbar';
import { api, IProvaModel, LS } from '../utils';
import { ProvaJss } from './jss';

const CompetirView: React.FC = () => {
    const history = useHistory();

    const [models, setModels] = React.useState<IProvaModel[]>([]);

    const prova = React.useMemo(() => {
        var provaStorage = localStorage.getItem(LS.PROVA);
        if (provaStorage) {
            return JSON.parse(provaStorage) as IProvaModel;
        }
        return undefined;
    }, []);

    const load = React.useCallback(() => {
        api.get('/api/prova')
            .then((response) => {
                setModels(response.data);
            });
    }, []);
    React.useEffect(load, [load]);

    const handleChange = (model: IProvaModel) => {
        localStorage.setItem(LS.PROVA, JSON.stringify(model));

        api.get(`/api/resultado/manutencao/${model.name}`)
        .then((response) => {
            localStorage.setItem(LS.RESULTADOS, JSON.stringify(response.data));
            history.push(`/competir/equipe`);
        });
    };

    if (!!prova) {
        history.push(`/competir/equipe`);
    }

    return (<>
        <Topbar title='Competir' />
        <ProvaJss>
            {models.map((model) => {
                return (<ButtonUi key={model.id} onClick={() => { handleChange(model); }}>{model.name}</ButtonUi>)
            })}
        </ProvaJss>
    </>);
};

export default CompetirView;
