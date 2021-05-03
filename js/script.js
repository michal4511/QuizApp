const nextButton = document.getElementById("btn-next")
const checkButton = document.getElementById("btn-check")
const exitButton = document.getElementById("btn-exit")
const completeButton = document.getElementById("btn-complete")

const cards = document.getElementById("cards")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const popup = document.getElementById("popup")
const notification = document.getElementById("notification")
const quiz=document.getElementById("quiz")

let shuffledQuestions 
let currentQuestionIndex

let correctChoice
let button
let score

const firstStartButton = document.getElementById("firstBtn")
const secondStartButton = document.getElementById("secondBtn")
const thirdStartButton = document.getElementById("thirdBtn")
const fourthStartButton = document.getElementById("fourthBtn")
const fifthStartButton = document.getElementById("fifthBtn")
const sixthStartButton = document.getElementById("sixthBtn")

firstStartButton.addEventListener("click", startFirstTopic)
secondStartButton.addEventListener("click", startSecondTopic) 
thirdStartButton.addEventListener("click", startThirdTopic) 
fourthStartButton.addEventListener("click", startFourthTopic) 
fifthStartButton.addEventListener("click", startFifthTopic) 
sixthStartButton.addEventListener("click", startSixthTopic) 

function startFirstTopic() {
    startGame(questHistory)
}

function startSecondTopic() {
    startGame(questGeography)
}

function startThirdTopic() {
    startGame(questPhysics)
}

function startFourthTopic() {
    startGame(questMath)
}

function startFifthTopic() {
    startGame(questLanguages)
}

function startSixthTopic() {
    startGame(questChemistry)
}

function startGame(topic) { 
    cards.classList.add("hide")
    popup.classList.remove("hide")
    quiz.style.display = "flex"
    shuffledQuestions = topic.sort(() => Math.random() - .5)
    currentQuestionIndex = 0 
    setNextQuestion()
    startTimer()
}

function setNextQuestion() {
    nextButton.classList.add("covered") 
    while (answerButtonsElement.firstChild) { 
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    } 
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question 

    question.answers.forEach(answer => { 
        button = document.createElement("button") 
        button.innerText = answer.text 
       
        if (answer.correct) {
            button.dataset.correct = answer.correct 
        } 
        
        button.addEventListener("click", addValue)
        checkButton.addEventListener("click", selectAnswer) 
        answerButtonsElement.appendChild(button)
        
        for (let i=0; i<4; i++) {
            let span = document.createElement("span")
            button.appendChild(span)
        }
    });
}

function addValue(e){
    checkButton.classList.remove("covered")
    const selectedButton = e.target 
    const correct = selectedButton.dataset.correct
    if (correct) {
        correctChoice = true 
    } else {
        correctChoice = false
    }
}

function selectAnswer() {
    checkButton.classList.add("covered")

    setScore(correctChoice)
   
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
        button.disabled = true
    })

    if (shuffledQuestions.length>currentQuestionIndex +1){
        nextButton.classList.remove("covered")
    
    } else {
        checkButton.classList.add("hide")
        nextButton.classList.add("hide")
    } 
}

function setScore(choice) {
    if (choice == true) {
        score = parseInt(document.getElementById("score").innerHTML);
        score++;
        document.getElementById("score").innerHTML = score;

    } else {
        score = parseInt(document.getElementById("score").innerHTML);
        score--;
        document.getElementById("score").innerHTML = score;
    }
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add("correct")
        
    } else {
        element.classList.add("wrong")   
    }
}

nextButton.addEventListener("click", ()=>{
    currentQuestionIndex++
    setNextQuestion()
})

exitButton.addEventListener("click", reset)
completeButton.addEventListener("click", reset)

function reset() {
    cards.classList.remove("hide")
    popup.classList.add("hide")
    checkButton.classList.remove("hide")
    nextButton.classList.remove("hide")
    stopTimer()
    notification.classList.add("hide")
}

/*----- TIMER -------*/

let timeinterval
const setTime = 18

