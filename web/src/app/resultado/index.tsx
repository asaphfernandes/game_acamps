import React from 'react';
import Topbar from '../ui/topbar';
import { api, IRankEquipeModel, IRankModel } from '../utils';
import { ContentJss, EquipeJss, Lugar1Jss, Lugar2Jss, Lugar3Jss, RankingContainerJss } from './jss';

const ResultadoView: React.FC = () => {
    const [render, reRender] = React.useState(false);
    const [model, setModel] = React.useState<IRankModel>({
        lastChange: '', equipes: []
    });

    const load = React.useCallback(() => {
        api.get('/api/resultado')
            .then((response) => {
                setModel(response.data);
                setTimeout(() => reRender(s => !s), 5000);
            });
    }, []);

    React.useEffect(load, [render, load]);

    const equipe1: IRankEquipeModel | undefined = model.equipes.length >= 3 ? model.equipes[0] : undefined;
    const equipe2: IRankEquipeModel | undefined = model.equipes.length >= 3 ? model.equipes[1] : undefined;
    const equipe3: IRankEquipeModel | undefined = model.equipes.length >= 3 ? model.equipes[2] : undefined;

    return (<>
        <Topbar title='Resultado' subtitle={model.lastChange} />
        <ContentJss>
            {equipe1
                && equipe2
                && equipe3
                && <>
                    <Lugar2Jss>
                        <h3>2º</h3>
                        <p>{equipe2.name}</p>
                        <p>{equipe2.total}</p>
                    </Lugar2Jss>

                    <Lugar1Jss>
                        <h3>1º</h3>
                        <p>{equipe1.name}</p>
                        <p>{equipe1.total}</p>
                    </Lugar1Jss>

                    <Lugar3Jss>
                        <h3>3º</h3>
                        <p>{equipe3.name}</p>
                        <p>{equipe3.total}</p>
                    </Lugar3Jss>
                </>}

            <RankingContainerJss>
                <EquipeJss>
                    <label>Pos</label>
                    <label>Líder</label>
                    <label>Tempo</label>
                </EquipeJss>
                {model.equipes.map((equipe, i) => {
                    return <EquipeJss key={equipe.name} className={`pos-${i}`}>
                        <span>{i+1}</span>
                        <span>{equipe.name}</span>
                        <span>{equipe.total}</span>
                        </EquipeJss>
                })}
            </RankingContainerJss>
        </ContentJss>
    </>);
};

export default ResultadoView;
