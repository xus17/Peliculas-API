class Movie {
  constructor(id, title, release, description, note, image) {
    this.id = id;
    this.title = title;
    this.release = release;
    this.description = description;
    this.note = note;
    this.image = image;
  }
}

var arrayMovie = [];
var existe = -1;
var pag = 1;
var max = 0;
var intervalo1 = 0;


window.onload = () => {
  populares();
  setInterval(function() {
    if (intervalo1 == 0) {
      max = document.getElementById("bloque").clientHeight;
      console.log(arrayMovie.length);
      var scroll = window.scrollY;
      if (window.scrollY > max - 1200) {
        populares();
      }
    }
  }, 1000);
}

function populares() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      texto = JSON.parse(this.responseText);
      var s = texto;
      dibujarpopulares(texto.results);
    }
  };
  xhttp.open("GET", "https://api.themoviedb.org/3/movie/top_rated?api_key=7c05333848e82645039bf857eed13ba2&page=" + pag, true);
  xhttp.send();
  pag++;
}


function llamada() {
  pag = 1;
  intervalo1 = 1;
  existe = 0;
  busqueda();
  setInterval(function() {
    max = document.getElementById("bloque").clientHeight;
    var scroll = window.scrollY;
    if (window.scrollY > max - 1200) {
      busqueda();
    }
  }, 1000);
}

function busqueda() {
  var input = document.getElementById("txtbusqueda");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      texto = JSON.parse(this.responseText);
      var alaipelicula = texto.results;
      dibujar(alaipelicula);
    }
  };

  xhttp.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=7c05333848e82645039bf857eed13ba2&query=" + input.value + "&page=" + pag, true);
  xhttp.send();
  pag++;
}

function sacarinformacion(evento) {
  var idbasico = evento.target.parentNode.id;
  console.log(idbasico);
  var id = idbasico.substr(4,idbasico.length)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      texto = JSON.parse(this.responseText);
      if (texto.backdrop_path == null) {
        var peli = new Movie(texto.id, texto.title, texto.release_date, texto.overview,texto.vote_average,  "https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible.png");
      } else {
        var peli = new Movie(texto.id, texto.title, texto.release_date, texto.overview,texto.vote_average, "https://image.tmdb.org/t/p/w500" + texto.backdrop_path);
      }
      localStorage.setItem('id', peli.id);
      localStorage.setItem('titulo', peli.title);
      localStorage.setItem('fecha', peli.release);
      localStorage.setItem('nota', peli.note);
      localStorage.setItem('descripcion', peli.description);
      localStorage.setItem('imagen', peli.image);
      location.assign("index2.html");
    }
  };

  xhttp.open("GET", "https://api.themoviedb.org/3/movie/"+id+"?api_key=7c05333848e82645039bf857eed13ba2", true);
  xhttp.send();
}

function dibujarpopulares(results) {
  var division = document.getElementById("bloque");
  if (existe == 0) {
    var divprincipal = document.getElementById("principal");
    for (var i = 0; i < results.length; i++) {
      arrayMovie.push(new Movie(results[i].id, results[i].title, results[i].release, results[i].vote_average, results[i].overview, "https://image.tmdb.org/t/p/w500" + results[i].backdrop_path));
      var divNota = document.createElement("div");
      divNota.setAttribute("id", "nota" + results[i].id);
      divNota.setAttribute("class", "pelicula");
      divNota.setAttribute("style", "height:400px;width:400px");

      var divtitulo = document.createElement("p");
      divtitulo.setAttribute("class", "texto");
      divtitulo.setAttribute("style", "font-weight:bold;");
      divtitulo.textContent = results[i].title;
      var divimagen = document.createElement("img");
      if (results[i].backdrop_path == null) {
        divimagen.src = "https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible.png";
      } else {
        divimagen.src = "https://image.tmdb.org/t/p/w500" + results[i].backdrop_path;
      }
      var divmedia = document.createElement("p");
      divmedia.setAttribute("class", "texto");
      divmedia.textContent = "GRADE : " + results[i].vote_average;
      var divboton = document.createElement("button");
      divboton.textContent = "INFO";
      divboton.setAttribute("onclick", "sacarinformacion(event)");
      divNota.appendChild(divtitulo);
      divNota.appendChild(divimagen);
      divNota.appendChild(divmedia);
      divNota.appendChild(divboton);
      divprincipal.appendChild(divNota);
      existe = -1;
    }
    division.appendChild(divprincipal);
  } else {
    var divprincipal = document.createElement("div");
    divprincipal.setAttribute("id", "principal");

    for (var i = 0; i < results.length; i++) {
      arrayMovie.push(new Movie(results[i].id, results[i].title, results[i].release, results[i].vote_average, results[i].overview, "https://image.tmdb.org/t/p/w500" + results[i].backdrop_path));
      var divNota = document.createElement("div");
      divNota.setAttribute("id", "nota" + results[i].id);
      divNota.setAttribute("class", "pelicula");
      divNota.setAttribute("style", "height:400px;width:400px");
      var divtitulo = document.createElement("p");
      divtitulo.setAttribute("class", "texto");
      divtitulo.setAttribute("style", "font-weight:bold;");
      divtitulo.textContent = results[i].title;
      var divimagen = document.createElement("img");
      if (results[i].backdrop_path == null) {
        divimagen.src = "https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible.png";
      } else {
        divimagen.src = "https://image.tmdb.org/t/p/w500" + results[i].backdrop_path;
      }
      var divmedia = document.createElement("p");
      divmedia.setAttribute("class", "texto");
      divmedia.textContent = "GRADE : " + results[i].vote_average;
      var divboton = document.createElement("button");
      divboton.textContent = "INFO";
      divboton.setAttribute("onclick", "sacarinformacion(event)");
      divNota.appendChild(divtitulo);
      divNota.appendChild(divimagen);
      divNota.appendChild(divmedia);
      divNota.appendChild(divboton);
      divprincipal.appendChild(divNota);
      existe = 0;
    }
    division.appendChild(divprincipal);
  }
}

