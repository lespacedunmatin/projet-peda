const navSections = ['Objectifs', 'Actions', 'Matériel'];
const mainElmt = document.querySelector('body > main');
const asideElmt = document.querySelector('body > aside');
const navUlElmt = asideElmt.querySelector('ul');

function display(page) {
    return () => {
        mainElmt.innerHTML = '';

        const h1 = document.createElement('h1');
        h1.innerText = page;

        mainElmt.appendChild(h1);
    }
}

function injectAsideNav() {
    for(const section of navSections) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.setAttribute('href', '#');
        a.innerHTML = `${section} <span>(0)</span>`;
        a.onclick = display(section);

        li.appendChild(a);
        navUlElmt.appendChild(li);
    }
}

function init() {
    injectAsideNav();
}

init();
