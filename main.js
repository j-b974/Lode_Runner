console.log("connecté");

let cavas = document.getElementById('jeux_lode_runner');

let CTX = cavas.getContext('2d');

let interval;

let Timer = new Date();



function Game()
{
    let TimeCurrent = new Date();

    let dt = (TimeCurrent - Timer)/1000;

    Timer = TimeCurrent;

    Game_update(dt);

    CTX.clearRect(0 , 0 , cavas.clientWidth , cavas.clientHeight);

    Game_draw(CTX);

}


function init()
{

    CTX.imageSmoothingEnabled = false;
    Game_load();
    interval = setInterval(Game ,1000/60);
}



init()