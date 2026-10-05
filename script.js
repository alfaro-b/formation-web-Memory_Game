const technologies = [
    "html5-original.svg",
    "css3-original.svg",
    "javascript-original.svg",
    "git-original.svg",
    "java-original.svg",
    "python-original.svg"
];

// Créer les paires de cartes : 
// Spread operator ..., permet de récupérer tous les éléments du tableau
const cards = [...technologies, ...technologies];

// Mélange les cartes : 
// Math.random() - 0.5 renvoie aléatoirement une valeur positive ou négative pour sort()
cards.sort(()=> Math.random() -0.5);
console.log(cards);

// Récupère l'élément du DOM
const gameBoard = document.querySelector(".game-board");

// Récupère les cartes mélangées et les insère dans le DOM
for (let i = 0; i < cards.length; i++) {

    const card = document.createElement("div");
    card.classList.add("card");

    const back = document.createElement("span");
    back.textContent = "< />";
    back.classList.add("card-back");

    const img = document.createElement("img");
    img.src = "images/" + cards[i];
    
    card.appendChild(back);
    card.appendChild(img);
    gameBoard.appendChild(card);

    card.addEventListener("click", function () {
    card.classList.add("flipped");
    });

}

