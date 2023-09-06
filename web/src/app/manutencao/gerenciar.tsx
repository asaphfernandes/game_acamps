import React from 'react';
import ButtonUi from '../ui/button';
import Topbar from '../ui/topbar';
import { api, IProvaModel, IResultadoModel } from '../utils';
import { ContainerJss, ResultadoJss } from './jss';
import { useParams } from 'react-router-dom';

interface IParam {
    nome: string;
}

const ResultadoGerenciarView: React.FC = () => {
    const { nome } = useParams<IParam>();

    const [models, setModels] = React.useState<IResultadoModel[]>([]);

    const nameRef = React.useRef<HTMLInputElement>(null);
    const tempoRef = React.useRef<HTMLInputElement>(null);
    const punicaoRef = React.useRef<HTMLInputElement>(null);

    const load = React.useCallback(() => {
        api.get(`/api/resultado/manutencao/${nome}`)
            .then((response) => {
                setModels(response.data);
            });
    }, [nome]);

    React.useEffect(() => {
        if (tempoRef.current) {
            tempoRef.current.value = "";
        }

        if (punicaoRef.current) {
            punicaoRef.current.value = "";
        }

        if (nameRef.current) {
            nameRef.current.value = "";
            nameRef.current.focus();
        }
    }, [models]);

    React.useEffect(load, [load]);

    const handleCreate = React.useCallback(() => {
        let request: any = {};

        if (nameRef.current) {
            request.name = nameRef.current.value;
        }

        if (punicaoRef.current) {
            request.punicao = parseInt(punicaoRef.current.value);
        }

        if (tempoRef.current) {
            request.tempo = parseInt(tempoRef.current.value);
        }

        if (request.name) {
            api.post('/api/prova', request)
                .then((response) => {
                    load();
                });
        }
    }, [load]);

    const handleUpdate = React.useCallback(() => {

    }, [load]);

    return (<>
        <Topbar title='Prova' subtitle={nome} />
        <ContainerJss>
            {models.map((model) => {
                return (<ResultadoJss key={model.id} >
                    <input ref={nameRef} placeholder='Equipe' value={model.equipeNome} readOnly />
                    <input ref={tempoRef} placeholder='Tempo segundos' value={model.timeMiliseconds} />
                    <input ref={punicaoRef} placeholder='Punição segundos' value={model.penalidadeSeconds} />
                    <ButtonUi onClick={handleUpdate}>Salvar</ButtonUi>
                </ResultadoJss>)
            })}
            <ResultadoJss>
                <input ref={nameRef} placeholder='Nome prova' />
                <input ref={tempoRef} placeholder='Tempo segundos' />
                <input ref={punicaoRef} placeholder='Punição segundos' />
                <ButtonUi onClick={handleCreate}>Add</ButtonUi>
            </ResultadoJss>
        </ContainerJss>
    </>);
};

export default ResultadoGerenciarView;
