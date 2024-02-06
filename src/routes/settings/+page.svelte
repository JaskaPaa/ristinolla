<main>
<div>
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>
<button class="matrix" type="button">Remove to favorites</button>
<button class="matrix" type="button"><div class="matrix2">Add to favorites</div></button>
</main>

<style>
    .matrix {
        transform: matrix3d(
            1, 0, 0, 0,
            -0.45, 1, 0, -0.009,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }
    .matrix2 {
        transform: matrix(1, 0,  0, 1, 0, 0);
    }
    button:hover {
        cursor: pointer;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
        transform: matrix3d(
            1, 0, 0, 0,
            -0.4, 1, 0, -0.005,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
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


