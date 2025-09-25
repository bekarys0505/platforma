let editor = CodeMirror.fromTextArea(document.getElementById("note"), {
  lineNumbers: true,
  mode: "javascript",
  theme: "dracula",
  tabSize: 2,
  indentWithTabs: true,
  placeholder: "Мұнда код немесе мәтін жазыңыз..."
});

const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

// Live preview функциясы
function updatePreview() {
  const mode = editor.getOption("mode");
  const value = editor.getValue();

  if (mode === "htmlmixed") {
    preview.srcdoc = value;
  } else if (mode === "markdown") {
    preview.srcdoc = value
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/\n$/gim, '<br>');
  } else {
    preview.srcdoc = "<pre style='color:#61dafb;font-family:monospace'>" + value + "</pre>";
  }
}

editor.on("change", updatePreview);

// Файлға сақтау
function saveToFile() {
  const filename = document.getElementById('filename').value || 'note.txt';
  const text = editor.getValue();
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  setStatus("Сақталды: " + filename);
}

// Файлдан ашу
fileInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    editor.setValue(e.target.result);
    document.getElementById('filename').value = file.name;
    setStatus("Ашылды: " + file.name);
  };
  reader.readAsText(file);
});

// Тазалау
function clearNote() {
  editor.setValue('');
  document.getElementById('filename').value = '';
  setStatus("Тазаланды");
}

// Dark/Light ауыстыру
function toggleTheme() {
  const theme = editor.getOption("theme") === "dracula" ? "default" : "dracula";
  editor.setOption("theme", theme);
}

// Статус көрсету
function setStatus(msg){
  document.getElementById('status').textContent = msg;
  setTimeout(()=>document.getElementById('status').textContent='',3000);
}

// Режимді өзгерту (JS, HTML, CSS, Markdown)
function changeMode(mode){
  editor.setOption("mode", mode);
  updatePreview();
}

// Авто сақтау (LocalStorage)
setInterval(() => {
  localStorage.setItem("autosave", editor.getValue());
}, 5000);

// Қалпына келтіру
window.onload = () => {
  const saved = localStorage.getItem("autosave");
  if(saved) editor.setValue(saved);
};
