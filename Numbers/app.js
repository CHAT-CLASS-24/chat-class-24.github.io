let numbers = Array.from({ length: 100 }, (_, i) => i + 1);
let currentNumber = 1;
let score = 0;
let timerInterval;
let currentRound = 1;
let scores = [];
let bonusRound = false;
const roundTime = 90;

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

function createSlotsForNumbers(quad) {
    for (let i = 0; i < 25; i++) {
        let slot = document.createElement('div');
        slot.className = 'slot';
        quad.appendChild(slot);
    }
}

function onClickNumber(e) {
    if (parseInt(e.target.textContent) === currentNumber) {
        score++;
        e.target.style.opacity = 0;
        e.target.classList.remove('clickable');

        currentNumber++;

        let nextNumberElement = document.querySelector(`.number[data-num="${currentNumber}"]`);
        if (nextNumberElement) {
            nextNumberElement.classList.add('clickable');
            if (currentRound === 2) highlightQuadrantForNextNumber();
            if (currentRound === 3) enlargeAndColorNextNumber();
        }
    }
}

function startRound() {
    document.querySelector(".instructions").style.display = 'none';
    document.querySelectorAll('.number').forEach(num => {
        num.style.display = 'block';
    });
    switch (currentRound) {
        case 1:
            //alert("Find and Click the numbers in sequential order. See how many you can get.");
            // startGame();
            resetNumbers();
            startGameTimer();
            break;
        case 2:
            alert("Try and beat your score with this added tip - the next number in the sequence will be in the next quadrant.");
            resetNumbers();
            highlightQuadrantForNextNumber();
            startGameTimer();
            break;
        case 3:
            alert("This is a speed round! See how many numbers you can get with this added help.");
            resetNumbers();
            enlargeAndColorNextNumber();
            startGameTimer();
            break;
        default:
            endGame();
            return; // Exit the function when currentRound is not 1, 2, or 3
    }
}

function highlightQuadrantForNextNumber() {
    const quadToHighlight = document.getElementById(`q${((currentNumber - 1) % 4) + 1}`);
    quadToHighlight.style.background = "rgba(255, 255, 0, 0.5)";
    setTimeout(() => {
        quadToHighlight.style.background = "";
    }, 2000);
}

function enlargeAndColorNextNumber() {
    const nextNumberElement = document.querySelector(`.number[data-num="${currentNumber}"]`);
    nextNumberElement.style.color = "red";
    nextNumberElement.style.fontSize = "2em";
}

function resetNumbers() {
    document.querySelectorAll('.number').forEach(numElem => {
        numElem.style.opacity = 1;
        numElem.style.color = "";
        numElem.style.fontSize = "1.5em";
    });
    currentNumber = 1;
    score = 0;
    const nextNumberElement = document.querySelector(`.number[data-num="${currentNumber}"]`);
    nextNumberElement.classList.add('clickable');
}

function startGameTimer() {
    let timeLeft = roundTime;
    document.getElementById('timer').style.display = 'none'; // Initially hide timer

    clearInterval(timerInterval); // Clear the timer
    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 15) {
            document.getElementById('timer').style.display = 'block'; // Show timer when 15 seconds left
        }
        
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Clear the timer
            endGame();
        }
    }, 1000);
} 

