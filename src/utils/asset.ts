/**
 * Resolve a public-asset path against the app's base URL.
 *
 * Vite serves /public assets at `import.meta.env.BASE_URL` — which is `/` in
 * dev but `/WheelyGood/` on GitHub Pages. Absolute string literals like
 * `"/car-base.png"` are NOT rebased by Vite (only index.html refs are), so any
 * asset referenced from JS must go through this helper to work under a subpath.
 */
export const asset = (path: string): string =>
  import.meta.env.BASE_URL.replace(/\/$/, "") + "/" + path.replace(/^\//, "")
