const movieList_container = '.movieList';
const movieList = '.movieList > input[type=checkbox]';
const selectAll = '#all';
const selected = '.selected';
const clearAll = '.clearAll';

let temp = '';
let displayList = [];
let renderList = '';
let checkAll = false;
let movieChecked = false;

const itemList = [
    'Changjinhu (2021)',
    'Dune (2021)',
    'Shang-Chi and the Legend of the Ten Rings (2021)',
    'Free Guy (2021)',
    'The Many Saints of Newark (2021)',
    'Finch (2021)',
    'Candyman (2021)',
    'No Time to Die (2021)',
    'Halloween Kills (2021)',
];

// render function
const render = (ele, temp) => {
    ele.innerHTML = temp;
};

// render the itemList
for (let movie of itemList) {
    temp += `
          <input type="checkbox" id="${movie}">
          <label for="${movie}">${movie}</label>
          <br />
          `;
}

render(document.querySelector(movieList_container), temp);

// Handle selectAll event
document.querySelector(selectAll).addEventListener('click', handleCheckAll);

function handleCheckAll() {
    checkAll = !checkAll;
    document.querySelectorAll(movieList).forEach((movie) => {
        // If there's unchecked movie, check it and render it
        if (movie.checked === false) {
            movie.checked = true;
            displayList.push(movie.id);
            renderList += `<li>${movie.id}</li>`;
            render(document.querySelector(selected), renderList);
            // Other wise toggle
        } else movie.checked = checkAll;

        // During toggle, if Select All isn't selected, no list rendered.
        if (checkAll === false) {
            displayList = [];
            renderList = '';
            render(document.querySelector(selected), '');
        }
    });
}

// Handle movieList select and display
document.querySelectorAll(movieList).forEach((movie) => {
    movie.addEventListener('click', (e) => {
        renderList = '';
        if (movie.checked === true) {
            if (displayList.indexOf(movie.id) < 0) {
                displayList.push(movie.id);
            }
        } else {
            let index = displayList.indexOf(movie.id);
            displayList = displayList
                .slice(0, index)
                .concat(displayList.slice(index + 1));
        }

        // If all movieList are selected, check Select All
        if (displayList.length === itemList.length) {
            document.querySelector(selectAll).checked = true;
            checkAll = true;
            // else uncheck Select All
        } else {
            document.querySelector(selectAll).checked = false;
            checkAll = false;
        }

        // Create renderList
        for (let list of displayList) {
            renderList += `<li>${list}</li>`;
        }

        // Render display
        render(document.querySelector(selected), renderList);
    });
});

// Handle Clear All button
document.querySelector(clearAll).addEventListener("click", () => {
    document.querySelectorAll(movieList).forEach((movie) => {
        movie.checked = false;   
        document.querySelector(selectAll).checked = false;
        checkAll = false;
    })
    displayList = [];
    renderList = '';
    render(document.querySelector(selected), renderList);
})