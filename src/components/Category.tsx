import { Box, Heading, IconButton, SimpleGrid, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

import { IArticle } from '../interfaces/IArticle';
import { DropZone } from './DropZone';

interface Props {
    category: string;
    title: string;
    items: {
        id: string;
        card: IArticle | null;
    }[];
    isDisabled: boolean;
    onAddDropZone: (category: string) => void;
    onRemoveDropZone: (category: string) => void;
}

export const Category: React.FC<Props> = ({ category, title, items, isDisabled, onAddDropZone, onRemoveDropZone }) => {
    const handleAddDropZone = () => {
        onAddDropZone(category);
    };

    const handleRemoveDropZone = () => {
        onRemoveDropZone(category);
    };

    return (
        <Box as='section' display='grid' gap={3}>
            <Box display='flex' alignItems='center' gap={2}>
                <Heading as='h2' size='md'>
                    {title}
                </Heading>
                <IconButton aria-label='Add card' onClick={handleRemoveDropZone}>
                    <MinusIcon />
                </IconButton>
                <Text>{items.length}</Text>
                <IconButton aria-label='Remove card' onClick={handleAddDropZone}>
                    <AddIcon />
                </IconButton>
            </Box>
            <SimpleGrid columns={4} gap={3}>
                {items.map(item => (
                    <DropZone key={item.id} id={item.id} category={category} data={item.card} isDisabled={isDisabled} />
                ))}
            </SimpleGrid>
        </Box>
    );
};
