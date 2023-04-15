"use strict";

let header = document.querySelector("header");
header.className = "header";
let headerTitle = document.createElement("h3");
headerTitle.id = "headerTitle";
headerTitle.className = "headerTitle";
headerTitle.innerHTML = "My Western Vacation";
header.appendChild(headerTitle);

let http = new XMLHttpRequest();

http.open('get', 'products.json', true);

http.send();

function fetchDetails(url) {
	fetch(url)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			openMyModal(data);
		})
		.catch(error => console.error(error));
}

function move() {
	var elem = document.getElementById("myBar");
	var width = 1;
	var id = setInterval(frame, 100);

	function frame() {
		if (width >= 100) {
			clearInterval(id);
		} else {
			width++;
			elem.style.width = width + "%";
		}
	}
}

http.onload = function(){
	
	if(this.readyState == 4 && this.status == 200){
		
		let products = JSON.parse(this.responseText);	
		let delay = 1000;

		for (let item of products) {
			let productCard = document.createElement("div");
			productCard.className = "product";
			
			let img = document.createElement("img");
			img.src = item.src;
			img.alt = item.alt;
			productCard.appendChild(img);
			
			let title = document.createElement("p");
			title.className = "title";
			title.textContent = item.title;
			productCard.appendChild(title);
			
			let description = document.createElement("p");
			description.className = "description";
			description.textContent = item.description;
			productCard.appendChild(description);
			
			let price = document.createElement("p");
			price.className = "price";
			let priceDollarSign = document.createElement("span");
			priceDollarSign.textContent = "$";
			price.appendChild(priceDollarSign);
			let priceAmount = document.createElement("span");
			priceAmount.textContent = item.price;
			price.appendChild(priceAmount);
			productCard.appendChild(price);
			
			let cartButton = document.createElement("p");
			cartButton.className = "cart";
			if (item.actionURL) {
				cartButton.addEventListener("click", () => fetchDetails(item.actionURL));
			} else {
				cartButton.classList.add("disabled");
			}
			cartButton.textContent = "Add to cart ";
			let cartIcon = document.createElement("i");
			cartIcon.className = "bx bx-cart-alt";
			cartButton.appendChild(cartIcon);
			productCard.appendChild(cartButton);
		
			setTimeout(() => {
				document.querySelector(".products").appendChild(productCard);
			}, delay);
			delay += 1000;	
			move(); 

		}
	}
} 

function openMyModal (data) {
	let modalWindow = document.createElement("div");
	modalWindow.id = "lbOverlay";
	let figureBox = document.createElement("figure");
	modalWindow.appendChild(figureBox);

	let modalImage = document.createElement("img");
	modalImage.src = data.src;
	figureBox.appendChild(modalImage);

	let figureCaption = document.createElement("figcaption");
	figureCaption.textContent = data.alt;
	figureBox.appendChild(figureCaption);

	let closeBox = document.createElement("div");
	closeBox.id = "lbOverlayClose";
	closeBox.innerHTML = "&times;";
	closeBox.onclick = function() {
		document.body.removeChild(modalWindow);
	}

	modalWindow.appendChild(closeBox);	
	document.body.appendChild(modalWindow);

}

var footer = document.querySelector("footer");
var footerP = document.createElement("P"); 
var footerText = document.createTextNode("Copyright \xA9 2023 Sarah Shields 301264350 COMP125 Sec 401 Winter 2023");
footerP.appendChild(footerText);
footer.appendChild(footerP);