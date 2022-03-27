
import{Contingent,Treasure ,Creuser,} from '../moduleInjection.js';
class hero extends Contingent {

    constructor(Sprite)
    {
        super(Sprite);

        this.speed = 300;
        this.animation();


        this.col = 2;
        this.row = 2;
        this.colMove = 2;
        this.rowMove = 2;

    
        this.loadPosition();
 
        this.treasureColleted = 0;

      

        this.lstHole = [];
    }

    loadPosition()
    {
        let map = STORE.getIteme("MAP");
        this.X = (this.col -1) * map.tuilleWidth;
        this.Y = (this.row-1 ) * map.tuilleHeight;
    }
    animation()
    {
        this.setAnimation(75, 74);
        this.addAnimation('runRight',[0,1,2,3],0.2 , true);
        this.addAnimation('grimp',[4,5], 0.2,true)
        this.addAnimation('runLeft', [8,9,10,11],0.2,true)
        this.StartAnimation('runLeft');

    }
    /**
     * 
     * @param {int} pxOff 
     * @param {int} pyOff 
     * @description reglage distance en le hero et la tuille 
     * @returns {string}
     */
    Tuille(pxOff,pyOff)
    {
        let map = STORE.getIteme("MAP");

        let x = (this.x + (this.width *0.5) ) + (map.tuilleWidth * (pxOff));
        let y = (this.y+ (this.height)*0.3)+ (map.tuilleHeight*pyOff) ;
        
        let index =  map.getTuilleId( x, y);
        
        return index;

    }


    Replace()
    {
        let map = STORE.getIteme("MAP");
        this.x = (this.col-1)*map.tuilleWidth ;
        this.y = (this.row-1)*map.tuilleHeight;
    }

    /**
     * parcourt la liste des sprite pour déterminer la position des trésors
     */
    is_treasure(pxOff,pyOff)
    {
      
        let lstSprite = STORE.getIteme("LST_SPRITE");
        for (const key in lstSprite) {
            
              let sprite = lstSprite[key];
            if(sprite instanceof Treasure)
            {
                if(sprite.col == (this.col+(pxOff) )&& sprite.row == (this.row+(pyOff)) )
                {
                    return true;
                }
            }
            
        }
        // return 't'== this.Tuille(pxOff,pyOff);
        return false;
    }

    /**
     * @description surpression du tresor de la liste des sprite
     */
    collect_treasure(pxOff, pyOff)
    {
        let lstsprite = STORE.getIteme('LST_SPRITE');

        for (const element in lstsprite) {
           
            let contingent = lstsprite[element];
       
            if( contingent instanceof Treasure)
            {
                if((this.col+(pxOff)) == contingent.col && (this.row+(pyOff)) == contingent.row)
                {
                    let index = lstsprite.indexOf(contingent);

                    if(index != -1)
                    {
                        lstsprite.splice(index , 1);

                        this.treasureColleted++;
                    }
                }

            }
                
           
        }       
       
    }

    Creuse(pcol , prow)
    {
        let alphaT = STORE.getIteme("MAP").AlphaTuille;
        alphaT[prow][pcol]= 0;

        let hole = new Creuser(STORE.getIteme("LOADEUR").getImage('lstMap'));
        hole.row = prow;
        hole.col= pcol;
        hole.x = (pcol)*75;
        hole.y = (prow)*75;
        
        this.lstHole.push(hole);

        STORE.addStorageIteme('LST_HOLE',this.lstHole);
       
    }


