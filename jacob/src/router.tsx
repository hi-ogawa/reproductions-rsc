import { Home } from "./home.js";
import { url } from "./server-context.js";

export async function Router() {
	const parsed = url();
	const pathname = parsed.pathname.replace(/\/$/, "") || "/";

	const routes = {
		// @ts-ignore
		"/client-in-server-package": () => import("./client-in-server-package/page.jsx"),
		// @ts-ignore
		"/client-package-in-client": () => import("./client-package-in-client/page.jsx"),
		// @ts-ignore
		"/client-package-in-server": () => import("./client-package-in-server/page.jsx")
	};

	const route = await routes[pathname as "/client-in-server-package"]?.();
	if (route) {
		return <route.default />;
	}

	switch (pathname) {
		case "/":
			return <Home />;
		case "/cjs": {
			const mod = await import("./cjs.js")
			return <mod.default />;
		}
		case "/cjs2": {
			const mod = await import("./cjs2.js")
			return <mod.default />;
		}
		case "/context": {
			const mod = await import("./context.js")
			return <mod.default />;
		}
		case "/context2": {
			const mod = await import("./context2.js")
			return <mod.default />;
		}
		case "/context3": {
			const mod = await import("./context3.js")
			return <mod.default />;
		}
		default:
			return (
				<main>
					<title>Not Found</title>
					<h1>Not Found</h1>
				</main>
			);
	}
}
