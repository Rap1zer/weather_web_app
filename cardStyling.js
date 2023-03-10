function addCard() {
   if (cardCount < 20) {
      let card = document.createElement("div");
      card.classList.add("card");
   
      gridContainerEl.appendChild(card);
      cardCount++;
      
      updateCardStyleSheet();
   }
}

function updateCardStyleSheet() {
   let cards = document.getElementsByClassName("card");
   const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
   // This variable stores the number of cards the view width can fit
   let numOfColumns = vw / (300 + 20 * 2);
   for (let i = 0; i < cards.length; i++) {
      cards[i].style.maxWidth = vw / numOfColumns;
   }
}