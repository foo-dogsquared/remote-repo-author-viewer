const querying = browser.tabs.query({currentWindow: true, active: true});
querying.then(function(tabs) {
    const active_tab = tabs[0];
    const tab_status = detect_url(active_tab);
    document.querySelector(".site_name").innerHTML = `You're on ${(!tab_status || !tab_status.site_name) ? "an invalid site that renders this extension to be useless." : tab_status.site_name}`;
    document.querySelector(".dev_link").innerHTML =  (!tab_status || !tab_status.username_link) ? "No profile detected." : "Username: " + tab_status.username_link;
    document.querySelector(".project_link").innerHTML = (!tab_status || !tab_status.project_link) ? "No project detected." : "Project: " + tab_status.project_link;
})