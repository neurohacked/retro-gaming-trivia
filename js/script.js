$(document).ready(function() {
    // FUNCTIONS
    // -----------------------------------------------------------------------

    // Countdown timer for each question -----------------------------------
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

    // Function to shuffle and choose a question ---------------------------
    function shuffleQuestions(array) {
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

    // Function to shuffle answers -----------------------------------------

    // Fisher-Yates shuffle
    function shuffleAnswers(array) {
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

    // Display correct answer ----------------------------------------------
    function displayAnswer() {
        $('#correct-answer').html(`The correct answer is: ${questions[0].question1.correctAnswer}`);
        $.ajax({
            url: questions[0].question1.gif,
            method: 'GET'
        }).done(function(response) {
            $('#gif').attr('src', response.data[3].images.fixed_height.url);
        });
    }

    // Initialize the game with a start page -------------------------------
    function initialize() {

        $('#game-display').hide();
        $('#answer').hide();
        $('#results').hide();

        // shuffleQuestion();
        // Testing Console -----------------------------------------
        console.log('Correct Answer: ' + questions[0].question1.correctAnswer);
        console.log('------------------------------------------');
        console.log(questions[0].question1);
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

        $('#countdown').html('Time Remaining: 30 seconds')
        $('#game-display').show();
        $('#start').hide();
        $('#results').hide();
        questionTimer();
    });
    // Shuffle and choose a question
    // let chosenQuestion = shuffleQuestions(mario.answers);
    // console.log('Active Question: ' + );
    // console.log('------------------------------------------');
    // Shuffle one question's answers for now
    let availableAnswers = shuffleAnswers(questions[0].question1.answers);
    console.log('Active Question: ' + questions[0].question1.question);
    console.log('------------------------------------------');

    // Display answers as buttons ------------------------------------------
    $('#question-text').html(questions[0].question1.question);
    for (let i = 0; i < availableAnswers.length; i++) {
        let j = $('<button>');
        j.addClass('btn btn-md btn-default btn-block answer');
        j.text(availableAnswers[i]);
        $('#answers').append(j);
        // Testing Console -------------------------------------
        console.log('Available Answer: ' + availableAnswers[i]);
    }
    console.log('------------------------------------------');

    // Check if selected answer is wrong/right -----------------------------
    $(document).on('click', '.answer', function() {
        if (this.innerHTML === questions[0].question1.correctAnswer) {
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
