

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/rules/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.285234b3.js","_app/immutable/chunks/scheduler.7c6d0689.js","_app/immutable/chunks/index.6195c73f.js"];
export const stylesheets = ["_app/immutable/assets/4.7e6e9a0f.css"];
export const fonts = [];
