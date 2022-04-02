import {Contingent} from './Contingent.js';
class Monstre extends Contingent{

    constructor(pimg , pcol , prow)
    {
        super(pimg, pcol , prow);
       
        this.setMonstreAnimation();
        this.speed = 150;

        this.ajustY = -33;// replace l'affichage du sprite en y | en x not implemente !

        this.path = [{'col': 0 , 'row':0}];//default

        this.delaySeachPath = 100;
        this.chronoDelay = this.delaySeachPath;
        this.currentPath = 0;
        
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

    findingHero()
    {
        this.currentPath = 0;
        this.path= STORE.getIteme('MAP').get_path_finding(this.row ,this.col);
        
        if(this.path.length == 0 )
        {
            this.path = [{'col': 0 , 'row':0}];//default
        }
    }

    ReplaceContingent()
    {
        let map = STORE.getIteme("MAP");

        this.x = (this.col-1)*map.tuilleWidth ;
        this.y = ((this.row-1)*map.tuilleHeight);
    }
    is_collision(pxOff, pyOff)
    {
        let collision = false;
        let lstSprite = STORE.getIteme("LST_SPRITE");
        if(lstSprite ==null){return  collision;}

        for (const spt of lstSprite) {
            
            if(spt instanceof Monstre){
                if(spt.x == this.x && spt.y == this.y )
                {
                    // continue;
                }else{
                    if(isCollision(spt.x ,spt.y,spt.setFrame.width,spt.setFrame.height ,this.x+(pxOff*75) , this.y+(pyOff*75) , this.setFrame.width,this.setFrame.height))
                    {
                        return collision =  true ;
                        
                    }
                }
            }
        }

        return collision;
    }


    update(dt)
    {
        super.update(dt);

        let map = STORE.getIteme('MAP');
        
        this.chronoDelay -= dt*60;
        
        if(this.chronoDelay < 0)
        {
            this.chronoDelay = this.delaySeachPath;
            this.findingHero();
            
        }
       
      
        if(!this.moving)
        {
            this.ReplaceContingent();

            

            //================== commande pour Deplacer ==============

            if( this.path[this.currentPath].col > this.col && !this.is_wall(1,0) && (!this.is_fallable(0,1)|| this.is_liane(0,0)))
            {
                this.StartAnimation('run_right');
                if(!this.is_collision(1,0))
                {
                    this.colMove++;
                    this.moving=true;
                }
                
            }

            else if(this.path[this.currentPath].col < this.col && !this.is_wall(-1,0) && (!this.is_fallable(0,1)|| this.is_liane(0,0) ))
            {
                this.StartAnimation('run_left');
                if(!this.is_collision(-1,0))
                {
                    this.colMove--;
                    this.moving = true;
                }
                
            }

            else if(this.path[this.currentPath].row < this.row && this.is_Gripable(0,0) && !this.is_wall(0,-1))
            {
                // this.StartAnimation('grimp');
                if(!this.is_collision(0,-1))
                {
                    this.rowMove--;
                    this.moving = true;
                }

                
            }

            else if(this.path[this.currentPath].row > this.row && (this.is_Gripable(0,0)||this.is_Gripable(0,1)) && !this.is_wall(0,1))
            {
                //  this.StartAnimation('grimp');
                if(!this.is_collision(0,1))
                {
                    this.rowMove++;
                    this.moving = true;
                }

            }

            if((this.is_fallable(0,1) || this.is_hole(-1 , 0)) && !this.is_liane(0,0))
            {
                if(!this.is_collision(0,1))
                {
                    this.rowMove++;
                    this.moving = true;
                }

            }
            // if(this.is_treasure(0,0))
            // {
            //     this.collect_treasure(0 ,0);
            // }

        }

        
        //====================== increment currentPath =====================

        if(this.currentPath < this.path.length-1)
        {

            if(this.path[this.currentPath].row == this.row && this.path[this.currentPath].col == this.col)
            {
                this.currentPath++;
            }
        }else{
            this.findingHero();
        }


     
    }

    // ========================= debug pathfinding ==================
    // draw(ctx)
    // {
    //     super.draw(ctx);

    //     this.path.forEach((path)=>
    //     {
    //         drawCircle(ctx  , (path.col-1)*75+(75/2)+this.cameraX ,(path.row-1)*75+(75/2)+this.cameraY, 5 , '#69CD06');
    //     });
    // }
 

}
export {Monstre};