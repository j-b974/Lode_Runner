class Contingent extends sprite
{
    /**
     * contingent
     * @param {image} pimg 
     * @param {int} pcol nb en colone x sur la map 
     * @param {int} prow nb en ligne y sur la map
     */
    constructor(pimg, pcol=0 , prow=0)
    {
        /**
         * apple le construteur parent !
         */
        super(pimg);

        this.col = pcol;

        this.row = prow;

        // pour le deplacement 
        this.moving = false;
        this.colMove = pcol;
        this.rowMove = prow;

        this.speed = 300;
        this.caseParcase = 75;
        this.dist = 0

    }

    ReplaceContingent()
    {
        let map = STORE.getIteme("MAP");

        this.x = (this.col-1)*map.tuilleWidth ;
        this.y = ((this.row)*map.tuilleHeight)-33;
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

    let x = (this.x ) + (map.tuilleWidth * (pxOff));
    let y = this.y+ (map.tuilleHeight*(pyOff+1)) ;

    let index =  map.getTuilleId( x, y);

    return index;

    }
     
         is_Gripable(pxOff , pyOff)
         {
            return 'e'== this.Tuille(pxOff,pyOff);
         }
         is_fallable(pxOff ,pyOff)
         {
            return ('0'== this.Tuille(pxOff,pyOff)|| 't' == this.Tuille(pxOff,pyOff));
         }
         is_wall(pxOff , pyOff)
         {
            return 'h'== this.Tuille(pxOff , pyOff);
         }
         is_liane(pxOff, pyOff)
         {
            return 'l'== this.Tuille(pxOff , pyOff);
         }

         is_hole(pxOff , pyOff)
         {
             let lstHole = STORE.getIteme('LST_HOLE');

             if(!lstHole){return false;}

             let h =false;

             lstHole.forEach(hole =>{
                 if(hole.col == this.col+(pxOff) && hole.row == this.row+(pyOff))
                 {
                    h =  true;
                 }
                 
            });
             return h;
         }

    update(dt)
    {
        /**
         * appel le update parent !
         */
        super.update(dt);


        let map = STORE.getIteme('MAP');

        //=============== deplacement =============

        if(this.moving)
        {
            if(this.colMove > this.col)
            {
                this.x += this.speed*dt;
                if(Math.floor(this.x/map.tuilleWidth)+1>= this.colMove)
                {
                    this.col = this.colMove;
                    this.moving = false;
                }
            }
            if(this.colMove < this.col)
            {
                this.x -= this.speed*dt;
                let some = Math.floor( this.x / map.tuilleWidth ) + 1;
                if( some < this.colMove)
                {
                    this.col = this.colMove;
                    this.moving = false;
                }
            } 
            if(this.rowMove > this.row)
            {
                this.y += this.speed*dt;
                if(Math.floor(this.y/map.tuilleWidth)+1 >= this.rowMove)
                {
                    this.row = this.rowMove;
                    this.moving = false;
                }
            } 
             if(this.rowMove < this.row)
            {
                this.y -= this.speed*dt;
                if(Math.floor(this.y/map.tuilleWidth)+1< this.rowMove)
                {
                    this.row = this.rowMove;
                    this.moving = false;
                }
            }
        }
       



        
        this.cameraX = map.cameraX;
        this.cameraY = map.cameraY;


    }

    /**
     * 
     * écrase le draw parent !
     */
    // draw(ctx)
    // {
        
    // }
}