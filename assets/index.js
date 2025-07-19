let objSpesa = {};
    const obj = {
      prodottiSupermercato: [],
      total: 0,
      itemCounter: 0,
    };
    const lista = document.getElementById("lista-prodotti");
    const listaRicerca = document.getElementById("singolo-prodotto");
    const inputSearch = document.getElementById("inputSearch");
    let carrello = [];

    async function caricaProdotti() {
      try {
        const response = await fetch("inserimento.php");
        const prodotti = await response.json();

        prodotti.forEach((p, i) => {
          obj.prodottiSupermercato.push(prodotti[i]);
          const col = document.createElement("div");
          col.className = "col-md-3 col-sm-6 mb-3";
          col.innerHTML = `
            <div class="card h-100 shadow-sm" style="font-size: 0.85rem;">
              <img src="assets/immagini/${p.immagine}" class="card-img-top img-fluid" style="height: 200px; width: 200px; object-fit: cover;" alt="${p.nome}">
              <div class="card-body p-2" style="font-size: 0.9rem;">
                <h5 class="card-title">${p.nome}</h5>
                <p class="card-text">€ ${p.prezzo}</p>
                <p class="card-text">${p.codice}</p>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">\
                    <button type="button" class="btn btn-danger minus" onclick="funcMinus(${obj.itemCounter},${p.id});">-</button>\
                    <button type="button" class="btn displayQty" value="${obj.itemCounter}">${obj.itemCounter}</button>\
                    <button type="button" class="btn btn-success plus" onclick="funcPlus(${obj.itemCounter}, ${p.inStock},${p.id});">+</button>\
                </div>
                  <p class="link-body-emphasis d-inline-flex text-decoration-none rounded">Disponibili ${p.inStock} pezzi</p>
                      <button class="btn btn-sm btn-success" onclick="aggiungiCarrello(${p.id}, '${p.immagine}', '${p.nome}', ${p.prezzo}, '${p.descrizione}', ${obj.itemCounter});">Aggiungi</button>
                      <p><button class="btn btn-sm btn-info ms-2" onclick="mostraDescrizione('${p.descrizione}')">Descrizione</button></p>
                    <form action="carrelloValutazione.php" method="POST" class="valutazione-form">
                      <label>
                        <input name="star-rating1" type="radio" value="1" class="star" /> 
                      </label>
                      <label>
                        <input name="star-rating1" type="radio" value="2" class="star" /> 
                      </label>
                      <label>
                        <input name="star-rating1" type="radio" value="3" class="star" /> 
                      </label>
                      <label>
                        <input name="star-rating1" type="radio" value="4" class="star" /> 
                      </label>
                      <label>
                        <input name="star-rating1" type="radio" value="5" class="star" /> 
                      </label>
                      <br><br>
                      <input type="hidden" name="product-image" value="${p.immagine}">
                      <input type="submit" value="Valuta">
                      <div id="demo"></div>
                    </form>
              </div>
            </div>
          `;
          lista.appendChild(col);
        });
        window.prodotti = prodotti;
        inizializzaStelle();
      } catch (err) {
        lista.innerHTML = "<p>Errore nel caricamento dei prodotti</p>";
        console.error(err);
      }
    }

    function funcPlus(quantita, inStock, id ){
      console.log(inStock);
      obj.itemCounter = obj.itemCounter + 1;
      quantita = obj.itemCounter;
      let qty = document.querySelectorAll(".displayQty");
      obj.prodottiSupermercato.forEach((ele,i)=>{
        qty.forEach((el, item)=>{
        if(ele.id == id && obj.itemCounter <= inStock){          
                 qty[i].innerHTML = obj.itemCounter;                          
            }
        if(qty.length == 1){
            qty[0].innerHTML = obj.itemCounter;
            }
        });              
        if(ele.id == id && obj.itemCounter > inStock){
            qty[i].innerHTML = 'Prodotto esaurito';
            }
    });
    return obj.itemCounter;
  }

