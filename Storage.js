class Storage{

    constructor()
    {
        this.storage=[];
    }
    addStorageIteme(name,iteme)
    {
        this.storage[name]=iteme;
    }

    getIteme(name)
    {
        return this.storage[name];
    }

    removeIteme(iteme)
    {
        let index = this.storage.indexOf(iteme);
        if(index >=0)
        {
            this.storage.splice(index,1);
        }else{

            console.log("supression du Iteme dans le stroge non efféctuéé !!!!");
        }
    }


}