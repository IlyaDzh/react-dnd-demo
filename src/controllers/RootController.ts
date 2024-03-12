import { makeAutoObservable } from 'mobx';

import { ArticlesController } from './ArticlesController';
import { CreateArticleController } from './CreateArticleController';
import { MonthInfoController } from './MonthInfoController';

export class RootController {
    articles: ArticlesController;
    createArticle: CreateArticleController;
    monthInfo: MonthInfoController;

    constructor() {
        this.articles = new ArticlesController();
        this.monthInfo = new MonthInfoController();
        this.createArticle = new CreateArticleController(this);

        makeAutoObservable(this);
    }
}

export const controller = new RootController();