function funcMinus(quantita, id){
  obj.itemCounter = obj.itemCounter - 1;
  quantita = obj.itemCounter;
  let qty = document.querySelectorAll(".displayQty");
  obj.prodottiSupermercato.forEach((ele,i)=>{
  qty.forEach((el, item)=>{
  if(ele.id == id && obj.itemCounter >= 0){          
    qty[i].innerHTML = obj.itemCounter;                          
    }
  if(qty.length == 1){
    qty[0].innerHTML = obj.itemCounter;
    }
   });                     
 });
    return obj.itemCounter;
}

  function inizializzaStelle() {
    const stelle = document.querySelectorAll('.star');
    stelle.forEach((ele, i) => {
    ele.addEventListener('mouseover', () => {
    const parent = ele.closest("form");
    const message = parent.querySelector("#demo");
    const index = parseInt(ele.value);
    const descrizioni = ["Pessimo", "Scarso", "Discreto", "Buono", "Eccellente"];
    message.textContent = descrizioni[index - 1];
    const tutte = parent.querySelectorAll(".star");
    tutte.forEach((s, n) => {
    s.classList.toggle("ckStar", n < index);
    });
  });
    ele.addEventListener('click', () => {
      const parent = ele.closest("form");
      const message = parent.querySelector(".messaggio");
      const index = parseInt(ele.value);
      const descrizioni = ["Pessimo", "Scarso", "Discreto", "Buono", "Eccellente"];
      message.textContent = `Hai scelto: ${descrizioni[index - 1]}`;
      const tutte = parent.querySelectorAll(".star");
      tutte.forEach((s, n) => {
      s.classList.toggle("ckStar", n < index);
      });
    });
  });
  document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function () {
  const img = form.querySelector('img');
  const hiddenInput = form.querySelector('input[name="product-image"]');
  if (img && hiddenInput) {
    hiddenInput.value = img.getAttribute('src');
      }
    });
  });
 }

    function mostraDescrizione(testo) {
      document.getElementById("contenutoDescrizione").textContent = testo;
      const modal = new bootstrap.Modal(document.getElementById("modaleDescrizione"));
      modal.show();
    }

    caricaProdotti();

  async function searchProd(){
    lista.remove(); 
    try{
        const response = await fetch("inserimento.php");
        const data = await response.json();
        console.log(data);
        for(let x in data){       
            let idProd = data[x].id;
            let nomeProdotto = data[x].nome;
            let imageProdotto = data[x].immagine;
            let prezzoProdotto = data[x].prezzo;
            let descrizioneProdotto = data[x].descrizione;
            let qtyInStock = data[x].inStock;
            let codice = data[x].codice;
            //let quantita = data[x].quantita;
            let arrLink = [];
            let arrImg = [];
            arrLink.push(imageProdotto);
            arrLink.forEach((i)=>{
            let imgProdotto = document.createElement('img');               
            imgProdotto.src = i;
            arrImg.push(imgProdotto.src);
			     });              
            let divProdotto = document.createElement('div'); 
            if (nomeProdotto.toLowerCase().includes(inputSearch.value.toLowerCase().trim())) {
                console.log(idProd);                                     
                divProdotto.innerHTML = `
            <div class="card h-100 shadow-sm" style="max-width: 500px; margin: auto;">
              <img src="${imageProdotto}" class="card-img-top img-fluid" style="height: 200px; width: 200px; object-fit: cover;" alt="${nomeProdotto}">
              <div class="card-body p-2" style="font-size: 0.9rem;">
                <h5 class="card-title">${nomeProdotto}</h5>
                <p class="card-text">€ ${prezzoProdotto}</p>
                <p class="card-text">${codice}</p>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">\
                    <button type="button" class="btn btn-danger minus" onclick="funcMinus(${obj.itemCounter},${idProd});">-</button>\
                    <button type="button" class="btn displayQty" value="${obj.itemCounter}">${obj.itemCounter}</button>\
                    <button type="button" class="btn btn-success plus" onclick="funcPlus(${obj.itemCounter}, ${qtyInStock},${idProd});">+</button>\
                </div>
                  <p class="link-body-emphasis d-inline-flex text-decoration-none rounded">Disponibili ${qtyInStock} pezzi</p>
                      <button class="btn btn-sm btn-success" onclick="aggiungiCarrello(${idProd}, '${imageProdotto}', '${nomeProdotto}', ${prezzoProdotto}, '${descrizioneProdotto}', ${obj.itemCounter});">Aggiungi</button>
                      <p><button class="btn btn-sm btn-info ms-2" onclick="mostraDescrizione('${descrizioneProdotto}')">Descrizione</button></p>
                    <form action="carrelloValutazione.php" method="POST" class="valutazione-form">
                      <label>
                        <input name="star-rating1" type="radio" value="1" class="star" /> 
                      </label>
                      <label>
                        <input name="star-rating1" type="radio" value="2" class="star" /> 
                      </label>
                      <label>
                        <input name="star-rating1" type="radio" value="3" class="star" /> 
                      </label>
                      <label>
                        <input name="star-rating1" type="radio" value="4" class="star" /> 
                      </label>
                      <label>
                        <input name="star-rating1" type="radio" value="5" class="star" /> 
                      </label>
                      <br><br>
                      <input type="hidden" name="product-image" value="${imageProdotto}">
                      <input type="submit" value="Valuta">
                      <div id="demo"></div>
                    </form>
              </div>
            </div>
          `;                                                 
            listaRicerca.appendChild(divProdotto);               
          }                                       	
        }
    }catch(err){
       console.log(err);
    }
}





