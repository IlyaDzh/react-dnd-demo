import { Box } from '@chakra-ui/react';

import { Draggable } from './wrappers/Draggable';

interface Props {
    id: string;
}

export const ArticleItem: React.FC<Props> = ({ id }) => {
    return (
        <Draggable id={id} bg='gray.200' p={4} textAlign='center'>
            <Box>Content: {id}</Box>
        </Draggable>
    );
};
