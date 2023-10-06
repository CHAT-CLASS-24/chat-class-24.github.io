document.addEventListener('DOMContentLoaded', () => {

    // declare variables
    const links = document.querySelector('.divListApps');
    const iframe = document.querySelector('.divGameFrame iframe');
    const appHeader = document.querySelector('.divGameFrameheader');

    // get a list of apps from the Apps file
    fetch('Apps.json')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let html = '';
            data.forEach(app => {
                if(app.visible){
                    html += `<span class="divGameLink" url="${app.url}" title="${app.description}" data.title="${app.title}">${app.title}</span>`;
                }
            });
            document.querySelector('.divListApps').innerHTML = html;
            const allApps = document.querySelectorAll('.divGameLink');
            // add event listeners
            allApps.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    iframe.src = e.target.getAttribute('url');
                    appHeader.innerHTML = e.target.getAttribute('data.title');
                    allApps.forEach(link => link.classList.remove('active'));
                    e.target.classList.add('active');
                });
            });
        });
});