import { Box, Select, SimpleGrid } from '@chakra-ui/react';

import { ArticleItem } from './ArticleItem';
import { IArticle } from '../interfaces/IArticle';
import { CATEGORIES, MONTHS } from '../utils/constants';

interface Props {
    items: IArticle[];
}

export const ArticlesGrid: React.FC<Props> = ({ items }) => {
    return (
        <Box display='grid' gap={6}>
            <Box display='flex' gap={4}>
                <Select placeholder='Выберите категорию'>
                    {CATEGORIES.map(category => (
                        <option value={category.key}>{category.name}</option>
                    ))}
                </Select>
                <Select placeholder='Выберите месяц'>
                    {MONTHS.map(month => (
                        <option value={month.key}>{month.name}</option>
                    ))}
                </Select>
            </Box>
            <SimpleGrid columns={4} gap={3}>
                {items.map(card => (
                    <ArticleItem key={card.id} data={card} />
                ))}
            </SimpleGrid>
        </Box>
    );
};
