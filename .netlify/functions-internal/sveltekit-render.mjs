import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["dark-theme.css","favicon.png","light-theme.css","theme.js"]),
	mimeTypes: {".css":"text/css",".png":"image/png",".js":"application/javascript"},
	_: {
		client: {"start":"_app/immutable/entry/start.b1c18e60.js","app":"_app/immutable/entry/app.cdc4c81e.js","imports":["_app/immutable/entry/start.b1c18e60.js","_app/immutable/chunks/scheduler.7c6d0689.js","_app/immutable/chunks/singletons.adca4ed3.js","_app/immutable/chunks/index.1a3bb515.js","_app/immutable/entry/app.cdc4c81e.js","_app/immutable/chunks/scheduler.7c6d0689.js","_app/immutable/chunks/index.6195c73f.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/rules",
				pattern: /^\/rules\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
