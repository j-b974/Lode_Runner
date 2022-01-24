let lstSprite =[];

let level = [
    'h0hhhhhhhhhhhhh',
    '000000000000000',
    '000hhhh00000hhh',
    '000000000000000',
    '000000000000000',
    '000000hhhhh0000',
    '000000000000000',
    'h0hhhhhhhhhhhhh',

];

let ImgLevel = [];

function Game_load()
{
    
    let img = new Image();
    img.src ="./img/vic.png";

    let vic = new sprite(img)
    vic.setAnimation(75, 74, false);
    vic.addAnimation('runRight',[0,1,2,3],0.2 , true);
    vic.addAnimation('grimp',[4,5], 0.2,true)
    vic.addAnimation('runLeft', [8,9,10,11],0.2,true)
    vic.StartAnimaiton('runLeft');

    let imgforet = new Image();
    imgforet.src = "./img/foret.jpg";

    let foret = new sprite(imgforet);
    foret.x = 0;
    foret.y = 0;

    let img2 = new Image();
    img2.src = "./img/tresor.png";
    let tresor = new sprite(img2);
    tresor.x = 150;

    let img3 = new Image();
    img3.src = "./img/squelette.png";
    let squelette = new sprite(img3);
    squelette.setAnimation(110,127);
    squelette.addAnimation('run',[1,2,3,5],0.2,true);
    squelette.StartAnimaiton('run');
    squelette.x = 250;
    
    lstSprite.push(foret);
    lstSprite.push(tresor);
    lstSprite.push(vic);
    lstSprite.push(squelette);

    // ======================
    let herb = new Image();
    herb.src ="./img/herbe_tuille.png";

    ImgLevel['h']= herb;
}
function Game_update(dt)
{
    lstSprite.forEach((sprite)=>
    {
        sprite.update(dt);
    });

}
function Game_draw(ctx)
{

    lstSprite.forEach((sprite)=>
    {
        sprite.draw(ctx);
    })

    let x = 0;
    let y = 0;
    for (let l = 0; l < level.length; l++) {
        
       let ligne = level[l];

        let nbcol = ligne.length;

        x = 0;

        for (let c = 0; c < nbcol; c++) {

            x = 75 * c;

            let tuille = ligne.substring(c,c+1);
            if( tuille != "0"){
            ctx.drawImage(ImgLevel[tuille],x ,y);
            }
            
        }
        y+= 75;

    }


}
