const querying = browser.tabs.query({currentWindow: true, active: true});
querying.then(function(tabs) {
    const active_tab = tabs[0];
    const tab_status = detect_url(active_tab);
    const {body} = document;
    
    const site_name = document.createElement("h1");
    site_name.setAttribute("class", "site_name");
    if (!tab_status || !tab_status.site_name) site_name.textContent = "You're in an invalid site that renders this extension to be useless.";
    else site_name.textContent = `You're in ${tab_status.site_name}.`;

    body.appendChild(site_name);
    const dev_profile = document.createElement("h2");
    dev_profile.setAttribute("class", "dev_link");
    if (!tab_status || (!tab_status.username_link && !tab_status.username)) dev_profile.textContent = "No profile detected.";
    else {
        dev_profile.textContent = "Username: "
        const dev_link = document.createElement("a");
        dev_link.setAttribute("href", tab_status.username_link);
        const dev_text = document.createTextNode(tab_status.username);
        dev_link.appendChild(dev_text);
        dev_profile.appendChild(dev_link);
    } 
    body.appendChild(dev_profile);

    const project_profile = document.createElement("h2");
    project_profile.setAttribute("class", "project_link");
    if (!tab_status || (!tab_status.project_link && !tab_status.project_name)) project_profile.textContent = "No project detected.";
    else {
        project_profile.textContent = "Project: ";
        const project_link = document.createElement("a");
        project_link.setAttribute("href", tab_status.project_link);
        const project_text = document.createTextNode(tab_status.project_name);
        project_link.appendChild(project_text);
        project_profile.appendChild(project_link);
    } 

    body.appendChild(project_profile);
})