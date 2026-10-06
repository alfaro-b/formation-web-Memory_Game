const technologies = [
    "html5-original.svg",
    "css3-original.svg",
    "javascript-original.svg",
    "git-original.svg",
    "java-original.svg",
    "python-original.svg",
    "django-plain.svg",
    "mariadb-original.svg",
    "mysql-original.svg",
    "sonarqube-original.svg"
];

let cards = [];

// Récupère les éléments du DOM
const difficultyButtons = document.querySelectorAll(".difficulty button");
const gameBoard = document.querySelector(".game-board");
const movesDisplay = document.querySelector("#moves");
const pairsDisplay = document.querySelector('#pairs');
const restartButton = document.querySelector(".restart-btn");

let firstCard = null;
let secondCard = null;
let boardLocked = false;
let numberOfPairs = 0;
let moves = 0;
let pairs = 0;
let flipTimeout = null;

// En fonction de la difficulté choisie, construit le tableau avec 6, 8 ou 10 technologies 
for (let i = 0; i < difficultyButtons.length; i++) {

    difficultyButtons[i].addEventListener("click", function () {
        // Retire la sélection de tous les boutons de difficulté
        for (let j = 0; j < difficultyButtons.length; j++) {
            difficultyButtons[j].classList.remove("selected");
        }

        // Marque le niveau choisi comme sélectionné
        difficultyButtons[i].classList.add("selected");

        // Annule le retournement des cartes s'il est encore en attente
        clearTimeout(flipTimeout);

        // Réinitialise la partie si on change de niveau
        firstCard = null;
        secondCard = null;
        boardLocked = false;
        moves = 0;
        pairs = 0;

        movesDisplay.textContent = moves;
        pairsDisplay.textContent = pairs;

        numberOfPairs = Number(difficultyButtons[i].dataset.pairs);
        gameBoard.classList.remove("medium", "hard");

        if (numberOfPairs === 8) {
            gameBoard.classList.add("medium");
        } else if (numberOfPairs === 10) {
            gameBoard.classList.add("hard");
        }
        console.log(numberOfPairs);
        const selectedTechnologies = technologies.slice(0, numberOfPairs);
        console.log(selectedTechnologies);
        // Créer les paires de cartes : 
        // Spread operator ..., permet de récupérer tous les éléments du tableau
        cards = [...selectedTechnologies, ...selectedTechnologies];

        // Mélange les cartes : 
        // Math.random() - 0.5 renvoie aléatoirement une valeur positive ou négative pour sort()
        cards.sort(()=> Math.random() -0.5);
        console.log(cards);
        createCards();
    });
}

// Récupère les cartes mélangées et les insère dans le DOM
function createCards() {

    // Vide le plateau avant de créer de nouvelles cartes
    gameBoard.innerHTML = "";

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

            // Empêche de sélectionner une carte déjà trouvée
            if (card.classList.contains("found")) {
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

                // Incrémente le nombre de coups
                moves++;
                movesDisplay.textContent = moves;

                // Compare les technologies des deux cartes
                if (firstCard.dataset.technology === secondCard.dataset.technology) {

                    // Marque les deux cartes comme trouvées
                    firstCard.classList.add("found");
                    secondCard.classList.add("found");

                    // Incrémente le nombre de paires trouvées
                    pairs++;
                    pairsDisplay.textContent = pairs;

                    // Vérifie si touttes les paires sont trouvées, fin de partie.
                    if (pairs === numberOfPairs) {
                        const gameOver = document.createElement("div");
                        gameOver.classList.add("game-over");
                        gameOver.textContent = "Bravo ! Partie terminée en " + moves + " coups.";
                        document.body.appendChild(gameOver);
                    }

                    // Réinitialise la sélection pour le tour suivant
                    firstCard = null;
                    secondCard = null;

                } else {

                    boardLocked = true;
                    // Retourne les cartes après 1 seconde si elles sont différentes
                    flipTimeout = setTimeout(function () {
                        firstCard.classList.remove("flipped");
                        secondCard.classList.remove("flipped");

                        // Réinitialise la sélection pour le tour suivant
                        firstCard = null;
                        secondCard = null;
                        boardLocked = false;
                    }, 1000);
                }
            }
        });

    }
}

// Recharge la page pour démarrer une nouvelle partie
restartButton.addEventListener("click", function () {
    location.reload();
});

