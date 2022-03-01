class SceneLevel1{

    constructor()
    {
        this.lstSprite = [];

        this.Hero = null;

        /**
         * @var {[]} string creation de sprite 
         */
        this.idSprite = ['t','M'];
    }
    load()
    {
        this.loadSprite(map1);

        // ========== map =================
        let herb = new Image();
        herb.src ="./img/herbe_tuille.png";

        let echel = new Image();
        echel.src="./img/echel_Foureges.png";
    
        let ImgLevel = [];
        ImgLevel['h']= herb;
        ImgLevel['e']=echel;
    
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
                    let sprite = this.creationSprite(id , C+1, L+1);

                    this.lstSprite.push(sprite);
                }

            }
       }

    }
    creationSprite(pid , pcol , prow)
    {
        let loader = STORE.getIteme('LOADEUR');
        let sprite = null;

        if(pid == 't')
        {
            
            sprite = new Treasure(loader.getImage(pid),pcol , prow);

            
        }
        if(pid =='M')
        {
            sprite = new Monstre(loader.getImage(pid),pcol , prow)

        }

        return sprite;
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