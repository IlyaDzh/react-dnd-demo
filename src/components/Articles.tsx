import { Box, Select, SimpleGrid } from '@chakra-ui/react';

import { DraggableArticle } from './DraggableArticle';
import { IArticle } from '../interfaces/IArticle';
import { CATEGORIES, MONTHS } from '../utils/constants';

interface Props {
    items: IArticle[];
}

export const Articles: React.FC<Props> = ({ items }) => {
    return (
        <Box display='grid' gap={6}>
            <Box display='flex' gap={4}>
                <Select placeholder='Выберите категорию'>
                    {Object.entries(CATEGORIES).map(([key, name]) => (
                        <option key={key} value={key}>
                            {name}
                        </option>
                    ))}
                </Select>
                <Select placeholder='Выберите месяц'>
                    {MONTHS.map(month => (
                        <option key={month.key} value={month.key}>
                            {month.name}
                        </option>
                    ))}
                </Select>
            </Box>
            <SimpleGrid columns={4} gap={3}>
                {items.map(card => (
                    <DraggableArticle key={card.id} data={card} />
                ))}
            </SimpleGrid>
        </Box>
    );
};
