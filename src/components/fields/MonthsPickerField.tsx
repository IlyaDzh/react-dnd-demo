import { Checkbox, CheckboxGroup, SimpleGrid } from '@chakra-ui/react';

import { MONTHS } from '../../utils/constants';

interface Props {
    value: string[];
    onChange: (value: string[]) => void;
}

export const MonthsPickerField: React.FC<Props> = ({ value, onChange }) => {
    const handleChange = (value: string[]) => {
        onChange(value);
    };

    return (
        <CheckboxGroup colorScheme='blue' value={value} onChange={handleChange}>
            <SimpleGrid spacing={[1, 5]} columns={3}>
                {MONTHS.map(month => (
                    <Checkbox key={month.key} value={month.key}>
                        {month.shortName}
                    </Checkbox>
                ))}
            </SimpleGrid>
        </CheckboxGroup>
    );
};
