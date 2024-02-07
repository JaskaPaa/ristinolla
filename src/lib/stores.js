// @ts-nocheck
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export const vw = writable(900);
export const vh = writable(700);

console.log('In store...');

let stored = null;

if (browser) {
    //vw = window.visualViewport.width;
    //vh = window.visualViewport.height;
    stored = localStorage.getItem('theme');
}

export const theme = writable(stored || 'light');

console.log('In store: ' + stored);

if (browser) {
    theme.subscribe( (value) => localStorage.theme = value )
}

export const gameBackground = writable("#202020");
export const gameLineColor = writable("#606060");

export const squares = writable(Array(15).fill().map(()=> Array(15).fill("-")));
export const winnerLine = writable([]);
export const winner = writable('');

export const board = writable({size: 720});

export const game = writable({
    score: {human: 0, AI: 0},
    movesFirst: 'human',
    status: 'ready',
    winnerLine: [],
    winner: '--'
});


/* Jos värien keskiarvo on tumma niin valkoinen, päinvastoin niin musta. */
export const gameMarkColor = derived(
	gameBackground,
	$gameBackground => {
        let colors = [$gameBackground.slice(1,3), $gameBackground.slice(3,5), $gameBackground.slice(5,7)];
        colors = colors.map(c => parseInt(c,16));
        let sum = colors.reduce((partialSum, a) => partialSum + a, 0);
        return (sum/3 < 127) ? "white" : "black";
    }
);