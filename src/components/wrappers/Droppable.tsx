import { useDroppable } from '@dnd-kit/core';

interface Props extends React.PropsWithChildren {
    id: string;
}

export const Droppable: React.FC<Props> = ({ id, children }) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    return <div ref={setNodeRef}>{children}</div>;
};
