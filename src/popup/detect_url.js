function detect_url(tab) {
    const github_regex = /^https?:\/\/github.com\/(.+)/i;
    const github_pages_regex = /^https?:\/\/(.+).github.io\/(.*)/i;
    // const github_gist_regex = /^https?:\/\/gist.github.com\/(.+)/i;
    // const gitlab_regex = /^https?:\/\/gitlab.com\/(.+)/i;
    // const gitlab_pages_regex = /^https?:\/\/(.+).gitlab.io\/(.*)/i;;
    // const sourceforge_regex = /^https?:\/\/sourceforge.com\/(.+)/i;
    // const bitbucket_regex = /^https?:\/\/bitbucket.com\/(.+)/i;
    // const gitote_regex = /^https?:\/\/gitote.com\/(.+)/i;


    if (tab.url.match(github_regex)) {
        const path = tab.url.match(github_regex)[1];
        const username = path.split("/")[0];
        const project = path.split("/")[1];
        
        const site_name = "GitHub";
        const username_link = (github_invalid_username_paths.includes(username) || (!project && is_github_404(tab.title))) ? undefined : `<a href="https://github.com/${username}">${username}</a>`;
        const project_link = (!project || is_github_404(tab.title) || is_github_500(tab.title)) ? undefined : `<a href="https://github.com/${username}/${project}">${project}</a>`;

        return {site_name, username_link, project_link};
    }
    else if (tab.url.match(github_pages_regex)) {
        const username = tab.url.match(github_pages_regex)[1];
        const username_link = `<a href="https://github.com/${username}">${username}</a>`;
        const site_name = "GitHub Pages";

        const project_path = tab.url.match(github_pages_regex)[2];
        let project_link;
        if (is_github_pages_404(tab.title)) project_link;
        else if (!project_path) project_link = `<a href="https://github.com/${username}/${username}.github.io">${username}.github.io</a>`;
        else project_link = `<a href="https://github.com/${username}/${project_path.split("/")[0]}">${project_path.split("/")[0]}</a>`;

        return {site_name, username_link, project_link};
    }
    else return;
}
