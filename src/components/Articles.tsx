import { Box, Select, SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { DraggableArticle } from './DraggableArticle';
import { CATEGORIES, MONTHS } from '../utils/constants';
import { controller } from '../controllers/RootController';

export const Articles: React.FC = observer(() => {
    const { filteredArticles, setCurrentCategory, setCurrentMonth } = controller.articles;

    const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentCategory(event.target.value);
    };

    const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentMonth(event.target.value);
    };

    return (
        <Box as='aside'>
            <Box display='grid' gap={6}>
                <Box display='flex' gap={4}>
                    <Select placeholder='Выберите категорию' onChange={handleChangeCategory}>
                        {Object.entries(CATEGORIES).map(([key, name]) => (
                            <option key={key} value={key}>
                                {name}
                            </option>
                        ))}
                    </Select>
                    <Select placeholder='Выберите месяц' onChange={handleChangeMonth}>
                        {MONTHS.map(month => (
                            <option key={month.key} value={month.key}>
                                {month.name}
                            </option>
                        ))}
                    </Select>
                </Box>
                <SimpleGrid columns={4} gap={3}>
                    {filteredArticles.map(card => (
                        <DraggableArticle key={card.id} data={card} />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
});
