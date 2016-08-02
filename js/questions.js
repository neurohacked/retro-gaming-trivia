// Constructor for questions/answers -------------------------------------
function Quiz(name, options, gif) {
    this.name = name;
    this.question = options.question;
    this.answers = options.answers; // Array of answers
    this.correctAnswer = options.answers[options.right];
    this.gif = "https://api.giphy.com/v1/gifs/search?q=" + this.name + "&api_key=dc6zaTOxFJmzC";
    return this;
}
// Create the questions for the game -------------------------------------
let options = {
    question: 'Who is Mario\'s dinosaur friend?',
    answers: ['Rex', 'Rawr', 'Toshi', 'Yoshi'],
    right: 3
};
let mario = new Quiz('mario-yoshi', options);

options = {
    question: 'What does Sonic the Hedgehog love to collect?',
    answers: ['Jewels', 'Coins', 'Chili Dogs', 'Rings'],
    right: 3
};
let sonic = new Quiz("sonic-running", options);
