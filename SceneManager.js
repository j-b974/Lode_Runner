class SceneManager{

    constructor()
    {
        this.lstScene = {}
        this.sceneCurrent = null;
    }

    addScene(pname, pscene)
    {
        this.lstScene[pname]= pscene;
    }
    setScene(pname)
    {
        if(this.lstScene[pname] == undefined ) {console.log("erreur set Scene !!!")}
        this.sceneCurrent = this.lstScene[pname]
    }
    update(dt)
    {
        this.sceneCurrent.update(dt);
    }
    draw(ctx)
    {
        this.sceneCurrent.draw(ctx);
    }
}