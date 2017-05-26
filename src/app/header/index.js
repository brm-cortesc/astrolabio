const _ = require('underscore');

var header = '<header><nav><a href="/"><img src="/images/astrolabio.svg" alt="Astrolabio" title="Astrolabio" class="logo"/></a> <div class="buscador-header"><input type="text"/> </div></nav> <div class="container-switch"> <div class="switch"> <label>Local <input type="checkbox" checked="checked"/><span class="lever"></span>shutterstock </label> </div></div><div class="container-counter"> <h2>Descargas</h2> <article> <p class="diarias"> Diarias <span class="num" >32</span> </p><p class="mes"> Restantes <span class="num" >1000</span> </p></article> <article> <p>Disponible hasta</p><p class="fecha">20/06/2016</p></article> </div></header>';


module.exports = function header () {

  console.log('header cargado');

    let div = document.getElementsByClassName('container-header')[0];
    // div.classList.add('container-header');
    div.innerHTML = header;
  
};