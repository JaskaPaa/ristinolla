<script lang='ts'>

import { gameBackground, gameMarkColor, board } from './stores.js';

let size = $board.size;
export let top = size;
export let left = size;
export let resized = size;

let top2 = 0;
let left2 = 0;

let started = false;

function startDrag() {    
    started = true;
    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mouseup', stopDrag);    
    top2 = $board.size;
    left2 = $board.size;

}

function handleMousemove(e: MouseEvent): void {
    if (started) {        
        left2 += e.movementX;
        top2  += e.movementY;
        
        resized = Math.min(top2, left2);        
    }
}

function stopDrag(e: MouseEvent): void {
    console.log(`Mouse up: ${e.x}, ${e.y}`);
    console.log(`Event: ${e}`);
    started = false;
    $board.resizedSize = resized;
    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener('mouseup', stopDrag);
}


</script>

<button on:mousedown={startDrag} style="top:{top+8}px; left:{left+8}px; color:{$gameBackground}; width:{12}px; height:{12}px;">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <!--path d="M12 0l5 5-12 12-5-5v12h12l-5-5 12-12 5 5v-12h-12z" /-->
        <!--path d="M0 0h12 l-5 5 12 12 5 -5 v12h-12l5-5 -12 -12 -5 5z " fill={$gameBackground}/-->
        <line  opacity="0.6" stroke={$gameMarkColor} stroke-width="12%" x1="10%" y1="90%" x2="90%" y2="10%"/>
        <line  opacity="0.6" stroke={$gameMarkColor} stroke-width="12%" x1="40%" y1="90%" x2="90%" y2="40%"/>
        <line  opacity="0.6" stroke={$gameMarkColor} stroke-width="12%" x1="70%" y1="90%" x2="90%" y2="70%"/>
    </svg>
</button>


<style>
    button {
        position: absolute;
        border: none;
        background: none;
        margin: 0;
        padding: 0;
        border-radius: 0;
        line-height: 0; /* !! muista tämä !! */
        cursor: nwse-resize;
    }
    button:active{
        background: none;
        cursor: nwse-resize;
    }
</style>
