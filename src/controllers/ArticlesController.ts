import { makeAutoObservable } from 'mobx';

import { RootController } from './RootController';
import { IArticle } from '../interfaces/IArticle';

export class ArticlesController {
    root: RootController;

    articles: IArticle[];

    currentCategory: string | null = null;
    currentMonth: string | null = null;

    constructor(root: RootController) {
        this.root = root;

        this.articles = [
            { id: '1', category: 'jackets', price: 2500, cost: 600, color: 'red', size: 'm' },
            { id: '2', category: 'jackets', price: 3100, cost: 1200, color: 'blue', size: 'xl' },
            { id: '3', category: 'jackets', price: 1800, cost: 400, color: 'gray', size: 'xl' },
            { id: '4', category: 't-shirts', price: 1300, cost: 750, color: 'gray', size: 's' },
            { id: '5', category: 't-shirts', price: 3500, cost: 2360, color: 'green', size: 'l' },
            { id: '6', category: 't-shirts', price: 4000, cost: 2000, color: 'white', size: 's' },
        ];

        makeAutoObservable(this);
    }

    get filteredArticles() {
        if (!this.currentCategory) return this.articles;
        
        return this.articles.filter(article => article.category === this.currentCategory);
    }

    setCurrentCategory = (category: string) => {
        this.currentCategory = category;
    };

    setCurrentMonth = (month: string) => {
        this.currentMonth = month;
    };
}
