import { c as create_ssr_component, e as escape } from "./ssr.js";
import { w as writable, d as derived } from "./index.js";
const vw = writable(700);
console.log("In store...");
let stored = null;
const theme = writable("light");
console.log("In store: " + stored);
const gameBackground = writable("#202020");
const gameLineColor = writable("#606060");
const squares = writable(Array(15).fill().map(() => Array(15).fill("-")));
const winnerLine = writable([]);
const winner = writable("");
const board = writable({ size: 720 });
const game = writable({
  score: { human: 0, AI: 0 },
  movesFirst: "human",
  status: "ready",
  winnerLine: [],
  winner: "--"
});
const gameMarkColor = derived(
  gameBackground,
  ($gameBackground) => {
    let colors = [$gameBackground.slice(1, 3), $gameBackground.slice(3, 5), $gameBackground.slice(5, 7)];
    colors = colors.map((c) => parseInt(c, 16));
    let sum = colors.reduce((partialSum, a) => partialSum + a, 0);
    return sum / 3 < 127 ? "white" : "black";
  }
);
const Square_svelte_svelte_type_style_lang = "";
const css = {
  code: ".square.svelte-nt1x74{border-width:thin 0px 0px thin;float:left;margin:0;padding:0;border-radius:0px;line-height:0}.anim.svelte-nt1x74{animation:svelte-nt1x74-pulse 0.25s;animation-iteration-count:2}.square.svelte-nt1x74:focus{outline:none}@keyframes svelte-nt1x74-pulse{0%{opacity:1.0}50%{opacity:0.2}100%{opacity:0.5}}@media screen and (max-width: 1200px){.square.svelte-nt1x74{width:33px;height:33px}}",
  map: null
};
const Square = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text = "" } = $$props;
  let { onClick } = $$props;
  let { anim = false } = $$props;
  let { size } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  if ($$props.anim === void 0 && $$bindings.anim && anim !== void 0)
    $$bindings.anim(anim);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  $$result.css.add(css);
  return `<animate attributeType="XML" attributeName="stroke" values="blue;green;blue" dur="0.5s" repeatCount="1"></animate> <button class="square square-colors svelte-nt1x74" style="${"width:" + escape(size, true) + "px; height:" + escape(size, true) + "px;"}"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">${text === "X" ? `<line opacity="0.6" stroke-width="12%" x1="20%" y1="20%" x2="80%" y2="80%" class="${["svelte-nt1x74", anim ? "anim" : ""].join(" ").trim()}"></line> <line opacity="0.6" stroke-width="12%" x1="80%" y1="20%" x2="20%" y2="80%" class="${["svelte-nt1x74", anim ? "anim" : ""].join(" ").trim()}"></line>` : ``}${text === "O" ? `<circle fill="none" opacity="0.6" stroke-width="12%" cx="50%" cy="50%" r="30%" class="${["svelte-nt1x74", anim ? "anim" : ""].join(" ").trim()}"></circle>` : ``}</svg> </button>`;
});
export {
  Square as S,
  gameLineColor as a,
  board as b,
  gameMarkColor as c,
  game as d,
  winnerLine as e,
  gameBackground as g,
  squares as s,
  theme as t,
  vw as v,
  winner as w
};
