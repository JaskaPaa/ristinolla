<script lang='ts'>
	import Square from './Square.svelte';
    import { fade } from 'svelte/transition';
    
    import { winnerLine, winner, board, game, vw, vh } from './stores.js';
	import type Game from './Game.svelte';
    
    export let gameRef: Game;
    
    let hidden = false;
    let boardSize = 15;
    let mark = 'X';
    let statusInfo = "";
    
    $: hidden = ($winner === '') ? true : false;
    
    //$: if ($game.status === 'ready' && gameRef !== undefined) gameRef.newGame(boardSize, mark);
    
    $: statusInfo = ($game.movesNext === 'human') ? "Sinun vuorosi" : "Tietokoneen vuoro"
    $: if ($winner === 'X')  statusInfo = "Risti voitti"
    $: if ($winner === 'O')  statusInfo = "Nolla voitti"
    $: if ($winner == 'Tasapeli')  statusInfo = "Tasapeli"

    function changeBoardSize(size: number) {
        size = (boardSize + size < 10) ? 0 : size;
        size = (boardSize + size > 30) ? 0 : size;
        
        boardSize += size;		
	}

</script>

<div class="theme-colors panel">
    <div class="status">
        <p>Pisteesi:</p>
    </div>
    <div class="score">
        <p>{$game.score.human} - {$game.score.AI}</p>
    </div>
    <div class="status">
        <p>{statusInfo}</p>
    </div>
    <button class:hidden={($game.status === 'over') ? false : true} class="button-7"
        on:click={() => gameRef.newGame(boardSize, mark)}><h2>Uusi peli</h2></button>
    <div class:hidden={($game.status === 'started' || $game.status === 'over') ? false : true}>
        <p>
        <button class="action-button" on:click={gameRef.moveBack}> &#x21b6; </button>
        <button class="action-button" on:click={gameRef.resign}> &#127987; </button>
        </p>        
        <button class="button-7" on:click={gameRef.showLastMove}>Viime siirto</button>
    </div>
    <div class:hidden={($game.status === 'ready') ? false : true}>        
        <div class="size">
            <button class="button-7 theme-colors size-button"
                on:click={() => changeBoardSize(-5) } >&#xff0d;</button>
            <div class="theme-colors size-display button-7">{boardSize}&times;{boardSize}</div>
            <button class="button-7 theme-colors size-button" style="border-radius: 0% 50% 50% 0%;"
                on:click={() => changeBoardSize(+5) } >&#xff0b;</button>
        </div>    
        <br>        
        <button class="mark-button" on:click={ () =>  mark = 'X' }>
            <svg class="square-colors2" class:mark-selected={(mark === 'X') ? true : false} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >	
                <line opacity="0.8" stroke-width="12%" x1="20%" y1="20%" x2="80%" y2="80%"></line>
                <line opacity="0.8" stroke-width="12%" x1="80%" y1="20%" x2="20%" y2="80%"></line>			
            </svg>
        </button>
        <button class="mark-button" on:click={ () =>  mark = 'O' }>
            <svg class="square-colors2" class:mark-selected={(mark === 'O') ? true : false} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
                <circle fill="none" opacity="0.8" stroke-width="12%" cx="50%" cy="50%" r="30%">
                </circle>				
            </svg>
        </button>
    </div>
    
    <div class="status">
        <br>
    </div>    
</div>

<style>
    .panel {        
        height: min-content;
        background-color: transparent; 
        align-items: center;
    }   
    
    .size {
        display: inline-flex;
        flex-direction: row;
        flex-basis: auto;
        margin: auto;
        flex-shrink: 0;
        align-items: center;
        font-size: 1.2rem;
    }
    
    .size-button {        
        width: 1.5rem;
        border-radius: 50% 0% 0% 50%;        
    }

    .size-display {
        margin: -0.2rem;
    }

    .mark-button {
        width:  2.5rem;
        height: 2.5rem;
        border: 0;
    }

    .action-button {
        width:  2.5rem;
        height: 2.5rem;
        border: 0;
        font-size: 1.5rem;
        background-color: var(--color-bg-1);
        color: var(--color-fg-1);
    }

    .mark-selected {
        stroke: rgb(5, 187, 5);
        border-color: rgb(2, 177, 2);
        stroke: rgb(1, 43, 1);
        border-color: rgb(0, 102, 0);
        stroke: var(--color-1);   
    }

    .score {
        width: 100%;        
        font-size: 2rem;
    }

    .status {
        width: 100%;
        background-color: var(--color-bg-1);
        font-size: 1.5rem;
    }

    .hidden {
		display: none;
	}
</style>