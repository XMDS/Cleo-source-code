/// <reference path =".config/sa.d.ts" />

if (GAME != "sa_unreal") {
    exit("'FreeSave' script only supports SADE")
}

var VK_F4 = 115;
TIMERA = 0;

while (true) {
    wait (0);
    if (Game.IsFinalbuild()) {
        if (Pad.IsKeyPressed(VK_F4)) {
            Game.ActivateSaveMenu();
            wait (100)
        }
        if (TIMERA > 10000 && !ONMISSION) {
            Game.AutoSave();
            TIMERA = 0;
        }
    }
}   