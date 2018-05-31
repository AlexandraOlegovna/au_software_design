export const FONT = 40;
export const ROWS = 15;
export const COLS = 20;
export const ACTORS = 10;
export const ARMOR = 1;
export const VIEW_RANGE = 6;
export const DIR_COORD = {
    left:   {x: -1, y: 0,   dir: "left"},
    right:  {x: 1,  y: 0,   dir: "right"},
    up:     {x: 0,  y: -1,  dir: "up"},
    down:   {x: 0,  y: 1,   dir: "down"}
};
export const ENEMY = "e";
export const WALL = "#";
export const SPACE = ".";
export const STYLE = {
    font: FONT + "px monospace",
    fill: "#fff"
};
export const WIN = {
    text: 'YOU WIN!',
    style: {
        fill: '#34b838',
        align: "center",
        font: 1.5*FONT + "px monospace"
    }
};

export const LOSS = {
    text: 'YOU LOSE!',
    style: {
        fill: '#e22',
        align: "center",
        font: 1.5*FONT + "px monospace"
    }
};