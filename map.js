class map{

    // TO DO scroler le background

    /**
     * @param {img} backgroundImg un img de font d'ecran;
     * @param {[img]} lstTuille [ 0 => null ,h => imgH, p => imgp ];
     * @param {[string]} map ["000hhhppp",ppp000hhh];
     * @description la map doit etre liste de string representant les index de la liste de tuille
     */
    constructor (backgroundImg, lstTuille , map)
    {
        this.lstTuille = lstTuille;
        this.map  = map;
        this.background = backgroundImg;
        this.X = 0 ;
        this.Y = 0 ;

        this.MaxWidth= 1125; //TO DO à definir auto
        this.MaxHeight = 975; // TO DO à definir auto

        this.positionMapX = 0;
        this.positionMapY = 0;

        this.cameraX = 0
        this.cameraY = 0

        this.VX = 0;
        this.VY = 0;

       
        this.shadowCubeWidth = WidthWindow/2;
        this.shadowCubeHeight = HeightWindow/2
        this.shadowCubeX = (WidthWindow/2)-(this.shadowCubeWidth/2);
        this.shadowCubeY = (HeightWindow/2)-(this.shadowCubeHeight/2);

        this.backgroundVX = 0;
        this.backgroundVY = 0;
        this.distanceX = 0;
        this.distanceY = 0;
        this.deplaceMax = 50;
    }


    update(dt)
    {
        // this.VX += dt;
        // this.VY += dt

    }

    draw(ctx)
    {

        ctx.drawImage(this.background ,  this.backgroundVX + this.cameraX , this.backgroundVY + this.cameraY);


        let x = 0;
        let y = 0;

        for (let l = 0; l < this.map.length; l++) {
        
            let ligne = this.map[l];

            let nbcol = ligne.length;

            x = 0;

            for (let c = 0; c < nbcol; c++) {

                x = 75 * c;

                let tuille = ligne.substring(c,c+1);
                if( tuille != "0"){
                ctx.drawImage(this.lstTuille[tuille],x+this.cameraX,y+this.cameraY);
                }       
            }
            y+= 75;

        }

        //============ debug ======================  

        // ctx.globalAlpha = 0.45;
        // ctx.fillStyle = 'rgb(0, 0, 0)';
        // ctx.fillRect( this.shadowCubeX +this.VX, this.shadowCubeY + this.VY, this.shadowCubeWidth , this.shadowCubeHeight);
        // ctx.globalAlpha = 1;
        
    }
}