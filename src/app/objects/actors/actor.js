import GameObject from '../game_object';

/**
 * описание персонажа
 * @class
 */
export default class Actor extends GameObject{

    /**
     *
     * @param x координата
     * @param y координата
     * @param hp hit points
     * @param icon изображение объекта на карте
     */
    constructor(x, y, hp, icon) {
        super(x, y, icon);
        this.hp = hp;
        this.setHp = function(hp) { this.hp = hp; };
        this.getHp = function() { return this.hp; };
    }
}
