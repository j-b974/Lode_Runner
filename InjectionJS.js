const PathJS = 
[
    "./function.js",
    "./Storage.js",
    "./BoutonEvent.js",
    "./SceneManager.js",
    "./Entity/sprite.js",
    "./Entity/Mortel.js",
    "./Entity/hero.js",
    "./map.js",
    "./SceneDebut.js",
    "./Entity/Monstre.js",
    "./Entity/Treasure.js",
    "./SceneLevel1.js",
    "./Loader.js",
    "./Game.js",
];
let jscharge = 0;


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
        cavas.after(js); // cavas est element html à definir
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


// Promise.all( PathJS.reverse().map((path)=> injectionJS(path))).then(()=>{


//     init();

//     });