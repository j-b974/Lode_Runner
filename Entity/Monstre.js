class Monstre extends Contingent{

    constructor(pimg , pcol , prow)
    {
        super(pimg, pcol , prow);
       
        this.setMonstreAnimation();
        this.speed = 150;

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
         this.addAnimation('run_right',[0,1,2,3],0.2,true);
         this.addAnimation('run_left',[4,5,6,7],0.2,true);
         this.StartAnimation('run_right');
    }
    ReplaceContingent()
    {
        let map = STORE.getIteme("MAP");

        this.x = (this.col-1)*map.tuilleWidth ;
        this.y = ((this.row-1)*map.tuilleHeight)-33;
    }


    update(dt)
    {

        let hero = STORE.getIteme("HERO");
 
        super.update(dt);

        let map = STORE.getIteme('MAP');
        

        if(!this.moving)
        {
            this.ReplaceContingent();
            
            //================== commande pour Deplacer ==============

            if(this.x < hero.x && !this.is_wall(1,0) && (!this.is_fallable(0,1)|| this.is_liane(0,0)))
            {
                this.StartAnimation('run_right');
              
                this.colMove++;
                this.moving=true;
            }

            else if(this.x > hero.x && !this.is_wall(-1,0) && (!this.is_fallable(0,1)|| this.is_liane(0,0) ))
            {
                this.StartAnimation('run_left');
     
                 this.colMove--;
                 this.moving = true;
            }

            else if(this.y > hero.y && this.is_Gripable(0,0) && !this.is_wall(0,-1))
            {
                // this.StartAnimation('grimp');
     
                this.rowMove--;
                this.moving = true;
                
            }

            else if(this.y < hero.y && (this.is_Gripable(0,0)||this.is_Gripable(0,1)) && !this.is_wall(0,1))
            {
                //  this.StartAnimation('grimp');

                this.rowMove++;
                this.moving = true;
            }

            if((this.is_fallable(0,1) || this.is_hole(-1 , 0)) && !this.is_liane(0,0))
            {
                
                this.rowMove++;
                this.moving = true;
            }
            // if(this.is_treasure(0,0))
            // {
            //     this.collect_treasure(0 ,0);
            // }
  

        }


        


    }


}