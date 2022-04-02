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

function isCollision(x1,y1,w1,h1, x2,y2,w2,h2){
    return x1 < x2+w2 &&
           x2 < x1+w1 &&
           y1 < y2+h2 &&
           y2 < y1+h1;
  }

/**
 * 
 * @param {*} pctx 
 * @param {*} px 
 * @param {*} py 
 * @param {*} prayon 
 * @description dessin un cercle 
 */
  function drawCircle(pctx , px , py , prayon,pcolor)
  {
      pctx.fillStyle = pcolor;
      pctx.beginPath();
      pctx.arc(px, py , prayon, 0, 2 * Math.PI, false);
      pctx.stroke();
      pctx.fill();
  }