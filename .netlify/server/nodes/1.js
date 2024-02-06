

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.acf86862.js","_app/immutable/chunks/scheduler.7c6d0689.js","_app/immutable/chunks/index.6195c73f.js","_app/immutable/chunks/singletons.fb55832c.js","_app/immutable/chunks/index.1a3bb515.js"];
export const stylesheets = [];
export const fonts = [];
