class Monstre{

    constructor(pimg , pcol , prow)
    {
        this.monstre = new sprite(pimg);

        this.colMonstre = pcol;

        this.rowMonstre = prow;
        this.setMonstreAnimation();

        this.X =0 ;
        this.Y = 0;

    }

    setMonstreAnimation()
    {
        this.monstre.setAnimation(110,127);
        this.monstre.addAnimation('run',[1,2,3,5],0.2,true);
        this.monstre.StartAnimation('run');
    }
    ReplaceMonstre()
    {
        let map = STORE.getIteme("MAP");
        this.X = (this.colMonstre-1)*map.tuilleWidth ;
        this.Y = ((this.rowMonstre-1)*map.tuilleHeight)-33;
    }
    update(dt)
    {

        let map = STORE.getIteme('MAP');
        this.ReplaceMonstre();
        this.monstre.x = this.X ;
        this.monstre.y = this.Y ;
        this.monstre.update(dt);

        this.monstre.cameraX = map.cameraX;
        this.monstre.cameraY = map.cameraY;
    }
    draw(ctx)
    {
        this.monstre.draw(ctx)
    }

}