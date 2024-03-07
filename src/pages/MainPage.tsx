import { useState } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, SimpleGrid, Text } from '@chakra-ui/react';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
    DragOverlay,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { ArticlesGrid } from '../components/ArticlesGrid';
import { CardsGrid } from '../components/CardsGrid';
import { ArticleItem } from '../components/ArticleItem';

export const MainPage: React.FC = () => {
    const [items, setItems] = useState<{ [key: string]: string[] }>({
        root: ['1', '2', '3'],
        container1: ['4', '5', '6'],
        container2: ['7', '8', '9'],
    });
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const sensors = useSensors(useSensor(PointerSensor));

    function findContainer(itemId: UniqueIdentifier) {
        console.log('id', itemId);

        return Object.keys(items).find(key => items[key].includes(itemId.toString()));
    }

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const { id } = active;

        setActiveId(id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over!.id);

        if (!activeContainer || !overContainer || activeContainer !== overContainer) {
            return;
        }

        const activeIndex = items[activeContainer].indexOf(active.id.toString());
        const overIndex = items[overContainer].indexOf(over!.id.toString());

        if (activeIndex !== overIndex) {
            setItems(items => ({
                ...items,
                [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
            }));
        }

        setActiveId(null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        // Find the containers
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over!.id);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setItems(prev => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

            // Find the indexes for the items
            const activeIndex = activeItems.indexOf(active.id.toString());
            const overIndex = overItems.indexOf(over!.id.toString());

            let newIndex;
            if (over!.id in prev) {
                // We're at the root droppable of a container
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem = overIndex === overItems.length - 1;

                const modifier = isBelowLastItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: [...prev[activeContainer].filter(item => item !== active.id)],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length),
                ],
            };
        });
    };

    return (
        <SimpleGrid p={4} columns={2} spacing={10}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <Box as='article' display='grid' gap={6}>
                    <Heading as='h1' size='xl'>
                        Март
                    </Heading>
                    <Box as='section' display='grid' gap={3}>
                        <Box display='flex' alignItems='center' gap={2}>
                            <Heading as='h2' size='md'>
                                Куртки
                            </Heading>
                            <IconButton aria-label='Add card'>
                                <MinusIcon />
                            </IconButton>
                            <Text>12</Text>
                            <IconButton aria-label='Remove card'>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <CardsGrid id='container1' items={items.container1} />
                    </Box>
                    <Box as='section' display='grid' gap={3}>
                        <Box display='flex' alignItems='center' gap={2}>
                            <Heading as='h2' size='md'>
                                Шапки
                            </Heading>
                            <IconButton aria-label='Add card'>
                                <MinusIcon />
                            </IconButton>
                            <Text>12</Text>
                            <IconButton aria-label='Remove card'>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <CardsGrid id='container2' items={items.container2} />
                    </Box>
                </Box>

                <Box as='aside'>
                    <ArticlesGrid id='root' items={items.root} />
                </Box>

                <DragOverlay>{activeId ? <ArticleItem id={activeId} /> : null}</DragOverlay>
            </DndContext>
        </SimpleGrid>
    );
};
