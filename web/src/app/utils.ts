import axios from 'axios';

export const LS = {
    PROVA: 'prova',
    PROVAS: 'provas',
    EQUIPE: 'equipe',
    EQUIPES: 'equipes',
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
