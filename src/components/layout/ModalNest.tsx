import { Box } from '@chakra-ui/react';

import { ModalCreateArticle } from '../modals/ModalCreateArticle';

export const ModalNest: React.FC = () => {
    return (
        <Box>
            <ModalCreateArticle />
        </Box>
    );
};
