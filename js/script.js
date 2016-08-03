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

    // When Start is clicked display the game and start the timer ----------
    $(document).on('click', '.start-game', function() {
        questionTime = 30;
        answerTime = 10;
        counter = '';
        numRight = 0;
        numWrong = 0;
        numUnanswered = 0;
        $('.answer').remove();

        // Shuffle and choose a question
        let chosenQuestion = shuffle(questions);
        // Shuffle chosen question's answers
        let availableAnswers = shuffle(chosenQuestion[0].question.answers);
        console.log(`Question 1: ${chosenQuestion[0].question.text}`);
        console.log(`Question 2: ${chosenQuestion[1].question.text}`);
        console.log(`Question 3: ${chosenQuestion[2].question.text}`);
        console.log(`Question 4: ${chosenQuestion[3].question.text}`);
        console.log(`Question 5: ${chosenQuestion[4].question.text}`);
        console.log(`Question 6: ${chosenQuestion[5].question.text}`);
        console.log('------------------------------------------');
        console.log(`Chosen Question: ${chosenQuestion[0].question.text}`);
        console.log('------------------------------------------');

        // Display answers as buttons ------------------------------
        $('#question-text').html(questions[0].question.text);
        for (let i = 0; i < availableAnswers.length; i++) {
            j = $('<button>');
            j.addClass('btn btn-md btn-default btn-block answer');
            j.text(availableAnswers[i]);
            $('#answers').append(j);
            // Testing Console -------------------------------------
            console.log('Available Answer: ' + availableAnswers[i]);
        }
        console.log('------------------------------------------');
        console.log('Correct Answer: ' + questions[0].question.correctAnswer);
        console.log('------------------------------------------');

        $('#countdown').html('Time Remaining: 30 seconds')
        $('#game-display').show();
        $('#start').hide();
        $('#results').hide();
        questionTimer();
    });

    // Check if selected answer is wrong/right -----------------------------
    $(document).on('click', '.answer', function() {
        if (this.innerHTML === questions[0].question.correctAnswer) {
            numRight++;
            $('#game-display').hide();
            $('#choice').html("That's right!");
            $('#answer').show();
            // Testing console -------------------------------------
            console.log('Right: ' + numRight);
        } else {
            numWrong++;
            $('#game-display').hide();
            $('#choice').html("Sorry, that's incorrect. :(");
            $('#answer').show();
            // Testing console -------------------------------------
            console.log('Wrong: ' + numWrong);
        }
        stopTimer();
        displayAnswer();
    });

    // Display results -----------------------------------------------------
    $(document).on('click', '#to-results', function() {
            $('#answer').hide();
            $('#results').show();
            $('#outro').html("All done, here's how you did!");
            $('#end-results').html(`Correct Answers: ${numRight}<br />Incorrect Answers: ${numWrong}<br />Unanswered: ${numUnanswered}`);
    });

    // INITIALIZE
    // -----------------------------------------------------------------------

    initialize();
});
