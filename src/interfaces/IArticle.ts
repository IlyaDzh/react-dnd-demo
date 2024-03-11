export interface IArticle {
    id: string;
    category: string;
    color: string;
    size: 's' | 'm' | 'l' | 'xl';
    price: number;
    cost: number;
}
