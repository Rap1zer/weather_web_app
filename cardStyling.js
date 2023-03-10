function addCard() {
   if (cardCount < 20) {
      let card = document.createElement("div");
      card.classList.add("card");
   
      gridContainerEl.appendChild(card);
      cardCount++;

      updateCardGrid();
   }
}

window.addEventListener("resize", updateCardGrid);

function updateCardGrid() {
   const cards = document.getElementsByClassName("card");
   const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
   // This variable stores the number of cards the view width can fit
   let numOfColumns = vw / (300 + 20 * 2);
   console.log(vw + " / 300 + 40 = " + numOfColumns);
   for (let i = 0; i < cards.length; i++) {
      cards[i].style.maxWidth = vw / numOfColumns + "px";
      console.log(vw + " / " + numOfColumns + " = " + cards[i].style.maxWidth);
   }
}