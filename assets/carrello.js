let nomeCarrello = 'carrello';
let totale = 'totale';
let prodotti = {};
prodotti.articoli = [];

function toStr(obj){
	let str = JSON.stringify(obj);
	return str;
}
//// struttura carrello
item = 0;
if(sessionStorage.getItem(nomeCarrello) == null){
		let carrello = {};
		carrello.articoli = [];
		sessionStorage.setItem(nomeCarrello, toStr(carrello)); 
		sessionStorage.setItem( totale, item );
	}else{
		let carrello = {};
		carrello.articoli = [];
		sessionStorage.setItem(nomeCarrello, toStr(carrello));
		sessionStorage.setItem( totale, item );
	}
//Inizializzazione del carrello	
let carrelloJson = JSON.parse(sessionStorage.carrello);
let carrelloJsonProcessa = carrelloJson.articoli;


function aggiungiCarrello(id, immagine, nome, prezzo, descrizione, quantita){
    obj.total = obj.itemCounter + obj.total;
    document.querySelector(".badge").innerHTML = obj.total;
    objSpesa = {img: immagine, nome : nome, prezzo : prezzo, descrizione : descrizione, quantita : obj.itemCounter};
    obj.itemCounter = 0; 
    carrelloJsonProcessa.push(objSpesa);
    item = objSpesa.quantita + item;
    sessionStorage.setItem( totale, item);
    alert(`${objSpesa.quantita} ${" "} ${objSpesa.nome} aggiunto al carrello`);
    return sessionStorage.setItem(nomeCarrello, JSON.stringify(carrelloJson));
  }