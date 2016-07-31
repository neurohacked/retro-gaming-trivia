$(document).ready(function() {
    var time = 30;
    var counter;
    var numRight = 0;
    var numWrong = 0;
    var numUnanswered = 0;
    // Constructor for questions
    function question(question, wrong1, wrong2, wrong3, right) {
        this.question = question;
        this.wrong1 = wrong1;
        this.wrong2 = wrong2;
        this.wrong3 = wrong3;
        this.right = right;
        return this;
    }
    // Create the questions for the game
    function createQuestions() {
        question1 = new question('Who is Mario\'s dinosaur friend?', 'Rex', 'Rawr', 'Toshi', 'Yoshi');
        question2 = new question('What does Sonic love to collect?', 'Chili Dogs', 'Coins', 'Jewels', 'Rings');
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
            reset();
        }
    }

    function reset() {
        time = 30;
    }
    // Shuffle and display questions with answers
    function shuffleQuestion() {
        $('#question-text').append(question1.question);
        $('#wrong-1').append(question1.wrong1);
        $('#wrong-2').append(question1.wrong2);
        $('#wrong-3').append(question1.wrong3);
        $('#correct').append(question1.right);
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
    // Initialize the game
    function initialize() {
        $('#game-display').hide();
        createQuestions();
        shuffleQuestion();
        console.log(question1);
        console.log(question2);
    }

    initialize();
});
