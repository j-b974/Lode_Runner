



let map1 = [
    'h0ehhhhhhhhhhhhh',
    'h0e000000000000h',
    'h0e0hehh00000hhH',
    'h0e00e000000000h',
    'h0e00e000000000h',
    'h0e00e0hhhhh000h',
    'h0e00e000e00000h',
    'hhhhhhhhhehhhhhh',
    'h00000000e00000h',
    'h00000000e00000h',
    'h000000hhhhh000h',
    'h00000000000000h',
    'hhhhhhhhhhhhhhhh',

];

let ImgLevel = [];

const STORE = new Storage();

let Hero = null;


function Btnpress(even)
{
   let supported =  STORE.getIteme("BTN_EVENT").btnPress(even.code);
   if(supported){ even.preventDefault();}
}
function Btnrelache(even)
{
    let supported = STORE.getIteme("BTN_EVENT").btnRelease(even.code);
    if(supported){ even.preventDefault();}
}
function ChangeScene()
{

}

function Game_load()
{

    document.addEventListener("keydown",Btnpress,false);
    document.addEventListener("keyup",Btnrelache,false);


    STORE.addStorageIteme("BTN_EVENT", new BoutonEvent());

    let sceneManage = new SceneManager();

    sceneManage.addScene('SCENE_LEVEL1', new SceneLevel1());
    sceneManage.addScene('SCENE_DEBUT', new SceneDebut());
    sceneManage.setScene('SCENE_DEBUT');
    
    STORE.addStorageIteme('SCENE_MANAGER', sceneManage);

    

   

}
function Game_update(dt)
{
    STORE.getIteme('SCENE_MANAGER').update(dt);
    

}
function Game_draw(ctx)
{

   STORE.getIteme('SCENE_MANAGER').draw(ctx);

}
