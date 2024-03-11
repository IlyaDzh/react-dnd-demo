import { IArticle } from './IArticle';

export interface IMonthInfo {
    [key: string]: {
        id: string;
        card: IArticle | null;
    }[];
}
