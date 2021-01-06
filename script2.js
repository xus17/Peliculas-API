document.getElementById("titulo").textContent=localStorage.getItem('titulo');
document.getElementById("fecha").textContent="Release Date: "+localStorage.getItem('fecha');
document.getElementById("nota").textContent="Grade: "+localStorage.getItem('nota');
document.getElementById("descripcion").textContent=localStorage.getItem('descripcion');
document.getElementById("imagen").src=localStorage.getItem('imagen');
