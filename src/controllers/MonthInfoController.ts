import { makeAutoObservable } from 'mobx';

import { IMonthInfo } from '../interfaces/IMonthInfo';
import { IArticle } from '../interfaces/IArticle';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

const initialDroppableZones = (category: string) =>
    Array.from({ length: 8 }, (_, index) => ({
        id: `${category}-drop-zone-${index + 1}`,
        card: null,
    }));

export class MonthInfoController {
    droppableZones: IMonthInfo;

    activeArticle: IArticle | null = null;

    constructor() {
        this.droppableZones = {
            jackets: initialDroppableZones('jackets'),
            't-shirts': initialDroppableZones('t-shirts'),
        };

        makeAutoObservable(this);
    }

    handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        this.activeArticle = active.data.current as IArticle;
    };

    handleDragEnd = (event: DragEndEvent) => {
        this.activeArticle = null;

        const { active, over } = event;

        const overCategory = over && (over.data.current as IArticle).category;
        const activeCategory = (active.data.current as IArticle).category;

        if (over && active.id !== over.id && activeCategory === overCategory) {
            const overIndex = over.data.current?.sortable;
            const activeIndex = active.data.current?.sortable;

            if (overIndex && activeIndex) {
                const oldItem = this.droppableZones[activeCategory].find(zone => zone.id === active.id.toString());
                const newItem = this.droppableZones[activeCategory].find(zone => zone.id === over.id.toString());

                this.droppableZones[activeCategory] = this.droppableZones[activeCategory].map(zone => {
                    if (zone.id === over.id) {
                        return { ...zone, card: oldItem ? oldItem.card : null };
                    }

                    if (zone.id === active.id) {
                        return { ...zone, card: newItem ? newItem.card : null };
                    }

                    return zone;
                });
            } else {
                this.droppableZones[activeCategory] = this.droppableZones[activeCategory].map(zone => {
                    if (zone.id === over.id) {
                        return { ...zone, card: active.data.current as IArticle };
                    }

                    return zone;
                });
            }
        }
    };

    setArticleInDroppableZone = (article: IArticle, zoneId: string) => {
        this.droppableZones[article.category] = this.droppableZones[article.category].map(zone => {
            if (zone.id === zoneId) {
                return { ...zone, card: article };
            }

            return zone;
        });
    };

    onAddDroppableZone = (category: string) => {
        this.droppableZones[category].push({
            id: `${category}-drop-zone-${this.droppableZones[category].length + 1}`,
            card: null,
        });
    };

    onRemoveDroppableZone = (category: string) => {
        this.droppableZones[category].pop();
    };
}
