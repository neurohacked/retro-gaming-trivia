$(document).ready(function() {
    // FUNCTIONS
    // ---------------------------------------------------------------------
    // Constructor for questions/answers
    function quiz(name, question, wrong1, wrong2, wrong3, right, gif) {
        this.name = name;
        this.question = question;
        this.wrong1 = wrong1;
        this.wrong2 = wrong2;
        this.wrong3 = wrong3;
        this.right = right;
        this.gif = queryURL = "https://api.giphy.com/v1/gifs/search?q=" + this.name + "&api_key=dc6zaTOxFJmzC";
        return this;
    }
    // Create the questions for the game
    function createQuestions() {
        mario = new quiz('mario-yoshi', 'Who is Mario\'s dinosaur friend?', 'Rex', 'Rawr', 'Toshi', 'Yoshi');
        sonic = new quiz("sonic+the+hedgehog", "What does Sonic the Hedgehog love to collect?", 'Jewels', 'Coins', 'Chili Dogs', 'Rings');
        link = new quiz('What is the name of Link\'s fairy companion?', 'Cortana', 'Alexa', 'Siri', 'Navi');
    }
    // Countdown timer for each question
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
        $('#wrong-1').html(mario.wrong1);
        $('#wrong-2').html(mario.wrong2);
        $('#wrong-3').html(mario.wrong3);
        $('#correct').html(mario.right);
    }

    //Shuffle answers
    // Display answers to selected question in a random order.
        for (var i=0; i<)

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

        createQuestions();
        shuffleQuestion();

        // Testing Console
        console.log(mario);
        console.log(sonic);
        console.log(link);
    }

    // PROCESSES
    // ---------------------------------------------------------------------
    // When Start is clicked, display the game and start the timer.
    $('#start-game').on('click', function() {
        $('#game-display').show();
        $('#start').hide();
        timer();
    });
    // Check if selected answer is wrong/right and increase numWrong/numRight
    $('.answer').on('click', function() {
        if (this.value === 'wrong') {
            // Add to numWrong
            numWrong++;
            // Testing console
            console.log('Wrong: ' + numWrong);
        } else {
            // Add to numRight
            numRight++;
            // Testing console
            console.log('Right: ' + numRight);
        }
        // Display the answer
        displayAnswer();
    });
    initialize();
});
