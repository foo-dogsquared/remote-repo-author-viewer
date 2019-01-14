"use strict";

function detect_url(tab) {
  var github_regex = /^https?:\/\/github.com\/(.+)/i;
  var github_pages_regex = /^https?:\/\/(.+).github.io\/(.*)/i; // const dev_to_regex = /^https?:\/\/dev.to\/(.+)/i;
  // const github_gist_regex = /^https?:\/\/gist.github.com\/(.+)/i;
  // const gitlab_regex = /^https?:\/\/gitlab.com\/(.+)/i;
  // const gitlab_pages_regex = /^https?:\/\/(.+).gitlab.io\/(.*)/i;;

  if (tab.url.match(github_regex)) {
    var path = tab.url.match(github_regex)[1];
    var _username = path.split("/")[0];
    var username_link = "<a href=\"https://github.com/".concat(_username, "\">").concat(_username, "</a>");
    var project = path.split("/")[1] || false;
    var project_link = project ? "<a href=\"https://github.com/".concat(_username, "/").concat(project, "\">").concat(project, "</a>") : "No project detected.";
    var site_name = "GitHub";
    if (is_github_404(tab.title) || is_github_500(tab.title)) return default_error_object;else if (github_invalid_username_paths.includes(_username)) return default_error_object;else return {
      site_name: site_name,
      username_link: username_link,
      project_link: project_link
    };
  } else if (tab.url.match(github_pages_regex)) {
    var _username_link = "<a href=\"https://github.com/".concat(username, "\">").concat(username, "</a>");

    var _site_name = "GitHub Pages";
    var project_path = tab.url.match(github_pages_regex)[2];

    var _project_link;

    if (is_github_pages_404(tab.title)) _project_link = "No project detected.";else if (!project_path) _project_link = "<a href=\"https://github.com/".concat(username, "/").concat(username, ".github.io\">").concat(username, ".github.io</a>");else _project_link = "<a href=\"https://github.com/".concat(username, "/").concat(project_path.split("/")[0], "\">").concat(project_path.split("/")[0], "</a>");
    return {
      site_name: _site_name,
      username_link: _username_link,
      project_link: _project_link
    };
  } else return default_error_object;
}
"use strict";

var querying = browser.tabs.query({
  currentWindow: true,
  active: true
});
querying.then(function (tabs) {
  var active_tab = tabs[0];
  var tab_status = detect_url(active_tab);
  document.querySelector(".site_name").innerHTML = tab_status.site_name;
  document.querySelector(".dev_link").innerHTML = tab_status.username_link;
  document.querySelector(".project_link").innerHTML = tab_status.project_link;
});
"use strict";

function is_github_404(title) {
  return title === "Page not found · GitHub";
}

;

function is_github_500(title) {
  return title === "Server Error · GitHub";
}

;

function is_github_pages_404(title) {
  return title === "Site not found · GitHub Pages";
}

var github_invalid_username_paths = ["marketplace", "pulls", "issues", "explore", "security", "site", "contact", "pricing", "about", "blog", "training", "status", "help"];
var default_error_object = {
  site_name: "Not supported site.",
  username_link: "No profile detected.",
  project_link: "No project detected."
};
