<script lang="ts">

	//import Square from '$lib/Square.svelte';
	import { onMount } from "svelte";
	import Game from '$lib/Game.svelte';
	import Panel from '$lib/Panel.svelte';
	import { gameBackground, gameLineColor, vw, vh, winner, game, board } from '$lib/stores.js';


	let boardSize = 15;
	let gameRef: Game;
	let score = {X: 0, O: 0};

	let color2 = "#222222";
	//$: gameBackground.set(color2);

	let color1 = "#777777";
	//$: gameLineColor.set(color1);
	
	$: {
		console.log(`Changed vw: ${$vw}`);
		//if ($vw < 800)
		//	$board.size = $vw - 19;
	} 

	function viewportResize() {
		vw.set(window.visualViewport.width);
		vh.set(window.visualViewport.height);
	}

	function changeSize() {
		boardSize += 1;
		gameRef.newGame(boardSize);
	}

	let mark = 'X';
	let changeDisabled = true;

	$: changeDisabled = ($game.status === 'started') ? true : false;
	
	$: console.log("status:", $game.status);

	function changeMark() {
		mark = (mark === 'X') ? 'O' : 'X';
		if ($game.status === 'ready')
			gameRef.newGame(boardSize, mark);
	}

    onMount(() => {
        console.log(window.innerWidth + " -------------------");
        window.visualViewport.addEventListener('resize', viewportResize);
    });

</script>

<svelte:head>
	<title>Ristinolla</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="fi" />
</svelte:head>

