import React from 'react';
import ButtonUi from '../ui/button';
import Topbar from '../ui/topbar';
import { api, IResultadoModel, maskTime } from '../utils';
import { ContainerJss, ResultadoJss } from './jss';
import { useParams } from 'react-router-dom';

interface IParam {
    nome: string;
}

interface IResultadoProps {
    model: IResultadoModel;
    onReload: () => void;
}

const Resultado: React.FC<IResultadoProps> = ({
    model, onReload
}) => {
    const [tempo, setTempo] = React.useState<number>(model.tempo);
    const [punicao, setPunicao] = React.useState<number>(model.punicao);

    const handleUpdate = React.useCallback(() => {
        let request: any = {
            id: model.id,
            tempo,
            punicao
        };

        api.post('/api/resultado/manutencao', request)
            .then((response) => {
                onReload();
            });
    }, [model.id, onReload, punicao, tempo]);

    const handleTempo = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTempo(Number(event.target.value));
    }, []);

    const handlePunicao = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPunicao(Number(event.target.value));
    }, []);

    return (<ResultadoJss>
        <input placeholder='Equipe' value={model.equipeNome} readOnly />
        <input placeholder='Tempo milisegundos' value={tempo} onChange={handleTempo} />
        <input placeholder='Punição segundos' value={punicao} onChange={handlePunicao} />
        <span>{maskTime(tempo)}</span>
        <ButtonUi onClick={handleUpdate}>Salvar</ButtonUi>
    </ResultadoJss>)
}

const ResultadoGerenciarView: React.FC = () => {
    const { nome } = useParams<IParam>();

    const [models, setModels] = React.useState<IResultadoModel[]>([]);

    const load = React.useCallback(() => {
        api.get(`/api/resultado/manutencao/${nome}`)
            .then((response) => {
                setModels(response.data);
            });
    }, [nome]);
    React.useEffect(load, [load]);

    return (<>
        <Topbar title='Prova' subtitle={nome} />
        <ContainerJss>
            <ResultadoJss>
                <input placeholder='Equipe' readOnly />
                <input placeholder='Tempo milisegundos' readOnly />
                <input placeholder='Punição segundos' readOnly />
                <ButtonUi disabled onClick={() => { }}></ButtonUi>
            </ResultadoJss>
            {models.map((model) => {
                return (<Resultado key={model.id} model={model} onReload={load} />)
            })}
        </ContainerJss>
    </>);
};

export default ResultadoGerenciarView;
