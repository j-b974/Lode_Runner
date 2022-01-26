class map{


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

        this.VX = 0;
        this.VY = 0;

       
        this.shadowCubeWidth = WidthWindow/2;
        this.shadowCubeHeight = WidthWindow/2
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

        ctx.drawImage(this.background , this.X+ this.backgroundVX , this.Y+this.backgroundVY);


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
                ctx.drawImage(this.lstTuille[tuille],x+this.VX,y+this.VY);
                }
            
            }

            y+= 75;

        }

        // ctx.fillRect( this.shadowCubeX +this.VX, this.shadowCubeY + this.VY, this.shadowCubeWidth , this.shadowCubeHeight);
        
    }
}