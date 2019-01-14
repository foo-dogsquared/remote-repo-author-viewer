function is_github_404(title) {return title === "Page not found · GitHub"}

function is_github_500(title) {return title === "Server Error · GitHub"}

function is_github_pages_404(title) {return title === "Site not found · GitHub Pages"}

const github_invalid_username_paths = ["marketplace", "pulls", "issues", "explore", "security", "site", "contact", "pricing", "about", "blog", "training", "status", "help"];
