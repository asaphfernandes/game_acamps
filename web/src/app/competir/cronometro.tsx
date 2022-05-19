import React from 'react';
import { Link } from 'react-router-dom';

interface IProvaModel {
    id: string;
    name: string;
}

interface IEquipeModel {
    id: string;
    name: string;
    sort: number
}

interface ICronometroProps {
    model: IEquipeModel;
}

const LS_PROVA = 'prova';
const LS_EQUIPE_1 = 'equipe_1';
const LS_EQUIPE_2 = 'equipe_2';

const Cronometro: React.FC<ICronometroProps> = ({
    model
}) => {


    return (<>
        <b>{model.name}</b>
        <div>
            <button>Punir</button>
        </div>
        <div>
            <button>Concluir</button>
        </div>
    </>);
};

const CompetirCronometroView: React.FC = () => {
    const [, render] = React.useState(false);

    React.useEffect(() => {
        setInterval(() => {
            render(s => !s);
        }, 1000);
    }, []);

    const prova = React.useMemo(() => {
        const provaStorage = localStorage.getItem(LS_PROVA);
        if (provaStorage) {
            const prova = JSON.parse(provaStorage);
            return prova as IProvaModel;
        }
        return { name: '[SEM PROVA]', id: '' } as IProvaModel;
    }, []);

    const equipe1 = React.useMemo(() => {
        const provaStorage = localStorage.getItem(LS_EQUIPE_1);
        if (provaStorage) {
            const prova = JSON.parse(provaStorage);
            return prova as IEquipeModel;
        }
        return { name: '[SEM PROVA]', id: '' } as IEquipeModel;
    }, []);

    const equipe2 = React.useMemo(() => {
        const provaStorage = localStorage.getItem(LS_EQUIPE_2);
        if (provaStorage) {
            const prova = JSON.parse(provaStorage);
            return prova as IEquipeModel;
        }
        return { name: '[SEM PROVA]', id: '' } as IEquipeModel;
    }, []);

    return (<>
        <h1>
            <Link to='/'>Voltar</Link> / Competir {prova.name}
        </h1>

        <h2>{new Date().toTimeString()}</h2>

        <Cronometro model={equipe1} />
        <Cronometro model={equipe2} />

        <div>
            <button>Concluir</button>
        </div>
        <div>
            <button>Voltar</button>
        </div>
    </>);
};

export default CompetirCronometroView;
