import Actor from './actor';

/**
 * описание основного игрока
 * @class
 */
export default class Player extends Actor {

    /**
     * @param x координата
     * @param y координата
     * @param hp hit points
     * @param icon изображение объекта на карте
     */
    constructor(x, y, hp, icon) {
        super(x, y, hp, icon);

        // инвентарь артефактов
        this._items = [];
    }

    /**
     * добавить артефакт в инвентарь
     * @param item
     */
    add_artifact(item){
        this._items.push([item, false]);
    }

    /**
     * переключить использование артефакта
     * @param ind
     * @return {boolean}
     */
    switch_artifact(ind) {
        // если такой артефакт есть в инвентаре
        if (ind < this._items.length) {
            let [item, is_active] = this._items[ind];

            // выключаем, если он уже используется
            if (is_active) {
                item.unapply(this);
                this._items[ind][1] = false;
                return false;
            }

            // включаем, если он не используется
            else {
                item.apply(this);
                this._items[ind][1] = true;
                return true;
            }
        }
    }

}
