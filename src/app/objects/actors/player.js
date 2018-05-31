import Actor from './actor';

export default class Player extends Actor {

    constructor(x, y, hp, icon) {
        super(x, y, hp, icon);
        this._items = [];
    }

    add_artifact(item){
        this._items.push([item, false]);
    }

    use_artifact(ind) {
        if (ind < this._items.length) {
            let [item, is_active] = this._items[ind];
            if (is_active) {
                item.unapply(this);
                this._items[ind][1] = false;
                return false;
            }
            else {
                item.apply(this);
                this._items[ind][1] = true;
                return true;
            }
        }
    }

}
