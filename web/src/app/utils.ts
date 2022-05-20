import axios from 'axios';

export const LS = {
    PROVA: 'prova',
    PROVAS: 'provas',
    EQUIPE: 'equipe',
    EQUIPES: 'equipes',
    RESULTADO: 'resultado',

    EQUIPE_1: 'equipe_1',
    EQUIPE_2: 'equipe_2'
};

export const api = axios.create({ baseURL: 'https://localhost:61392' })


export interface IProvaModel {
    id: string;
    name: string;
};

export interface IEquipeModel {
    id: string;
    name: string;
    sort: number;
};

export interface IEquipeResultadoModel {
    equipeId: string;
    punicaoSegundos: number;
    tempoMilisegundos: number;
}

export interface IResultadoModel {
    provaId: string;
    equipes: IEquipeResultadoModel[];
}

export const calcDiff = (start: Date, end: Date): number => {
    const s = start as any;
    const d = end as any;
    return (d - s) as number;
}

export const maskTime = (diff: number) => {
    var diffDate = new Date(diff);

    let segundos = diffDate.getSeconds();
    let minutos = diffDate.getMinutes();
    let tm = '';
    let ts = '';

    if (segundos < 10) {
        ts = `0${segundos}`;
    } else {
        ts = `${segundos}`;
    }

    if (minutos < 10) {
        tm = `0${minutos}`;
    } else {
        tm = `${minutos}`;
    }

    return `${tm}:${ts}`;
};