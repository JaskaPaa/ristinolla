

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.e384f1e7.js","_app/immutable/chunks/scheduler.7c6d0689.js","_app/immutable/chunks/index.6195c73f.js"];
export const stylesheets = ["_app/immutable/assets/3.d8ba3bed.css"];
export const fonts = [];
