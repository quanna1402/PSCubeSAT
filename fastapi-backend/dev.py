"""Development server with compiler output excluded from reload watching."""

import uvicorn

if __name__ == "__main__":
    # Uvicorn 0.32+ globs reload patterns relative to the current working
    # directory; absolute patterns raise NotImplementedError. `npm run dev`
    # launches from `fastapi-backend`, so use relative paths.
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8005,
        reload=True,
        reload_dirs=["app"],
        reload_excludes=["build_cache"],
    )
