import { FormControl, FormLabel, Select } from '@chakra-ui/react';

import { CATEGORIES } from '../../utils/constants';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const CategoryField: React.FC<Props> = ({ value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <FormControl>
            <FormLabel>Категория</FormLabel>
            <Select placeholder='Выберите категорию' onChange={handleChange} value={value}>
                {Object.entries(CATEGORIES).map(([key, name]) => (
                    <option key={key} value={key}>
                        {name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};
