
let lstScene = [];

let lstSprite =[];

let map1 = [
    'h0hhhhhhhhhhhhh',
    '00000000000000h',
    '000hhhh00000hhh',
    '00000000000000h',
    '00000000000000h',
    '000000hhhhh000h',
    '00000000000000h',
    'h0hhhhhhhhhhhhh',
    '00000000000000h',
    '00000000000000h',
    '000000hhhhh000h',
    '00000000000000h',
    'h0hhhhhhhhhhhhh',
];

let Level = null;

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

    Level = new map(imgforet , ImgLevel , map1);


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
    
    Hero.update(dt,Level);
    Level.update(dt);

}
function Game_draw(ctx)
{

    Level.draw(ctx);

    lstSprite.forEach((sprite)=>
    {
        sprite.draw(ctx);
    })

    Hero.draw(ctx)

    


}
