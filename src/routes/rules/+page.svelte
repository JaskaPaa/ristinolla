<script lang='ts'>
    import Burger from '$lib/Burger.svelte';
    let showMenu = true;
    let spin = true;

    function doSome() {
        spin = !spin;
        showMenu = !showMenu;
    }
</script>


<main>
<p class:show={showMenu}>Testi tekstiä</p>
<button on:click={doSome}><Burger toggle={spin} /></button>
<div class:show={showMenu} class:hide={!showMenu}>
    <br>
    <h1>Säännöt</h1>
    <br>   
    <p>
    Pelaajat vuorottelevat asettamalla merkkinsä tyhjään ruutuun.
    Musta pelaa ensin. Voittaja on ensimmäinen pelaaja, joka muodostaa katkeamattoman viivan viidestä omasta merkistä vaakasuunnassa, pystysuunnassa tai vinottain.
    
</div>

</main>

<style>

    .show {
    	/*background-color: var(--color-code-bg);
		display: grid;
		position: absolute;
		z-index: 1000;
		float: right;
		right: 0;
		top: 2.5rem;*/
		/*animation: fadeIn 0.5s;*/
		/*transition: opacity 1s;  
		opacity: 0.5;*/
		
		transition: all 0.5s ease-out;
		opacity: 1;
	}
    .hide {
        transition: all 0.5s ease-out;
        opacity: 0;
    }
	

h1 {
    text-align: center;
}

div {
    margin: auto;
    width: 50%;
}

@media screen and (max-width: 60px) {
  		div {
    		width: 80%; 
  		}
	}


@media screen and (max-width: 30px) {
    div {
        width: 95%; 
    }
}

</style>


