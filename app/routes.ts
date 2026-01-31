import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

/**
 * The route configuration for the application using flat file system routing.
 * @see https://reactrouter.com/how-to/file-route-conventions
 */
export default flatRoutes() satisfies RouteConfig;
