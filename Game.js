let lstSprite =[];

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

    lstSprite.push(vic);
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
}
