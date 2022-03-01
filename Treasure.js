class Treasure{
    constructor(pimg, pCol , pRow)
    {
        this.treasure= new sprite(pimg)
        
        this.colTreasure = pCol;
        this.rowTreasure = pRow+1;

        this.X = 0;
         this.Y = 0;
    }
    ReplaceTreasure()
    {
        let map = STORE.getIteme("MAP");
        this.X = (this.colTreasure-1)*map.tuilleWidth ;
        this.Y = ((this.rowTreasure-1)*map.tuilleHeight)-33;
    }

    update(dt)
    {
        let map = STORE.getIteme('MAP');
        this.ReplaceTreasure();
        this.treasure.x = this.X ;
        this.treasure.y= this.Y ;
        this.treasure.update(dt);

        this.treasure.cameraX = map.cameraX;
        this.treasure.cameraY = map.cameraY;

    }

    draw(ctx)
    {
        this.treasure.draw(ctx);
    }
}