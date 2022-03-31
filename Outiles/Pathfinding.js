import {astar, Graph}from '../src/pathFindingAstar/Astar.js';
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
        
        this.grid = new Graph(this.map);

        /**
         * Graph.grid[row][col]
         */
        let start = this.grid.grid[1][4];
        let end = this.grid.grid[3][5];

        /**
         * @var {[GridNode]} {x : row , y:col}
         */
        var resul = astar.search( this.grid, start, end, { heuristic: astar.heuristics.manhattan });

       

        console.log('le chemin', resul);
    }
}