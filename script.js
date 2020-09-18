const draggables = document.querySelectorAll(".list-item");
const containers = document.querySelectorAll(".list");

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElemtent = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElemtent == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElemtent);
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".list-item:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        console.log(offset);
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}