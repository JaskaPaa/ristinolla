<script lang='ts'>
    import { tooltip } from "@svelte-plugins/tooltips";
	import Square from './Square.svelte';
    import { fade } from 'svelte/transition';
    import Backarrow from "./Backarrow.svelte";
    import Flag from "./Flag.svelte"; 
    
    import { winnerLine, winner, board, game, vw, vh } from './stores.js';
	import type Game from './Game.svelte';	
    
    export let gameRef: Game;
    
    let hidden = false;
    let boardSize = 15;
    let mark = 'X';
    let statusInfo = "";
    
    $: hidden = ($winner === '') ? true : false;
    
    $: if (gameRef) gameRef.newGame(boardSize, mark, false);
    
    $: statusInfo = ($game.movesNext === 'human') ? "Sinun vuorosi" : "Tietokoneen vuoro"
    $: if ($winner === 'X')  statusInfo = "Risti voitti"
    $: if ($winner === 'O')  statusInfo = "Nolla voitti"
    $: if ($winner == 'Tasapeli')  statusInfo = "Tasapeli"
    // &#8630;  &#9873;
    function changeBoardSize(size: number) {
        size = (boardSize + size < 10) ? 0 : size;
        size = (boardSize + size > 30) ? 0 : size;
        
        boardSize += size;
        gameRef.newGame(boardSize, mark, false);		
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
    <div class:hidden={($game.status === 'started') ? false : true}>
        <p><span>
        <button class="action-button button-7" use:tooltip={{ content: 'Peruuta siirto' }}
            on:click={gameRef.moveBack}> <Backarrow /> </button>
        <button class="action-button button-7" use:tooltip={{ content: 'Luovuta' }}
            on:click={gameRef.resign}> <Flag /> </button>
        </span>
        </p>        
        <button class="button-7" on:click={gameRef.showLastMove}>Viime siirto</button>
    </div>
    <div class:hidden={($game.status === 'ready') ? false : true}>        
        <div class="size" use:tooltip={{ content: 'Muuta pelialueen kokoa' }}>
            <button class="button-7 theme-colors size-button"
                on:click={() => changeBoardSize(-5) } >&#xff0d;</button>
            <div class="theme-colors size-display button-7">{boardSize}&times;{boardSize}</div>
            <button class="button-7 theme-colors size-button" style="border-radius: 0% 50% 50% 0%;"
                on:click={() => changeBoardSize(+5) } >&#xff0b;</button>
        </div>    
        <br>        
        <button class="mark-button" on:click={ () =>  mark = 'X' } use:tooltip={{ content: 'Valitse risti' }}>
            <svg class="square-colors2" class:mark-selected={(mark === 'X') ? true : false} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >	
                <line opacity="0.8" stroke-width="12%" x1="20%" y1="20%" x2="80%" y2="80%"></line>
                <line opacity="0.8" stroke-width="12%" x1="80%" y1="20%" x2="20%" y2="80%"></line>			
            </svg>
        </button>
        <button class="mark-button" on:click={ () =>  mark = 'O' } use:tooltip={{ content: 'Valitse nolla' }}>
            <svg class="square-colors2" class:mark-selected={(mark === 'O') ? true : false} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
                <circle fill="none" opacity="0.8" stroke-width="12%" cx="50%" cy="50%" r="30%">
                </circle>				
            </svg>
        </button>
    </div>
    
    <div class="bar">
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
        font-size: 2.0rem;
        /*border: 0;        
        background-color: var(--color-bg-1);
        color: var(--color-fg-1);*/
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
        font-weight: bold;
    }

    .bar {
        width: 100%;
        background-color: var(--color-bg-1);
        font-size: 1.0rem;
    }

    .hidden {
		display: none;
	}
</style>