import * as PF from '../src/pathfinding/pathfinding.js';
export class Pathfinding
{
    constructor(map)
    {
        this.map = map;
       
        this.grid = null;

        this.get_path_finding();

    }

    get_path_finding()
    {
        
        this.grid = new PF.Grid(this.map);

        let gridbackup = this.grid.clone();

        let finder = new PF.BreadthFirstFinder({
            heuristic: function(dx, dy) {
                return Math.min(dx, dy);
            }
        });
        var path = finder.findPath(3, 1, 2, 7, this.grid);

        console.log('le chemin', path);
    }
}