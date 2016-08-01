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
    // Countdown timer for each question -------------------------------------
    function questionTimer() {
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
        $('#btn-1').html(mario.answers[0]);
        $('#btn-2').html(mario.answers[3]).attr('id', 'correct');
        $('#btn-3').html(mario.answers[2]);
        $('#btn-4').html(mario.answers[1]);
    }

    //Shuffle answers
    // Display answers to selected question in a random order.

    // Display results
    // Show a page with the total results wrong, right, and unanswered after all questions.

    // Initialize the game with a start page ---------------------------------
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
        console.log(mario.answers)
        console.log(sonic);
    }

    // PROCESSES
    // -----------------------------------------------------------------------
    // When Start is clicked display the game and start the timer ------------
    $('#start-game').on('click', function() {
        $('#game-display').show();
        $('#start').hide();
        questionTimer();
    });
    // Check if selected answer is wrong/right -------------------------------
    $('.answer').on('click', function() {
        if (this.id === 'correct') {
            numRight++;
            $('#game-display').hide();
            $('#choice').html("That's right!");
            $('#answer').show();
            // Testing console
            console.log('Right: ' + numRight);
        } else {
            numWrong++;
            $('#game-display').hide();
            $('#choice').html("Sorry, that's incorrect!");

            $('#answer').show();
            // Testing console
            console.log('Wrong: ' + numWrong);
        }
        $.ajax({
            url: mario.gif,
            method: 'GET'
        }).done(function(response) {
            $('#gif').attr('src', response.data[3].images.fixed_height.url);
        });
    });
    // INITIALIZE
    // -----------------------------------------------------------------------
    initialize();
});
