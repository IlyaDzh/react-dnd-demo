export interface IArticle {
    id: string;
    category: string;
    color: string;
    sizes: string[];
    price: number;
    cost: number;
    months: string[];
    comment?: string;
}
