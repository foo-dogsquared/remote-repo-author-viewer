const querying = browser.tabs.query({currentWindow: true, active: true});
querying.then(function(tabs) {
    const active_tab = tabs[0];
    const tab_status = detect_url(active_tab);
    document.querySelector(".site_name").innerHTML = tab_status.site_name;
    document.querySelector(".dev_link").innerHTML = tab_status.username_link;
    document.querySelector(".project_link").innerHTML = tab_status.project_link;
})