function dibujar(results) {
  var division = document.getElementById("bloque");
  if (existe == 0) {
    document.getElementById("principal").remove();
    var divprincipal = document.createElement("div");
    divprincipal.setAttribute("id", "principal");
    for (var i = 0; i < results.length; i++) {
      arrayMovie.push(new Movie(results[i].id, results[i].title, results[i].release, results[i].vote_average, results[i].overview, "https://image.tmdb.org/t/p/w500" + results[i].backdrop_path));
      var divNota = document.createElement("div");
      divNota.setAttribute("id", "nota" + results[i].id);
      divNota.setAttribute("class", "pelicula");
      divNota.setAttribute("style", "height:400px;width:400px");
      var divtitulo = document.createElement("p");
      divtitulo.setAttribute("class", "texto");
      divtitulo.setAttribute("style", "font-weight:bold;");
      divtitulo.textContent = results[i].title;
      var divimagen = document.createElement("img");
      if (results[i].backdrop_path == null) {
        divimagen.src = "https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible.png";
      } else {
        divimagen.src = "https://image.tmdb.org/t/p/w500" + results[i].backdrop_path;
      }
      var divmedia = document.createElement("p");
      divmedia.setAttribute("class", "texto");
      divmedia.textContent = "GRADE : " + results[i].vote_average;
      var divboton = document.createElement("button");
      divboton.setAttribute("onclick", "sacarinformacion(event)");
      divboton.textContent = "INFO";
      divNota.appendChild(divtitulo);
      divNota.appendChild(divimagen);
      divNota.appendChild(divmedia);
      divNota.appendChild(divboton);
      divprincipal.appendChild(divNota);

    }
    division.appendChild(divprincipal);
    existe = -1;
  } else {
    var divprincipal = document.getElementById("principal");
    for (var i = 0; i < results.length; i++) {
      arrayMovie.push(new Movie(results[i].id, results[i].title, results[i].release, results[i].vote_average, results[i].overview, "https://image.tmdb.org/t/p/w500" + results[i].backdrop_path));
      var divNota = document.createElement("div");
      divNota.setAttribute("id", "nota" + results[i].id);
      divNota.setAttribute("class", "pelicula");
      divNota.setAttribute("style", "height:400px;width:400px");
      var divtitulo = document.createElement("p");
      divtitulo.setAttribute("class", "texto");
      divtitulo.setAttribute("style", "font-weight:bold;");
      divtitulo.textContent = results[i].title;
      var divimagen = document.createElement("img");
      if (results[i].backdrop_path == null) {
        divimagen.src = "https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible.png";
      } else {
        divimagen.src = "https://image.tmdb.org/t/p/w500" + results[i].backdrop_path;
      }
      var divmedia = document.createElement("p");
      divmedia.setAttribute("class", "texto");
      divmedia.textContent = "GRADE : " + results[i].vote_average;
      var divboton = document.createElement("button");
      divboton.setAttribute("onclick", "sacarinformacion(event)");
      divboton.textContent = "INFO";
      divNota.appendChild(divtitulo);
      divNota.appendChild(divimagen);
      divNota.appendChild(divmedia);
      divNota.appendChild(divboton);
      divprincipal.appendChild(divNota);
    }
    division.appendChild(divprincipal);
  }
}
