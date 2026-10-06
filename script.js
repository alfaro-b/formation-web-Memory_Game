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

let firstCard = null;
let secondCard = null;
let boardLocked = false;

// Récupère les cartes mélangées et les insère dans le DOM
for (let i = 0; i < cards.length; i++) {

    const card = document.createElement("div");
    card.classList.add("card");
    // Stocke la technologie associée à la carte
    card.dataset.technology = cards[i];

    const back = document.createElement("span");
    back.textContent = "< />";
    back.classList.add("card-back");

    const img = document.createElement("img");
    img.src = "images/" + cards[i];
    
    card.appendChild(back);
    card.appendChild(img);
    gameBoard.appendChild(card);

    card.addEventListener("click", function () {
        // Empêche de cliquer pendant que deux cartes sont comparées
        if (boardLocked) {
            return;
        }
        // Empêche de sélectionner deux fois la même carte
        if (card === firstCard) {
            return
        }
        card.classList.add("flipped");

        if (firstCard === null) {
            firstCard = card;
        } else {
            secondCard = card;

            // Compare les technologies des deux cartes
            if (firstCard.dataset.technology === secondCard.dataset.technology) {
                console.log("Paire trouvée !");

                // Réinitialise la sélection pour le tour suivant
                firstCard = null;
                secondCard = null;

            } else {

                boardLocked = true;
                // Retourne les cartes après 1 seconde si elles sont différentes
                setTimeout(function () {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");

                    // Réinitialise la sélection pour le tour suivant
                    firstCard = null;
                    secondCard = null;
                    boardLoked = false;
                }, 1000);
            }
        }
    });

}

