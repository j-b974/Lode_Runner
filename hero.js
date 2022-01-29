class hero{

    constructor(heroSprite)
    {
        this.heroSprite = heroSprite;
        this.X = heroSprite.x = 50;
        this.Y = heroSprite.y = 50;
        this.heroSprite.width=75; // TO DO  à definir auto
        this.heroSprite.height=74;
        this.speed = 300;
        this.animation();

    }
    animation()
    {
        this.heroSprite.setAnimation(75, 74);
        this.heroSprite.addAnimation('runRight',[0,1,2,3],0.2 , true);
        this.heroSprite.addAnimation('grimp',[4,5], 0.2,true)
        this.heroSprite.addAnimation('runLeft', [8,9,10,11],0.2,true)
        this.heroSprite.StartAnimation('runLeft');

    }


    update(dt , map) // TO DO utiliser storage locato //  TO DO rendre cette partie réutilisatble
    {
        this.heroSprite.update(dt);
        this.heroSprite.x = this.X ;
        this.heroSprite.y = this.Y ;
        let MaxMapWidth = map.MaxWidth;
        let MaxMapHeight = map.MaxHeight;

        let heroX = this.X + this.heroSprite.cameraX;
        let heroY = this.Y + this.heroSprite.cameraY;
       
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowLeft") && this.X >= 0)
       {
           this.heroSprite.StartAnimation('runLeft');

            this.X -= dt*this.speed;
             
       }
        // ============ deplacement ecran vers la gauche limité a la map ===============
       if( heroX <= map.shadowCubeX && this.X >= map.shadowCubeX)
       {  
           this.heroSprite.cameraX += dt*this.speed;
           map.cameraX += dt*this.speed;
       }

       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowRight")&& this.X <= MaxMapWidth)
       {
           this.heroSprite.StartAnimation('runRight');
           
            this.X += dt*this.speed;   
       }

        // ============ deplacement ecran vers la droite limité a la map ===============
       let margeRight = MaxMapWidth -  (WidthWindow -(map.shadowCubeX+map.shadowCubeWidth)+this.heroSprite.width);
       
       if(heroX > map.shadowCubeX+map.shadowCubeWidth-this.heroSprite.width && this.X < margeRight)
       {
            this.heroSprite.cameraX -= dt*this.speed;
            map.cameraX -= dt*this.speed;
       }
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowUp") && this.Y >= 0)
       {
           this.heroSprite.StartAnimation('grimp');

            this.Y -= 1*dt*this.speed;
       }
       // ============ deplacement ecran vers le Haut limité a la map ===============
       if(heroY <= map.shadowCubeY && this.Y >= map.shadowCubeY)
       {
           this.heroSprite.cameraY += dt*this.speed;
           map.cameraY += dt*this.speed;
       }

       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowDown")&& this.Y <= MaxMapHeight-this.heroSprite.height)
       {
            this.heroSprite.StartAnimation('grimp');

            this.Y += dt*this.speed;
            
       }

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

        // ctx.font = "18px serif";
        // ctx.fillStyle = 'rgb(255, 255, 255)';
        // ctx.fillText('heroX '+Math.round(this.X),20,20);
        // ctx.fillText('heroY '+Math.round(this.Y),20,50);
        // ctx.fillText('heroscreenY '+ Math.round(this.Y+this.heroSprite.cameraY),20,100);
    }  
}