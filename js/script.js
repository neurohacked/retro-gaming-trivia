$(document).ready(function() {
    var time = 30;
    var counter;
    var numRight = '';
    var numWrong = '';
    var unanswered = '';
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
        $('#countdown').html('Time Remaining: ' + time + ' seconds.');

        if (time === 0) {
            stop();
        }
    }
    function stop() {
        clearInterval(counter);
    }
    // Shuffle and display questions with answers
    function shuffleQuestion() {
        $('#question').append(question1.question);
    }


    // function check {
    //     $
    //     if
    // }
    // Initialize the game
    function initialize() {

        timer();
        createQuestions();
        shuffleQuestion();
        console.log(question1.question);
        console.log(question2);
    }

    initialize();
});
