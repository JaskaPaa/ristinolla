<script lang='ts'>

    import * as AI from "./AI.js";
	import Square from './Square.svelte';
    import Resizebutton from './Resizebutton.svelte';
    import { fade } from 'svelte/transition';
    import { beforeUpdate, afterUpdate } from 'svelte';
    import { gameBackground, gameLineColor, gameMarkColor, squares, winnerLine, winner, board, game, vw, vh } from './stores.js';
    
    let rows = $squares.length;

    $: rows = $squares.length;

    let lastMove = {x: 0, y: 0};
    let visible = false;
    let line = [0, 0, 0, 0];
    let squareSize = 20;
    let animate = false;
    let width = 39;   
    
    let background = '#777';

    gameBackground.subscribe(value => {background = value});

    let borderColor = '#abc'
    gameLineColor.subscribe(value => {borderColor = value});

    //$board.size = rows * 2*parseFloat(getComputedStyle(document.documentElement).fontSize)

    //$: console.log(`rem size: ${parseFloat(getComputedStyle(document.documentElement).fontSize)}`); 

    let testMove = {x: 0, y: 0};

    $: squareSize = Math.floor($board.size/rows)
    //$: width = ($board.size - rows*squareSize)/2
    
    //(Math.round($board.size/rows)%2 === 0) ? Math.round($board.size/rows) : Math.round($board.size/rows);
    
    $: console.log(`Changed square: ${squareSize} board.size: ${$board.size}`);

    $: console.log($game)

    $: console.log('vw:', $vw)
    $: console.log('vh:', $vh)

    let lastSize = $board.size;

    $: if  ($vw < $vh) { // portrait orientation
            lastSize = $board.size;
            $board.size = $vw;
            width = 1;
        } else {
            width = 39;
            //$board.size = lastSize;
        }

    let humanMark = 'X';

    $: if ($winnerLine.length > 0) {
        
        let ss = squareSize;

        line[0] = Math.floor($winnerLine[1]*ss + ss/2 + 1);
        line[1] = Math.floor($winnerLine[0]*ss + ss/2 + 1);
        line[2] = Math.floor($winnerLine[9]*ss + ss/2 + 1);
        line[3] = Math.floor($winnerLine[8]*ss + ss/2 + 1);        
        
        $winner = $squares[lastMove.x][lastMove.y];

        console.log("winner:", $winner);
        console.log("ss:", humanMark);
        
        if ($game.status !== 'over') {
            if ($winner === humanMark)
                $game.score.human++;
            else 
                $game.score.AI++;
        }
        
        $game.status = 'over';
        $game.movesFirst = ($game.movesFirst === 'human') ? 'ai' : 'human';

        console.log("GAME OVER");

    }

    //newGame(15, 'X');

    function markMove(x: number, y: number) {
        
        console.log("Squares:", $squares);

        if ($winner !== '')
            return; // game over
        if ($squares[x][y] !== '-')
            return; // square played

        $squares[x][y] = humanMark;
        $game.status = 'ready';
        lastMove = {x: x, y: y};
        $winnerLine = AI.checkFive(x, y, $squares);
        
        if ($winnerLine.length > 0) {
            animate = true;
            return;
        }
        
        console.log("Tasuri? " + AI.checkDraw($squares));
        if (AI.checkDraw($squares)) {
            $winner = "Tasapeli";
            $game.movesFirst = ($game.movesFirst === 'human') ? 'ai' : 'human';
            return;
        }
        
        playAI(humanMark === 'O' ? 'X' : 'O');
        //background = "#251";    
    }   

    function playAI(inTurn) {        

        if ($winner !== '')
            return; // game over
        
        let level = (Math.random() * 3 < 2) ? 0 : 0;
        let move = AI.playMove($squares.slice(), inTurn, level);

        console.log("Move:", move);

        $squares[move.x][move.y] = move.mark;
        $game.status = 'started';
        lastMove = {x: move.x, y: move.y};
        $winnerLine = AI.checkFive(move.x, move.y, $squares);
        console.log("winnerLine: " + $winnerLine);

        if ($winnerLine.length > 0) {
            animate = true;
            return;
        }
        
        console.log("Tasuri? " + AI.checkDraw($squares));
        if (AI.checkDraw($squares)) {
            $winner = "Tasapeli";
            $game.movesFirst = ($game.movesFirst === 'human') ? 'ai' : 'human';
        }   
    }

    export function newGame(size=15, m) {
        console.log("creating a new game-----");
        
        humanMark = m;
        //rows = size;
        $squares = Array(size).fill().map(()=> Array(size).fill("-"));
        $winnerLine = [];
        $winner = '';
        $game.status = 'ready'        
        //humanPlaysFirstMove = (humanPlaysFirstMove) ? false : true;
        console.log("rows:", $squares.length);

        if ($game.movesFirst === 'ai') {
            let move = AI.playMove($squares.slice(), humanMark === 'O' ? 'X' : 'O');        
            $squares[move.x][move.y] = move.mark;
            lastMove = {x: move.x, y: move.y};
        }
    }    
    
    export function showLastMove() {        
        visible = true;        
        setTimeout(()=> {visible = false}, 500);
        
        /*let elem = document.getElementById('board');
        let rect = elem.getBoundingClientRect();

        console.log("Width:", rect.width, "px");
        console.log("Height: " + rect.height + "px");
        console.log("calc:", rows*(squareSize), " = ", rows, " * ", squareSize );
        console.log("$board.size:", $board.size);
        console.log("$board.size - rows*squareSize", $board.size - rows*squareSize);
        console.log("width", width);*/ 
    }

	
