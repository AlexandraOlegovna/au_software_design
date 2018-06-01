import AbstractActor from "./abstract_actor";

/**
 * описание противника
 * @class
 */
export default class Enemy extends AbstractActor{

    /**
     *
     * @param x координата
     * @param y координата
     * @param hp hit points
     * @param icon изображение объекта на карте
     */
    constructor(x, y, hp, icon) {
        super(x, y, hp, icon);
    }
}
