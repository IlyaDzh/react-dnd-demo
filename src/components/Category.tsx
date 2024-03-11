import { Box, Heading, IconButton, SimpleGrid, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { SortableContext } from '@dnd-kit/sortable';

import { IArticle } from '../interfaces/IArticle';
import { DroppableZone } from './DroppableZone';

interface Props {
    category: string;
    title: string;
    items: {
        id: string;
        card: IArticle | null;
    }[];
    isDisabled: boolean;
    onAddDroppableZone: (category: string) => void;
    onRemoveDroppableZone: (category: string) => void;
}

export const Category: React.FC<Props> = ({ category, title, items, isDisabled, onAddDroppableZone, onRemoveDroppableZone }) => {
    const handleAddDroppableZone = () => {
        onAddDroppableZone(category);
    };

    const handleRemoveDroppableZone = () => {
        onRemoveDroppableZone(category);
    };

    return (
        <Box as='section' display='grid' gap={3}>
            <Box display='flex' alignItems='center' gap={2}>
                <Heading as='h2' size='md'>
                    {title}
                </Heading>
                <IconButton aria-label='Add card' onClick={handleRemoveDroppableZone}>
                    <MinusIcon />
                </IconButton>
                <Text>{items.length}</Text>
                <IconButton aria-label='Remove card' onClick={handleAddDroppableZone}>
                    <AddIcon />
                </IconButton>
            </Box>
            <SortableContext items={items.map(item => item.id)}>
                <SimpleGrid columns={4} gap={3}>
                    {items.map(item => (
                        <DroppableZone
                            key={item.id}
                            id={item.id}
                            category={category}
                            data={item.card}
                            isDisabled={isDisabled}
                        />
                    ))}
                </SimpleGrid>
            </SortableContext>
        </Box>
    );
};
