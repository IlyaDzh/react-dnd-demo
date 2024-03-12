import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { controller } from '../../controllers/RootController';
import { SizeField } from '../fields/SizeField';
import { CategoryField } from '../fields/CategoryField';
import { PriceField } from '../fields/PriceField';
import { ColorField } from '../fields/ColorField';
import { MonthsPickerField } from '../fields/MonthsPickerField';
import { UploadFileField } from '../fields/UploadFileField';

export const ModalCreateArticle: React.FC = observer(() => {
    const { closeCreateArticleModal, isOpenedCreateModal, createArticleForm, setFormValue, submitForm } =
        controller.createArticle;

    return (
        <Modal isOpen={isOpenedCreateModal} onClose={closeCreateArticleModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Создание артикула</ModalHeader>
                <ModalCloseButton />
                <ModalBody display='grid' gap={5}>
                    <CategoryField
                        value={createArticleForm.category}
                        onChange={value => setFormValue('category', value)}
                    />

                    <ColorField onChange={value => setFormValue('color', value)} />

                    <SizeField value={createArticleForm.sizes} onChange={value => setFormValue('sizes', value)} />

                    <MonthsPickerField
                        value={createArticleForm.months}
                        onChange={value => setFormValue('months', value)}
                    />

                    <PriceField
                        label='Себестоимость'
                        value={createArticleForm.cost}
                        onChange={value => setFormValue('cost', value)}
                    />

                    <PriceField
                        label='Рыночная цена'
                        value={createArticleForm.price}
                        onChange={value => setFormValue('price', value)}
                    />

                    <UploadFileField />

                    <Textarea
                        value={createArticleForm.comment}
                        onChange={event => setFormValue('comment', event.target.value)}
                        placeholder='Комментарий'
                    />
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={closeCreateArticleModal}>
                        Закрыть
                    </Button>
                    <Button colorScheme='blue' onClick={submitForm}>
                        Создать
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
