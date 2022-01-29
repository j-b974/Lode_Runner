class sprite{

    constructor(pimg)
    {

        this.img = pimg;
        this.x = 50;
        this.y = 50;
        this.is_animate = false;
        this.scall = 1;
        this.setFrame = {
            width: 0,
            height:0

        };

        this.cameraX = 0;
        this.cameraY = 0;

        this.height = pimg.height;
        this.width = pimg.width;
        this.loop = false;
        this.currentFrame = 3;
        this.lstAnimation = [];
        this.currentAnimation = null;
        this.currentUpFrame = 0;
        this.timer = 0;

    }
    setAnimation(pwidth , pheight )
    {

        this.setFrame.width = pwidth;
        this.setFrame.height = pheight;
       
        this.is_animate = true;
 

    }

    addAnimation(pname , lstFrame , duration , loop)
    {
        let Animation= {
            name:pname,
            lstFrame:lstFrame,
            duration:duration,
            end:false,
        }
        this.loop = loop;

        this.lstAnimation.push(Animation);

    }

    StartAnimation(pname)
    {
        if(this.currentAnimation != null && this.currentAnimation.name == pname && !this.currentAnimation.end)
        {
            return;
        }
        this.lstAnimation.forEach(animation =>{

            if(animation.name == pname)
            {
                this.currentUpFrame = 0;
                this.currentFrame = animation.lstFrame[this.currentUpFrame];

                animation.end = false;
                this.currentAnimation = animation;
            }
        })

    }

    

    update(dt)
    {

        if(this.currentAnimation != null)
        {
            
            this.timer += dt;
            if(this.timer >= this.currentAnimation.duration)
            {
                this.timer = 0;
                this.currentUpFrame++;

                if(this.currentUpFrame >= this.currentAnimation.lstFrame.length)
                {
                    if(this.loop)
                    {
                        this.currentUpFrame = 0;

                    }else{

                        this.currentAnimation.end = true;
                        this.currentUpFrame = this.currentAnimation.lstFrame.length-1;

                    }
                }
                this.currentFrame = this.currentAnimation.lstFrame[this.currentUpFrame];
            }

        }
    }
    draw(ctx)
    {
        if(!this.is_animate)
        {
            ctx.drawImage(this.img , this.x + this.cameraX, this.y+this.cameraY);
        }else{

            let nbColumn = Math.floor(this.img.width/this.setFrame.width);

            let row = Math.floor(this.currentFrame/nbColumn);

            let col = this.currentFrame -(nbColumn*row);

            let x = this.setFrame.width * col;

            let y = this.setFrame.height * row ;


            ctx.drawImage(this.img , x , y ,this.setFrame.width, this.setFrame.height , this.x+this.cameraX ,this.y+this.cameraY , this.setFrame.width*this.scall , this.setFrame.height*this.scall);
        }
    }
}