/// <reference path =".config/sa.d.ts" />

if (GAME == "sa_unreal" || GAME == "sa")
{
    Debugger.WriteLog("'CarSpawn'script, by: XMDS")
    var player = new Player(0);
    var VK_1 = 49;
    var VK_F = 70;
    var VK_A = 65;
    var VK_left = 37;
    var VK_D = 68;
    var VK_right = 39;
    var VK_Enter = 13;
    var VK_Tab = 9;
    var VK_Backspace = 8;
    var VK_Shift = 16;
    var StartID = 400;
    var EndID = 611;
    var ID = 400;
    var char = player.getChar();
    
    while (true)
    {
        wait (0);
        if (player.isPlaying() && player.canStartMission() 
        && !char.isInAnyCar() && Pad.IsKeyPressed(VK_1) && Pad.IsKeyPressed(VK_Shift)) 
        {
            Text.PrintHelp("'CarSpawn'script, ON");
            Hud.SwitchWidescreen(1);
            Camera.SetBehindPlayer();
            player.setControl(0);
            char.freezePositionAndDontLoadCollision(1);
    
            CreateCar:
            while (true)
            {
                wait (0)
                var car = CreateCar(ID);
                while (true)
                {
                    wait (0)
                    if (Pad.IsKeyPressed(VK_A) || Pad.IsKeyPressed(VK_left))
                    {
                        car.delete();
                        ID -= 1
                        if (ID < StartID) {
                            ID = EndID
                        }
                        wait (300)
                        break;
                    }
                    else if (Pad.IsKeyPressed(VK_D) || Pad.IsKeyPressed(VK_right))
                    {
                        car.delete();
                        ID += 1
                        if (ID > EndID) {
                            ID = StartID
                        }
                        wait (300)
                        break;
                    }
                    else if (Pad.IsKeyPressed(VK_Backspace) || Pad.IsKeyPressed(VK_F)) {
                        Text.ClearHelp();
                        Text.PrintHelp("'CarSpawn'script, OFF");
                        car.delete();
                        ExitSpawn();
                        break CreateCar;
                    }
                    else if (Pad.IsKeyPressed(VK_Enter) || Pad.IsKeyPressed(VK_Tab)) {
                        Text.ClearHelp();
                        Text.PrintHelp("The vehicle is successfully brushed out!!!");
                        car.markAsNoLongerNeeded();
                        ExitSpawn();
                        break CreateCar;
                    }
                }
            }
        }
    }
    
    function CreateCar(ID)
    {
        Streaming.RequestModel(ID);
        Streaming.LoadAllModels;
        while (!Streaming.HasModelLoaded(ID)) {
            wait (0)
        }
        var angle = char.getHeading();
        if (Streaming.IsThisModelAPlane(ID)) {
            var pos = char.getOffsetInWorldCoords(0.0, 10.0, 0.0)
        }
        else {
            var pos = char.getOffsetInWorldCoords(0.0, 5.0, 0.0)
        }
        var car = Car.Create(ID, pos.x, pos.y, pos.z);
        angle += 90.0;
        car.setHeading(angle);
        car.lockDoors(1);
        Streaming.MarkModelAsNoLongerNeeded(ID);
        Text.PrintWithNumberNow('NUMBER', ID, 5000, 1)
        return car;
    }
    
    function ExitSpawn()
    {
        Hud.SwitchWidescreen(0);
        Camera.RestoreJumpcut();
        player.setControl(1);
        char.freezePositionAndDontLoadCollision(0);
    }
}
else {
    exit("'CarSpawn'cleo script only supports SADE and classic SA!!!")
}