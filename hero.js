class hero{

    constructor(heroSprite)
    {
        this.heroSprite = heroSprite;
        this.X = heroSprite.x;
        this.Y = heroSprite.y;
        this.speed = 250;
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


    update(dt , map)
    {
        this.heroSprite.update(dt);
        this.heroSprite.x = this.X ;
        this.heroSprite.y = this.Y ;
     
       
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowLeft"))
       {
           this.heroSprite.StartAnimation('runLeft');
           this.X -= 1*dt*this.speed;
           map.VX += 2;
       }
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowRight"))
       {
           this.heroSprite.StartAnimation('runRight');
           this.X += 1*dt*this.speed;
           map.VX -=2;
       }
       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowUp"))
       {
           this.heroµSprite.StartAnimation('grimp');
           this.Y -= 1*dt*this.speed;
           map.VY +=2;
       }else{
        this.heroSprite.StartAnimation('runRight');
       }

       if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowDown"))
       {
            this.heroµSprite.StartAnimation('grimp');
            this.Y += 1*dt*this.speed;
            map.VY -= 2;
       }else{
        this.heroSprite.StartAnimation('runRight');
       }


    }
    draw(ctx)
    {
        this.heroSprite.draw(ctx);
    }
}