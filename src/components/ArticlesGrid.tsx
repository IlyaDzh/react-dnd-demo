import {  SimpleGrid } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ArticleItem } from './ArticleItem';

interface Props {
    id: string;
    items: string[];
}

export const ArticlesGrid: React.FC<Props> = ({ id, items }) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
            <SimpleGrid ref={setNodeRef} columns={3} gap={2}>
                {items.map(id => (
                    <ArticleItem key={id} id={id} />
                ))}
            </SimpleGrid>
        </SortableContext>
    );
};
