/**
 * @namespace PF.Heuristic
 * @description A collection of heuristic functions.
 */


    /**
     * Manhattan distance.
     * @param {number} dx - Difference in x.
     * @param {number} dy - Difference in y.
     * @return {number} dx + dy
     */
    let manhattan= function(dx, dy) {
        return dx + dy;
    };
  
    /**
     * Euclidean distance.
     * @param {number} dx - Difference in x.
     * @param {number} dy - Difference in y.
     * @return {number} sqrt(dx * dx + dy * dy)
     */
    let euclidean= function(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
    };
  
    /**
     * Octile distance.
     * @param {number} dx - Difference in x.
     * @param {number} dy - Difference in y.
     * @return {number} sqrt(dx * dx + dy * dy) for grids
     */
   let  octile= function(dx, dy) {
        var F = Math.SQRT2 - 1;
        return (dx < dy) ? F * dx + dy : F * dy + dx;
    };
  
    /**
     * Chebyshev distance.
     * @param {number} dx - Difference in x.
     * @param {number} dy - Difference in y.
     * @return {number} max(dx, dy)
     */
    let chebyshev = function(dx, dy) {
        return Math.max(dx, dy);
    };
    export {manhattan , euclidean , octile ,chebyshev};
