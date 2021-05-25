export function getCloseModalButton() {
    const button = document.createElement('button')
    button.textContent = 'Close'
    button.classList.add('danger')
    button.addEventListener('click', e => clearModal())

    return button
}

export function clearModal() {
    const modal = document.getElementById('modal')
    modal.classList.add('hidden')
    modal.childNodes.forEach(e => e.remove())
}