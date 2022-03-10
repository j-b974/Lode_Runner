class Treasure extends Contingent{
    constructor(pimg, pCol , pRow)
    {
        super(pimg , pCol , pRow)

    }

    update(dt)
    {
        super.update(dt);

        let map = STORE.getIteme('MAP');

        this.ReplaceContingent();


    }
}