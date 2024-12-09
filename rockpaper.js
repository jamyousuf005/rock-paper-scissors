let userScore =parseInt(localStorage.getItem("userScore")) ||0;
let compScore =parseInt(localStorage.getItem("compScore")) ||0;



const gameResult = document.querySelector("#game-result")
const usersChoice=document.querySelector("#user-choice")
const compChoice = document.querySelector("#computer-choice")
const computerScore=document.querySelector("#computerScore")
const useRScore= document.querySelector("#userScore")
const resetButton=document.querySelector("#resetButton")

const choices = document.querySelectorAll('.choice-btn');

// Function to initialize the DOM with saved scores and last result
const initializeGame = () => {
    // Get scores from localStorage
    const storedUserScore = localStorage.getItem("userScore");
    const storedCompScore = localStorage.getItem("compScore");

    // Update the DOM
    useRScore.innerHTML = storedUserScore ? storedUserScore : "0";
    computerScore.innerHTML = storedCompScore ? storedCompScore : "0";

    // Get and display the last game result (if any)
    const lastGameResult = localStorage.getItem("gameResult");
    gameResult.innerHTML = lastGameResult ? lastGameResult : "-";
    
    // Reset choices display
    usersChoice.innerHTML = "-";
    compChoice.innerHTML = "-";
    gameResult.innerHTML="-"
};

// Call initializeGame on page load
initializeGame();



resetButton.addEventListener("click",()=>{
    reseting()
})

const reseting= ()=>{
         gameResult.innerHTML='-'
         usersChoice.innerHTML='-'
         compChoice.innerHTML='-'
         userScore='0'
         compScore='0'
         useRScore.innerHTML = '0';
         computerScore.innerHTML = '0';
         localStorage.setItem("userScore", 0);
         localStorage.setItem("compScore", 0);
         localStorage.setItem("gameResult", '-')
}

const genCompChoice = () => {
    const options = ['rock', 'paper', 'scissors']
    const randIndex = Math.floor(Math.random() * 3)
    return options[randIndex]
}

const drawGame = () => {
    console.log("tie")
    gameResult.innerHTML=`Tie`
}

const showWinner = (userWin) => {
    if (userWin) {
    
        gameResult.innerHTML=`You won`
        userScore++
        useRScore.innerHTML=`${userScore}`
        localStorage.setItem("userScore", userScore);
        localStorage.setItem("gameResult", "You won");
    } else {    
         compScore++
        gameResult.innerHTML=`you lost`
         computerScore.innerHTML=`${compScore}`
         localStorage.setItem("compScore", compScore)
         localStorage.setItem("gameResult", "You lost");

    }
}


const playGame = (userChoice) => {
    const computerChoice = genCompChoice()
   usersChoice.innerHTML=`${userChoice}`
   compChoice.innerHTML=`${computerChoice}`
    

    if (userChoice === computerChoice) {
        drawGame()
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            //beats scissors,loses to paper
            userWin = computerChoice == "scissors" ? true : false
        } else if (userChoice === "paper") {
            //beats rock,loses to scissors
            userWin = computerChoice == "rock" ? true : false
        } else {
            //scissors beats paper,loses to rock
            userWin = computerChoice == "paper" ? true : false
        }
        showWinner(userWin)
    }
    

}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id")
        playGame(userChoice)
    })
})