    update(dt) // TO DO utiliser storage locato //  TO DO rendre cette partie réutilisatble
    {
        let map = STORE.getIteme("MAP");

        super.update(dt);

        let MaxMapWidth = map.MaxWidth;
        let MaxMapHeight = map.MaxHeight;


        let X = this.x + this.cameraX;
        let Y = this.y + this.cameraY;

        if(!this.moving)
        {
            this.Replace();


            //================ commande pour creuser =================

            if(STORE.getIteme('BTN_EVENT').is_Release("KeyA"))
            {
                this.StartAnimation('runLeft');
                if(this.is_wall(-1,1)&& !this.is_hole(-2,0) && !this.is_Gripable(-1,0)){
                      
                    this.Creuse(this.col-2 , this.row);
                }    

            }
            if(STORE.getIteme('BTN_EVENT').is_Release("KeyF"))
            { 
                this.StartAnimation('runRight');
                if(this.is_wall(1,1)&& !this.is_hole(0,0) && !this.is_Gripable(1,0)){
                   
                    
                    this.Creuse(this.col , this.row);
                }    

            }
            //========================================================




            //================== commande pour Deplacer ==============

            if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowRight")&& !this.is_wall(1,0) && (!this.is_fallable(0,1)|| this.is_liane(0,0)))
            {
                this.StartAnimation('runRight');
              
                this.colMove++;
                this.moving=true;
            }

            else if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowLeft")&& !this.is_wall(-1,0) && (!this.is_fallable(0,1)|| this.is_liane(0,0) ))
            {
                this.StartAnimation('runLeft');
     
                 this.colMove--;
                 this.moving = true;
            }

            else if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowUp") && this.is_Gripable(0,0) && !this.is_wall(0,-1))
            {
                this.StartAnimation('grimp');
     
                this.rowMove--;
                this.moving = true;
                
            }

            else if(STORE.getIteme("BTN_EVENT").is_Pressed("ArrowDown") && (this.is_Gripable(0,0)||this.is_Gripable(0,1)) && !this.is_wall(0,1))
            {
                 this.StartAnimation('grimp');

                this.rowMove++;
                this.moving = true;
            }

            // =============== Tomber ================

            if((this.is_fallable(0,1) || this.is_hole(-1 , 0)) && !this.is_liane(0,0))
            {
                
                this.rowMove++;
                this.moving = true;
            }

            // ===================== collecter les trésor ======================
            if(this.is_treasure(0,0))
            {
                this.collect_treasure(0 ,0);
            }
  

        }

        //===================    gestion camera     =============


            // ============ deplacement ecran vers la gauche limité a la map ===============
       if( X <= map.shadowCubeX && this.x >= map.shadowCubeX)
       {  
           this.cameraX += dt*this.speed;
           map.cameraX += dt*this.speed;
       }

        // ============ deplacement ecran vers la droite limité a la map ===============
        let margeRight = MaxMapWidth -  (WidthWindow -(map.shadowCubeX+map.shadowCubeWidth)+this.setFrame.width);

        if(X > map.shadowCubeX+map.shadowCubeWidth - this.setFrame.width && this.x < margeRight)
        {
            this.cameraX -= dt*this.speed;
            map.cameraX -= dt*this.speed;
        }

        // ============ deplacement ecran vers le Haut limité a la map ===============
       if(Y <= map.shadowCubeY && this.y >= map.shadowCubeY)
       {
           this.cameraY += dt*this.speed;
           map.cameraY += dt*this.speed;
       }

       // ============== deplacement ecran vers le bas ==================

       let margebottom =  MaxMapHeight-(( HeightWindow - map.shadowCubeHeight)/2) ;
       
       if(Y > map.shadowCubeY+map.shadowCubeHeight-this.setFrame.height && this.y <= margebottom )
       {
            this.cameraY -= dt*this.speed;
            map.cameraY -= dt*this.speed;
       }

       this.lstHole.forEach(sprite =>{
           sprite.update(dt);
       })

       //================== liste des hole ==============

       this.lstHole.forEach(creuse =>{

            creuse.update(dt);
            creuse.cameraX = map.cameraX;
            creuse.cameraY = map.cameraY;
            if(creuse.rebuild && creuse.currentAnimation.end)
            {
                map.AlphaTuille[creuse.row][creuse.col]= 100;
                this.lstHole.splice(creuse , 1);
            }
        });

    }
    draw(ctx)
    {
        
        super.draw(ctx);

        this.lstHole.forEach(sprite => {
            sprite.draw(ctx);
        });
    
    // ============ debug ======================    

         ctx.font = "28px serif";
         ctx.fillStyle = 'rgb(255, 255, 255)';
         ctx.fillText('X '+Math.round(this.x),20,20);
         ctx.fillText('Y '+Math.round(this.y),20,50);
         ctx.fillText('tresor ramasser '+this.treasureColleted,20,80);

   
        // ctx.fillText('screenY '+ Math.round(this.Y+this.cameraY),20,100);
    }  
}
export {hero};