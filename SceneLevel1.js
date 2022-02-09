class SceneLevel1{

    constructor()
    {
        this.lstSprite = [];

        this.Hero = null;

        /**
         * @var {[]} string creation de sprite 
         */
        this.idSprite = ['t'];
    }
    load()
    {
        this.loadSprite(map1);


    
        let img3 = new Image();
        img3.src = "./img/squelette.png";
        let squelette = new sprite(img3);
        squelette.setAnimation(110,127);
        squelette.addAnimation('run',[1,2,3,5],0.2,true);
        squelette.StartAnimation('run');
        squelette.x = 250;
        
        this.lstSprite.push(squelette);
    
        // ====================================
    
        // ========== map =================
        let herb = new Image();
        herb.src ="./img/herbe_tuille.png";
    
        let ImgLevel = [];
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

    is_Sprite(pid)
    {
        return this.idSprite.find((value)=>{return value == pid});
    }

    loadSprite(pmap)
    {
       for (let L = 0; L < pmap.length; L++) {

           let row = pmap[L];

           let nbcol = row.length;

           for (let C = 0; C < nbcol; C++)
            {
               let id = row.substring(C,C+1);
               
                if(this.is_Sprite(id))
                {    
                    let sprite = this.creationSprite(id , L , C);

                    this.lstSprite.push(sprite);
                }

            }
       }

    }
    creationSprite(pid , prow , pcol)
    {
        let loader = STORE.getIteme('LOADEUR');

        if(pid == 't')
        {
            let tresor = new sprite(loader.getImage('t'));
            tresor.x = pcol * 75;
            tresor.y = (prow *75)+33;

            return tresor;
        }
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