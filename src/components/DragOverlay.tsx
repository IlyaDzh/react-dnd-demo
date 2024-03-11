import { observer } from 'mobx-react-lite';
import { DragOverlay as BaseDragOverlay } from '@dnd-kit/core';

import { controller } from '../controllers/RootController';
import { DraggableArticle } from './DraggableArticle';

export const DragOverlay: React.FC = observer(() => {
    const { activeArticle } = controller.monthInfo;

    return (
        <BaseDragOverlay dropAnimation={null}>
            {activeArticle ? <DraggableArticle data={activeArticle} /> : null}
        </BaseDragOverlay>
    );
});
