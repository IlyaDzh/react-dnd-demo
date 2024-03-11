import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { controller } from '../../controllers/RootController';

export const ModalCreateArticle: React.FC = observer(() => {
    const { closeCreateArticleModal, isOpenedCreateModal } = controller.createArticle;

    return (
        <Modal isOpen={isOpenedCreateModal} onClose={closeCreateArticleModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>123</ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={closeCreateArticleModal}>
                        Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
