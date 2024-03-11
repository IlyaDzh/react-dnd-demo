import { Box, Card, CardBody, CardHeader, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react';

import { IArticle } from '../interfaces/IArticle';

import placeholderImg from '../images/placeholder.jpg';
import { useDraggable } from '@dnd-kit/core';
import { DragHandleIcon } from '@chakra-ui/icons';

interface Props {
    data: IArticle;
}

export const ArticleItem: React.FC<Props> = ({ data }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: data.id,
        data,
    });

    return (
        <Box ref={setNodeRef} opacity={isDragging ? 0.5 : 1} position='relative'>
            <IconButton
                aria-label='Drag card'
                position='absolute'
                top={2}
                left={2}
                zIndex={1}
                {...listeners}
                {...attributes}
            >
                <DragHandleIcon />
            </IconButton>
            <Card maxW='sm' variant='outline' overflow='hidden'>
                <CardHeader padding={0}>
                    <Image src={placeholderImg} alt='Green double couch with wooden legs' />
                </CardHeader>
                <CardBody padding={4}>
                    <Stack spacing={1}>
                        <Heading size='sm'>№{data.id}</Heading>
                        <Text fontSize={12}>Категория: {data.category}</Text>
                        <Text fontSize={12}>Цвет: {data.color}</Text>
                        <Text fontSize={12}>Размер: {data.size}</Text>
                        <Text fontSize={12}>Себестоимость: {data.cost} руб.</Text>
                        <Text fontSize={12}>РЦ: {data.price} руб.</Text>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};
