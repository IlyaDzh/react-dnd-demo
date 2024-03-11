import { observer } from 'mobx-react-lite';
import { Box, Heading } from '@chakra-ui/react';

import { Category } from '../components/Category';
import { CATEGORIES } from '../utils/constants';
import { controller } from '../controllers/RootController';

export const MonthInfo: React.FC = observer(() => {
    const { droppableZones, activeArticle } = controller.monthInfo;

    return (
        <Box as='article' display='grid' gap={6}>
            <Heading as='h1' size='xl'>
                Март
            </Heading>

            {Object.entries(droppableZones).map(([category, items]) => (
                <Category
                    key={category}
                    category={category}
                    title={CATEGORIES[category as keyof typeof CATEGORIES]}
                    items={items}
                    isDisabled={activeArticle ? activeArticle.category !== category : false}
                />
            ))}
        </Box>
    );
});
