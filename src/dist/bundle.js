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
const FONT = 40;
const ROWS = 15;
const COLS = 20;
const ACTORS = 10;
const ARMOR = 1;
const VIEW_RANGE = 6;
const DIR_COORD = {
    left:   {x: -1, y: 0,   dir: "left"},
    right:  {x: 1,  y: 0,   dir: "right"},
    up:     {x: 0,  y: -1,  dir: "up"},
    down:   {x: 0,  y: 1,   dir: "down"}
};
const ENEMY = "e";
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


class map_Map {

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
// CONCATENATED MODULE: ./app/game/drawer.js



class drawer_Drawer {

    constructor(){
        this._display = []
    }

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

    draw_map(map) {
        for (let y = 0; y < ROWS; y++)
            for (let x = 0; x < COLS; x++)
                this._display[y][x].content = map.get_symbol(y, x);
    }

    draw_objects(actors, artifacts) {
        this._draw_actors(actors);
        this._draw_artifacts(artifacts);
    }

    _draw_actors(actors) {
        for (let a = 0; a < actors.length; a++) {
            let actor = actors[a];
            if (a === 0) {
                let hp = actor.getHp();
                this._display[actor.y][actor.x].content = (hp > 10) ? "i" : hp;
            }
            else
                this._display[actor.y][actor.x].content = actor.icon;
        }
    }

    _draw_artifacts(artifacts) {
        for (let a = 0; a < artifacts.length; a++) {
            let artifact = artifacts[a];
            this._display[artifact.y][artifact.x].content = artifact.icon;
        }
    }

}
// CONCATENATED MODULE: ./app/objects/game_object.js



class game_object_GameObject {

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

// CONCATENATED MODULE: ./app/objects/artifacts/artifact.js


class artifact_Armor extends game_object_GameObject{

    constructor(x, y, icon) {
        super(x, y, icon);
    }

    apply(player) {
        player.setHp(Infinity);
    }

    unapply(player) {
        player.setHp(3);
    }
}
// CONCATENATED MODULE: ./app/objects/actors/actor.js


class actor_Actor extends game_object_GameObject{

    constructor(x, y, hp, icon) {
        super(x, y, icon);
        this.hp = hp;
        this.setHp = function(hp) { this.hp = hp; };
        this.getHp = function() { return this.hp; };
    }
}

// CONCATENATED MODULE: ./app/objects/actors/player.js


class player_Player extends actor_Actor {

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

// CONCATENATED MODULE: ./app/game/initializer.js





class initializer_GameInitializer {

    constructor() {}

    static init_game(self) {
        self.map.init_map();

        self.display.init(self.game);

        this._init_actors(self);

        this._init_artifacts(self);

        self.display.draw_map(self.map);
        self.display.draw_objects(self.actors, self.artifacts);

    }


    static _init_artifacts(self) {
        for (let i = 0; i < ARMOR; ++i) {
            let artifact = new artifact_Armor(0, 0, "@");
            artifact.find_free_place(self.map, self.objects_map);
            self.objects_map[[artifact.y, artifact.x]] = artifact;
            self.artifacts.push(artifact);
        }
    }

    static _init_actors(self) {
        self.objects_map = {};
        for (let e = 0; e < ACTORS; e++) {
            let player = null;
            if (e === 0)
                player = new player_Player(0, 0, 3, "i");
            else
                player = new actor_Actor(0, 0, 1, "e");

            player.find_free_place(self.map, self.objects_map);

            self.objects_map[[player.y, player.x]] = player;
            self.actors.push(player);
        }

        self.player = self.actors[0];
    }
}

// CONCATENATED MODULE: ./app/game/actions/actions.js





class actions_Actions {

    static move_to(self, actor, dir) {

        if (!self.map.can_go(actor, dir))
            return false;

        let position = [actor.y + dir.y, actor.x + dir.x];
        let object = self.objects_map[position];

        if (object instanceof actor_Actor)
            return this._fight(self, object, position, actor);

        if (object instanceof artifact_Armor)
            return this._get_artifact(self, object, position, actor);

        if (object == null)
            return this._make_step(self, actor, dir);
    }


