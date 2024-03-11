import { SimpleGrid } from '@chakra-ui/react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { observer } from 'mobx-react-lite';

import { Articles } from '../components/Articles';
import { dndCollisionAlgorithm } from '../utils/dndCollisionAlgorithm';
import { controller } from '../controllers/RootController';
import { MonthInfo } from '../components/MonthInfo';
import { DragOverlay } from '../components/DragOverlay';

export const MainPage: React.FC = observer(() => {
    const { handleDragEnd, handleDragStart } = controller.monthInfo;

    const sensors = useSensors(useSensor(PointerSensor));

    return (
        <SimpleGrid p={4} columns={2} spacing={10}>
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                collisionDetection={dndCollisionAlgorithm}
            >
                <MonthInfo />

                <Articles />

                <DragOverlay />
            </DndContext>
        </SimpleGrid>
    );
});
