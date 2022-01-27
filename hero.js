class hero{

    constructor(heroSprite)
    {
        this.heroSprite = heroSprite;
        this.X = heroSprite.x = 50;
        this.Y = heroSprite.y = 0;
        this.heroSprite.width=75; // TO DO  à definir auto
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
       
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowLeft"))
       {
           this.heroSprite.StartAnimation('runLeft');

           if(this.X >= map.shadowCubeX)
           {
               this.X -= 1*dt*this.speed;
           }
           else
           {
                if(map.X <= 0)
                {
                    map.X += 1*dt*this.speed;
                }else{

                    if(this.X >= 0)
                    {
                        this.X -= 1*dt*this.speed;
                    }
                }

           }
       }
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowRight"))
       {
           this.heroSprite.StartAnimation('runRight');
           if(this.X <= (map.shadowCubeX+map.shadowCubeWidth-this.heroSprite.width))
           {
               if(this.X+ this.heroSprite.width <= MaxMapWidth)
               {
                   this.X += 1*dt*this.speed;
               }
           }else
           {
                if(map.X+MaxMapWidth- WidthWindow  >= 0)
                {
                    console.log(map.X)
                    map.X -= 1*dt*this.speed;
                }else
                {
                    if(this.X+ this.heroSprite.width <= WidthWindow)
                    {
                         this.X += 1*dt*this.speed;
                    }
                }
           }
       }
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowUp"))
       {
           this.heroSprite.StartAnimation('grimp');
           if(this.Y >= (map.shadowCubeY))
           {
                if(map.Y >= 0)
                {
                    map.Y -= 1*dt*this.speed;
                }else{

                    if(this.Y >= 0)
                    {
                        this.Y -= 1*dt*this.speed;
                    }
                }
           }
           else
           {
                if(map.Y <= 0)
                {
                    map.Y += 1*dt*this.speed;
                }else{
                    if(this.Y >= 0)
                    {
                        this.Y -= 1*dt*this.speed;
                    }
                }
           }
       }
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowDown"))
       {
            this.heroSprite.StartAnimation('grimp');

           if(this.Y <= (map.shadowCubeY+map.shadowCubeHeight-this.heroSprite.width))
           {
               this.Y += 1*dt*this.speed;
           }
           else
           {
                if(map.Y +MaxMapHeight- HeightWindow >= 0)
                {
                    map.Y -= 1*dt*this.speed ;
                }else{
                    if(this.Y +this.heroSprite.width <=  HeightWindow)
                    {
                        this.Y += 1*dt*this.speed;
                    }
                }
           }
            
       }

    }
    draw(ctx)
    {
        this.heroSprite.draw(ctx);


    //============ debug ======================    
    //     ctx.font = "18px serif";
    //     ctx.fillStyle = 'rgb(255, 255, 255)';
    //     ctx.fillText('heroX '+this.X,20,20);
    //     ctx.fillText('heroY '+this.Y,20,50);
    // }  
}