import { useState } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';

import { Articles } from '../components/Articles';
import { Category } from '../components/Category';
import { DraggableArticle } from '../components/DraggableArticle';
import { IArticle } from '../interfaces/IArticle';
import { dndCollisionAlgorithm } from '../utils/dndCollisionAlgorithm';
import { CATEGORIES } from '../utils/constants';

const commonCards: IArticle[] = [
    { id: '1', category: 'jackets', price: 2500, cost: 600, color: 'red', size: 'm' },
    { id: '2', category: 'jackets', price: 3100, cost: 1200, color: 'blue', size: 'xl' },
    { id: '3', category: 'jackets', price: 1800, cost: 400, color: 'gray', size: 'xl' },
    { id: '4', category: 't-shirts', price: 1300, cost: 750, color: 'gray', size: 's' },
    { id: '5', category: 't-shirts', price: 3500, cost: 2360, color: 'green', size: 'l' },
    { id: '6', category: 't-shirts', price: 4000, cost: 2000, color: 'white', size: 's' },
];

const initialDroppableZones = (category: string) =>
    Array.from({ length: 8 }, (_, index) => ({
        id: `${category}-drop-zone-${index + 1}`,
        card: null,
    }));

export const MainPage: React.FC = () => {
    const [DroppableZones, setDroppableZones] = useState<{ [key: string]: { id: string; card: IArticle | null }[] }>({
        jackets: initialDroppableZones('jackets'),
        't-shirts': initialDroppableZones('t-shirts'),
    });

    const [activeArticle, setActiveArticle] = useState<IArticle | null>(null);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        setActiveArticle(active.data.current as IArticle);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveArticle(null);

        const { active, over } = event;

        const overCategory = over && (over.data.current as { category: string }).category;
        const activeCategory = (active.data.current as IArticle).category;

        if (over && active.id !== over.id && activeCategory === overCategory) {
            const newDroppableZones = { ...DroppableZones };

            const overIndex = over.data.current?.sortable;
            const activeIndex = active.data.current?.sortable;

            if (overIndex && activeIndex) {
                const oldItem = newDroppableZones[activeCategory].find(zone => zone.id === active.id.toString());
                const newItem = newDroppableZones[activeCategory].find(zone => zone.id === over.id.toString());

                newDroppableZones[activeCategory] = newDroppableZones[activeCategory].map(zone => {
                    if (zone.id === over.id) {
                        return { ...zone, card: oldItem?.card as IArticle };
                    }

                    if (zone.id === active.id) {
                        return { ...zone, card: newItem?.card as IArticle };
                    }

                    return zone;
                });
            } else {
                newDroppableZones[activeCategory] = newDroppableZones[activeCategory].map(zone => {
                    if (zone.id === over.id) {
                        return { ...zone, card: active.data.current as IArticle };
                    }

                    return zone;
                });
            }

            setDroppableZones(newDroppableZones);
        }
    };

    const onAddDroppableZone = (category: string) => {
        setDroppableZones(prev => ({
            ...prev,
            [category]: [
                ...prev[category],
                {
                    id: `${category}-drop-zone-${prev[category].length + 1}`,
                    card: null,
                },
            ],
        }));
    };

    const onRemoveDroppableZone = (category: string) => {
        setDroppableZones(prev => ({
            ...prev,
            [category]: prev[category].slice(0, -1),
        }));
    };

    return (
        <SimpleGrid p={4} columns={2} spacing={10}>
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                collisionDetection={dndCollisionAlgorithm}
            >
                <Box as='article' display='grid' gap={6}>
                    <Heading as='h1' size='xl'>
                        Март
                    </Heading>

                    {Object.entries(DroppableZones).map(([category, items]) => (
                        <Category
                            key={category}
                            category={category}
                            title={CATEGORIES[category as keyof typeof CATEGORIES]}
                            items={items}
                            onAddDroppableZone={onAddDroppableZone}
                            onRemoveDroppableZone={onRemoveDroppableZone}
                            isDisabled={activeArticle ? activeArticle.category !== category : false}
                        />
                    ))}
                </Box>

                <Box as='aside'>
                    <Articles items={commonCards} />
                </Box>

                <DragOverlay dropAnimation={null}>
                    {activeArticle ? <DraggableArticle data={activeArticle} /> : null}
                </DragOverlay>
            </DndContext>
        </SimpleGrid>
    );
};
