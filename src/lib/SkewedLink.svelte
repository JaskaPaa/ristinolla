<script>
    // Declaring props
    export let symbol;
    export let bgColor;
	export let skew = 10;
    export let textSkew = -skew;
    export let float = "left";
    export let link = "";

    $: textSkew = -skew;
    // transform: matrix3d({matrix});
    let matrix = `
            1, 0, 0, 0,
            -0.4, 1, 0, -0.004,
            0, 0, 1, 0,
            0, 0, 0, 1
        `;	
</script>

<a on:click class="fcc-btn theme-colors"  href="{link}"
    style="transform: matrix3d({matrix}); transform: skew({skew + 'deg'});  float: {float};"> 
    <div style="transform: skew({textSkew + 'deg'})">{symbol}</div> 
</a>

<style>
    /*a {
        float: right;	
    }*/
    .fcc-btn {
        /*background-color: #199319;*/
        /*color: white;*/
        text-decoration: none;
        border: none;
        padding: 0.5rem 2rem;
        font-size: 1.5rem;
        /*border-radius: 1rem;*/
        transition: all 250ms;
        transform-origin: center;
        /*box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25),
        inset 0px -2px 3px rgba(0, 0, 0, 0.25);*/	
    }

    .fcc-btn:hover {
        cursor: pointer;
        transform: scale(0.975);
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    }
</style>
  