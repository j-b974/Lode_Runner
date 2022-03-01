console.log("fonction charger !!!");
/**
 * 
 * @returns {int}
 * @description calcule la distance en 2 point 
 */
function distance(xA , yA , xB , yB)
{
    return Math.sqrt(( xB- xA)^2+(yB - yA)^2)
}

/**
 * 
 * @returns {int}
 * @description calcule la distance entre 2 points
 */
function distanceJS(xA , yA , xB , yB)
{
    return Math.hypot((xB - xA),(yB - yA));
}

function distanceInfini(xA , yA , xB , yB)
{
    return Math.max(Math.abs(xB - xA),Math.abs(yB - yA));
}