function startTimer() {
    setTimeout(function() {
        const deadline = new Date(Date.parse(new Date()) +  5 * setTime * 1000);
      
        function getTimeRemaining(endtime) {
            const total = Date.parse(endtime) - Date.parse(new Date());
            const seconds = Math.floor((total / 1000) % 60);
            const minutes = Math.floor((total / 1000 / 60) % 60);
            
            return {
              total,
              minutes,
              seconds
            };
        }

        function initializeClock(id, endtime) {
            const clock = document.getElementById(id);
            clock.style.display = 'block';
            const minutesSpan = clock.querySelector('.minutes');
            const secondsSpan = clock.querySelector('.seconds');
          
            function updateClock() {
              const t = getTimeRemaining(endtime);
              minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
              secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
          
              if (t.total <= 0) {
                clearInterval(timeinterval);
                notification.classList.remove("hide")
                quiz.style.display = "none"
              }
            }
          
            updateClock();
            timeinterval = setInterval(updateClock, 1000);
        }
        
        initializeClock('clockdiv', deadline);
    })
}

function stopTimer() {
    clearInterval(timeinterval)
}

/*----- Confirm buttons for locked cards -------*/

const confirmButtonCardFive = document.getElementById("btn-confirm-card-5")
const confirmButtonCardSix = document.getElementById("btn-confirm-card-6")

confirmButtonCardFive.addEventListener("click", unblockCardFive)
confirmButtonCardSix.addEventListener("click", unblockCardSix);

const lockCardFive = document.getElementById("lock-card-5");
const lockOpenCardFive = document.getElementById("lock-open-card-5")
const lockCardSix = document.getElementById("lock-card-6");
const lockOpenCardSix = document.getElementById("lock-open-card-6")

function unblockCardFive() {
    if (score >= 3) {
        const confirm = document.getElementById("confirm-card-5")
        confirm.style.display = "none"
        const btnSix = document.getElementById("fifthBtn")
        btnSix.classList.remove("hide")
        
        let points = 3
        score = score - points
        document.getElementById("score").innerHTML = score;

        lockCardFive.classList.add("hide")
        lockOpenCardFive.classList.remove("hide")
    }
}

function unblockCardSix() {
    if (score >= 6) {
        const confirm = document.getElementById("confirm-card-6")
        confirm.style.display = "none"
        const btnSix = document.getElementById("sixthBtn")
        btnSix.classList.remove("hide")
        
        let points = 6
        score = score - points
        document.getElementById("score").innerHTML = score;

        lockCardSix.classList.add("hide")
        lockOpenCardSix.classList.remove("hide")
        
    }
}

/*----------------------*/
/*----- QUESTIONS -------*/
/*----------------------*/

const questHistory = [
    {
    question: "Which English children’s author wrote Alice’s Adventures in Wonderland?",
    answers: [
        {
            text: "Beatrix Potter",
            correct: false
        },
        {
            text: "Charles L. Dodgson",
            correct: true
        },
        {
            text: "Rudyard Kipling",
            correct: false
        },
        {
            text: "Flora A. Steel",
            correct: false
        }
    ]
},
{
    question: "How many days in a week were there in ancient Roman times?",
    answers: [{
            text: "8",
            correct: true
        },
        {
            text: "6",
            correct: false
        }
    ]
},
{
    question: "Which Greek historian is known as the “Father of History”?",
    answers: [{
            text: "Herodotus",
            correct: true
        },
        {
            text: "Polybius",
            correct: false
        },
        {
            text: "Thucydides",
            correct: false
        }
    ]
}
]

const questGeography = [
    {
    question: "In which continent is the world’s longest river, the Nile?",
    answers: [
        {
            text: "Australia",
            correct: false
        },
        {
            text: "Europe",
            correct: false
        },
        {
            text: "Antarctica",
            correct: false
        },
        {
            text: "Africa",
            correct: true
        }
    ]
},
{
    question: "How many US states begin with the letter A?",
    answers: [{
            text: "Four",
            correct: true
        },
        {
            text: "Six",
            correct: false
        }
    ]
},
{
    question: "What is the smallest country in the world?",
    answers: [{
            text: "Nauru",
            correct: false
        },
        {
            text: "Peru",
            correct: false
        },
        {
            text: "Vatican City",
            correct: true
        },
        {
            text: "Monaco",
            correct: false
        }
    ]
}
]

