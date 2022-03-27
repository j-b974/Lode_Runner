console.log("connecté");

import {
    Game,
} from './moduleInjection.js';

// var jx = require('./moduleInjection.js');// jeux

let cavas = document.getElementById('jeux_lode_runner');


let CTX = cavas.getContext('2d');

let interval;

let Timer = new Date();


//  cavas.width = window.innerWidth;
//   cavas.height = window.innerHeight;


window.WidthWindow = cavas.clientWidth;

window.HeightWindow = cavas.clientHeight;


function GameInit()
{
    let TimeCurrent = new Date();

    let dt = (TimeCurrent - Timer)/1000;

    Timer = TimeCurrent;

    Game.Game_update(dt);

    CTX.clearRect(0 , 0 ,  WidthWindow , HeightWindow );

    Game.Game_draw(CTX);

}

function init()
{
    CTX.imageSmoothingEnabled = false;
    Game.Game_load();
    interval = setInterval(GameInit ,1000/60);
}

init();

 
   







