// Constructor for questions -----------------------------------------------
function Quiz(questions) {
    this.questions = questions;
    return this;
}
// Create the questions for the game ---------------------------------------
let questions = [
	{question1:
		{question: 'Who is Mario\'s dinosaur friend?',
        gif: "https://api.giphy.com/v1/gifs/search?q=mario-yoshi&api_key=dc6zaTOxFJmzC",
        answers: ['Rex','Rawr','Toshi','Yoshi'],
		correctAnswer: 'Yoshi'
		},
    },
    {question2:
		{question: 'What does Sonic the Hedgehog love to collect?',
        gif: "https://api.giphy.com/v1/gifs/search?q=sonic-running&api_key=dc6zaTOxFJmzC",
        answers: ['Jewels', 'Coins', 'Chili Dogs', 'Rings'],
		correctAnswer: 'Rings'
		},
    }
]

new Quiz(questions);
