/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./app/const.js
// основные константы в игре

const FONT = 40;
const ROWS = 15;
const COLS = 20;
const ACTORS = 10;
const ARTIFACTS = 1;
const VIEW_RANGE = 6;
const DIR_COORD = {
    left:   {x: -1, y: 0,   dir: "left"},
    right:  {x: 1,  y: 0,   dir: "right"},
    up:     {x: 0,  y: -1,  dir: "up"},
    down:   {x: 0,  y: 1,   dir: "down"}
};
const ENEMY_ICON = "e";
const PLAYER_ICON = "i";
const ARMOR_ICON = "@";
const SPACE_RATIO = 0.8
const WALL = "#";
const SPACE = ".";
const STYLE = {
    font: FONT + "px monospace",
    fill: "#fff"
};
const WIN = {
    text: 'YOU WIN!',
    style: {
        fill: '#34b838',
        align: "center",
        font: 1.5*FONT + "px monospace"
    }
};

const LOSS = {
    text: 'YOU LOSE!',
    style: {
        fill: '#e22',
        align: "center",
        font: 1.5*FONT + "px monospace"
    }
};
// CONCATENATED MODULE: ./app/map/map.js


/**
 * описание карты
 * @class
 */
class map_Map {

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
// CONCATENATED MODULE: ./app/game/render.js


/**
 * прорисовка игры
 * @class
 */
class render_Render {

    constructor(){
        this._display = [];
        this.setDisplay = function(display) { this._display = display; };
        this.getDisplay = function() { return this._display; };
    }

    /**
     * создание поля для игры
     * @param game
     */
    init(game) {

        function initCell(x, y) {
            return game.add.text(FONT * x, FONT * y, '', STYLE);
        }

        for (let y = 0; y < ROWS; y++) {
            const row = [];
            this._display.push(row);
            for (let x = 0; x < COLS; x++)
                row.push(initCell(x, y));
        }
    }

    /**
     * прорисовка карты
     * @param map
     */
    draw_map(map) {
        for (let y = 0; y < ROWS; y++)
            for (let x = 0; x < COLS; x++)
                this._display[y][x].content = map.get_symbol(y, x);
    }

    /**
     * отрисовка объектов на карте
     * @param actors
     * @param artifacts
     */
    draw_objects(actors, artifacts) {
        this._draw_actors(actors);
        this._draw_artifacts(artifacts);
    }

    /**
     * отрисовка персонажей
     * @param actors
     * @private
     */
    _draw_actors(actors) {
        for (let a = 0; a < actors.length; a++) {
            let actor = actors[a];
            // отрисовка основного игорока
            if (a === 0) {
                let hp = actor.getHp();
                // игрок отображется в виде его hp,
                // если hp не помещается в один символ, то отображается основная иконка игрока
                this._display[actor.y][actor.x].content = (hp > 10) ? actor.icon : hp;
            }
            // отрисовка противников
            else
                this._display[actor.y][actor.x].content = actor.icon;
        }
    }


    /**
     * отрисовка артефактов
     * @param artifacts
     * @private
     */
    _draw_artifacts(artifacts) {
        for (let a = 0; a < artifacts.length; a++) {
            let artifact = artifacts[a];
            this._display[artifact.y][artifact.x].content = artifact.icon;
        }
    }
}
// CONCATENATED MODULE: ./app/objects/game_object.js


/**
 * основной игровой объект
 * @class
 */
class game_object_GameObject {

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

// CONCATENATED MODULE: ./app/objects/artifacts/abstract_artifact.js


/**
 * абстрактный артефакт
 * @class
 */
class abstract_artifact_AbstractArtifact extends game_object_GameObject{

    /**
     * применить артефакт
     * @param player
     */
    apply(player) {
        throw new TypeError("Must override method");
    }

    /**
     * снять артефакт
     * @param player
     */
    unapply(player) {
        throw new TypeError("Must override method");
    }
}
// CONCATENATED MODULE: ./app/objects/artifacts/armor.js



/**
 * артефакт для безграничной жизни
 * @class
 */
class armor_Armor extends abstract_artifact_AbstractArtifact{

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
// CONCATENATED MODULE: ./app/objects/actors/abstract_actor.js


/**
 * описание абстрактного персонажа
 * @class
 */
class abstract_actor_AbstractActor extends game_object_GameObject{

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

// CONCATENATED MODULE: ./app/objects/actors/enemy.js


/**
 * описание противника
 * @class
 */
class enemy_Enemy extends abstract_actor_AbstractActor{

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

// CONCATENATED MODULE: ./app/objects/actors/player.js



/**
 * описание основного игрока
 * @class
 */
class player_Player extends abstract_actor_AbstractActor {

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

// CONCATENATED MODULE: ./app/game/initializer.js





/**
 * инициализатор игры
 */
class initializer_GameInitializer {

