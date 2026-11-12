import { createRouter, createMemoryHistory } from "vue-router";

// TAC Chat's named routes (src/router/index.js). Importing that module would pull every view into
// the widget bundle, so the names live here; panel.spec.js fails when the two drift apart.
const NAMED_ROUTES = [
	["chat", "/chat"],
	["chat-session", "/chat/:sessionId"],
	["chat-project", "/chat/project/:projectId"],
	["knowledge", "/knowledge"],
	["agents", "/agents"],
	["agent-builder", "/agents/:id"],
	["analytics", "/analytics"],
	["pages", "/pages"],
	["page", "/pages/:name"],
	["settings-profile", "/settings/profile"],
	["settings-appearance", "/settings/appearance"],
	["settings-home", "/settings/home"],
	["settings-privacy", "/settings/privacy"],
	["MyTickets", "/settings/my-tickets"],
	["settings-routing", "/settings/routing"],
	["SettingsConnections", "/settings/connections"],
	["settings-memory", "/settings/memory"],
	["settings-users", "/settings/users"],
	["settings-packs", "/settings/packs"],
	["settings-my-packs", "/settings/my-packs"],
	["settings-billing", "/settings/billing"],
	["settings-workspace", "/settings/workspace"],
];

const Blank = { render: () => null };

/**
 * Shared components push TAC Chat routes (billing, workflow builder). In Desk
 * there is no TAC Chat router, so every navigation opens TAC Chat instead.
 */
export function createRouterShim() {
	const router = createRouter({
		history: createMemoryHistory(),
		routes: [
			...NAMED_ROUTES.map(([name, path]) => ({ name, path, component: Blank })),
			{ path: "/:rest(.*)*", component: Blank },
		],
	});
	router.beforeEach((to) => {
		if (to.fullPath === "/") return true;
		window.open(`/copilot${to.fullPath}`, "_blank", "noopener");
		return false;
	});
	return router;
}
