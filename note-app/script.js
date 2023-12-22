// Selecciona los elementos del DOM con los IDs 'btn y 'app'
const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

//Selecciona un color aleatorio para el fondo de la nota
function getRandomColor() {
  const lightColors = [
    '#FFDDC1', // Melocotón claro
    '#E1F5FE', // Azul claro
    '#FFE0B2', // Naranja claro
    '#C8E6C9', // Verde claro
    '#F3E5F5', // Lila claro
    '#FFF9C4', // Amarillo claro
    '#B3E5FC', // Azul claro
    '#FFCCBC', // Coral claro
    '#DCEDC8', // Verde menta claro
    '#E1BEE7', // Morado claro
  ];
  const randomIndex = Math.floor(Math.random() * lightColors.length);
  return lightColors[randomIndex];
}

// Recupera las notas del almacenamiento local y las muestra en la página
getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});

// Crea un elemento de nota (un textarea) con ciertas propiedades y eventos
function createNoteEl(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;
  element.style.backgroundColor = getRandomColor();

  // Agrega un evento de doble clic para eliminar la nota si se confirma
  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  // Agrega un evento de entrada para actualizar la nota cuando se escribe en ella
  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
}

// Elimina la nota con el ID proporcionado y actualiza las notas guardadas
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNote(notes);
  appEl.removeChild(element);
}

// Actualiza el contenido de la nota con el ID proporcionado y guarda las notas actualizadas
function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];
  target.content = content;
  saveNote(notes);
}

// Agrega una nueva nota vacía y guarda las notas actualizadas
function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl);
  notes.push(noteObj);
  saveNote(notes);
}

// Guarda las notas en el almacenamiento local
function saveNote(note) {
  localStorage.setItem("note-app", JSON.stringify(note));
}

// Obtiene las notas del almacenamiento local
function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

// Agrega un evento de clic al botón para agregar una nueva nota
btnEl.addEventListener("click", addNote);