    constructor() {}

    /**
     * инициализировать игру
     * @param self
     */
    static init_game(self) {

        // сгенерировать карту
        self.map.generate_map();

        // инициализировать игровой дисплей
        self.display.init(self.game);

        // расставить персонажей
        this._init_actors(self);

        // раставить артефакты
        this._init_artifacts(self);

        // отрисовать карту
        self.display.draw_map(self.map);

        // отрисовать персонажей
        self.display.draw_objects(self.actors, self.artifacts);

    }

    /**
     * расстановка артефактов
     * @param self
     * @private
     */
    static _init_artifacts(self) {
        for (let i = 0; i < ARTIFACTS; ++i) {
            let artifact = new armor_Armor(0, 0, ARMOR_ICON);
            artifact.find_free_place(self.map, self.objects_map);
            self.objects_map[[artifact.y, artifact.x]] = artifact;
            self.artifacts.push(artifact);
        }
    }

    /**
     * расстановка персонаж
     * @param self
     * @private
     */
    static _init_actors(self) {
        for (let e = 0; e < ACTORS; e++) {
            let player = null;
            // первый персонаж в списке основной игрок
            if (e === 0)
                player = new player_Player(0, 0, 3, PLAYER_ICON);
            // создание противников
            else
                player = new enemy_Enemy(0, 0, 1, ENEMY_ICON);

            player.find_free_place(self.map, self.objects_map);

            self.objects_map[[player.y, player.x]] = player;
            self.actors.push(player);
        }

        // первый персонаж в списке основной игрок
        self.player = self.actors[0];
    }
}

// CONCATENATED MODULE: ./app/game/actions/actions.js






class actions_Actions {

    /**
     * совершил ли actor действие по направлению dir
     * @param self
     * @param actor
     * @param dir
     * @return {boolean} false - действия не было, true - действие свершилось
     */
    static move_to(self, actor, dir) {

        let position = {x: actor.x + dir.x, y: actor.y + dir.y};

        // стена или выход за границы поля
        if (!self.map.can_move(position))
            return false;

        // объект, находящийся на желаемой позиции
        let object = self.objects_map[[position.y, position.x]];

        // это другой персонаж -> ударить
        if (object instanceof abstract_actor_AbstractActor)
            return this._hit(self, object, position, actor);

        // это артефакт -> взять артефакт
        if (object instanceof abstract_artifact_AbstractArtifact)
            return this._get_artifact(self, object, position, actor);

        // это пустая клетка -> сделать шаг
        if (object == null)
            return this._make_step(self, actor, position, dir);
    }


    /**
     * использовать артефакт
     * возвращает false (использование артефакта не является действием)
     * @param self
     * @param ind
     * @return {boolean}
     */
    static use_artifact(self, ind) {
        // активация/дезакцивация артефакта
        let res = self.player.switch_artifact(ind);

        // если удалось активировать/дезактивировать артефакт
        if (res !== undefined)
            if (res)
                console.log("Player apply artifact " + ind.toString());
            else
                console.log("Player unapply artifact " + ind.toString());

        return false;
    }


    /**
     * действие противников
     * @param self
     * @param actor
     */
    static enemy_step(self, actor) {

        /**
         * случайное число от 0 до max
         * @param max
         * @return {number}
         */
        function randomInt(max) {
            return Math.floor(Math.random() * max);
        }

        // разница координат между противником и основным героем
        let dx = self.player.x - actor.x;
        let dy = self.player.y - actor.y;

        let dirs = Object.values(DIR_COORD);

        // если основной герой находится вне поля зрения противника,
        // противник ходит случайным образом
        if (Math.abs(dx) + Math.abs(dy) > VIEW_RANGE) {
            while (!this.move_to(self, actor, dirs[randomInt(dirs.length)])) {}
            return;
        }

        // двигаемся по направлению к игроку
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) {
                this.move_to(self, actor, DIR_COORD.left);
            } else {
                this.move_to(self, actor, DIR_COORD.right);
            }
        } else {
            if (dy < 0) {
                this.move_to(self, actor, DIR_COORD.up);
            } else {
                this.move_to(self, actor, DIR_COORD.down);
            }
        }
    }

    /**
     * actor ударяет enemy на координатах position
     * @param self
     * @param enemy
     * @param position
     * @param actor
     * @return {boolean}
     * @private
     */
    static _hit(self, enemy, position, actor) {
        enemy.hp--;

        // удаляем персонажа из списка и карты, если он умер
        if (enemy.hp === 0) {
            delete self.objects_map[[position.y, position.x]];
            self.actors.splice(self.actors.indexOf(enemy), 1);
        }
        console.log(`Actor(${actor.x}, ${actor.y}, ${actor.icon}) hit actor(${enemy.x}, ${enemy.y}, ${enemy.icon})`);
        return true;
    }

