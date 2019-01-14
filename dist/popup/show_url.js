"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function detect_url(tab) {
  var github_regex = /^https?:\/\/github.com\/(.+)/i;
  var github_pages_regex = /^https?:\/\/(.+).github.io\/(.*)/i; // const github_gist_regex = /^https?:\/\/gist.github.com\/(.+)/i;
  // const gitlab_regex = /^https?:\/\/gitlab.com\/(.+)/i;
  // const gitlab_pages_regex = /^https?:\/\/(.+).gitlab.io\/(.*)/i;;
  // const sourceforge_regex = /^https?:\/\/sourceforge.com\/(.+)/i;
  // const bitbucket_regex = /^https?:\/\/bitbucket.com\/(.+)/i;
  // const gitote_regex = /^https?:\/\/gitote.com\/(.+)/i;

  if (tab.url.match(github_regex)) {
    var path = tab.url.match(github_regex)[1];
    var username = path.split("/")[0];
    var project = path.split("/")[1];
    var site_name = "GitHub";
    var username_link = github_invalid_username_paths.includes(username) || !project && is_github_404(tab.title) ? undefined : "<a href=\"https://github.com/".concat(username, "\">").concat(username, "</a>");
    var project_link = !project || is_github_404(tab.title) || is_github_500(tab.title) ? undefined : "<a href=\"https://github.com/".concat(username, "/").concat(project, "\">").concat(project, "</a>");
    return {
      site_name: site_name,
      username_link: username_link,
      project_link: project_link
    };
  } else if (tab.url.match(github_pages_regex)) {
    var _username = tab.url.match(github_pages_regex)[1];

    var _username_link = "<a href=\"https://github.com/".concat(_username, "\">").concat(_username, "</a>");

    var _site_name = "GitHub Pages";
    var project_path = tab.url.match(github_pages_regex)[2];

    var _project_link;

    if (is_github_pages_404(tab.title)) _project_link;else if (!project_path) _project_link = "<a href=\"https://github.com/".concat(_username, "/").concat(_username, ".github.io\">").concat(_username, ".github.io</a>");else _project_link = "<a href=\"https://github.com/".concat(_username, "/").concat(project_path.split("/")[0], "\">").concat(project_path.split("/")[0], "</a>");
    return {
      site_name: _site_name,
      username_link: _username_link,
      project_link: _project_link
    };
  } else return;
}

function build_remote_repo_url(host, reserved_keywords) {// example value of host: "*://somereposite.com/~___ACCOUNT_NAME___~/projects/~___PROJECT_NAME___~"
  // example value of host: "*://github.com/~___ACCOUNT_NAME___~/~___PROJECT_URL___~"
  // parsing through the host:
  // a "*" at the start means the protocol and they should be alphanumeric
  // after the "://" is the host name
  // after the host name is the possibility of the location of the account name which is indicated by the "___ACCOUNT_NAME___"
  // if there is ___ACCOUNT_NAME___ after the host, there should be the reserved keywords to prevent routing issues
  // otherwise, just ignore the reserved keywords (bad idea, probably)
}

var remote_repo_url =
/*#__PURE__*/
function () {
  function remote_repo_url(url, status_messages, reserved_keywords) {
    _classCallCheck(this, remote_repo_url);

    var error_message = "";
    if (url.indexOf("~___ACCOUNT_NAME___~") === -1) error_message += "There's no \"~___ACCOUNT_NAME___~\" detected in the URL string.\n";
    if (url.indexOf("~___PROJECT_NAME___~") === -1) error_message += "There's no \"~___PROJECT_NAME___~\" detected in the URL string.";
    if (error_message) throw new Error(error_message);
    if (!reserved_keywords || reserved_keywords.length <= 0) throw new Error("No detected reserved keywords");
    this.url = url;
    this.reserved_keywords = reserved_keywords;
    this.status_messages = status_messages;
  }

  _createClass(remote_repo_url, [{
    key: "protocol",
    get: function get() {
      return this.url.slice(0, this.url.indexOf("://"));
    }
  }, {
    key: "account_url",
    get: function get() {
      return this.url.slice(0, this.url.indexOf("~___ACCOUNT_NAME___~") + "~___ACCOUNT_NAME___~".length);
    }
  }, {
    key: "project_url",
    get: function get() {
      return this.url.slice(0, this.url.indexOf("~___PROJECT_NAME___~") + "~___PROJECT_NAME___~".length);
    }
  }, {
    key: "origin",
    get: function get() {
      return url.split("/")[2];
    }
  }]);

  return remote_repo_url;
}();

function build_pages_url(host, account_subdomain, project_url) {// example value of host: "*://~___ACCOUNT_NAME___~.github.io/~___PROJECT_NAME___~"
  // parsing through the host:
  // a "*" at the start means the protocol and they should be alphanumeric
  // 
}
"use strict";

var querying = browser.tabs.query({
  currentWindow: true,
  active: true
});
querying.then(function (tabs) {
  var active_tab = tabs[0];
  var tab_status = detect_url(active_tab);
  document.querySelector(".site_name").innerHTML = "You're on ".concat(!tab_status || !tab_status.site_name ? "an invalid site that renders this extension to be useless." : tab_status.site_name);
  document.querySelector(".dev_link").innerHTML = !tab_status || !tab_status.username_link ? "No profile detected." : "Username: " + tab_status.username_link;
  document.querySelector(".project_link").innerHTML = !tab_status || !tab_status.project_link ? "No project detected." : "Project: " + tab_status.project_link;
});
"use strict";

function is_github_404(title) {
  return title === "Page not found · GitHub";
}

function is_github_500(title) {
  return title === "Server Error · GitHub";
}

function is_github_pages_404(title) {
  return title === "Site not found · GitHub Pages";
}

var github_invalid_username_paths = ["marketplace", "pulls", "issues", "explore", "security", "site", "contact", "pricing", "about", "blog", "training", "status", "help"];
