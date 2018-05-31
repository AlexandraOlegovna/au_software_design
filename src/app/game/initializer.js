import Artifact from "../objects/artifacts/artifact";
import Actor from "../objects/actors/actor";
import Player from "../objects/actors/player";
import {ACTORS, ARMOR} from '../const';

export default class GameInitializer {

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
            let artifact = new Artifact(0, 0, "@");
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
                player = new Player(0, 0, 3, "i");
            else
                player = new Actor(0, 0, 1, "e");

            player.find_free_place(self.map, self.objects_map);

            self.objects_map[[player.y, player.x]] = player;
            self.actors.push(player);
        }

        self.player = self.actors[0];
    }
}