const questPhysics = [
    {
    question: "Can a fire have a shadow?",
    answers: [
        {
            text: "Yes",
            correct: true
        },
        {
            text: "No",
            correct: false
        }
    ]
},
{
    question: "True or false? Iron is attracted by magnets.",
    answers: [{
            text: "True",
            correct: true
        },
        {
            text: "False",
            correct: false
        }
    ]
},
{
    question: "What scientist is well known for his theory of relativity?",
    answers: [{
            text: "Edwin Hubble",
            correct: false
        },
        {
            text: "Isaac Newton",
            correct: false
        },
        {
            text: "Albert Einstein",
            correct: true
        },
        {
            text: "Stephen Hawking",
            correct: false
        }
    ]
}
]

const questMath = [
    {
    question: "What number doesn’t have its own Roman numeral?",
    answers: [
        {
            text: "Zero",
            correct: true
        },
        {
            text: "Ten",
            correct: false
        },
        {
            text: "Milion",
            correct: false
        },
        {
            text: "Bilion",
            correct: false
        }
    ]
},
{
    question: "What is the most popular lucky number?",
    answers: [
        {
            text: "7",
            correct: true
        },
        {
            text: "13",
            correct: false
        },
        {
            text: "4",
            correct: false
        },
        {
            text: "1",
            correct: false
        }
    ]
},
{
    question: "Can Pi be written as a fraction?",
    answers: [
        {
            text: "Yes",
            correct: false
        },
        {
            text: "No",
            correct: true
        }
    ]
},
{
    question: "What does the Roman numeral “X” equal?",
    answers: [
        {
            text: "0",
            correct: false
        },
        {
            text: "5",
            correct: false
        },
        {
            text: "10",
            correct: true
        },
        {
            text: "100",
            correct: false
        }
    ]
}
]

const questLanguages = [
    {
    question: "What literary term means a word that has a similar meaning to another word?",
    answers: [
        {
            text: "Idiom",
            correct: false
        },
        {
            text: "Antonym",
            correct: false
        },
        {
            text: "Homonym",
            correct: false
        },
        {
            text: "Synonym",
            correct: true
        }
    ]
},
{
    question: "The word 'hotel' originated in which language?",
    answers: [{
            text: "French",
            correct: true
        },
        {
            text: "Latin",
            correct: false
        }
    ]
},
{
    question: "What is a word having same spelling but different sound and meaning?",
    answers: [{
            text: "Antonym",
            correct: false
        },
        {
            text: "Homonym",
            correct: false
        },
        {
            text: "Heteronym",
            correct: true
        },
        {
            text: "Idiom",
            correct: false
        }
    ]
}
]


const questChemistry = [
    {
    question: "Can you light diamond on fire?",
    answers: [
        {
            text: "Yes",
            correct: true
        },
        {
            text: "No",
            correct: false
        }
    ]
},
{
    question: "Are two atoms of the same element identical?",
    answers: [{
            text: "Yes",
            correct: false
        },
        {
            text: "No",
            correct: true
        }
    ]
},
{
    question: "Can water stay liquid below zero degrees Celsius?",
    answers: [
        {
            text: "Yes",
            correct: true
        },
        {
            text: "No",
            correct: false
        }
    ]
},
{
    question: "How much salt (NaCl) is in the average adult human body?",
    answers: [{
            text: "1kg",
            correct: false
        },
        {
            text: "250g",
            correct: true
        },
        {
            text: "500g",
            correct: false
        },
        {
            text: "practically none",
            correct: false
        }
    ]
},
{
    question: "You can't live without water! What is its chemical formula?",
    answers: [
        {
            text: "H2O2",
            correct: true
        },
        {
            text: "H2",
            correct: false
        },
        {
            text: "H2O",
            correct: false
        },
        {
            text: "02",
            correct: false
        }
    ]
}
]






















