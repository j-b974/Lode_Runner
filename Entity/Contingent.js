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

        this.colContingent = pcol;

        this.rowContingent = prow;

    }

    ReplaceContingent()
    {
        let map = STORE.getIteme("MAP");

        this.x = (this.colContingent-1)*map.tuilleWidth ;
        this.y = ((this.rowContingent)*map.tuilleHeight)-33;
    }

    update(dt)
    {
        /**
         * appel le update parent !
         */
        super.update(dt);


        let map = STORE.getIteme('MAP');
        
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