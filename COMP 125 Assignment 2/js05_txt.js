"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: Sarah Shields 301264350
      Date:   February 20th, 2023

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);

/* Header */
let header = document.createElement("header");
header.id = "header";
header.className = "header";
let article = document.querySelector("article");
let body = document.querySelector("body");
body.insertBefore(header, article);
let headerTitle = document.createElement("h3");
headerTitle.id = "headerTitle";
headerTitle.className = "headerTitle";
headerTitle.innerHTML = "My Western Vacation";
header.appendChild(headerTitle);

/* myTitle under header */
let myTitle = document.querySelector("h1");
myTitle.id = myTitle;
myTitle.innerHTML = "Enjoy my vacation Slideshow!";

/* Favourites Section under MyTitle */
let favesTitle = document.createElement("h2");
favesTitle.className = "favesTitle";
favesTitle.textContent = "Add your favourite photos here:";
myTitle.appendChild(favesTitle);
let favesSection = document.createElement("section");
favesSection.id = "favesSection";
favesSection.className = "favesSection"
favesTitle.appendChild(favesSection);

/* FavesList under FaveSection */
let favesList = document.createElement("ul");
favesList.id = "favesList";
favesList.className = "favesList";
favesSection.appendChild(favesList);

/* Slideshow Instructions Title  */
let myInstructionsTitle = document.querySelector("p");
myInstructionsTitle.id = "myInstructionsTitle";
myInstructionsTitle.className = myInstructionsTitle;
myInstructionsTitle.innerHTML = "To view my slides:";

/*attach favesSection before myInstructionsTitle*/
article.insertBefore(favesSection, myInstructionsTitle);

function setupGallery() {

   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("lightbox");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
  
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   galleryTitle.className = "galleryTitle";
   galleryTitle.innerHTML = "My Vacation Photos";
   galleryBox.appendChild(galleryTitle); 

   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);  

   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox); 

   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);  

   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);

   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);  

   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }   

   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   } 

   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }   

   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "lbOverlay";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);      
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";      
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      } 

      /*when modal created add addFaveButton and append it to figureBox*/ 
      let addFaveButton = document.createElement("button");
      addFaveButton.textContent = "Add to Favourites";
      addFaveButton.className = "button-53";
      figureBox.appendChild(addFaveButton);

      /*create removeButton*/
      let removeButton = document.createElement("button");
      removeButton.textContent = "Remove";     
      removeButton.className = "removeButton"; 

      /*when add to favourites button clicked*/
      addFaveButton.onclick = function() {  
         
         /* clone the modal-> modal clone = faveItem*/
         let faveItem = modalImage.cloneNode(true);
         faveItem.className = "faveItem";
         faveItem.id = "faveItem";
         let faveListLi = document.createElement("li");
         faveListLi.className = "faveListLi";

         let itemInFaves = false;
         let numberOfItemsInFaves = favesList.children.length;
        
         for (let i = 0; i < numberOfItemsInFaves; i++) {
            let currentFave = favesList.children[i];
            if (currentFave.querySelector(".faveItem").src === faveItem.src) {
               itemInFaves = true;
               break;
            }
         }

         if (itemInFaves) {
            alert("This photo is already in your favourites list.");
            document.body.removeChild(modalWindow);
         }
         else if (numberOfItemsInFaves > 4) {
            alert("You have reached the maximum number of favourites. Please remove at least one item before adding more.");
            document.body.removeChild(modalWindow);
         }
         else {
            favesList.appendChild(faveItem);                        
            alert("Added to Favourites!");
            document.body.removeChild(modalWindow);

            faveListLi.appendChild(faveItem);
            faveListLi.prepend(removeButton);
            favesList.appendChild(faveListLi);
            modalImage.faveItem = faveListLi;  
         }
      };
      
      removeButton.onclick = function() {
         let faveItemToRemove = modalImage.faveItem;
         favesList.removeChild(faveItemToRemove);  
      };
      
      modalWindow.appendChild(closeBox);            
      document.body.appendChild(modalWindow);
   }
   
   /* spacer to push footer under galleryBox */
   var wrap_push = document.createElement("div");
   wrap_push.id = "wrap_push";
   wrap_push.className = "wrap_push";
   body.appendChild(wrap_push);

   /* footer */
   var footer = document.createElement("footer");
   footer.id = "footer";
   footer.className = "footer";
   body.appendChild(footer);

   var footerP = document.createElement("P"); 
   var footerText = document.createTextNode("Copyright \xA9 2022 Sarah Shields 301264350 COMP125 Sec 401 Winter 2023");
   footerP.appendChild(footerText);
   footer.appendChild(footerP);
   
}

