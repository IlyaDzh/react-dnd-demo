import { CollisionDetection, pointerWithin, rectIntersection } from '@dnd-kit/core';

export const dndCollisionAlgorithm: CollisionDetection = args => {
    const pointerCollisions = pointerWithin(args);

    if (pointerCollisions.length > 0) {
        return pointerCollisions;
    }

    return rectIntersection(args);
};