<main>
	<div class="left theme-colors">
		<Panel gameRef={gameRef} />
	</div>
	<!--div class="left theme-colors">
		<fieldset>
			<legend>Pelitilanne</legend>			
			<table class="scores">
				<tr>
				  <th>Sinä</th>
				  <th>Tietokone</th>
				</tr>
				<tr>
				  <td id="xscore" class="scores">{$game.score.human}</td>
				  <td id="oscore" class="scores">{$game.score.AI}</td>
				</tr>
			</table>
			<br>
			<p>{($winner === '') ? "Sinun vuorosi" : "Voittaja: " + $winner}</p>
			<p class="container">Pelimerkkisi:
			
			{#if mark === 'X' }
			<svg class="square-colors" width="1.7rem" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >	
				<line opacity="0.6" stroke-width="12%" x1="20%" y1="20%" x2="80%" y2="80%"></line>
				<line opacity="0.6" stroke-width="12%" x1="80%" y1="20%" x2="20%" y2="80%"></line>			
			</svg>
			{:else}
			<svg class="square-colors" width="1.7rem" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
				<circle fill="none" opacity="1.0" stroke-width="12%" cx="50%" cy="50%" r="30%">
				</circle>			
			</svg>	
			{/if}
			<br>
			<button class="button-7" on:click={changeMark} disabled='{changeDisabled}'>Vaihda</button-->
			<!--button on:click={ () => mark = (mark === 'X') ? 'O' : 'X' } class="marks" >
				<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="stroke: black;">	
					<line opacity="1.0" stroke-width="10%" x1="5%" y1="5%" x2="45%" y2="45%"></line>
					<line opacity="1.0" stroke-width="10%" x1="45%" y1="5%" x2="5%" y2="45%"></line>
					<circle fill="none" opacity="1.0" stroke-width="10%" cx="70%" cy="70%" r="22%">
					</circle>			
				</svg>  
			</button-->
			<!--button on:click={() => mark = 'O'} class:anim={mark === 'O' ? true : false} 
				class="marks" style="{ mark === 'O' ? 'background: gray' : 'background-color: white' }" >
				<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="stroke: black;">
					<circle fill="none" opacity="1.0" stroke-width="12%" cx="50%" cy="50%" r="30%">
					</circle>			
				</svg>  
			</button-->
			
			<!--/p>			  
		</fieldset>
		<button class="button-7" on:click={() => gameRef.newGame(boardSize, mark)} disabled='{($winner !== '') ? false : true}'>Uusi peli</button>
		<button class="button-7" on:click={gameRef.showLastMove}>Viime siirto</button>
		<br>
		<button class="button-7" disabled='{changeDisabled}' on:click={ () => {boardSize = 10; gameRef.newGame(boardSize, mark)} }>10&times;10</button>
		<button class="button-7" disabled='{changeDisabled}' on:click={ () => {boardSize = 15; gameRef.newGame(boardSize, mark)} }>15&times;15</button>
		<button class="button-7" disabled='{changeDisabled}' on:click={ () => {boardSize = 20; gameRef.newGame(boardSize, mark)} }>20&times;20</button>
		<button class="button-7" disabled='{changeDisabled}' on:click={ () => {boardSize = 25; gameRef.newGame(boardSize, mark)} }>25&times;25</button>	
	</div-->

	<div class="middle">		
		<Game bind:this={gameRef} />
		<!--h1>vw: {$vw} vh: {$vh}</h1-->
	</div>
	<!--Panel class="left" gameRef={gameRef} /-->
	<div class="right" >		
		<p> {$game.starter === 'human' ? 'Ihmispelaaja' : 'Tietokone'} aloittaa
			Ihmispelaaja: {$game.humanMark} - Tietokone: {$game.humanMark === 'X' ? 'O' : 'X'}</p>
		<p>{$game.moves.length} siirtoa</p>
		
		
		<!--h1>Asetukset</h1>
		<div>
			<input type="color" id="head" name="head"
				bind:value={color2}>
			<label for="head">Tausta</label>
		</div>		
		<div>
			<input type="color" id="body" name="body"
				bind:value={color1}>
			<label for="body">Reuna</label>
		</div>
		<p>Väri: {color2}</p>
		<button on:click={ () => {boardSize += 1; gameRef.newGame(boardSize, mark)} }>++</button>
		<button on:click={ () => {boardSize -= 1; gameRef.newGame(boardSize, mark)} }>--</button>
		<button disabled='{changeDisabled}' on:click={ () => {boardSize = 10; gameRef.newGame(boardSize, mark)} }>10x10</button>
		<button disabled='{changeDisabled}' on:click={ () => {boardSize = 15; gameRef.newGame(boardSize, mark)} }>15x15</button>
		<button disabled='{changeDisabled}' on:click={ () => {boardSize = 20; gameRef.newGame(boardSize, mark)} }>20x20</button>
		<input type=range bind:value={boardSize} min=5 max=30-->
	</div>
			
</main>

<style>
	
	:global(*) {
		margin: 0;
    	padding: 0;
		box-sizing: border-box;
	}
	:global(body) {
		margin: 0;
    	padding: 0;
		box-sizing: border-box;
		user-select: none;
	}

	.container {
    	display: flex;
    	align-items: center;
  	}

	main {
		text-align: center;
		padding: 0;
		max-width: none;
		display: flex;
		justify-content: center;
		align-items: normal;
		flex-wrap: wrap;
		flex-direction: row;
	}

	h1 {
		/*color: #222;*/
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}
	.left {
		/*background-color: #999;*/
		/*background-color: var(--color-1);*/
		/*padding: 20px;*/
		/*float: left;*/
		width: 20%; 
		box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
		margin: 0 1em;
		height: min-content;
	}	
	.middle {
		/*background-color: #fff;*/
		padding: 0px;
		/*float: left;
		width: 60%;*/ /* The width is 60%, by default */
		justify-content: center;
	}
	.right {
		/*background-color: #999;*/
		padding: 20px;
		width: 20%;
		/*float: left;
		width: 10%; *//* The width is 20%, by default */
		box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
		margin: 0 1em;
	}
	input {
    	margin: 0.1rem;
		height: 3vh;
	}	
	fieldset {
		border-radius: 0px;
		padding: 1vh;
		border-color: #000;
		border-width: 2px;
	}
	legend {
    	background-color: #0000;
    	/*color: #000;*/
    	/*padding: 3px 6px;*/
	}
	table.scores, td.scores {
		border-collapse: collapse;
	}
	td.scores {
		border: 1px solid black;
		width: 100px;
		text-align: center;
		background-color:  #ffffff77;
	}

	td, tr {
		padding: 0;
	}

	th {
		background-color:  #00000000;
		border-bottom: 3px solid #444;
	}

	.marks {
		width:  1.5rem; 
		height: 1.5rem;
		font-size: 1.5rem;
		display: flex;		
	}

	.anim {
        animation: pulse 0.25s;
        animation-iteration-count: 2;
    }

    @keyframes pulse {
        0%   { opacity: 1.0; }
        50%  { opacity: 0.2; }
        100% { opacity: 0.5; }
    }

	/*@media screen and (max-width: 1000px) {
  		.middle, .right {
    		width: 100%; 
  		}

		main :nth-child(1) { order: 2; }
    	main :nth-child(2) { order: 1; }
    	main :nth-child(3) { order: 3; }  
	}


	@media screen and (max-width: 480px) {
  		.left, .middle, .right {
    		width: 100%; 
  		}
		main :nth-child(1) { order: 2; }
    	main :nth-child(2) { order: 1; }
    	main :nth-child(3) { order: 3; }  
	}*/

	@media (orientation: portrait) {
		.middle, .right, .left {
    		width: 100%;
			margin: 0;
  		}
		main :nth-child(1) { order: 2; }
    	main :nth-child(2) { order: 1; }
    	main :nth-child(3) { order: 3; }  
    }

	
</style>