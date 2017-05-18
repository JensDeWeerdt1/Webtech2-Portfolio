"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotesApp = function () {
    function NotesApp() {
        _classCallCheck(this, NotesApp);

        this.buttonAddNote = document.getElementById('btnAddNote');
        this.notesContainer = document.querySelector(".notes");
        this.noteInput = document.querySelector("#txtAddNote");

        this.buttonAddNote.addEventListener("click", this.addNote.bind(this));
    }

    _createClass(NotesApp, [{
        key: "addNote",
        value: function addNote(event) {
            var newNote = document.createElement("div");
            newNote.setAttribute("class", "card");
            newNote.innerHTML = "<p> " + this.noteInput.value + " </p>";
            var notelink = document.createElement("a");
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
    }, {
        key: "removeNote",
        value: function removeNote(e) {
            console.log("removing note");

            var elementToDelete = e.target.parentElement;
            console.log(elementToDelete);
            var notescontainer1 = document.querySelector(".notes");

            setTimeout(function () {
                notescontainer1.removeChild(elementToDelete).fadeOut;
            }, 1000);

            console.log("clicked to remove note " + event);
            event.preventDefault();
        }
    }, {
        key: "resetNotesForm",
        value: function resetNotesForm() {
            console.log("resetting the notes form");

            this.noteInput.value = "";
            this.noteInput.focus();
        }
    }]);

    return NotesApp;
}();

var myApp = new NotesApp();

//# sourceMappingURL=app.es5.js.map