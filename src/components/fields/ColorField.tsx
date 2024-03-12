import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface Props {
    onChange: (value: string) => void;
}

export const ColorField: React.FC<Props> = ({ onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <FormControl>
            <FormLabel>Цвет</FormLabel>
            <Input border='none' padding={0} type='color' width={20} onChange={handleChange} />
        </FormControl>
    );
};
