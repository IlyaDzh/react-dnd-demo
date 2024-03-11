import { useDroppable } from '@dnd-kit/core';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { IArticle } from '../interfaces/IArticle';

interface Props {
    id: string;
    data: IArticle | null;
    category: string;
    isDisabled: boolean;
}

export const DropZone: React.FC<Props> = ({ id, data, category, isDisabled }) => {
    const { setNodeRef } = useDroppable({
        id,
        data: {
            category,
        },
    });

    return (
        <Box
            ref={setNodeRef}
            height={140}
            border='1px dashed black'
            display='flex'
            alignItems='center'
            justifyContent='center'
            opacity={isDisabled ? 0.2 : 1}
        >
            {data ? (
                <Stack spacing={1} alignItems='center'>
                    <Heading size='sm'>№{data.id}</Heading>
                    <Text fontSize={10}>Категория: {data.category}</Text>
                    <Text fontSize={10}>Цвет: {data.color}</Text>
                    <Text fontSize={10}>Размер: {data.size}</Text>
                    <Text fontSize={10}>Себестоимость: {data.cost} руб.</Text>
                    <Text fontSize={10}>РЦ: {data.price} руб.</Text>
                </Stack>
            ) : (
                <AddIcon />
            )}
        </Box>
    );
};
