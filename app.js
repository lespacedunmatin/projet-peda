// const navSections = ['Objectifs', 'Actions', 'Matériel']
const navSections = ['Objectifs']
const titleElmt = document.querySelector('title')
const mainElmt = document.querySelector('body > main')
const asideElmt = document.querySelector('body > aside')
const navUlElmt = asideElmt.querySelector('ul')
const data = {objectifs: [], actions: [], materiel: []}

class Objectif {
    libelle
    uuid
    actions

    constructor(data) {
        this.libelle = data.libelle
        this.uuid = data.uuid
        this.actions = data.actions || []
    }
}

function removeElementFn(elmt, revealElement) {
    return () => {
        elmt.parentNode.removeChild(elmt)
        revealElement.classList.remove('hide')
    }
}

// https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/UUIDGeneratorBrowser.md
function UUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    )
}

function updateObjectifs() {
    const listObjectifs = mainElmt.querySelector('ul')

    listObjectifs.innerHTML = ''

    for (const objectif of data.objectifs) {
        const li = document.createElement('li')

        li.innerHTML = `${objectif.libelle}`
        // li.innerHTML = `<a href="#">${objectif.libelle}</a>`

        listObjectifs.appendChild(li)
    }

    const navObjectifsCount = navUlElmt.children[0].querySelector('span')
    navObjectifsCount.innerText = `(${data.objectifs.length})`
}

function addObjectif(formELmt, revealElement) {
    return () => {
        const inputLibelle = formELmt.querySelector('input')
        const libelle = inputLibelle.value.trim()

        if (!libelle) {
            return
        }

        const objectif = new Objectif({libelle, uuid: UUID()})
        data.objectifs.push(objectif)
        updateObjectifs()
        removeElementFn(formELmt, revealElement)()
    };
}

function formAddObjectif(triggerButton) {
    return () => {
        const formELmt = document.createElement('form')

        addLibelle = () => {
            const pLibelle = document.createElement('p')
            const inputLibelle = document.createElement('input')
            const labelLibelle = document.createElement('label')
            const libelleId = 'libelleObjectif'

            inputLibelle.setAttribute('id', libelleId)
            inputLibelle.setAttribute('required', true)
            labelLibelle.setAttribute('for', libelleId)
            labelLibelle.innerText = 'Libelle'

            pLibelle.appendChild(labelLibelle)
            pLibelle.appendChild(inputLibelle)

            formELmt.appendChild(pLibelle)
        }

        addButtons = () => {
            const pButtons = document.createElement('p')
            const cancelButton = document.createElement('button')
            const submitButton = document.createElement('button')
            cancelButton.setAttribute('type', 'reset')
            submitButton.setAttribute('type', 'submit')
            submitButton.classList.add('submit')

            cancelButton.innerText = 'annuler'
            submitButton.innerText = 'ajouter'

            cancelButton.onclick = removeElementFn(formELmt, triggerButton)
            submitButton.onclick = addObjectif(formELmt, triggerButton)

            pButtons.appendChild(cancelButton)
            pButtons.appendChild(submitButton)

            formELmt.appendChild(pButtons)
        }

        addLibelle()
        addButtons()

        mainElmt.insertBefore(formELmt, mainElmt.childNodes[1])
        triggerButton.classList.add('hide')
    }
}

function displayObjectifs() {
    const pAddObjectif = document.createElement('p')
    const buttonAddObjectif = document.createElement('button')
    const listObjectifs = document.createElement('ul')
    buttonAddObjectif.innerText = 'Nouvel Objectif'
    buttonAddObjectif.onclick = formAddObjectif(pAddObjectif)

    pAddObjectif.appendChild(buttonAddObjectif)

    mainElmt.appendChild(pAddObjectif)
    mainElmt.appendChild(listObjectifs)

    updateObjectifs()
}

function displayMateriel() {

}

function displayActions() {

}

function display(page) {
    return () => {
        mainElmt.innerHTML = ''

        const h1 = document.createElement('h1')
        h1.innerText = page

        titleElmt.innerText = `${page} – Projet pédagogique`

        mainElmt.appendChild(h1)

        switch (page) {
            case 'Actions':
                displayActions()
                break
            case 'Matériel':
                displayMateriel()
                break
            case 'Objectifs':
                displayObjectifs()
                break
            default:
                break
        }
    }
}

function injectAsideNav() {
    for (const section of navSections) {
        const li = document.createElement('li')
        const a = document.createElement('a')

        a.setAttribute('href', '#')
        a.innerHTML = `${section} <span>(0)</span>`
        a.onclick = display(section)

        li.appendChild(a)
        navUlElmt.appendChild(li)
    }
}

function init() {
    injectAsideNav()
    display('Objectifs')()
}

init()
