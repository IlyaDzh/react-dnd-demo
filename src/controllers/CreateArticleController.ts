import { makeAutoObservable } from 'mobx';

import { RootController } from './RootController';

export interface ICreateArticleForm {
    category: string;
    color: string;
    sizes: string[];
    months: string[];
    cost: number;
    price: number;
    comment: string;
}

const INITIAL_CREATE_ARTICLE_FORM: ICreateArticleForm = {
    category: '',
    color: '',
    sizes: [],
    months: [],
    cost: 0,
    price: 0,
    comment: '',
};

export class CreateArticleController {
    root: RootController;

    createArticleForm = INITIAL_CREATE_ARTICLE_FORM;

    isOpenedCreateModal = false;

    dropZoneId: string | null = null;

    constructor(root: RootController) {
        this.root = root;

        makeAutoObservable(this);
    }

    setFormValue = <K extends keyof ICreateArticleForm>(key: K, value: ICreateArticleForm[K]) => {
        this.createArticleForm[key] = value;
    };

    openCreateArticleModal = (dropZoneId: string) => {
        this.isOpenedCreateModal = true;

        this.dropZoneId = dropZoneId;
    };

    closeCreateArticleModal = () => {
        this.isOpenedCreateModal = false;

        this.resetForm();
    };

    submitForm = () => {
        console.log(this.createArticleForm);

        const newArticle = {
            id: (Math.random() * 100000).toString(),
            category: this.createArticleForm.category,
            color: this.createArticleForm.color,
            cost: this.createArticleForm.cost,
            months: this.createArticleForm.months,
            price: this.createArticleForm.price,
            sizes: this.createArticleForm.sizes,
            comment: this.createArticleForm.comment,
        };

        this.root.articles.addArticle(newArticle);

        if (this.dropZoneId) {
            this.root.monthInfo.setArticleInDroppableZone(newArticle, this.dropZoneId);
        }

        this.closeCreateArticleModal();
    };

    private resetForm = () => {
        this.createArticleForm = INITIAL_CREATE_ARTICLE_FORM;
        this.dropZoneId = null;
    };
}
