<script>
    // Declaring props
    export let symbol;
    export let bgColor;
	export let skew = 0;
    export let textSkew = -skew;
    export let float = "left";

    $: textSkew = -skew;
</script>

<button on:click  class="theme-colors" style="transform: skew({skew + 'deg'}); float: {float};">
    <div style="transform: skew( {textSkew + "deg"} )">
        <slot />
    </div>
</button>

<style>
    button {
        border: none;
        padding: 0.5rem 2rem;
        /*color: #fff;*/
        font-size: 1.5rem;
        /*border-radius: 1rem;*/
        transition: all 250ms;
        transform-origin: center;
        /*box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25),
        inset 0px -2px 3px rgba(0, 0, 0, 0.25);*/		
    }

    button:hover {
        cursor: pointer;
        transform: scale(0.975);
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    }

    .unskew {
        transform: skew(-30deg);
    }
</style>