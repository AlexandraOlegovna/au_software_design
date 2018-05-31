import Artifact from "../objects/artifacts/armor";
import Actor from "../objects/actors/actor";
import Player from "../objects/actors/player";
import {ACTORS, ARTIFACTS, ARMOR_ICON, ENEMY_ICON, PLAYER_ICON} from '../const';

/**
 * инициализатор игры
 */
export default class GameInitializer {

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
            let artifact = new Artifact(0, 0, ARMOR_ICON);
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
                player = new Player(0, 0, 3, PLAYER_ICON);
            // создание противников
            else
                player = new Actor(0, 0, 1, ENEMY_ICON);

            player.find_free_place(self.map, self.objects_map);

            self.objects_map[[player.y, player.x]] = player;
            self.actors.push(player);
        }

        // первый персонаж в списке основной игрок
        self.player = self.actors[0];
    }
}
