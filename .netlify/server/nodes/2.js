

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.88c89094.js","_app/immutable/chunks/scheduler.7c6d0689.js","_app/immutable/chunks/index.6195c73f.js","_app/immutable/chunks/Square.25d26671.js","_app/immutable/chunks/index.1a3bb515.js"];
export const stylesheets = ["_app/immutable/assets/2.572a7971.css","_app/immutable/assets/Square.dc64735c.css"];
export const fonts = [];
