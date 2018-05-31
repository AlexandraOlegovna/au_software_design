import {COLS, ROWS, WALL, SPACE } from '../const';

export default class Map {

    constructor(){
        this._map = [];
        this.getMap = function() { return this._map; };
    }

    init_map(){
        for (let y = 0; y < ROWS; y++) {
            let row = [];
            for (let x = 0; x < COLS; x++) {
                let is_wall= Math.random() > 0.8;
                if (is_wall)
                    row.push(WALL);
                else
                    row.push(SPACE);
            }
            this._map.push(row);
        }
    }

    get_symbol(x, y){
        return this._map[x][y];
    }


    can_go(actor, dir) {
        return actor.x + dir.x >= 0 &&
            actor.x + dir.x <= COLS - 1 &&
            actor.y + dir.y >= 0 &&
            actor.y + dir.y <= ROWS - 1 &&
            this._map[actor.y + dir.y][actor.x + dir.x] === SPACE;
    }
}