class NotesApp {
    constructor() {
        this.buttonAddNote = document.getElementById('btnAddNote');
        this.notesContainer = document.querySelector(".notes");
        this.noteInput = document.querySelector("#txtAddNote");

        this.buttonAddNote.addEventListener("click", this.addNote.bind(this));
    }

    addNote(event) {
        let newNote = document.createElement("div");
        newNote.setAttribute("class", "card");
        newNote.innerHTML = `<p> ${this.noteInput.value} </p>`;
        let notelink = document.createElement("a");
        //link to remove note
        notelink.setAttribute("class", "card-remove");
        notelink.innerHTML = "remove";
        notelink.setAttribute("href", "#");
        notelink.addEventListener("click", this.removeNote);

        newNote.appendChild(notelink);

        this.notesContainer.appendChild(newNote);
        this.resetNotesForm();
        
        //event.preventDefault();
        console.log("clicked to add note " + event);
    }

    removeNote(e){
         console.log("removing note");
 
         let elementToDelete = e.target.parentElement;
          console.log(elementToDelete);
        let notescontainer1 = document.querySelector(".notes");
        
        setTimeout(function(){            
            (notescontainer1.removeChild(elementToDelete)).fadeOut;
        },1000);
        
         console.log("clicked to remove note " + event);
         event.preventDefault();
     }

    resetNotesForm() {
        console.log("resetting the notes form");
        
        this.noteInput.value ="";
        this.noteInput.focus();
    }

}

let myApp = new NotesApp();