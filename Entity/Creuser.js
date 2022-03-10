class Creuser extends Contingent
{
    constructor(pimg , pCol , pRow)
    {
        super(pimg , pCol , pRow);

        this.setAnimationCreuse();

    }

    setAnimationCreuse()
    {
        this.setAnimation(75,75);
        this.addAnimation('Creux',[1,2,3,4,5],0.1,false);
        this.addAnimation('DeCreux',[5,4,3,2,1],0.1,false);
        this.StartAnimation('Creux');
    }
}