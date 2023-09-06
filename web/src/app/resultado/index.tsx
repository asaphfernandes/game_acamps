import React from 'react';
import Topbar from '../ui/topbar';
import { api, IEquipeModel, maskTime } from '../utils';
import { ContentJss, EquipeJss, RankingContainerJss } from './jss';

interface IEquipeProps {
    model: IEquipeModel;
}

const Equipe: React.FC<IEquipeProps> = ({ model }) => {
    const [show, setShow] = React.useState(model.posicao > 10);

    if (show) {
        return (<EquipeJss className={`pos-${model.posicao}`}>
            <span>{model.posicao}</span>
            <span>{model.name}</span>
            <span>{maskTime(model.tempo)}</span>
        </EquipeJss>);
    } else {
        return (<EquipeJss className={`pos-${model.posicao}`}>
            <span>{model.posicao}</span>
            <span onClick={() => { setShow(true) }} >ver aquipe</span>
            <span>{maskTime(model.tempo)}</span>
        </EquipeJss>);
    }

};

const ResultadoView: React.FC = () => {
    const [render, reRender] = React.useState(false);
    const [model, setModel] = React.useState<IEquipeModel[]>([]);

    const load = React.useCallback(() => {
        api.get('/api/resultado')
            .then((response) => {
                setModel(response.data);
                setTimeout(() => reRender(s => !s), 5000);
            });
    }, []);

    React.useEffect(load, [render, load]);

    return (<>
        <Topbar title='Resultado'/>
        <ContentJss>
            <RankingContainerJss>
                <EquipeJss>
                    <label>Pos</label>
                    <label>Líder</label>
                    <label>Tempo</label>
                </EquipeJss>
                {model.map((equipe, i) => {
                    return <Equipe key={equipe.name} model={equipe} />
                })}
            </RankingContainerJss>
        </ContentJss>
    </>);
};

export default ResultadoView;
