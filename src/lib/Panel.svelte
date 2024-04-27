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
    
    $: if ($game.status === 'ready' && gameRef !== undefined) gameRef.newGame(boardSize, mark);
    
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

<div class="theme-colors foo">
    <div class="theme-colors">
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
        <p><button class="button-7" on:click={gameRef.moveBack}>&#x25C0;</button> &#x25B6;</p>        
        <button class="button-7" on:click={gameRef.showLastMove}>Viime siirto</button>
    </div>
    <div class:hidden={($game.status === 'ready') ? false : true}>        
        <div class="size">
            <button class="button-7 theme-colors size-button"
                on:click={() => changeBoardSize(-5) } >&#xff0d;</button>
            <div class="theme-colors size-display button-7">{boardSize}&times;{boardSize}</div>
            <!--div class="theme-colors size-button" on:click={() => { boardSize += 5; gameRef.newGame(boardSize, mark)} } >+5</div-->
            <button class="button-7 theme-colors size-button" style="border-radius: 0% 50% 50% 0%;"
                on:click={() => changeBoardSize(+5) } >&#xff0b;</button>
        </div>    
        <br>
        <!--p class="container">Pelimerkkisi:			
			{#if mark === 'X' }
			<svg class="square-colors" width="1.5rem" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >	
				<line opacity="0.8" stroke-width="12%" x1="20%" y1="20%" x2="80%" y2="80%"></line>
				<line opacity="0.8" stroke-width="12%" x1="80%" y1="20%" x2="20%" y2="80%"></line>			
			</svg>
			{:else}
			<svg class="square-colors" width="1.5rem" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
				<circle fill="none" opacity="0.8" stroke-width="12%" cx="50%" cy="50%" r="30%">
				</circle>			
			</svg>	
			{/if}
			<br>
            <button class="button-7" on:click={changeMark}>Vaihda</button> 
        </p-->
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
    
    <div class="theme-colors">
        <br>
    </div>    
</div>

<style>
    .foo {        
        height: min-content;
        background-color: transparent; 
        /*padding-bottom: 1em;*/
        align-items: center;
    }
    /*.bar {
        width: 100%;
    }*/
    
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
        /*border: 1px solid black;
        font-size: 1.5rem;*/
        width: 1.5rem;
        border-radius: 50% 0% 0% 50%;        
    }

    .size-display {
        /*border: thin solid rgba(255, 255, 255, .2);*/
        margin: -0.2rem;
        /*background-color: rgba(24, 26, 66, 0.9);*/
    }

    .mark-button {
        width:  2.5rem;
        height: 2.5rem;
        border: 0;
    }

    .mark-selected {
        /*border: 1px solid black;
        font-size: 1.5rem;*/
        /*width:  2.5rem;
        height: 2.5rem;*/
        stroke: rgb(5, 187, 5);
        border-color: rgb(2, 177, 2);
        stroke: rgb(1, 43, 1);
        border-color: rgb(0, 102, 0);
        stroke: var(--color-1);   
    }

    .score {
        width: 100%;
        /*background-color: black;*/
        font-size: 2rem;
        /*color: white;*/
    }

    .status {
        width: 100%;
        background-color: gray;
        font-size: 1.5rem;
        /*color: white;*/
    }

    .hidden {
		display: none;
	}

    .container {
    	display: inline-flex;
    	align-items: center;
  	}
</style>