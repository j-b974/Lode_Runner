class SceneDebut{

    constructor()
    {
       
    }

    loadGame()
    {

        let manageScene = STORE.getIteme('SCENE_MANAGER');

        manageScene.setScene('SCENE_LEVEL1');
        manageScene.sceneCurrent.load();
        
    }

    update(dt)
    {
        if(STORE.getIteme('BTN_EVENT').is_Release("Space"))
        {
            this.loadGame();
        }

    }
    draw(ctx)
    {
        ctx.save();

        let font = 32;
        let text ='Press Space pour commencer !!!';
        let center = (text.length*font)/4 ;
        ctx.font = font+'px serif';
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillText(text,(WidthWindow/2)-center,HeightWindow/2);

        ctx.restore();
    }
}