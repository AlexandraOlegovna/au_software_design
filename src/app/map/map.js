import {COLS, ROWS, WALL, SPACE, SPACE_RATIO } from '../const';

/**
 * описание карты
 * @class
 */
export default class Map {

    constructor(){
        // карта
        this._map = [];
        this.getMap = function() { return this._map; };
        this.setMap = function(map) { this._map = map; };
    }

    /**
     * сгенерировать карту
     */
    generate_map(){
        for (let y = 0; y < ROWS; y++) {
            let row = [];
            for (let x = 0; x < COLS; x++) {
                let is_wall= Math.random() > SPACE_RATIO;
                if (is_wall)
                    row.push(WALL);
                else
                    row.push(SPACE);
            }
            this._map.push(row);
        }
    }

    /**
     * символ на карте
     * @param x
     * @param y
     * @return {char}
     */
    get_symbol(x, y){
        return this._map[x][y];
    }


    /**
     * можно ли переместиться на координаты position
     * @param position
     * @return {boolean}
     */
    can_move(position) {
        return position.x >= 0 &&
            position.x <= COLS - 1 &&
            position.y >= 0 &&
            position.y <= ROWS - 1 &&
            this._map[position.y][position.x] === SPACE;
    }
}