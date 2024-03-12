import {
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

interface Props {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

export const PriceField: React.FC<Props> = ({ label, value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(+event.target.value);
    };

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <NumberInput min={0}>
                <NumberInputField value={value} onChange={handleChange} />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    );
};
