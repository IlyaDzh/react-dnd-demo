import { makeAutoObservable } from 'mobx';

import { IArticle } from '../interfaces/IArticle';

export class ArticlesController {
    articles: IArticle[];

    currentCategory: string | null = null;
    currentMonth: string | null = null;

    constructor() {
        this.articles = [
            {
                id: '1',
                category: 'jackets',
                price: 2500,
                cost: 600,
                color: 'red',
                sizes: ['m'],
                months: ['march', 'april', 'may'],
            },
            { id: '2', category: 'jackets', price: 3100, cost: 1200, color: 'blue', sizes: ['xl'], months: ['march'] },
            {
                id: '3',
                category: 'jackets',
                price: 1800,
                cost: 400,
                color: 'gray',
                sizes: ['xl'],
                months: ['march', 'may'],
            },
            {
                id: '4',
                category: 't-shirts',
                price: 1300,
                cost: 750,
                color: 'gray',
                sizes: ['s'],
                months: ['march', 'april'],
            },
            {
                id: '5',
                category: 't-shirts',
                price: 3500,
                cost: 2360,
                color: 'green',
                sizes: ['l'],
                months: ['march', 'april'],
            },
            {
                id: '6',
                category: 't-shirts',
                price: 4000,
                cost: 2000,
                color: 'white',
                sizes: ['s'],
                months: ['march', 'april', 'may'],
            },
        ];

        makeAutoObservable(this);
    }

    get filteredArticles() {
        let articles = [...this.articles];

        if (this.currentCategory) {
            articles = articles.filter(article => article.category === this.currentCategory);
        }

        if (this.currentMonth) {
            articles = articles.filter(article => article.months.includes(this.currentMonth!)); /// wtf? почему тс считает что this.currentMonth может быть null в проверке??
        }

        return articles;
    }

    addArticle = (article: IArticle) => {
        this.articles.push(article);
    };

    setCurrentCategory = (category: string) => {
        this.currentCategory = category;
    };

    setCurrentMonth = (month: string) => {
        this.currentMonth = month;
    };
}
