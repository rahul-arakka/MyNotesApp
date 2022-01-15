console.log("hey There");
showNotes();
// Function to add a note 
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let text = document.getElementById('text');
    let notes = localStorage.getItem("notes");
    // let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(text.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    text.value = "";

    showNotes();

    // console.log(notesObj);
});


// Function to show notes from our localStorage

function showNotes() {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);

    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card notecard" style="width: 18rem; margin: 0px 3px">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text" >${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>

    </div>`;
    });

    let notesElement = document.getElementById('notes');
    if (notesObj.length != 0)
        notesElement.innerHTML = html;
    else {
        notesElement.innerHTML = `Nothing to show, Please Add a Note`;
    }
}

// Function to delete a note 
function deleteNote(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else
        notesObj = JSON.parse(notes);
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();

};

// Search for a Note 
let search = document.getElementById('search');
search.addEventListener("input", function() {
    console.log(`input event fired`, search.value);
    let notecard = document.getElementsByClassName('notecard');
    let val = search.value;
    Array.from(notecard).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if(cardTxt.includes(val)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});