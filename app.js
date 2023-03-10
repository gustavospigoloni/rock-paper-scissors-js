// Global variables
let playerScore = 0;
let computerScore = 0;
let ties = 0;
let rounds = 0;

// Randomizes computer selection
function computerPlay() {
  const gameMoves = ["rock", "paper", "scissors"];
  const randomSelection =
    gameMoves[Math.floor(Math.random() * gameMoves.length)];
  return randomSelection;
}

// Validate player input if using correct characters
function validatePlayerInput(playerSelection) {
  const regex = /^[a-zA-Z]+$/;
  const testRegex = regex.test(playerSelection);

  if (testRegex && playerSelection != null && playerSelection != undefined) {
    if (
      playerSelection === "rock" ||
      playerSelection === "paper" ||
      playerSelection === "scissors"
    ) {
      return true;
    } else if (rounds === 5) {
      if (playerSelection === "yes") {
        return true;
      }
      return false;
    }
  }
  return false;
}

// Prompt window input for player, also runs validation check on input.
function playerPlay() {
  let playerInput = prompt(
    "Let's play a game! Please choose rock, paper, or scissors!"
  ).toLowerCase();
  let validationCheck = validatePlayerInput(playerInput);

  if (playerInput === null)
    throw "You clicked on Cancel so the game stopped. Reload the page if you want to play again.";

  while (!validationCheck) {
    playerInput = prompt(
      "Invalid entry, please don't use any special characters, symbols, or numbers. Try again please."
    ).toLowerCase();
    validationCheck = validatePlayerInput(playerInput);
  }
  return playerInput;
}

// Simple round and score display
function numberOfRounds() {
  return console.log(
    `Round: ${rounds},
    Player Score: ${playerScore},
    Computer Score: ${computerScore},
    Ties: ${ties},`
  );
}

//logic for each round played
function playRound(playerSelection, computerSelection) {
  rounds += 1;
  if (playerSelection === computerSelection) {
    ties += 1;
    console.log(`${playerSelection} vs ${computerSelection}, it's a tie!`);
    return numberOfRounds();
  } else if (playerSelection === "rock" && computerSelection === "scissors") {
    playerScore += 1;
    console.log("Player wins! Rock breaks scissors! You're rocking it!");
    return numberOfRounds();
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    playerScore += 1;
    console.log("Player wins! Scissors cut paper!");
    return numberOfRounds();
  } else if (playerSelection === "paper" && computerSelection === "rock") {
    playerScore += 1;
    console.log("Player wins! Paper covers rock!");
    return numberOfRounds();
  } else {
    computerScore += 1;
    console.log(
      `Computer wins! ${computerSelection} beats ${playerSelection}!`
    );
    return numberOfRounds();
  }
}

function game() {
  // Allows only 5 rounds to be played.
  for (let i = 0; i < 5; i++) {
    const player = playerPlay();
    const computer = computerPlay();
    playRound(player, computer);
  }

  // function playAgainCall() {
  //   let playAgainInput = prompt(
  //     "Do you want to play again? Please type 'yes' if you do!"
  //   ).toLowerCase();
  //   return playAgainInput;
  // }

  function resetGame(playAgainInput) {
    if (playAgainInput === "yes") {
      ties = 0;
      playerScore = 0;
      computerScore = 0;
      rounds = 0;
      console.clear();
      return game();
    } else {
      return console.log("Thank you for playing!");
    }
  }

  //Displays winner of game
  if (ties + computerScore + playerScore === 5) {
    if (ties === 5) {
      console.log(
        `You tied with the computer ${playerScore} vs. ${computerScore}. So close!`
      );
    } else if (playerScore > computerScore && ties) {
      console.log(
        `Congratulations! YOU WON!!! with ${playerScore} out of 5 rounds!`
      );
    } else {
      console.log(
        `You lose! Computer wins with ${computerScore} out of 5 rounds. Better luck next time!`
      );
    }
  }
}

let consoleOpen = window.confirm(
  "If your browser console is not open, please press Ctrl + Shift + J (or Cmd + Shift + J on a Mac) " +
    "to open it and then reload the page. You need the console to see the game results. If your console is open click 'OK' for the game " +
    "to start or click 'Cancel' for you to open the console and then reload the page."
);

if (consoleOpen) {
  game();
  let playerStartsNewGame = true;

  while (playerStartsNewGame) {
    playerStartsNewGame = window.confirm(
      "Do you wanna play another match of rock, paper or scissors? Click 'OK' to begin the game or 'Cancel' to exit."
    );
    if (playerStartsNewGame) {
      console.clear();
      game();
    } else {
      console.log(
        "You clicked on Cancel so the game stopped. Reload the page if you want to play."
      );
      playerStartsNewGame = false;
    }
  }
}
