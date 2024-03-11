import { makeAutoObservable } from 'mobx';

import { ArticlesController } from './ArticlesController';
import { CreateArticleController } from './CreateArticleController';

export class RootController {
    articles: ArticlesController;
    createArticle: CreateArticleController;

    constructor() {
        this.articles = new ArticlesController(this);
        this.createArticle = new CreateArticleController(this);

        makeAutoObservable(this);
    }
}

export const controller = new RootController();
