import React from 'react';
import {  useHistory } from 'react-router-dom';
import ButtonUi from '../ui/button';
import Topbar from '../ui/topbar';
import { IProvaModel, IResultadoModel, LS } from '../utils';
import { ProvaJss } from './jss';

const CompetirView: React.FC = () => {
    const history = useHistory();

    React.useEffect(() => {
        const provaStorage = localStorage.getItem(LS.PROVA);
        if (provaStorage) {
            history.push(`/competir/equipe`);
        }
    }, [history])

    const models = React.useMemo(() => {
        const provasStorage = localStorage.getItem(LS.PROVAS);
        if (provasStorage) {
            return JSON.parse(provasStorage) as IProvaModel[];
        }
        return new Array<IProvaModel>();
    }, []);

    const handleChange = React.useCallback((id: string) => {
        var m = models.filter(w => w.id === id)[0];
        localStorage.setItem(LS.PROVA, JSON.stringify(m));

        const resultado: IResultadoModel = {
            id: id,
            equipes: []
        };

        localStorage.setItem(LS.RESULTADO, JSON.stringify(resultado));

        history.push(`/competir/equipe`);
    }, [history, models]);

    return (<>
        <Topbar title='Competir' />
        <ProvaJss>
            {models.map((model) => {
                return (<ButtonUi key={model.id} onClick={() => { handleChange(model.id); }}>{model.name}</ButtonUi>)
            })}
        </ProvaJss>
    </>);
};

export default CompetirView;
