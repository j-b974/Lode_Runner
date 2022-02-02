
let lstScene = [];

let lstSprite =[];

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

function Game_load()
{

    document.addEventListener("keydown",Btnpress,false);
    document.addEventListener("keyup",Btnrelache,false);


    STORE.addStorageIteme("BTN_EVENT", new BoutonEvent());
    

    //================================

    let img2 = new Image();
    img2.src = "./img/tresor.png";
    let tresor = new sprite(img2);
    tresor.x = 150;

    let img3 = new Image();
    img3.src = "./img/squelette.png";
    let squelette = new sprite(img3);
    squelette.setAnimation(110,127);
    squelette.addAnimation('run',[1,2,3,5],0.2,true);
    squelette.StartAnimation('run');
    squelette.x = 250;
    
    lstSprite.push(tresor);
    lstSprite.push(squelette);

    // ====================================

    // ========== map =================
    let herb = new Image();
    herb.src ="./img/herbe_tuille.png";

    ImgLevel['h']= herb;

    let imgforet = new Image();
    imgforet.src = "./img/foret.jpg";

    let levelmap = new map(imgforet , ImgLevel , map1);

    STORE.addStorageIteme('MAP', levelmap)

    // ============ hero ================


    let img = new Image();
    img.src ="./img/vic.png";

    let vic = new sprite(img)

    Hero = new hero(vic);



}
function Game_update(dt)
{
    lstSprite.forEach((sprite)=>
    {
        sprite.update(dt);

    });
    
    Hero.update(dt);
    STORE.getIteme('MAP').update(dt);

}
function Game_draw(ctx)
{

    STORE.getIteme('MAP').draw(ctx);

    lstSprite.forEach((sprite)=>
    {
        sprite.draw(ctx);
    })

    Hero.draw(ctx)

    


}
