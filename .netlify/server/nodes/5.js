

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.5179717d.js","_app/immutable/chunks/scheduler.7c6d0689.js","_app/immutable/chunks/index.6195c73f.js"];
export const stylesheets = ["_app/immutable/assets/5.fce32fd0.css"];
export const fonts = [];