</script>

<div id="board" class="wrapper square-colors" style="--width:{width}; width:{rows*squareSize + width}px; ">
    {#if $winnerLine.length > 0 }
    <svg height={rows*(squareSize)} width={rows*(squareSize)}>
        <line x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} 
            opacity="0.6" stroke-width={squareSize/3} 
            stroke-linecap="round">
            {#if animate }            
            <animate attributeType="XML" values={"gray;black"}
            attributeName="stroke" dur="0.5s" repeatCount="3" />
            {/if}
        </line>                       
    </svg>
    {/if}
    {#each $squares as row, i}
		<div class="board-row">
		{#each row as square, j}
            <Square onClick={() => markMove(i, j)}
                text={($squares[i][j] === '-') ? '' :  $squares[i][j]}
                anim={(i == lastMove.x && j == lastMove.y && visible) ? true : false}
                size={squareSize}
                />            		
		{/each}
		</div>
	{/each}
    {#if $vw > 800 }
    <Resizebutton bind:resized={$board.size} top={rows*(squareSize)} left={rows*(squareSize)}  />
    {/if}   
</div>

<style>

    .board-row:after {
        clear: both;
        content: "";
        display: table;
    }

    svg {
        position: absolute;
        top: 0px; left: 0px;
    }

    .wrapper {
        position: relative;
        border-width: 19px 20px 20px 19px;
        /*border-width: calc( (var(--width)-1) * 1px) 
        calc( var(--width) * 1px) calc( var(--width) * 1px) calc( (var(--width)-1) * 1px);*/
        /*background-color: #222;*/
        /*resize: both;
	    overflow: hidden;*/
        
    }

    @keyframes dash {
        to {
            stroke-dashoffset: 1000;
        }
    }

    @media (orientation: portrait) {
		.wrapper {
            position: relative;
            border-width: 10px 1px 10px 0px;
            /*border-width: calc( (var(--width)-1) * 1px) 
            calc( var(--width) * 1px) calc( var(--width) * 1px) calc( (var(--width)-1) * 1px);*/
            /*background-color: #222;*/
            /*resize: both;
            overflow: hidden;*/
            margin-left: 0px;
            margin: auto;
    }
    }

    /*@media screen and (max-width: 50rem) {
        svg {
            width:  640px;
            height: 640px;
        }
    }*/


</style>
	