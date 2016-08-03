$(document).ready(function() {
    // FUNCTIONS
    // -----------------------------------------------------------------------

    // Countdown timers for questions and asnwer ------------------------
    function questionTimer() {
        counter = setInterval(decrement, 1000);
    }

    function answerTimer() {
        counter = setInterval(decrement, 1000);
    }

    function decrement() {
        if (onQuestion === true) {
            questionTime--;
            $('#countdown').html(`Time Remaining: ${questionTime} seconds`);
            console.log(questionTime);
        } else {
            answerTime--;
            console.log(`Answer Time: ${answerTime}`);
        }

        if (questionTime === 0) {
            numUnanswered++;
            stopTimer();
            $('#game-display').hide();
            $('#choice').html("You took to long to answer. :/");
            $('#answer').show();
            displayAnswer();

            // Testing console -------------------------------
            console.log('Unanswered: ' + numUnanswered);
        } else if (answerTime === 0) {
            stopTimer();
            nextQuestion();
        }
    }

    function resetQuestionTimer() {
        questionTime = 10;
    }

    function resetAnswerTimer() {
        answerTime = 1;
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

    // Switch to next available question --------------------------------
    function nextQuestion() {
        onQuestion = true;
        questionTimer();
        resetAnswerTimer();
        $('#countdown').html('Time Remaining: 30 seconds')
        $('#answer').hide();
        $('#game-display').show();
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

    // Display correct answer -------------------------------------------
    function displayAnswer() {
        if (answeredQuestions === 6) {
            $('#correct-answer').html(`The correct answer is: ${availableQuestions[5].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[5].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        } else if (answeredQuestions === 5) {
            $('#correct-answer').html(`The correct answer is: ${availableQuestions[4].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[4].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        } else if (answeredQuestions === 4) {
            $('#correct-answer').html(`The correct answer is: ${availableQuestions[3].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[3].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        } else if (answeredQuestions === 3) {
            $('#correct-answer').html(`The correct answer is: ${availableQuestions[2].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[2].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        } else if (answeredQuestions === 2) {
            $('#correct-answer').html(`The correct answer is: ${availableQuestions[1].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[1].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        } else if (answeredQuestions === 1) {
            $('#correct-answer').html(`The correct answer is: ${availableQuestions[0].question.correctAnswer}`);
            $.ajax({
                url: availableQuestions[0].question.gif,
                method: 'GET'
            }).done(function(response) {
                $('#gif').attr('src', response.data[0].images.fixed_height.url);
            });
        }
        answerTimer();
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
        questionTime = 10;
        answerTime = 1;
        counter = '';
        onQuestion = false;
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

        $('#start').hide();
        $('#results').hide();
        nextQuestion();
    });

    // Check if selected answer is wrong/right --------------------------
    $(document).on('click', '.answer', function() {
        onQuestion = false;
        $('.answer').remove();
        answeredQuestions++;
        if (this.innerHTML === answer) {
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
        resetQuestionTimer();
        console.log(`Answered Questions: ${answeredQuestions}`);
        console.log(onQuestion);
        displayAnswer();
    });

    // Display results --------------------------------------------------
    // $(document).on('click', '#to-results', function() {
    function displayResults() {
        stopTimer();
        $('#game-display').hide();
        $('#answer').hide();
        $('#results').show();
        $('#outro').html("All done, here's how you did!");
        $('#end-results').html(`Correct Answers: ${numRight}<br />Incorrect Answers: ${numWrong}<br />Unanswered: ${numUnanswered}`);
    }
    // });

    // INITIALIZE
    // -----------------------------------------------------------------------

    initialize();
});