    static use_artifact(self, ind) {
        let res = self.player.use_artifact(ind);
        if (res !== undefined)
            if (res)
                console.log("Player apply artifact " + ind.toString());
            else
                console.log("Player unapply artifact " + ind.toString());

        return false;
    }


    static enemy_step(self, actor) {
        function randomInt(max) {
            return Math.floor(Math.random() * max);
        }

        let dx = self.player.x - actor.x;
        let dy = self.player.y - actor.y;

        let dirs = Object.values(DIR_COORD);
        if (Math.abs(dx) + Math.abs(dy) > VIEW_RANGE) {
            while (!this.move_to(self, actor, dirs[randomInt(dirs.length)])) {}
            return;
        }


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


    static _fight(self, enemy, position, actor) {
        enemy.hp--;
        if (enemy.hp === 0) {
            delete self.objects_map[position];
            self.actors.splice(self.actors.indexOf(enemy), 1);
        }
        console.log(`Actor(${actor.x}, ${actor.y}, ${actor.icon}) hit actor(${enemy.x}, ${enemy.y}, ${enemy.icon})`);
        return true;
    }


    static _get_artifact(self, artifact, position, actor) {
        if (actor !== self.player)
            return false;
        self.player.add_artifact(artifact);
        delete self.objects_map[position];
        self.artifacts.splice(self.artifacts.indexOf(artifact), 1);
        console.log(`Actor(${actor.x}, ${actor.y}, ${actor.icon}) get artifact(${artifact.x}, ${artifact.y})`);
        return true;
    }


    static _make_step(self, actor, dir) {
        let old_x = actor.x;
        let old_y = actor.y;

        delete self.objects_map[[actor.y, actor.x]];
        actor.y += dir.y;
        actor.x += dir.x;
        self.objects_map[[actor.y, actor.x]] = actor;
        console.log(`Actor(${old_x}, ${old_y}, ${actor.icon}) go to ${dir.dir}`);
        return true;
    }
}
// CONCATENATED MODULE: ./app/game/game.js








class game_GameEngine {

    constructor() {
        this.map = new map_Map();
        this.display = new drawer_Drawer();
        this.player = null;
        this.actors = [];
        this.artifacts = [];
        this.objects_map = {};

        let self = this;
        this.game = new Phaser.Game(COLS * FONT, ROWS * FONT, Phaser.AUTO, null, {
            create: this._create.bind(self)
        });
    }


    _create() {
        let self = this;
        this.game.input.keyboard.addCallbacks(null, null, this._on_key_press.bind(self));

        initializer_GameInitializer.init_game(this);
    }


    _on_key_press(event) {

        this.display.draw_map(this.map);


        let acted = false;
        switch (event.keyCode) {
            case Phaser.Keyboard.LEFT:
                acted = actions_Actions.move_to(this, this.player, DIR_COORD.left);
                break;

            case Phaser.Keyboard.RIGHT:
                acted = actions_Actions.move_to(this, this.player, DIR_COORD.right);
                break;

            case Phaser.Keyboard.UP:
                acted = actions_Actions.move_to(this, this.player, DIR_COORD.up);
                break;

            case Phaser.Keyboard.DOWN:
                acted = actions_Actions.move_to(this, this.player, DIR_COORD.down);
                break;

            case Phaser.Keyboard.ONE:
                acted = actions_Actions.use_artifact(this, 0);
                break;
        }

        if (acted)
            for (let e = 1; e < this.actors.length; e++) {
                actions_Actions.enemy_step(this, this.actors[e]);
            }

        this.display.draw_objects(this.actors, this.artifacts);
        this._is_game_end();
    }


    _is_game_end() {
        if (this.actors.length === 1) {
            let victory = this.game.add.text(this.game.world.centerX, this.game.world.centerY, WIN.text, WIN.style);
            victory.anchor.setTo(0.5, 0.5);
        }

        else if (this.player.hp < 1) {
            let gameOver = this.game.add.text(this.game.world.centerX, this.game.world.centerY, LOSS.text, LOSS.style);
            gameOver.anchor.setTo(0.5, 0.5);
        }
    }
}
// CONCATENATED MODULE: ./app/main.js



let main_game = new game_GameEngine();
main_game.game;


/***/ })
/******/ ]);