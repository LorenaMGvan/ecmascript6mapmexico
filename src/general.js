import * as service from './estados-servicio-mock';

const boxEscudo = document.querySelector('.estado-detalle__escudo');
const boxDescripcion = document.querySelector('.estado-detalle__description');
let   estadosLista = "";

/****Quitar escudo ***/
setTimeout( () => {   
  let bodyEl = document.getElementsByTagName('body')[0];
  bodyEl.classList.add('onmapa');  
}, 1000);

// tabs

const load = () => {

  let tabs = document.querySelectorAll(".mapalore__opciones a");
  let tabsHtml = document.querySelectorAll('.estado-detalle-info');

  const removeActiveTabs = () => {           
    tabs.forEach((elem, i) => {      
      elem.parentNode.classList.remove("active"); 

      tabsHtml.forEach((infoEl, item) => {      
        tabsHtml[item].classList.remove("active"); 
      });
      
    });      
  }

  const tabsListener = (el) => {

    el.addEventListener( "click", function(e) {
      let idTabName = 'estado-detalle__'+ el.getAttribute('href').slice(1);          
      let idTab = document.getElementById(idTabName);

      removeActiveTabs();      

      el.parentNode.classList.add("active");        
      ( idTab ) ? idTab.classList.add("active") : " ";      
      
    });
  } 
  
  tabs.forEach((elem, i) => {          
    tabsListener(tabs[i]);
  });   
}


const showEdoDefault = () => {
  changeLogoDetail(estadosLista[0]);
  changeDescription(estadosLista[0]); 
}

const showEstados = (estadosLista) => {  

  showEdoDefault();
  
  estadosLista.forEach((item) => {
    let stateMap = document.getElementById(item.id);       
     
    stateMap.addEventListener("click", function() {              
      let edoSelect = estadosLista.find(item => item.id === stateMap.id);
      changeLogoDetail(edoSelect);
      changeDescription(edoSelect);  
    }, false);
    
  });  
}       

// cambiar Capital e info derecha
const changeDescription = (edoSelect) => {
  
  edoSelect.detalles.forEach((el, i) => {      
    const tabItemSubtitle = document.querySelector('#estado-detalle__'+ el.id + ' .subtitle');
    const tabItemDescription = document.querySelector('#estado-detalle__'+ el.id + ' .description');
    
    tabItemDescription.textContent =  edoSelect.detalles[i].titulo;    
    tabItemDescription.innerHTML =  edoSelect.detalles[i].contenido;    
  });

}

// cambiarEscudo y nombre
const changeLogoDetail = (edoSelect) => {
  const escudoImg = document.querySelector('.estado-detalle__escudo img');
  const escudoTitle = document.querySelector('.estado-detalle__escudo h2');

  escudoImg.setAttribute("src", `img/${edoSelect.escudo}`);
  escudoTitle.textContent = edoSelect.nombre;    
}

const drawAreaStates = () => {

  let imgMapa = document.querySelector('#imgmapa');
  let areaMap = document.createElement('map');
  let formatAreas = "";
  
  service.listEstados()
  .then(response => {  
    estadosLista = response;   
    areaMap.id = 'mapalrn';
    areaMap.name = 'mapalrn';
    areaMap.innerHTML = '';
    imgMapa.after(areaMap);     

    estadosLista.forEach( (res) => {            
       formatAreas += `<area href="#" id="${res.id}" 
                              alt="${res.nombre}" 
                              title="${res.nombre}" 
                              shape="poly" 
                              coords="${res.coords}"                              
                              style="outline:none;"/>`                                                                    
        
    });
    
    areaMap.innerHTML = formatAreas;
    showEstados(estadosLista);
  })
  .catch((e) => {    
    return e;
  });              
}


document.addEventListener("DOMContentLoaded", load, false);
drawAreaStates();