    /**
     * actor поднимает artifact на координатах position
     * @param self
     * @param artifact
     * @param position
     * @param actor
     * @return {boolean}
     * @private
     */
    static _get_artifact(self, artifact, position, actor) {
        // если персонаж не основной игрок, то он не может поднять артефакт
        if (actor !== self.player)
            return false;

        // добавляем артефакт в инвентарь
        self.player.add_artifact(artifact);

        // удаляем артефакт с карты
        delete self.objects_map[[position.y, position.x]];

        // удаляем артефакт из списка существующих(ненайденных) артефактов
        self.artifacts.splice(self.artifacts.indexOf(artifact), 1);

        console.log(`Actor(${actor.x}, ${actor.y}, ${actor.icon}) get artifact(${artifact.x}, ${artifact.y})`);
        return true;
    }


    /**
     * actor делает шаг на координату position по направлению dir
     * @param self
     * @param actor
     * @param position
     * @param dir
     * @return {boolean}
     * @private
     */
    static _make_step(self, actor, position, dir) {
        let old_x = actor.x;
        let old_y = actor.y;

        // удаляем персонажа с карты
        delete self.objects_map[[actor.y, actor.x]];

        actor.x = position.x;
        actor.y = position.y;

        // добавляем персонажа на карту
        self.objects_map[[actor.y, actor.x]] = actor;

        console.log(`Actor(${old_x}, ${old_y}, ${actor.icon}) go to ${dir.dir}`);
        return true;
    }
}
// CONCATENATED MODULE: ./app/game/game.js







/**
 * Основной движок игры
 * @class
 */
class game_GameEngine {

    constructor() {
        // карта
        this.map = new map_Map();

        // дисплей игры (то, что нарисовано у пользователя)
        this.display = new render_Render();

        // основной игрок
        this.player = null;

        // персонажи (основной игрок и враги)
        this.actors = [];

        // артефакты
        this.artifacts = [];

        // позиции всех существующих объектов на карте
        this.objects_map = {};

        // объект для Phaser
        this.game = null
    }


    /**
     * инициализация игры и старт
     * @return {Phaser.Game}
     */
    start() {
        let self = this;
        this.game = new Phaser.Game(COLS * FONT, ROWS * FONT, Phaser.AUTO, null, {
            create: this._create.bind(self)
        });

        return this.game
    }

    /**
     * создание объекта для Phaser
     * @private
     */
    _create() {
        let self = this;
        this.game.input.keyboard.addCallbacks(null, null, this._on_key_press.bind(self));

        // инициализация и отрисовка всех объектов
        initializer_GameInitializer.init_game(this);
    }


    /**
     * действие при нажатии на клавишу
     * @param event
     * @private
     */
    _on_key_press(event) {

        // отрисовка карты
        this.display.draw_map(this.map);

        // было ли совершено событие в игре
        let is_acted = false;

        // ход игрока
        switch (event.keyCode) {
            case Phaser.Keyboard.LEFT:
                is_acted = actions_Actions.move_to(this, this.player, DIR_COORD.left);
                break;

            case Phaser.Keyboard.RIGHT:
                is_acted = actions_Actions.move_to(this, this.player, DIR_COORD.right);
                break;

            case Phaser.Keyboard.UP:
                is_acted = actions_Actions.move_to(this, this.player, DIR_COORD.up);
                break;

            case Phaser.Keyboard.DOWN:
                is_acted = actions_Actions.move_to(this, this.player, DIR_COORD.down);
                break;

            case Phaser.Keyboard.ONE:
                is_acted = actions_Actions.use_artifact(this, 0);
                break;
        }

        // ход противников, если игрок совершил действие
        if (is_acted)
            for (let e = 1; e < this.actors.length; e++) {
                actions_Actions.enemy_step(this, this.actors[e]);
            }

        // отрисовка объектов
        this.display.draw_objects(this.actors, this.artifacts);

        // отрисовка конца игры
        this._is_game_end();
    }


    /**
     * отрисовка конца игры
     * @private
     */
    _is_game_end() {
        if (this.actors.length === 1) {
            let victory = this.game.add.text(this.game.world.centerX, this.game.world.centerY, WIN.text, WIN.style);
            victory.anchor.setTo(0.5, 0.5);
            this.game.input.keyboard.disabled = true;
        }

        else if (this.player.hp < 1) {
            let gameOver = this.game.add.text(this.game.world.centerX, this.game.world.centerY, LOSS.text, LOSS.style);
            gameOver.anchor.setTo(0.5, 0.5);
            this.game.input.keyboard.disabled = true;
        }
    }
}
// CONCATENATED MODULE: ./app/main.js



let main_game = new game_GameEngine();
// запуск игры
main_game.start();


/***/ })
/******/ ]);