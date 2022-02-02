class hero{

    constructor(heroSprite)
    {
        this.heroSprite = heroSprite;
        this.X = heroSprite.x = 75;
        this.Y = heroSprite.y = 150;
        this.heroSprite.width=75; // TO DO  à definir auto
        this.heroSprite.height=74;
        this.speed = 300;
        this.animation();

        this.caseParcase = 75*0.5;
        this.dist = 0
        this.VX = 0;
        this.VY = 0;

    }
    animation()
    {
        this.heroSprite.setAnimation(75, 74);
        this.heroSprite.addAnimation('runRight',[0,1,2,3],0.2 , true);
        this.heroSprite.addAnimation('grimp',[4,5], 0.2,true)
        this.heroSprite.addAnimation('runLeft', [8,9,10,11],0.2,true)
        this.heroSprite.StartAnimation('runLeft');

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

        let x = (this.X + (this.heroSprite.width *0.5) ) + (map.tuilleWidth * pxOff);
        let y = (this.Y+ (this.heroSprite.height)*0.3)+ (map.tuilleHeight*pyOff) ;
         
        let index =  map.getTuilleId( x, y);
        
        return index;
       
    }

    is_Gripable(pxOff , pyOff)
    {
        return 'e' == this.heroTuille(pxOff,pyOff);
    }
    is_fallable(pxOff ,pyOff)
    {
        return '0'== this.heroTuille(pxOff,pyOff);
    }
    is_wall(pxOff , pyOff)
    {
        return 'h'== this.heroTuille(pxOff , pyOff);
    }


    update(dt) // TO DO utiliser storage locato //  TO DO rendre cette partie réutilisatble
    {
        let map = STORE.getIteme("MAP");

        this.heroSprite.update(dt);
        this.heroSprite.x = this.X ;
        this.heroSprite.y = this.Y ;
        let MaxMapWidth = map.MaxWidth;
        let MaxMapHeight = map.MaxHeight;


        let heroX = this.X + this.heroSprite.cameraX;
        let heroY = this.Y + this.heroSprite.cameraY;
       
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowLeft") && heroX > 0 && this.VX == 0 && !this.is_wall(0,0))
       {
           this.heroSprite.StartAnimation('runLeft');

            this.VX -= dt*this.speed;
            this.dist = 0;   
       }
    
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowRight")&& this.X <= MaxMapWidth && !this.is_wall(1,0) && this.VX == 0)
       {
           this.heroSprite.StartAnimation('runRight');
           
            this.VX += dt*this.speed;   
            this.dist = 0;
       }


       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowUp") && this.Y >= 0 && (this.is_Gripable(0,1) || this.is_Gripable(0,0)) && this.VY ==0)
       {
           this.heroSprite.StartAnimation('grimp');

           this.VX = 0;
            this.Y -= 1*dt*this.speed;
            this.dist = 0;
       }
 

       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowDown")&& this.Y <= MaxMapHeight-this.heroSprite.height && this.Y >= 0 && this.is_Gripable(0,1) && this.VY ==0)
       {
            this.heroSprite.StartAnimation('grimp');
            this.VX =0;
            this.VY += dt*this.speed;
            this.dist = 0;
       }

       if(  this.is_fallable(0,1))
       {
            this.dist = 0 ;
            this.VY += dt*45;
       }

       this.X += this.VX ;
       this.Y += this.VY ;
       this.dist += Math.abs(this.VX)+ Math.abs(this.VY);

       if(this.dist >= this.caseParcase)
       {
           this.VX = 0;
           this.VY = 0;
           this.dist = 0;
        }

        //===================    gestion camera     =============


            // ============ deplacement ecran vers la gauche limité a la map ===============
       if( heroX <= map.shadowCubeX && this.X >= map.shadowCubeX)
       {  
           this.heroSprite.cameraX += dt*this.speed;
           map.cameraX += dt*this.speed;
       }

        // ============ deplacement ecran vers la droite limité a la map ===============
        let margeRight = MaxMapWidth -  (WidthWindow -(map.shadowCubeX+map.shadowCubeWidth)+this.heroSprite.width);

        if(heroX > map.shadowCubeX+map.shadowCubeWidth-this.heroSprite.width && this.X < margeRight)
        {
            this.heroSprite.cameraX -= dt*this.speed;
            map.cameraX -= dt*this.speed;
        }

        // ============ deplacement ecran vers le Haut limité a la map ===============
       if(heroY <= map.shadowCubeY && this.Y >= map.shadowCubeY)
       {
           this.heroSprite.cameraY += dt*this.speed;
           map.cameraY += dt*this.speed;
       }

       // ============== deplacement ecran vers le bas ==================
       let margebottom =  MaxMapHeight-(( HeightWindow - map.shadowCubeHeight)/2) ;
       
       if(heroY >= map.shadowCubeY+map.shadowCubeHeight-this.heroSprite.height && this.Y <= margebottom )
       {
            this.heroSprite.cameraY -= dt*this.speed;
            map.cameraY -= dt*this.speed;
       }


    }
    draw(ctx)
    {
        this.heroSprite.draw(ctx);

    
    // ============ debug ======================    

         ctx.font = "28px serif";
         ctx.fillStyle = 'rgb(255, 255, 255)';
         ctx.fillText('heroX '+Math.round(this.X),20,20);
         ctx.fillText('heroY '+Math.round(this.Y),20,50);
        // ctx.fillText('heroscreenY '+ Math.round(this.Y+this.heroSprite.cameraY),20,100);
    }  
}