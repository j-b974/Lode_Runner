console.log("connecté");

const PathJS = 
[
    "./function.js",
    "./Storage.js",
    "./BoutonEvent.js",
    "./SceneManager.js",
    "./sprite.js",
    "./hero.js",
    "./map.js",
    "./SceneDebut.js",
    "./Monstre.js",
    "./Treasure.js",
    "./SceneLevel1.js",
    "./Loader.js",
    "./Game.js",
];
let jscharge = 0;

let cavas = document.getElementById('jeux_lode_runner');


let CTX = cavas.getContext('2d');

let interval;

let Timer = new Date();


//  cavas.width = window.innerWidth;
//   cavas.height = window.innerHeight;


const WidthWindow = cavas.clientWidth;

const HeightWindow = cavas.clientHeight;


function Game()
{
    let TimeCurrent = new Date();

    let dt = (TimeCurrent - Timer)/1000;

    Timer = TimeCurrent;

    Game_update(dt);

    CTX.clearRect(0 , 0 ,  WidthWindow , HeightWindow );

    Game_draw(CTX);

}

function init()
{
  
    CTX.imageSmoothingEnabled = false;
    Game_load();
    interval = setInterval(Game ,1000/60);
}

async function injectionJS(path)
{
   let attent =  new Promise( async (resolve , error)=>{

        let js = document.createElement('script');
        
        js.src = path;

        js.addEventListener('load',function (){

            // this.remove();

            resolve();

        })

        if(document.documentElement)
        {
            cavas.after(js)
        }else{
            console.log("error d'injection : "+path);
        }
    });
    return attent ;
}

function ancieninjectionJS(path)
{
    new Promise((resolve)=>{

        let js = document.createElement('script');
        js.src =path;
        cavas.after(js);
        js.onload = resolve();
    }).then(()=>{
        jsCreation();
    })

}

function jsCreation(js)
{
    jscharge++;

    if(jscharge == PathJS.length)
    {
      setTimeout(init,1000);
    }
}

// PathJS.reverse().map((path)=> ancieninjectionJS(path));


Promise.all( PathJS.reverse().map((path)=> injectionJS(path))).then(()=>{


    init();

    });
 
   







