const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"]; // Pair values
let gameGrid = document.getElementById("gameGrid");
let restartButton = document.getElementById("restartButton");
let endButton = document.getElementById("endButton");
let statusMessage = document.getElementById("statusMessage");
let pairsMatchedDisplay = document.getElementById("pairsMatched");
let totalMovesDisplay = document.getElementById("totalMoves");

let cards = [];
let flippedCards = [];
let matchedCards = [];
let totalMoves = 0;
let isGameActive = true;

// Function to initialize the game
function initializeGame() {
  // Create pairs of cards
  cards = [...cardValues, ...cardValues]
    .sort(() => 0.5 - Math.random()) // Shuffle cards
    .map((value) => createCardElement(value));

  gameGrid.innerHTML = ""; // Clear the grid
  cards.forEach((card) => gameGrid.appendChild(card)); // Add cards to the grid

  // Reset game state
  flippedCards = [];
  matchedCards = [];
  totalMoves = 0;
  totalMovesDisplay.textContent = totalMoves; // Reset total moves display
  pairsMatchedDisplay.textContent = matchedCards.length / 2; // Reset pairs matched display
  isGameActive = true;
  statusMessage.textContent = "";
}

// Function to create a card element
function createCardElement(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-value", value);
  card.textContent = "?"; // Display placeholder

  card.addEventListener("click", () => flipCard(card));
  return card;
}

// Function to flip a card
function flipCard(card) {
  if (
    !isGameActive ||
    card.classList.contains("flipped") ||
    flippedCards.length >= 2
  )
    return;

  card.classList.add("flipped"); // Show card value
  card.textContent = card.getAttribute("data-value"); // Show the actual value
  flippedCards.push(card); // Add to flipped cards

  totalMoves++; // Increment total moves
  totalMovesDisplay.textContent = totalMoves; // Update moves display

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

// Function to check for a match
function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;
  const firstValue = firstCard.getAttribute("data-value");
  const secondValue = secondCard.getAttribute("data-value");

  if (firstValue === secondValue) {
    // Cards match
    matchedCards.push(firstCard, secondCard);
    pairsMatchedDisplay.textContent = matchedCards.length / 2; // Update pairs matched display
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      setTimeout(() => {
        statusMessage.textContent = "Congratulations! You found all pairs!";
        isGameActive = false; // End the game
      }, 500);
    }
  } else {
    // Cards do not match
    isGameActive = false; // Stop interaction
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.textContent = "?";
      secondCard.textContent = "?";
      flippedCards = [];
      isGameActive = true; // Allow interaction again
    }, 1000);
  }
}

// Event listener for restarting the game
restartButton.addEventListener("click", initializeGame);

// Event listener for ending the game
endButton.addEventListener("click", () => {
  isGameActive = false;
  statusMessage.textContent = "Game ended. You can reset to play again.";
});

// Start the game for the first time
initializeGame();
