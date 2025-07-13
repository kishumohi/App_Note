// Open/Close form
document.querySelector('#add-note').addEventListener('click', function () {
    document.querySelector('.form-container').style.display = 'initial';
});
document.querySelector('.closeForm').addEventListener('click', function () {
    document.querySelector('.form-container').style.display = 'none';
});

// Save to LocalStorage
function saveToLocalStorage(obj) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(obj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Select form fields
const stack = document.querySelector('.stack');
const upBtn = document.querySelector('#upBtn');
const downBtn = document.querySelector('#downBtn');

const form = document.querySelector('form');
const imageUrlInput = document.querySelector('input[placeholder="https://example.com/photo.jpg"]');
const fullNameInput = document.querySelector('input[placeholder="Enter full name"]');
const homeTownInput = document.querySelector('input[placeholder="Enter home town"]');
const purposeInput = document.querySelector('input[placeholder="e.g., Quick appointment note"]');
const categoryRadios = document.querySelectorAll('input[name="category"]');

// Submit form
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const imageUrl = imageUrlInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const homeTown = homeTownInput.value.trim();
    const purpose = purposeInput.value.trim();

    let selectedCategory = null;
    categoryRadios.forEach((cat) => {
        if (cat.checked) selectedCategory = cat.value;
    });

    // Validation
    if (!imageUrl) return alert('Please enter an Image URL.');
    if (!fullName) {
        alert('Please enter your Full Name.');
        return fullNameInput.focus();
    }
    if (!homeTown) {
        alert('Please enter your Home Town.');
        return homeTownInput.focus();
    }
    if (!purpose) {
        alert('Please enter the Purpose.');
        return purposeInput.focus();
    }
    if (!selectedCategory) return alert('Please select a Category.');

    const newNote = {
        imageUrl,
        fullName,
        homeTown,
        purpose,
        category: selectedCategory, // FIXED KEY
    };

    // Save + render
    saveToLocalStorage(newNote);
    renderCardToStack(newNote);
    form.reset();
    document.querySelector('.form-container').style.display = 'none';
});

// Create card DOM
function createCard(noteData) {
    const card = document.createElement('div');
    card.className = 'card';

    const avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.src = noteData.imageUrl;
    card.appendChild(avatar);

    const nameHeading = document.createElement('h2');
    nameHeading.textContent = noteData.fullName;
    card.appendChild(nameHeading);

    const hometownDiv = document.createElement('div');
    hometownDiv.className = 'info';
    hometownDiv.innerHTML = `<span>Hometown:</span><span>${noteData.homeTown}</span>`;
    card.appendChild(hometownDiv);

    const purposeDiv = document.createElement('div');
    purposeDiv.className = 'info';
    purposeDiv.innerHTML = `<span>Purpose:</span><span>${noteData.purpose}</span>`;
    card.appendChild(purposeDiv);

    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'info';
    categoryDiv.innerHTML = `<span>Category:</span><span>${noteData.category}</span>`;
    card.appendChild(categoryDiv);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

    const callBtn = document.createElement('button');
    callBtn.className = 'call';
    callBtn.textContent = 'Call';
    buttonsDiv.appendChild(callBtn);

    const msgBtn = document.createElement('button');
    msgBtn.className = 'msg';
    msgBtn.textContent = 'Message';
    buttonsDiv.appendChild(msgBtn);

    card.appendChild(buttonsDiv);

    return card;
}

// Add card to stack visually
function renderCardToStack(noteData) {
    const card = createCard(noteData);
    stack.prepend(card);
    // updateStack();
}

// Load from storage on page load
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.reverse().forEach((task) => renderCardToStack(task));
}
window.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Stack appearance (z-index, transform, etc.)
function updateStack() {
    const cards = document.querySelectorAll('.stack .card');
    // cards.forEach((card, index) => {
    //     card.style.zIndex = 3 - index;
    //     card.style.transform = `translateY(${index * 10}px) scale(${1 - index * 0.02})`;
    //     card.style.opacity = `${1 - index * 0.02}`;
    // });
    // for (let i = 0; i < 3; i++) {
    //     card.style.zIndex = 3 - i;
    //     card.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.02})`;
    //     card.style.opacity = `${1 - i * 0.02}`;
    // }
}

// Stack reorder buttons
upBtn.addEventListener('click', function () {
    const lastChild = stack.lastElementChild;
    if (lastChild) {
        stack.insertBefore(lastChild, stack.firstElementChild);
        // updateStack();
    }
});

downBtn.addEventListener('click', function () {
    const firstChild = stack.firstElementChild;
    if (firstChild) {
        stack.appendChild(firstChild);
        // updateStack();
    }
});
