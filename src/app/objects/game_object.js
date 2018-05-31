import { COLS, ROWS, WALL} from '../const';

/**
 * основной игровой объект
 * @class
 */
export default class GameObject {

    /**
     *
     * @param x координата
     * @param y координата
     * @param icon изображение объекта на карте
     */
    constructor(x, y, icon) {
        this.x = x;
        this.y = y;
        this.icon = icon;
    }

    /**
     * находит для объекта свободное место на карте
     * @param map карта
     * @param taken_places занятые места
     */
    find_free_place(map, taken_places) {

        /**
         * случайное число от 0 до max
         * @param max
         * @return {number}
         */
        function randomInt(max) {
            return Math.floor(Math.random() * max);
        }

        do {
            this.y = randomInt(ROWS);
            this.x = randomInt(COLS);
        } while (map.get_symbol(this.y, this.x) === WALL
        || taken_places[[this.y, this.x]] != null);
    }
}
