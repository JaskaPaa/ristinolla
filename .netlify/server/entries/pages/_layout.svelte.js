import { c as create_ssr_component, e as escape, a as add_attribute, b as subscribe, v as validate_component, d as each } from "../../chunks/ssr.js";
import { t as theme, g as gameBackground, a as gameLineColor, S as Square } from "../../chunks/Square.js";
const SkewedButton_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "button.svelte-wu3n0x{border:none;padding:0.5rem 2rem;font-size:1.5rem;transition:all 250ms;transform-origin:center}button.svelte-wu3n0x:hover{cursor:pointer;transform:scale(0.975);box-shadow:0px 1px 3px rgba(0, 0, 0, 0.25)}",
  map: null
};
const SkewedButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { symbol } = $$props;
  let { bgColor } = $$props;
  let { skew = 0 } = $$props;
  let { textSkew = -skew } = $$props;
  let { float = "left" } = $$props;
  if ($$props.symbol === void 0 && $$bindings.symbol && symbol !== void 0)
    $$bindings.symbol(symbol);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.skew === void 0 && $$bindings.skew && skew !== void 0)
    $$bindings.skew(skew);
  if ($$props.textSkew === void 0 && $$bindings.textSkew && textSkew !== void 0)
    $$bindings.textSkew(textSkew);
  if ($$props.float === void 0 && $$bindings.float && float !== void 0)
    $$bindings.float(float);
  $$result.css.add(css$2);
  textSkew = -skew;
  return `<button class="theme-colors svelte-wu3n0x" style="${"transform: skew(" + escape(skew + "deg", true) + "); float: " + escape(float, true) + ";"}"><div style="${"transform: skew( " + escape(textSkew + "deg", true) + " )"}">${slots.default ? slots.default({}) : ``}</div> </button>`;
});
const SkewedLink_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".fcc-btn.svelte-4xthcf{text-decoration:none;border:none;padding:0.5rem 2rem;font-size:1.5rem;transition:all 250ms;transform-origin:center}.fcc-btn.svelte-4xthcf:hover{cursor:pointer;transform:scale(0.975);box-shadow:0px 1px 3px rgba(0, 0, 0, 0.25)}",
  map: null
};
const SkewedLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { symbol } = $$props;
  let { bgColor } = $$props;
  let { skew = 10 } = $$props;
  let { textSkew = -skew } = $$props;
  let { float = "left" } = $$props;
  let { link = "" } = $$props;
  let matrix = `
            1, 0, 0, 0,
            -0.4, 1, 0, -0.004,
            0, 0, 1, 0,
            0, 0, 0, 1
        `;
  if ($$props.symbol === void 0 && $$bindings.symbol && symbol !== void 0)
    $$bindings.symbol(symbol);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.skew === void 0 && $$bindings.skew && skew !== void 0)
    $$bindings.skew(skew);
  if ($$props.textSkew === void 0 && $$bindings.textSkew && textSkew !== void 0)
    $$bindings.textSkew(textSkew);
  if ($$props.float === void 0 && $$bindings.float && float !== void 0)
    $$bindings.float(float);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  $$result.css.add(css$1);
  textSkew = -skew;
  return `<a class="fcc-btn theme-colors svelte-4xthcf"${add_attribute("href", link, 0)} style="${"transform: matrix3d(" + escape(matrix, true) + "); transform: skew(" + escape(skew + "deg", true) + "); float: " + escape(float, true) + ";"}"><div style="${"transform: skew(" + escape(textSkew + "deg", true) + ")"}">${escape(symbol)}</div> </a>`;
});
const Sun = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="0.8em" viewBox="0 0 512 512"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path></svg>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "body{margin:0}.foo.svelte-1gq92gv{width:70%;margin:auto}nav.svelte-1gq92gv{background-color:transparent;display:flow-root;width:100%;margin:auto;font-size:200%;box-sizing:border-box}.burger.svelte-1gq92gv{display:none;width:6rem;float:right}.show.svelte-1gq92gv{display:grid;position:absolute;z-index:1000;float:right;right:0;top:2.5rem}@media screen and (max-width: 100rem){.menu2.svelte-1gq92gv{display:none}.foo.svelte-1gq92gv{width:100%}}@media screen and (min-width: 50rem){.menu.svelte-1gq92gv{display:initial;position:relative;right:0;top:0}}@media screen and (max-width: 50rem){.foo.svelte-1gq92gv{width:100%}.menu.svelte-1gq92gv{display:none}.show.svelte-1gq92gv{display:grid}.burger.svelte-1gq92gv{display:grid}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let squares = ["X", "O", "X", "O", "X", "O", "X", "O", "X", "O"];
  console.log("in layout: " + $theme);
  let skew = 20;
  $$result.css.add(css);
  {
    if ($theme === `dark`) {
      gameBackground.set("#22222288");
      gameLineColor.set("#55555588");
    } else {
      gameLineColor.set("#55555588");
    }
  }
  $$unsubscribe_theme();
  return `${$$result.head += `<!-- HEAD_svelte-t3h5n7_START -->${$theme !== "custom" ? `<link rel="stylesheet" href="${escape($theme, true) + "-theme.css"}">` : `<style data-svelte-h="svelte-1wfa6cz">:root { background: purple; }</style>`}<!-- HEAD_svelte-t3h5n7_END -->`, ""} <div class="foo svelte-1gq92gv"><nav class="svelte-1gq92gv">${validate_component(SkewedLink, "SkewedLink").$$render(
    $$result,
    {
      symbol: "Pelaa",
      link: "/",
      bgColor: "#aabbcc",
      skew,
      float: "left"
    },
    {},
    {}
  )} <span class="menu2 svelte-1gq92gv">${each(squares, (square, j) => {
    return `${validate_component(Square, "Square").$$render(
      $$result,
      {
        onClick: () => {
        },
        text: square,
        size: 40
      },
      {},
      {}
    )}`;
  })}</span> <span class="burger svelte-1gq92gv">${validate_component(SkewedButton, "SkewedButton").$$render(
    $$result,
    {
      symbol: "blaa",
      bgColor: "#aabbcc",
      skew: -20,
      float: "right"
    },
    {},
    {
      default: () => {
        return `<!-- HTML_TAG_START -->${"&#9776;"}<!-- HTML_TAG_END -->`;
      }
    }
  )}</span> <span class="${["menu svelte-1gq92gv", ""].join(" ").trim()}">${validate_component(SkewedButton, "SkewedButton").$$render(
    $$result,
    {
      symbol: "blaa",
      bgColor: "#aabbcc",
      skew: -skew,
      float: "right"
    },
    {},
    {
      default: () => {
        return `${validate_component(Sun, "Sun").$$render($$result, {}, {}, {})}`;
      }
    }
  )} ${validate_component(SkewedLink, "SkewedLink").$$render(
    $$result,
    {
      symbol: "Asetukset",
      link: "/settings",
      bgColor: "#aabbcc",
      skew: -skew,
      float: "right"
    },
    {},
    {}
  )} ${validate_component(SkewedLink, "SkewedLink").$$render(
    $$result,
    {
      symbol: "Tietoja",
      link: "/about",
      bgColor: "#aabbcc",
      skew: -skew,
      float: "right"
    },
    {},
    {}
  )} ${validate_component(SkewedLink, "SkewedLink").$$render(
    $$result,
    {
      symbol: "Säännöt",
      link: "/rules",
      bgColor: "#aabbcc",
      skew: -skew,
      float: "right"
    },
    {},
    {}
  )}</span></nav></div>  ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
