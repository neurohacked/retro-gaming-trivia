$(document).ready(function() {
    // Constructor for questions/answers
    function quiz(question, wrong1, wrong2, wrong3, right) {
        this.question = question;
        this.wrong1 = wrong1;
        this.wrong2 = wrong2;
        this.wrong3 = wrong3;
        this.right = right;
        return this;
    }
    // Create the questions for the game
    function createQuestions() {
        mario = new quiz('Who is Mario\'s dinosaur friend?', 'Rex', 'Rawr', 'Toshi', 'Yoshi');
        sonic = new quiz('What does Sonic the Hedgehog love to collect?', 'Jewels', 'Coins', 'Chili Dogs', 'Rings');
        link = new quiz('What is the name of Link\'s fairy companion?', 'Cortana', 'Alexa', 'Siri', 'Navi');
    }
    // Countdown timer
    function timer() {
        counter = setInterval(decrement, 1000);
    }

    function decrement() {
        time--;
        $('#countdown').html('Time Remaining: ' + time + ' seconds');

        if (time === 0) {
            numUnanswered++;
            console.log('Unanswered: ' + numUnanswered);
            resetTimer();
        }
    }

    function resetTimer() {
        time = 30;
    }
    // Shuffle and display questions with answers
    function shuffleQuestion() {
        // for (var i=0; i<)
        $('#question-text').append(mario.question);
        $('#wrong-1').append(mario.wrong1);
        $('#wrong-2').append(mario.wrong2);
        $('#wrong-3').append(mario.wrong3);
        $('#correct').append(mario.right);
    }
    // Hide game until Start is clicked
    $('#start-game').on('click', function() {
        $('#game-display').show();
        $('#start').hide();
        timer();
    });
    // Check for wrong or correct answer
    $('.answer').on('click', function() {
        if (this.value === 'wrong') {
            alert('Sorry, that\'s wrong ');
            numWrong++;
            console.log('Wrong: ' + numWrong);
        } else {
            alert('Correct!');
            numRight++;
            console.log('Right: ' + numRight);

        }
    });
    // Display answer


    // Initialize the game
    function initialize() {
        time = 30;
        counter = '';
        numRight = 0;
        numWrong = 0;
        numUnanswered = 0;

        $('#game-display').hide();
        createQuestions();
        shuffleQuestion();
        console.log(mario);
        console.log(sonic);
        console.log(link);
        console.log();
    }

    initialize();
});
