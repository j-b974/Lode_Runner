class SceneDebut{

    constructor()
    {
       this.loading = false;
    }

    loadGame()
    {
        this.loading = true; 
        let loadeur = new Loader();
        loadeur.addPath('M','./img/squeletteAnim.png');
        loadeur.addPath('t','./img/tresor.png');
        loadeur.addPath('lstMap','./img/tuileMap.png');
        STORE.addStorageIteme('LOADEUR',loadeur);
        loadeur.start(this.playGame);
        
    }

    playGame()
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

        if(this.loading)
        {
            let ratio = STORE.getIteme('LOADEUR').getRatio();
           
            let x = (650 / 2) - (125 / 2);

            let y = HeightWindow/2 + 32;
    
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(x, y, 125, 18);
    
    
            ctx.fillStyle = "green";
            ctx.fillRect(x, y + 0.8, 125 * ratio, 18 - 1.5);
    
    
        }
        

        ctx.restore();
    }
}