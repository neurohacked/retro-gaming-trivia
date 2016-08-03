// Constructor for questions -----------------------------------------------
function Quiz(questions) {
    this.questions = questions;
    return this;
}
// Create the questions for the game ---------------------------------------
let questions = [
	{question:
		{text: 'Who is Mario\'s dinosaur friend?',
        gif: "https://api.giphy.com/v1/gifs/search?q=90s-nintendo-super-mario&api_key=dc6zaTOxFJmzC",
        answers: ['Rex','Luigi','Toshi','Yoshi'],
		correctAnswer: 'Yoshi'
		},
    },
    {question:
		{text: 'What does Sonic the Hedgehog love to collect?',
        gif: "https://api.giphy.com/v1/gifs/search?q=sonic-the-hedgehog-boom-gif&api_key=dc6zaTOxFJmzC",
        answers: ['Jewels', 'Coins', 'Diamonds', 'Rings'],
		correctAnswer: 'Rings'
		},
    },
    {question:
		{text: 'Which is these is NOT a Pac-Man ghost.',
        gif: "https://api.giphy.com/v1/gifs/search?q=pacman-ghosts&api_key=dc6zaTOxFJmzC",
        answers: ['Inky', 'Clyde', 'Blinky', 'Bonnie'],
		correctAnswer: 'Bonnie'
		},
    },
    {question:
		{text: 'Who is Link\'s fairy companion?',
        gif: "https://api.giphy.com/v1/gifs/search?q=legend-of-zelda-hey&api_key=dc6zaTOxFJmzC",
        answers: ['Siri', 'Alexa', 'Cortana', 'Navi'],
		correctAnswer: 'Navi'
		},
    },
    {question:
		{text: 'Which game franchise, born in 1992, courted controversy with its ‘Fatalities’?',
        gif: "https://api.giphy.com/v1/gifs/search?q=dance-mash-up-mortal-kombat&api_key=dc6zaTOxFJmzC",
        answers: ['Art of Fighting', 'Fatal Fury', 'King of Fighters', 'Mortal Kombat'],
		correctAnswer: 'Mortal Kombat'
		},
    },
    {question:
		{text: 'Who says "@!#?@!" every time he is hit by something?',
        gif: "https://api.giphy.com/v1/gifs/search?q=qbert&api_key=dc6zaTOxFJmzC",
        answers: ['Donkey Kong', 'Wimpy', 'Bagman', 'Q*bert'],
		correctAnswer: 'Q*bert'
		},
    }
]

new Quiz(questions);

// Switch to next available question --------------------------------
function nextQuestion() {
    if (answeredQuestions === 6) {
        displayResults();
    } else if (answeredQuestions === 5) {
        $('#question-text').html(availableQuestions[5].question.text);
        answer = availableQuestions[5].question.correctAnswer
        for (let i = 0; i < availableQuestions[5].question.answers.length; i++) {
            j = $('<button>');
            j.addClass('btn btn-md btn-default btn-block answer');
            j.text(availableQuestions[5].question.answers[i]);
            $('#answers').append(j);
        }
    } else if (answeredQuestions === 4) {
        $('#question-text').html(availableQuestions[4].question.text);
        answer = availableQuestions[4].question.correctAnswer
        for (let i = 0; i < availableQuestions[4].question.answers.length; i++) {
            j = $('<button>');
            j.addClass('btn btn-md btn-default btn-block answer');
            j.text(availableQuestions[4].question.answers[i]);
            $('#answers').append(j);
        }
    } else if (answeredQuestions === 3) {
        $('#question-text').html(availableQuestions[3].question.text);
        answer = availableQuestions[3].question.correctAnswer
        for (let i = 0; i < availableQuestions[3].question.answers.length; i++) {
            j = $('<button>');
            j.addClass('btn btn-md btn-default btn-block answer');
            j.text(availableQuestions[3].question.answers[i]);
            $('#answers').append(j);
        }
    } else if (answeredQuestions === 2) {
        $('#question-text').html(availableQuestions[2].question.text);
        answer = availableQuestions[2].question.correctAnswer
        for (let i = 0; i < availableQuestions[2].question.answers.length; i++) {
            j = $('<button>');
            j.addClass('btn btn-md btn-default btn-block answer');
            j.text(availableQuestions[2].question.answers[i]);
            $('#answers').append(j);
        }
    } else if (answeredQuestions === 1) {
        $('#question-text').html(availableQuestions[1].question.text);
        answer = availableQuestions[1].question.correctAnswer
        for (let i = 0; i < availableQuestions[1].question.answers.length; i++) {
            j = $('<button>');
            j.addClass('btn btn-md btn-default btn-block answer');
            j.text(availableQuestions[1].question.answers[i]);
            $('#answers').append(j);
        }
    } else {
        $('#question-text').html(availableQuestions[0].question.text);
        answer = availableQuestions[0].question.correctAnswer;
        for (let i = 0; i < availableQuestions[0].question.answers.length; i++) {
            j = $('<button>');
            j.addClass('btn btn-md btn-default btn-block answer');
            j.text(availableQuestions[0].question.answers[i]);
            $('#answers').append(j);
        }
    }
}
