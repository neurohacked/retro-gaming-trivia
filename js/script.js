$(document).ready(function() {
    // FUNCTIONS
    // -----------------------------------------------------------------------

    // Countdown timer for questions ------------------------------------
    function questionTimer() {
        counter = setInterval(decrement, 1000);
    }

    function decrement() {
        questionTime--;
        $('#countdown').html(`Time Remaining: ${questionTime} seconds`);

        if (questionTime === 0) {
            numUnanswered++;

            stopTimer();
            $('#game-display').hide();
            $('#choice').html("You took to long to answer. :/");
            $('#answer').show();
            displayAnswer();

            // Testing console -------------------------------
            console.log('Unanswered: ' + numUnanswered);
        }
    }

    function resetTimer() {
        questionTime = 30;
    }

    function stopTimer() {
        clearInterval(counter);
    }

    // Fisher-Yates shuffle
    function shuffle(array) {
        let m = array.length,
            t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    // Display correct answer -------------------------------------------
    function displayAnswer() {
        $('#correct-answer').html(`The correct answer is: ${questions[0].question.correctAnswer}`);
        $.ajax({
            url: questions[0].question.gif,
            method: 'GET'
        }).done(function(response) {
            $('#gif').attr('src', response.data[0].images.fixed_height.url);
        });
    }

    // Initialize the game with a start page ----------------------------
    function initialize() {
        $('#game-display').hide();
        $('#answer').hide();
        $('#results').hide();
    }

    // PROCESSES
    // -----------------------------------------------------------------------

    // When Start is clicked display the game and start the timer -------
    $(document).on('click', '.start-game', function() {
        questionTime = 30;
        answerTime = 10;
        counter = '';
        numRight = 0;
        numWrong = 0;
        numUnanswered = 0;
        answeredQuestions = 0;
        $('.answer').remove();

        // Shuffle questions ---------------------------------------
        availableQuestions = shuffle(questions);
        // Shuffle question's answers ------------------------------
        for (let i = 0; i < availableQuestions.length; i++) {
            shuffle(availableQuestions[i].question.answers);
        }

        $('#countdown').html('Time Remaining: 30 seconds')
        $('#game-display').show();
        $('#start').hide();
        $('#results').hide();
        questionTimer();
        nextQuestion();
    });

    // Check if selected answer is wrong/right --------------------------
    $(document).on('click', '.answer', function() {
        $('.answer').remove();
        answeredQuestions++;
        if (this.innerHTML === answer) {
            numRight++;
            // $('#game-display').hide();
            // $('#choice').html("That's right!");
            // $('#answer').show();
            // Testing console -------------------------------------
            console.log('Right: ' + numRight);
        } else {
            numWrong++;
            // $('#game-display').hide();
            // $('#choice').html("Sorry, that's incorrect. :(");
            // $('#answer').show();
            // Testing console -------------------------------------
            console.log('Wrong: ' + numWrong);
        }
        // stopTimer();

        console.log(`Answered Questions: ${answeredQuestions}`);
        // displayAnswer();
        nextQuestion();
    });

    // Display results --------------------------------------------------
    // $(document).on('click', '#to-results', function() {
    function displayResults() {
        $('#game-display').hide();
        // $('#answer').hide();
        $('#results').show();
        $('#outro').html("All done, here's how you did!");
        $('#end-results').html(`Correct Answers: ${numRight}<br />Incorrect Answers: ${numWrong}<br />Unanswered: ${numUnanswered}`);
    }
    // });

    // INITIALIZE
    // -----------------------------------------------------------------------

    initialize();
});
