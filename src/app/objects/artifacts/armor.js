import GameObject from '../game_object';

/**
 * артефакт для безграничной жизни
 * @class
 */
export default class Armor extends GameObject{

    /**
     *
     * @param x координата
     * @param y координата
     * @param icon изображение объекта на карте
     */
    constructor(x, y, icon) {
        super(x, y, icon);
        this._save_hp = null;
    }

    /**
     * применить защиту
     * @param player
     */
    apply(player) {
        this._save_hp = player.getHp();
        player.setHp(Infinity);
    }

    /**
     * снять защиту
     * @param player
     */
    unapply(player) {
        player.setHp(this._save_hp);
    }
}