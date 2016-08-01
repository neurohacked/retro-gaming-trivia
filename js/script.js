$(document).ready(function() {
    // FUNCTIONS
    // -----------------------------------------------------------------------
    // Countdown timer for each question -----------------------------------
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

            resetTimer();

            // Testing console -------------------------------
            console.log('Unanswered: ' + numUnanswered);
        }
    }

    function resetTimer() {
        questionTime = 30;
    }
    // Shuffle and display a question --------------------------------------
    // function shuffleQuestion() {
        // Display a random qustion with its available answers
        $('#question-text').html(mario.question);
        $('#btn-1').html(mario.answers[0]);
        $('#btn-2').html(mario.answers[3]).attr('id', 'correct');
        $('#btn-3').html(mario.answers[2]);
        $('#btn-4').html(mario.answers[1]);
    // }

    //Shuffle answers ------------------------------------------------------

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
    // Shuffle one question's answers for now
    shuffle(mario.answers);


    // Display results
    // Show a page with the total results wrong, right, and unanswered after all questions.

    // Initialize the game with a start page -------------------------------
    function initialize() {
        questionTime = 30;
        answerTime = 10;
        counter = '';
        numRight = 0;
        numWrong = 0;
        numUnanswered = 0;

        $('#game-display').hide();
        $('#result').hide();

        // shuffleQuestion();

        // Testing Console -----------------------------------------
        console.log(mario);
        console.log(mario.answers)
        console.log('------------------------------------------');
        console.log(sonic);
    }

    // PROCESSES
    // -----------------------------------------------------------------------
    // When Start is clicked display the game and start the timer ----------
    $('#start-game').on('click', function() {
        $('#game-display').show();
        $('#start').hide();
        questionTimer();
    });
    // Check if selected answer is wrong/right -----------------------------
    $('.answer').on('click', function() {
        if (this.id === 'correct') {
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
            $('#correct-answer').html('The correct answer is ' + mario.answers[3]);
            $('#answer').show();
            // Testing console -------------------------------------
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
