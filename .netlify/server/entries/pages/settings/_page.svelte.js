import { c as create_ssr_component } from "../../../chunks/ssr.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".matrix.svelte-1oat0nz{transform:matrix3d(\n            1, 0, 0, 0,\n            -0.45, 1, 0, -0.009,\n            0, 0, 1, 0,\n            0, 0, 0, 1\n        )}.matrix2.svelte-1oat0nz{transform:matrix(1, 0,  0, 1, 0, 0)}button.svelte-1oat0nz:hover{cursor:pointer;box-shadow:0px 1px 3px rgba(0, 0, 0, 0.25);transform:matrix3d(\n            1, 0, 0, 0,\n            -0.4, 1, 0, -0.005,\n            0, 0, 1, 0,\n            0, 0, 0, 1\n        )}h1.svelte-1oat0nz{text-align:center}div.svelte-1oat0nz{margin:auto;width:50%}@media screen and (max-width: 60px){div.svelte-1oat0nz{width:80%}}@media screen and (max-width: 30px){div.svelte-1oat0nz{width:95%}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main data-svelte-h="svelte-kn5os"><div class="svelte-1oat0nz"><h1 class="svelte-1oat0nz">Welcome to SvelteKit</h1> <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p></div> <button class="matrix svelte-1oat0nz" type="button">Remove to favorites</button> <button class="matrix svelte-1oat0nz" type="button"><div class="matrix2 svelte-1oat0nz">Add to favorites</div></button> </main>`;
});
export {
  Page as default
};
