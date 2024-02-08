<script>
  
    import SkewedButton from '$lib/SkewedButton.svelte';
    import SkewedLink from '$lib/SkewedLink.svelte';
    import Square from '$lib/Square.svelte';
    import Sun from '$lib/Sun.svelte';

    import { onMount } from 'svelte';

    import { gameBackground, gameLineColor, theme } from '$lib/stores.js';

    let squares = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
    let bgColor = "blue";

    console.log("in layout: " + $theme);

    $: if ($theme === `dark`) { 
      gameBackground.set("#22222288")
      gameLineColor.set("#55555588");
    } else {
      //gameBackground.set("#88888855");
      gameLineColor.set("#55555588");
    }

    function switchTheme() {
      $theme = ($theme === "dark") ? "light" : "dark";
      document.documentElement.classList.remove("dark-theme", "light-theme");
      document.documentElement.classList.add( $theme + "-theme"); 
      showMenu = false;  
	  }

    let showMenu = false;
    let skew = 20; 
    let burger = '&#9776;';

    function show() {
      showMenu = (showMenu === true) ? false : true;
      skew = 0;
	  }

    onMount(() => {
      theme.subscribe(v => {
        const bodyClassList = document.body.classList;
        bodyClassList.remove('light-theme', 'system', 'dark-theme');
        bodyClassList.add(v + "-theme");
      });
	  });
    
</script>

<svelte:head>
	{#if $theme !== 'custom'}
	<link rel="stylesheet" href="{$theme}-theme.css">
	{:else}
	<style>:root { background: purple; }</style>
	{/if}
</svelte:head>

<div class="foo">
<nav>
  
  <SkewedLink on:click={ () => showMenu = false } symbol={"Pelaa"}  link="/" bgColor={"#aabbcc"} skew={skew} float="left"></SkewedLink>
  <span class="menu2">
  {#each squares as square, j}
    <Square onClick={() => {}}
      text={square}
      size={40}
      />      		
	{/each} 
  </span>
  <span class="burger">
    <SkewedButton on:click={show} symbol={"blaa"}  bgColor={"#aabbcc"} skew={-20}
      float="right">{@html (showMenu) ? '&times;' : '&#9776;' }</SkewedButton>
  </span>
  <span class:show={showMenu} class="menu">
  <SkewedButton on:click={switchTheme} symbol={"blaa"}  bgColor={"#aabbcc"} skew={-skew} float="right"> <Sun /> </SkewedButton>
  <SkewedLink on:click={ () => showMenu = false } symbol={"Asetukset"}  link="/settings" bgColor={"#aabbcc"} skew={-skew} float="right"></SkewedLink>
  <SkewedLink on:click={ () => showMenu = false } symbol={"Tietoja"}  link="/about" bgColor={"#aabbcc"} skew={-skew} float="right"></SkewedLink>
  <SkewedLink on:click={ () => showMenu = false } symbol={"Säännöt"}  link="/rules" bgColor={"#aabbcc"} skew={-skew} float="right"></SkewedLink>
  </span>
  
</nav>
</div>

<!--svelte:body style='--bg:{bgColor};' style:background-color={bgColor} /-->

<slot></slot>


<style>

    :global(body) {
      margin: 0;
      /*background-color: var(--bg);*/
    }
    .foo {
      width: 70%;
      margin: auto;
    }
    nav {
      background-color: transparent;
      display: flow-root;
      /*color: white;*/
      width: 100%;
      margin: auto;
      font-size: 200%;
      box-sizing: border-box;
      /*overflow: hidden;*/
    }

    .burger {
      display: none;
      width: 6rem;
      position: absolute;
      float: right;
      right: 0;
    }

    .show {
      display: grid;
      position: absolute;
      z-index: 1000;
      float: right;
      /*left: 100px;*/
      right: 0;
      top: 2.5rem;
      /*background-color: rgba(200, 200, 200, 1.0);*/
    }

    /*.right {
      display: flex;
      flex-direction: column;
      height: 100%;
    }*/

    @media screen and (max-width: 100rem) {        
       	.menu2 {
          display: none;
        }
        .foo {
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
        .foo {
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


    .button-container {
      display: flex;
      /*align-items: center;*/
      justify-content: space-between;
      /*width: 240px;*/
    }

    .topnav {
      overflow-x: visible;
      /*overflow-y: clip;*/
      background-color: none;
      width: 80%;
      margin: auto;
      font-size: 200%;
    }

    .topnav a {
      float: left;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
    }

    .topnav a:hover {
      background-color: #ddd;
      color: black;
    }

    .topnav a.active {
      background-color: #04AA6D;
      color: white;
    }


    .topnav-right {
      float: right; 
    }


  </style>