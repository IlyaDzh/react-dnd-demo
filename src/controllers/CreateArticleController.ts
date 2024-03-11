import { makeAutoObservable } from 'mobx';

import { RootController } from './RootController';

export class CreateArticleController {
    root: RootController;

    isOpenedCreateModal = false;

    constructor(root: RootController) {
        this.root = root;

        makeAutoObservable(this);
    }

    openCreateArticleModal = (): void => {
        this.isOpenedCreateModal = true;
    };

    closeCreateArticleModal = (): void => {
        this.isOpenedCreateModal = false;
    };
}
