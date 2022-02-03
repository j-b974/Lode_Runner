class SceneLevel1{

    constructor()
    {
        this.lstSprite = [];

        this.Hero = null;
    }
    load()
    {

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
        
        this.lstSprite.push(tresor);
        this.lstSprite.push(squelette);
    
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
    
        this.Hero = new hero(vic);
    }
    creationSprite(pid)
    {

    }
    update(dt)
    {

        this.lstSprite.forEach((sprite)=>
        {
            sprite.update(dt);
    
        });
        
        this.Hero.update(dt);


        STORE.getIteme('MAP').update(dt);

    }
    draw(ctx)
    {
        STORE.getIteme('MAP').draw(ctx);


        this.lstSprite.forEach((sprite)=>
        {
            sprite.draw(ctx);
        })

        this.Hero.draw(ctx)
    }
}