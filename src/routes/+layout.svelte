<script lang='ts'>
	import SkewedButton from '$lib/SkewedButton.svelte';
	import Square from '$lib/Square.svelte';
	import Sun from '$lib/Sun.svelte';
  import Modal from '$lib/Modal.svelte';

	import { onMount } from 'svelte';

	import { gameBackground, gameLineColor, theme, vh, vw, starterStyle, lastVisible } from '$lib/stores.js';

	let squares = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
	let bgColor = 'blue';

	console.log('in layout: ' + $theme);

	$: if ($theme === `dark`) {
      gameBackground.set('#22222288');
      gameLineColor.set('#55555588');
	} else {
      //gameBackground.set("#88888855");
      gameLineColor.set('#55555588');
	}

	function switchTheme() {
      $theme = $theme === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.remove('dark-theme', 'light-theme');
      document.documentElement.classList.add($theme + '-theme');
      showMenu = false;
	}

	let showMenu = false;
	let skew = 20;
	let burger = '&#9776;';
  let showRules = false;
  let showSettings = false;

	$: if ($vw < $vh) {
      // portrait orientation
      skew = 0;
	} else {
      skew = 20;
	}

	function show() {
      showMenu = showMenu === true ? false : true;
      skew = 0;
  }

	onMount(() => {
      theme.subscribe((v) => {
          const bodyClassList = document.body.classList;
          bodyClassList.remove('light-theme', 'system', 'dark-theme');
          bodyClassList.add(v + '-theme');
      });
	});

  	let selected = "alternately";
	
	function onStarterChange(event: any) {
		$starterStyle = event.currentTarget.value;
	}


</script>

<svelte:head>
    {#if $theme !== 'custom'}
        <link rel="stylesheet" href="{$theme}-theme.css" />
    {:else}
        <style>
            :root {
              background: purple;
            }
        </style>
    {/if}
</svelte:head>

<div class="navbar">
    <nav>
        <SkewedButton on:click={() => (showMenu = false)} {skew} float="left">
            <a class="theme-colors" href="/">Pelaa</a>
        </SkewedButton>
        <span class="menu2">
          {#each squares as square, j}
            <Square onClick={() => {}} text={square} size={40} />
          {/each}
        </span>
        <span class="burger">
          <SkewedButton on:click={show} {skew} float="right">{@html showMenu ? '&#x2715;' : '&#9776;'}</SkewedButton>
        </span>
        <span class:show={showMenu} class="menu">
          <SkewedButton on:click={switchTheme} skew={-skew} float="right"><Sun /></SkewedButton>
          <SkewedButton on:click={() => {showMenu = false; showSettings = true } } skew={-skew} float="right">
            <span>Asetukset</span>
          </SkewedButton>
          <SkewedButton on:click={() => (showMenu = false) } skew={-skew} float="right">
            <a class="theme-colors" href="/about">Tietoja</a>
          </SkewedButton>
          <SkewedButton on:click={() => {showMenu = false; showRules = true } }  skew={-skew} float="right">
            <span>Säännöt</span>
          </SkewedButton>
        </span>
    </nav>
</div>

<Modal bind:showModal={showRules}>
	<h2 slot="header">
		Säännöt	
	</h2>
  <p>
    <br>
    Pelaajat vuorottelevat asettamalla merkkinsä tyhjään ruutuun. Voittaja on ensimmäinen pelaaja, joka muodostaa katkeamattoman linjan viidestä peräkkäisestä
    omasta merkistä vaakasuunnassa, pystysuunnassa tai vinottain.
    <br><br>
    Jos lauta on täysin täynnä eikä kukaan pysty muodostamaan 5 merkin riviä, peli päättyy tasapeliin.    
    <br><br>
    Joissakin säännöissä voittolinjan on oltava täsmälleen viisi merkkiä pitkä, jolloin kuusi tai useampi merkki peräkkäin ei ole voitto,
    mutta tässä versiossa siis viisi tai sitä enemmän voittaa.
    <br><br>
	HUOM. Jos pelaaja on ottanut siirtoja takaisin, niin pelaajan pistesaldo ei voittaessa kasva.
	<br><br>
  </p>  	
</Modal>

<Modal bind:showModal={showSettings}>
	<h2 slot="header">
		Asetukset	
	</h2>
  <h4>Aloittaja:</h4>
  <p>    
    <label>
      <input checked={selected==="alternately"} on:change={onStarterChange} type="radio" name="amount" value="alternately" /> Vuorotellen
    </label>
    <label>
      <input checked={selected==="human"} on:change={onStarterChange} type="radio" name="amount" value="human" /> Aina pelaaja
    </label>
    <label>
      <input checked={selected==="ai"} on:change={onStarterChange} type="radio" name="amount" value="ai" /> Aina tietokone
    </label>
  </p>
  <br>
  <p> 
  <label>
    <input checked={$lastVisible===true} on:change={() => $lastVisible = $lastVisible ? false : true } type="checkbox" name="lastbox" /> Näytä viimeinen siirto
  </label>
  <p>  	
</Modal>

<slot />

<style>
	:global(body) {
		margin: 0;
	}
	.navbar {
		width: 70%;
		margin: auto;
	}
	nav {
		background-color: transparent;
		display: flow-root;
		width: 100%;
		margin: auto;
		font-size: 200%;
		box-sizing: border-box;
	}
  p {
    font-size: 120%;
  }
	a {
		text-decoration: none;
		background-color: transparent;
	}
	.burger {
		display: none;
		width: 6rem;
		position: absolute;
		float: right;
		right: 0;
	}

	.show {
    background-color: var(--color-code-bg);
		display: grid;
		position: absolute;
		z-index: 1000;
		float: right;
		right: 0;
		top: 2.5rem;
	}

	@media screen and (max-width: 100rem) {
		.menu2 {
			display: none;
		}
		.navbar {
			width: 100%;
		}
	}

	@media screen and (min-width: 50rem) {
		.menu {
			display: initial;
			position: relative;
			right: 0;
			top: 0;
		}
	}

	@media screen and (max-width: 50rem) {
		.navbar {
			width: 100%;
		}
		.menu {
			display: none;
		}
		.show {
			display: grid;
		}
		.burger {
			display: grid;
		}
	}
</style>
