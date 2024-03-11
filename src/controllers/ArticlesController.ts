import { makeAutoObservable } from 'mobx';

import { RootController } from './RootController';

export class ArticlesController {
    root: RootController;

    constructor(root: RootController) {
        this.root = root;

        makeAutoObservable(this);
    }
}
