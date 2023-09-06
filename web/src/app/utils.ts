import axios from 'axios';

export const LS = {
    PROVA: 'prova',
    RESULTADOS: 'resultados',

    EQUIPE_1: 'equipe_1',
    EQUIPE_2: 'equipe_2'
};

export const api = axios.create({ baseURL: 'http://localhost:61393' })
// export const api = axios.create({ baseURL: 'https://game-acamps.azurewebsites.net' })

export interface IProvaModel {
    id: string;
    name: string;
    tempo: number;
    punicao: string;
};

export interface IEquipeModel {
    id: string;
    name: string;
    lider: string;
    posicao: number;
    tempo: number;
};

export interface IResultadoModel {
    id: string;
    equipeNome: string;
    equipeLider: string;
    penalidadeSeconds: number;
    timeMiliseconds?: number;
}

export const calcDiff = (start: Date, end: Date): number => {
    const s = start as any;
    const d = end as any;
    return (d - s) as number;
}

export const maskTime = (diff: number, hideMiliseconds = false) => {
    var diffDate = new Date(diff);

    let segundos = diffDate.getSeconds();
    let minutos = diffDate.getMinutes();
    let miliseconds = diffDate.getMilliseconds();
    let tm = '';
    let ts = '';
    let ms = '';

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

    if (miliseconds < 10) {
        ms = `00${miliseconds}`;
    } else if (miliseconds < 100) {
        ms = `0${miliseconds}`;
    } else {
        ms = `${miliseconds}`;
    }

    if (hideMiliseconds) {
        return `${tm}:${ts}`;
    }else{
        return `${tm}:${ts}:${ms}`;
    }

};