import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';

interface Props {
    value: string[];
    onChange: (value: string[]) => void;
}

export const SizeField: React.FC<Props> = ({ value, onChange }) => {
    const handleChange = (value: string[]) => {
        onChange(value);
    };

    return (
        <CheckboxGroup colorScheme='blue' value={value} onChange={handleChange}>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
                <Checkbox value='s'>S</Checkbox>
                <Checkbox value='m'>M</Checkbox>
                <Checkbox value='l'>L</Checkbox>
                <Checkbox value='xl'>XL</Checkbox>
            </Stack>
        </CheckboxGroup>
    );
};
