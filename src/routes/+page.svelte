<script lang="ts">

	import { onMount } from "svelte";
	import Game from '$lib/Game.svelte';
	import Panel from '$lib/Panel.svelte';
	import { gameBackground, gameLineColor, vw, vh, winner, game, board } from '$lib/stores.js';


	let boardSize = 15;
	let gameRef: Game;
	let score = {X: 0, O: 0};

	let color2 = "#222222";

	let color1 = "#777777";

	function viewportResize() {
		vw.set(window.visualViewport.width);
		vh.set(window.visualViewport.height);
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
	
	<div class="middle">		
		<Game bind:this={gameRef} />		
	</div>	
	<div class="right theme-colors" >
		<h3>Pelitapahtumat</h3>		
		<p>Aloittaja: {$game.starter === 'human' ? 'Pelaaja' : 'Tietokone'} </p>
		<p>Pelaaja: {$game.humanMark} Tietokone: {$game.humanMark === 'X' ? 'O' : 'X'}</p>
		<p>Siirtoja: {$game.moves.length} </p>
		<p>Voittaja: {$winner}</p>
		<p>Siirron peruutuksia: {$game.takebacks}</p>
		<h4><br></h4>		
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

	h3 {
		width: 100%;
        background-color: var(--color-bg-1);
        font-size: 1.3rem;
	}
	h4 {
		width: 100%;
        background-color: var(--color-bg-1);
        font-size: 1.0rem;
	}

	.left {
		width: 20%; 
		box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
		margin: 0 1em;
		height: min-content;
	}	
	.middle {
		padding: 0px;
		justify-content: center;
	}
	.right {
		/*padding: 20px;*/
		width: 20%;
		box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
		margin: 0 1em;
		height: min-content;
		font-size: 1.2rem;
	}

    @keyframes pulse {
        0%   { opacity: 1.0; }
        50%  { opacity: 0.2; }
        100% { opacity: 0.5; }
    }

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