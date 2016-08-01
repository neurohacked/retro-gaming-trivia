$(document).ready(function() {
    // FUNCTIONS
    // -----------------------------------------------------------------------
    // Constructor for questions/answers -------------------------------------
    function Quiz(name, options, gif) {
        this.name = name;
        this.question = options.question;
        this.answers = options.answers; // Array of answers
        this.correctAnswer = options.answers[options.right];
        this.gif = queryURL = "https://api.giphy.com/v1/gifs/search?q=" + this.name + "&api_key=dc6zaTOxFJmzC";
        return this;
    }
    // Create the questions for the game -------------------------------------
    var options = {
        question: 'Who is Mario\'s dinosaur friend?',
        answers: ['Rex', 'Rawr', 'Toshi', 'Yoshi'],
        right: 3
    };
    var mario = new Quiz('mario-yoshi', options);

    options = {
        question: 'What does Sonic the Hedgehog love to collect?',
        answers: ['Jewels', 'Coins', 'Chili Dogs', 'Rings'],
        right: 3
    };
    var sonic = new Quiz("sonic-running", options);
    // Check for correct answer ----------------------------------------------
    Quiz.prototype.checkAnswer = function(submittedAnswer) {
	if (this.correctAnswer === submittedAnswer) {
		console.log('Correct!');
		return true;
	} else {
		console.log('Wrong!');
		return false;
	}
}
    // Countdown timer for each question -------------------------------------
    function timer() {
        counter = setInterval(decrement, 1000);
    }

    function decrement() {
        questionTime--;
        $('#countdown').html('Time Remaining: ' + questionTime + ' seconds');

        if (questionTime === 0) {
            numUnanswered++;

            // $('#game-display').hide();
            // $('#choice').html("You took to long to answer.");
            // $('#answer').show();

            // Reset countdown
            resetTimer();

            // Testing console
            console.log('Unanswered: ' + numUnanswered);
        }
    }

    function resetTimer() {
        questionTime = 30;
    }
    // Shuffle and display a question

    function shuffleQuestion() {
        // Display a random qustion with its available answers
        $('#question-text').html(mario.question);
        $('#wrong-1').html(mario.answers[0]);
        $('#wrong-2').html(mario.answers[1]);
        $('#wrong-3').html(mario.answers[2]);
        $('#correct').html(mario.answers[3]);
    }

    //Shuffle answers
    // Display answers to selected question in a random order.

    // Display answer
    // Show a page displaying the correct answer with a related gif
    function displayAnswer() {
        if (numWrong > numRight) {
            $('#game-display').hide();
            $('#choice').html("Sorry, that's incorrect!");
            $('#answer').show();
        } else if (numRight > numWrong) {
            $('#game-display').hide();
            $('#choice').html("That's right!");
            $('#answer').show();
        }
        $.ajax({
                url: mario.gif,
                method: 'GET'
            })
            .done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
    }

    // Display results
    // Show a page with the total results wrong, right, and unanswered after all questions.

    // Initialize the game with a start page
    function initialize() {
        questionTime = 30;
        answerTime = 10;
        counter = '';
        numRight = 0;
        numWrong = 0;
        numUnanswered = 0;

        $('#game-display').hide();
        $('#answer').hide();

        shuffleQuestion();

        // Testing Console
        console.log(mario);
        console.log(sonic);
    }

    // PROCESSES
    // -----------------------------------------------------------------------
    // When Start is clicked, display the game and start the timer -----------
    $('#start-game').on('click', function() {
        $('#game-display').show();
        $('#start').hide();
        timer();
    });
    // Check if selected answer is wrong/right and increase numWrong/numRight
    $('.answer').on('click', function() {
        if (this.id === 'correct') {
            numRight++;
            // Testing console
            console.log('Right: ' + numRight);
        } else {
            numWrong++;
            // Testing console
            console.log('Wrong: ' + numWrong);
        }
        // Display the answer
        displayAnswer();
    });
    initialize();
});
