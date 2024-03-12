import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useSortable } from '@dnd-kit/sortable';
import { observer } from 'mobx-react-lite';

import { IArticle } from '../interfaces/IArticle';
import { controller } from '../controllers/RootController';

interface Props {
    id: string;
    data: IArticle | null;
    category: string;
    isDisabled: boolean;
}

export const DroppableZone: React.FC<Props> = observer(({ id, data, category, isDisabled }) => {
    const { openCreateArticleModal } = controller.createArticle;

    const { setNodeRef, attributes, listeners } = useSortable({
        id,
        data: {
            category,
            ...data,
        },
        disabled: !data,
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
            {...attributes}
            {...listeners}
            onClick={() => openCreateArticleModal(id)}
        >
            {data ? (
                <Stack spacing={1} alignItems='center'>
                    <Heading size='sm'>№{data.id}</Heading>
                    <Text fontSize={10}>Категория: {data.category}</Text>
                    <Text fontSize={10}>Цвет: {data.color}</Text>
                    <Text fontSize={10}>Размер: {data.sizes}</Text>
                    <Text fontSize={10}>Себестоимость: {data.cost} руб.</Text>
                    <Text fontSize={10}>РЦ: {data.price} руб.</Text>
                </Stack>
            ) : (
                <AddIcon />
            )}
        </Box>
    );
});
