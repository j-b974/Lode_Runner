class Monstre extends Mortel{

    constructor(pimg , pcol , prow)
    {
        super(pimg, pcol , prow-1);
       

        this.setMonstreAnimation();

    }

    setMonstreAnimation()
    {
        this.setAnimation(110,127);
        this.addAnimation('run',[1,2,3,5],0.2,true);
        this.StartAnimation('run');
    }


    update(dt)
    {

        super.update(dt);

        let map = STORE.getIteme('MAP');
        this.ReplaceMortel();


    }


}