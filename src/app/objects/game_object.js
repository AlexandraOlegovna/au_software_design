import { COLS, ROWS, WALL} from '../const';


export default class GameObject {

    constructor(x, y, icon) {
        this.x = x;
        this.y = y;
        this.icon = icon;
    }

    find_free_place(map, taken_places) {

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