function endGame() {
    scores.push(score); 

    if (currentRound < 3) {
        currentRound++;
        startRound();
    } else {
        alert(`Round 1 score: ${scores[0]}
               Round 2 score: ${scores[1]}
               Round 3 score: ${scores[2]}
               It is typical to improve since there were better instructions each round.`);
        
        let playBonus = confirm("Do you want to play a bonus round?");
        if (playBonus) {
            bonusRound = true;
            currentRound = 1; // Resetting the round
            reshuffleNumbers();
            startRound();
        } else {
            currentRound = 1; // Resetting the round if no bonus round
            const numbers = document.querySelectorAll('.slot');
            //animate numbers individually every 100ms
            let delay = 500;
            numbers.forEach(num => {
                let navtoCenterX = 0;
                let navtoCenterY = 0;
                
                switch(num.parentElement.id){
                    case 'q1':
                        {
                            navtoCenterX = 340;
                            navtoCenterY = 340;
                        }
                        break;
                    case 'q2':
                        {
                            navtoCenterX = -340;
                            navtoCenterY = 340;
                        }
                        break;
                    case 'q3':
                        {
                            navtoCenterX = 190;
                            navtoCenterY = -190;
                        }
                        break;
                    case 'q4':
                        {
                            navtoCenterX = -190;
                            navtoCenterY = -190;
                        }
                        break;
                    default:
                        {
                            navtoCenterX = 270;
                            navtoCenterY = 270;
                        }
                        break;
                }; 

                setTimeout(() => {
                    // const rect = document.querySelector('.timer').getBoundingClientRect();
                    // const elementCenterX = rect.left + rect.width / 2;
                    // const elementCenterY = rect.top + rect.height / 2;
                    
                  //  console.log(navtoCenterX, navtoCenterY, elementCenterX, elementCenterY)

        
                    // Apply the CSS variables
                    num.style.setProperty('--toCenterX', `${navtoCenterX}px`);
                    num.style.setProperty('--toCenterY', `${navtoCenterY}px`);
        
                    // Add the animation class
                    num.classList.add('start-animation');



                    // num.parentElement.classList.add('start-animation');
                }, delay);
                delay += 500;
            });



            // document.addEventListener('DOMContentLoaded', () => {
            //     // ... Your existing code ...
            
            //     // Add an event listener to a button or some trigger element
            //     const triggerElement = document.getElementById('triggerAnimationButton');
            //     triggerElement.addEventListener('click', () => {
            //         const elementsToAnimate = document.querySelectorAll('.yourElementClass'); // replace 'yourElementClass' with your desired class or selector
                    
                    
            
            //         elementsToAnimate.forEach(element => {
            //             const rect = element.getBoundingClientRect();
            //             const elementCenterX = rect.left + rect.width / 2;
            //             const elementCenterY = rect.top + rect.height / 2;
            
            //             // Calculate the distance to translate to the center
            //             const toCenterX = centerX - elementCenterX;
            //             const toCenterY = centerY - elementCenterY;
            
            //             // Apply the CSS variables
            //             element.style.setProperty('--toCenterX', `${toCenterX}px`);
            //             element.style.setProperty('--toCenterY', `${toCenterY}px`);
            
            //             // Add the animation class
            //             element.classList.add('start-animation');
            //         });
            //     });
            // });
            



        }
    }
}


function reshuffleNumbers() {
    // numbers.sort(() => Math.random() - 0.5);
    const quadrants = document.querySelectorAll('.quadrant');
    quadrants.forEach(quad => {
        let slots = quad.querySelectorAll('.slot');
        slots.forEach(slot => {
            if (slot.firstChild) slot.removeChild(slot.firstChild);
        });
    });
    startGame();
}

document.querySelector('button').addEventListener('click', () => {
    currentRound = 1;
    scores = [];
    startRound();
});

// Set up the game initially
createSlotsForNumbers(document.getElementById('q1'));
createSlotsForNumbers(document.getElementById('q2'));
createSlotsForNumbers(document.getElementById('q3'));
createSlotsForNumbers(document.getElementById('q4'));

startGame();

function startGame() {
    let currentNumber = 1;
    numbers.forEach((number, index) => {
        let quad = document.getElementById(`q${(index % 4) + 1}`);
        let slots = quad.getElementsByClassName('slot');
        let randomSlot = slots[Math.floor(Math.random() * slots.length)];
        while (randomSlot.firstChild) {
            randomSlot = slots[Math.floor(Math.random() * slots.length)];
        }
        let rotation = Math.random() * 360;
        let numElem = document.createElement('div');
        numElem.textContent = number;
        numElem.className = 'number';
        numElem.setAttribute('data-num', number);
        numElem.style.transform = `rotate(${rotation}deg)`;
        if (number === currentNumber) {
            numElem.classList.add('clickable');
        }
        randomSlot.appendChild(numElem);
    });
    document.querySelectorAll('.number').forEach(num => {
        num.addEventListener('click', onClickNumber);
        num.style.display = 'none';
    });
}
