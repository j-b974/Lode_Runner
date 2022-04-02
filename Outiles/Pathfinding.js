import {astar, Graph}from '../src/pathFindingAstar/Astar.js';
export class Pathfinding
{
    constructor(map)
    {
        this.map = map;
       
        this.grid = null;

    }

    /**
     * 
     * @returns {array[{row , col}]}
     */
    get_path_finding( startRow , startCol , endRow ,endCol)
    {
        if(!this.in_Map(startRow,startCol) || !this.in_Map(endRow , endCol))
        {
            throw "error : PathFing Hors de la map !!!";
        }
        
        this.grid = new Graph(this.map);

        /**
         * Graph.grid[row][col]
         */
        let start = this.grid.grid[startRow-1][startCol-1];
        let end = this.grid.grid[endRow-1][endCol-1];

        /**
         * @var {array[GridNode]} {'x' : row , 'y':col, ...}
         */
        var resul = astar.search( this.grid, start, end, { heuristic: astar.heuristics.manhattan });

        let format = this.formate_path_give(resul);

        return format;
    }


    /**
     * 
     * @param {[GridNode]} path 
     * @returns {row , col};
     */
    formate_path_give(path)
    {
        let format = [];

        format = path.map((gridNode)=>{

            return  { 'row' : gridNode.x+1 , 'col' : gridNode.y+1 } ;
        });
        return format;
    }

    in_Map(row , col)
    {
        if(this.map[row] === undefined || this.map[row][col]=== undefined) {return false}

        return true;
    }
}