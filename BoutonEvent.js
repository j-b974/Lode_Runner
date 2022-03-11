class BoutonEvent{

    /**
     * @var this.pressable[] prédéfini la liste des boutons prise en charge !!!
     */
    constructor()
    {
        this.state = [];
        this.oldState = [];

        this.pressable = ['ArrowUp','ArrowRight','ArrowDown','ArrowLeft','Space','KeyF','KeyA'];

    }

    is_pressable(pkey)
    {
        return  this.pressable.find((value) => {return value == pkey;}) ;
    }


    /**
     * 
     * @param {string} pkey code name du bouton
     * @description change et stock l'etat d'un bouton dans un tableau assosiatif 
     * @returns {bool} si la valeur de pkey est pris en charge !
     */
    btnPress(pkey)
    {
        if(this.is_pressable(pkey))
        {
            this.oldState[pkey]= this.state[pkey] ?? false;
            this.state[pkey]=true;
            return true;
        }else{

            console.log("bouton non pris en charge !!!");
            return false;
        }
     
    }

    /**
     * 
     * @param {string} pkey code name du bouton
     * @description change et stock l'etat d'un bouton dans un tableau assosiatif 
     * @returns {bool} si la valeur de pkey est pris en charge !
     */
    btnRelease(pkey)
    {
        if(this.is_pressable(pkey))
        {
            this.oldState[pkey] = this.state[pkey] ?? false;

            this.state[pkey] = false;
            return true;
        }else{

            return false;
        }
    }

    get_state(pkey)
    {
        return this.state[pkey] == null ? false : this.state[pkey];  
    }
    get_oldstate(pkey)
    {
        return this.oldState[pkey] == null ? false : this.oldState[pkey];
    }


    is_Pressed(pkey)
    {
        return this.get_state(pkey);
    }

    /**
     * 
     * @param {string} pkey doit etre comprise dans this.pressable
     * 
     * @description verifie que le touche a était relacher 1 fois
     * 
     * @returns {boolean}
     */
    is_Release(pkey)
    {
        if( this.get_oldstate(pkey) == true && this.get_state(pkey) == false)
        {
            this.initState(pkey);
            
            return true;
        }
        return false;
    }

    initState(pkey)
    {
        delete this.state[pkey];
        delete this.oldState[pkey];
    }

}