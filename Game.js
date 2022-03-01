console.log("game chargé !!!")
let map1 = [
    'h0ehhhhhhhhhhhhh',
    'h0e0t00000000Mth',
    'h0e0hehh00000hhh',
    'h0e00e000000000h',
    'h0e00e00M000000h',
    'h0e00e0hhhhh000h',
    'h0e00e000e000M0h',
    'hhhhhhhhhehhhheh',
    'h00000000e0000eh',
    'h00000000eM000eh',
    'h000000hhhhh00eh',
    'h0t0000000M0t0eh',
    'hhhhhhhhhhhhhhhh',

];

let STORE = null;

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

function Game_load()
{

    STORE = new Storage();

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
