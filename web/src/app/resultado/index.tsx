import React from 'react';
import Topbar from '../ui/topbar';
import { api, IEquipeModel } from '../utils';
import { ContentJss, EquipeJss, Lugar1Jss, Lugar2Jss, Lugar3Jss, RankingContainerJss } from './jss';

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

    const equipe1: IEquipeModel | undefined = model.length >= 3 ? model[0] : undefined;
    const equipe2: IEquipeModel | undefined = model.length >= 3 ? model[1] : undefined;
    const equipe3: IEquipeModel | undefined = model.length >= 3 ? model[2] : undefined;

    return (<>
        <Topbar title='Resultado' subtitle={"Teste"} />
        <ContentJss>
            {equipe1
                && equipe2
                && equipe3
                && <>
                    <Lugar2Jss>
                        <h3>2º</h3>
                        <p>{equipe2.name}</p>
                        <p>{equipe2.tempo}</p>
                    </Lugar2Jss>

                    <Lugar1Jss>
                        <h3>1º</h3>
                        <p>{equipe1.name}</p>
                        <p>{equipe1.tempo}</p>
                    </Lugar1Jss>

                    <Lugar3Jss>
                        <h3>3º</h3>
                        <p>{equipe3.name}</p>
                        <p>{equipe3.tempo}</p>
                    </Lugar3Jss>
                </>}

            <RankingContainerJss>
                <EquipeJss>
                    <label>Pos</label>
                    <label>Líder</label>
                    <label>Tempo</label>
                </EquipeJss>
                {model.map((equipe, i) => {
                    return <EquipeJss key={equipe.name} className={`pos-${i}`}>
                        <span>{i+1}</span>
                        <span>{equipe.name}</span>
                        <span>{equipe.tempo}</span>
                        </EquipeJss>
                })}
            </RankingContainerJss>
        </ContentJss>
    </>);
};

export default ResultadoView;
