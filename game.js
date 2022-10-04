const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('question-counter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What iconic game do Will, Mike, Lucas, and Dustin like to play?",
        choice1: "Risk",
        choice2: "Tag",
        choice3: "Monopoly",
        choice4: "Dungeons and Dragons",
        answer: 4
    },
    {
        question: "What food is Eleven obsessed with?",
        choice1: "Eggos",
        choice2: "Pancakes",
        choice3: "Ice Cream",
        choice4: "French Toast",
        answer: 1
    },
    {
        question: "What day does Will Byers go missing?",
        choice1: "November 5th 1984",
        choice2: "November 10th, 1983",
        choice3: "November 6th, 1983",
        choice4: "November 1st, 1984",
        answer: 3
    },
    {
        question: "The fictional town of Hawkins is located in which state?",
        choice1: "Illinois",
        choice2: "Indiana",
        choice3: "Ohio",
        choice4: "Missouri",
        answer: 2
    },
    {
        question: "What song reminds Jonathan of Will?",
        choice1: "Master of Puppets - Metallica",
        choice2: "Jump - Van Halen",
        choice3: "Should I Stay or Should I Go? - The Clash",
        choice4: "Running Up That Hill - Kate Bush",
        answer: 3
    },
    {
        question: "Who created Stranger Things?",
        choice1: "The Duffer Brothers",
        choice2: "The Dennis Brothers",
        choice3: "The Suffer Brothers",
        choice4: "The Sigman Brothers",
        answer: 1
    },
    {
        question: "What is Eleven's birth name?",
        choice1: "Terry Ives",
        choice2: "Jane Ives",
        choice3: "Amy Ives",
        choice4: "Ella Ives",
        answer: 2
    },
    {
        question: "What flavor slurpee did Russion scientist Alexei ask for in season 3?",
        choice1: "Strawberry",
        choice2: "Coke",
        choice3: "Blueberry",
        choice4: "Cherry",
        answer: 4
    },
    {
        question: "Who founded the Hawkins Middle AV club?",
        choice1: "Scott Clarke",
        choice2: "Mike Wheeler",
        choice3: "Bob Newby",
        choice4: "Dustin Henderson",
        answer: 3
    },
    {
        question: "Which creature is not from The Upside Down?",
        choice1: "Demogorgon",
        choice2: "Mews",
        choice3: "The Mind Flayer",
        choice4: "Dart",
        answer: 2
    }
];

// Constants 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if(classToApply == 'correct') {
                incrementScore(CORRECT_BONUS);
            }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();