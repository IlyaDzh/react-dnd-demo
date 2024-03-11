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

import { ArticlesGrid } from '../components/ArticlesGrid';
import { Category } from '../components/Category';
import { ArticleItem } from '../components/ArticleItem';
import { IArticle } from '../interfaces/IArticle';
import { dndCollisionAlgorithm } from '../utils/dndCollisionAlgorithm';

const commonCards: IArticle[] = [
    { id: '1', category: 'jackets', price: 2500, cost: 600, color: 'red', size: 'm' },
    { id: '2', category: 'jackets', price: 3100, cost: 1200, color: 'blue', size: 'xl' },
    { id: '3', category: 'jackets', price: 1800, cost: 400, color: 'gray', size: 'xl' },
    { id: '4', category: 't-shirts', price: 1300, cost: 750, color: 'gray', size: 's' },
    { id: '5', category: 't-shirts', price: 3500, cost: 2360, color: 'green', size: 'l' },
    { id: '6', category: 't-shirts', price: 4000, cost: 2000, color: 'white', size: 's' },
];

const initialDropZones = (category: string) =>
    Array.from({ length: 8 }, (_, index) => ({
        id: `${category}-drop-zone-${index + 1}`,
        card: null,
    }));

export const MainPage: React.FC = () => {
    const [dropZones, setDropZones] = useState<{ [key: string]: { id: string; card: IArticle | null }[] }>({
        jackets: initialDropZones('jackets'),
        't-shirts': initialDropZones('t-shirts'),
    });

    const [activeArticle, setActiveArticle] = useState<IArticle | null>(null);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        setActiveArticle(active.data.current as IArticle);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        const overCategory = over && (over.data.current as { category: string }).category;
        const activeCategory = (active.data.current as IArticle).category;

        if (over && active.id !== over.id && activeCategory === overCategory) {
            const newDropZones = { ...dropZones };

            newDropZones[activeCategory] = newDropZones[activeCategory].map(zone => {
                if (zone.id === over.id) {
                    return { ...zone, card: active.data.current as IArticle };
                }

                return zone;
            });

            setDropZones(newDropZones);
        }

        setActiveArticle(null);
    };

    const onAddDropZone = (category: string) => {
        setDropZones(prev => ({
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

    const onRemoveDropZone = (category: string) => {
        setDropZones(prev => ({
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
                    <Category
                        category='jackets'
                        title='Пуховики'
                        items={dropZones['jackets']}
                        onAddDropZone={onAddDropZone}
                        onRemoveDropZone={onRemoveDropZone}
                        isDisabled={activeArticle ? activeArticle.category !== 'jackets' : false}
                    />
                    <Category
                        category='t-shirts'
                        title='Футболки'
                        items={dropZones['t-shirts']}
                        onAddDropZone={onAddDropZone}
                        onRemoveDropZone={onRemoveDropZone}
                        isDisabled={activeArticle ? activeArticle.category !== 't-shirts' : false}
                    />
                </Box>

                <Box as='aside'>
                    <ArticlesGrid items={commonCards} />
                </Box>

                <DragOverlay>{activeArticle ? <ArticleItem data={activeArticle} /> : null}</DragOverlay>
            </DndContext>
        </SimpleGrid>
    );
};
