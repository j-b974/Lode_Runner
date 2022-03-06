class hero extends Mortel{

    constructor(heroSprite)
    {
        super(heroSprite);

        this.speed = 300;
        this.animation();

        this.caseParcase = 75;
        this.dist = 0


        this.colHero = 3;
        this.rowHero = 2;

        this.colMove = 3;
        this.rowMove = 2;
        this.loadPosition();
 
        this.treasureColleted = 0;

        this.moving = false;
    }
    loadPosition()
    {
        let map = STORE.getIteme("MAP");
        this.X = (this.colHero-1 ) * map.tuilleWidth;
        this.Y = (this.rowHero -1 ) * map.tuilleHeight;
    }
    animation()
    {
        this.setAnimation(75, 74);
        this.addAnimation('runRight',[0,1,2,3],0.2 , true);
        this.addAnimation('grimp',[4,5], 0.2,true)
        this.addAnimation('runLeft', [8,9,10,11],0.2,true)
        this.StartAnimation('runLeft');

    }
    /**
     * 
     * @param {int} pxOff 
     * @param {int} pyOff 
     * @description reglage distance en le hero et la tuille 
     * @returns {string}
     */
    heroTuille(pxOff,pyOff)
    {
        let map = STORE.getIteme("MAP");

        let x = (this.x + (this.width *0.5) ) + (map.tuilleWidth * pxOff);
        let y = (this.y+ (this.height)*0.3)+ (map.tuilleHeight*pyOff) ;
         
        let index =  map.getTuilleId( x, y);
        
        return index;
       
    }

    is_Gripable(pxOff , pyOff)
    {
        return 'e'== this.heroTuille(pxOff,pyOff);
    }
    is_fallable(pxOff ,pyOff)
    {
        return ('0'== this.heroTuille(pxOff,pyOff)|| 't' == this.heroTuille(pxOff,pyOff));
    }
    is_wall(pxOff , pyOff)
    {
        return 'h'== this.heroTuille(pxOff , pyOff);
    }

    ReplaceHero()
    {
        let map = STORE.getIteme("MAP");
        this.x = (this.colHero-1)*map.tuilleWidth ;
        this.y = (this.rowHero-1)*map.tuilleHeight;
    }

    /**
     * parcourt la liste des sprite pour déterminer la position des trésors
     */
    is_treasure(pxOff,pyOff)
    {
      
        let lstSprite = STORE.getIteme("LST_SPRITE");
        for (const key in lstSprite) {
            
              let sprite = lstSprite[key];
            if(sprite instanceof Treasure)
            {
                if(sprite.colMortel == (this.colHero+(pxOff) )&& sprite.rowMortel == (this.rowHero+(pyOff)) )
                {
                    return true;
                }
            }
            
        }
        // return 't'== this.heroTuille(pxOff,pyOff);
        return false;
    }

    /**
     * @description surpression du tresor de la liste des sprite
     */
    collect_treasure(pxOff, pyOff)
    {
        let lstsprite = STORE.getIteme('LST_SPRITE');

        for (const element in lstsprite) {
           
            let mortel = lstsprite[element];
       
            if(mortel instanceof Treasure)
            {
                if((this.colHero+(pxOff)) == mortel.colMortel && (this.rowHero+(pyOff)) == mortel.rowMortel)
                {
                    let index = lstsprite.indexOf(mortel);

                    if(index != -1)
                    {
                        lstsprite.splice(index , 1);

                        this.treasureColleted++;
                    }
                }

            }
                
           
        }
        
            

       
    }


    update(dt) // TO DO utiliser storage locato //  TO DO rendre cette partie réutilisatble
    {
        let map = STORE.getIteme("MAP");

        super.update(dt);

        let MaxMapWidth = map.MaxWidth;
        let MaxMapHeight = map.MaxHeight;


        let heroX = this.x + this.cameraX;
        let heroY = this.y + this.cameraY;

        if(!this.moving)
        {
            this.ReplaceHero();

            if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowRight")&& !this.is_wall(1,0) && !this.is_fallable(0,1))
            {
                this.StartAnimation('runRight');
                     
                this.colMove++;
                this.moving=true;
            }

            else if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowLeft")&& !this.is_wall(-1,0) &&!this.is_fallable(0,1) )
            {
                this.StartAnimation('runLeft');
     
                 this.colMove--;
                 this.moving = true;
            }

            else if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowUp") && this.is_Gripable(0,0) && !this.is_wall(0,-1))
            {
                this.StartAnimation('grimp');
     
                this.rowMove--;
                this.moving = true;
                
            }

            else if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowDown") && (this.is_Gripable(0,0)||this.is_Gripable(0,1)) && !this.is_wall(0,1))
            {
                 this.StartAnimation('grimp');

                this.rowMove++;
                this.moving = true;
            }

            if(this.is_fallable(0,1))
            {
                
                this.rowMove++;
                this.moving = true;
            }
            if(this.is_treasure(0,0))
            {
                this.collect_treasure(0 ,0);
            }
  

        }

        if(this.moving)
        {
            if(this.colMove > this.colHero)
            {
                this.x += this.speed*dt;
                if(Math.floor(this.x/map.tuilleWidth)+1>= this.colMove)
                {
                    this.colHero = this.colMove;
                    this.moving = false;
                }
            }
            if(this.colMove < this.colHero)
            {
                this.x -= this.speed*dt;
                let some = Math.floor( this.x / map.tuilleWidth ) + 1;
                if( some < this.colMove)
                {
                    this.colHero = this.colMove;
                    this.moving = false;
                }
            } 
            if(this.rowMove > this.rowHero)
            {
                this.y += this.speed*dt;
                if(Math.floor(this.y/map.tuilleWidth)+1 >= this.rowMove)
                {
                    this.rowHero = this.rowMove;
                    this.moving = false;
                }
            } if(this.rowMove < this.rowHero)
            {
                this.y -= this.speed*dt;
                if(Math.floor(this.y/map.tuilleWidth)+1< this.rowMove)
                {
                    this.rowHero = this.rowMove;
                    this.moving = false;
                }
            }
        }
       

        //===================    gestion camera     =============


            // ============ deplacement ecran vers la gauche limité a la map ===============
       if( heroX <= map.shadowCubeX && this.x >= map.shadowCubeX)
       {  
           this.cameraX += dt*this.speed;
           map.cameraX += dt*this.speed;
       }

        // ============ deplacement ecran vers la droite limité a la map ===============
        let margeRight = MaxMapWidth -  (WidthWindow -(map.shadowCubeX+map.shadowCubeWidth)+this.setFrame.width);

        if(heroX > map.shadowCubeX+map.shadowCubeWidth - this.setFrame.width && this.x < margeRight)
        {
            this.cameraX -= dt*this.speed;
            map.cameraX -= dt*this.speed;
        }

        // ============ deplacement ecran vers le Haut limité a la map ===============
       if(heroY <= map.shadowCubeY && this.y >= map.shadowCubeY)
       {
           this.cameraY += dt*this.speed;
           map.cameraY += dt*this.speed;
       }

       // ============== deplacement ecran vers le bas ==================

       let margebottom =  MaxMapHeight-(( HeightWindow - map.shadowCubeHeight)/2) ;
       
       if(heroY > map.shadowCubeY+map.shadowCubeHeight-this.setFrame.height && this.y <= margebottom )
       {
            this.cameraY -= dt*this.speed;
            map.cameraY -= dt*this.speed;
       }


    }
    draw(ctx)
    {
        
        super.draw(ctx);

    
    // ============ debug ======================    

         ctx.font = "28px serif";
         ctx.fillStyle = 'rgb(255, 255, 255)';
         ctx.fillText('heroX '+Math.round(this.x),20,20);
         ctx.fillText('heroY '+Math.round(this.y),20,50);
         ctx.fillText('tresor ramasser '+this.treasureColleted,20,80);

   
        // ctx.fillText('heroscreenY '+ Math.round(this.Y+this.cameraY),20,100);
    }  
}