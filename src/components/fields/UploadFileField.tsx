import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export const UploadFileField: React.FC = () => {
    return (
        <FormControl>
            <FormLabel>Файл</FormLabel>
            <Input padding='1px' border='none' height='auto' type='file' />
        </FormControl>
    );
};
