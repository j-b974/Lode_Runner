class Monstre extends Contingent{

    constructor(pimg , pcol , prow)
    {
        super(pimg, pcol , prow-1);
       
        this.setMonstreAnimation();

    }

    setMonstreAnimation()
    {
        // this.setAnimation(110,127);
        // this.addAnimation('run',[1,2,3,5],0.2,true);
        // this.StartAnimation('run');
        
        /**
         * squellet run 121X112
         * 
         */

         this.setAnimation(120,113);
         this.addAnimation('run_Left',[0,1,2,3],0.2,true);
         this.addAnimation('run_right',[4,5,6,7],0.2,true);
         this.StartAnimation('run_right');
    }


    update(dt)
    {

        super.update(dt);

        let map = STORE.getIteme('MAP');
        this.ReplaceContingent();


    }


}