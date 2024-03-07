import { Box, BoxProps } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';

interface Props extends React.PropsWithChildren, BoxProps {
    id: string;
}

export const Draggable: React.FC<Props> = ({ id, children, ...props }) => {
    const { attributes, listeners, setNodeRef } = useSortable({
        id,
    });

    return (
        <Box ref={setNodeRef} {...props}>
            <button {...listeners} {...attributes}>
                Drag handle
            </button>
            {children}
        </Box>
    );
};
