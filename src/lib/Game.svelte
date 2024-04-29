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

    let testMove = {x: 0, y: 0};

    $: squareSize = Math.floor($board.size/rows)    

    let portrait = false;

    $: if  ($vw < $vh) { // portrait orientation
            portrait = true;
            $board.size = $vw;
            width = 1;
        } else {
            width = 39;
            if (portrait) {
                $board.size = $board.resizedSize;
                portrait = false;
            }            
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
        $game.starter = ($game.starter === 'human') ? 'ai' : 'human';

        console.log("GAME OVER");

    }

    function markMove(x: number, y: number) {       
        

        if ($winner !== '')
            return; // game over
        if ($squares[x][y] !== '-')
            return; // square played
        if ($game.movesNext !== 'human')
            return; // wrong turn

        $squares[x][y] = humanMark;
        $game.status = 'ready';
        lastMove = {x: x, y: y};
        $game.moves.push(lastMove);

        $winnerLine = AI.checkFive(x, y, $squares);
        
        if ($winnerLine.length > 0) {
            animate = true;
            return;
        }
        
        console.log("Tasuri? " + AI.checkDraw($squares));
        if (AI.checkDraw($squares)) {
            $winner = "Tasapeli";
            $game.status = 'over';            
            $game.starter = ($game.starter === 'human') ? 'ai' : 'human';
            return;
        }
        
        playAI(humanMark === 'O' ? 'X' : 'O');        
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
        $game.moves.push(lastMove);
        $winnerLine = AI.checkFive(move.x, move.y, $squares);
        console.log("winnerLine: " + $winnerLine);
        $game.movesNext = 'human';

        if ($winnerLine.length > 0) {
            animate = true;
            return;
        }
        
        if (AI.checkDraw($squares)) {
            $winner = "Tasapeli";
            $game.status = 'over';
            $game.starter = ($game.starter === 'human') ? 'ai' : 'human';            
        }   
    }

    export function newGame(size=15, m) {
        console.log("creating a new game-----");
        
        humanMark = m;
        $game.humanMark = m;
        $squares = Array(size).fill().map(()=> Array(size).fill("-"));
        $winnerLine = [];
        $winner = '';
        $game.status = 'ready'
        $game.moves = [];       
        $game.movesNext = $game.starter;

        if ($game.movesNext === 'ai') {
            let move = AI.playMove($squares.slice(), humanMark === 'O' ? 'X' : 'O');        
            $squares[move.x][move.y] = move.mark;
            lastMove = {x: move.x, y: move.y};
            $game.moves.push(lastMove);
            $game.movesNext = 'human';
        }
    }    
    
    export function showLastMove() {
        lastMove =  $game.moves.at(-1);     
        visible = true;        
        setTimeout(()=> {visible = false}, 500);       
    }

    export function moveBack() {
        
        let last =  $game.moves.pop();
        console.log("taking a move back:", last);
        console.log("moves:", $game.moves);

        if (last) {
            $squares[last.x][last.y] = '-';
            $game.movesNext = ($game.movesNext === 'human') ? 'ai' : 'human';
            lastMove = last;
        }
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
            margin-left: 0px;
            margin: auto;
        }
    }
    
</style>
	