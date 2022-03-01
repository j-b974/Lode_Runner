class Loader{

    constructor()
    {
        this.listLoaded = [];
        
        this.lstPath = [];

        this.callBack = null;

        this.nbLoaded = 0;

        this.ratio = 0;
    }

    addPath(pname , pPath)
    {
        this.lstPath.push([pname , pPath]);
    }

    start(pcallBack)
    {
        this.callBack = pcallBack;

        this.lstPath.forEach(([name ,path])=>{
            
            let promImg = new Promise((resolve , error)=>{

                let img = new Image();
                
                img.src = path;
                
                setTimeout(()=>{
                    
                  
                    img.onload = resolve(img);
                    
                },1000)
    
            }).then((value)=>{
    
                this.listLoaded[name] = value;
                this.charge();
            })
            
            
            
        })
    }
    loadImage(pPath)
    {
        

            
    }

    getImage(pname)
    {
        return this.listLoaded[pname];
    }
    charge()
    {
        this.nbLoaded++;

        this.ratio = this.nbLoaded/this.lstPath.length;

        console.log('ratio '+ this.ratio);
        if(this.nbLoaded == this.lstPath.length)
        {
            this.callBack();
        }
    }
    getRatio()
    {
        return this.ratio;
    }

    
}