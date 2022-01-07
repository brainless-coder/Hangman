let answer;
let guessed = [];
let pressedKey = "";
let wordStatus = "";
let lives = 5;
let won = false;


async function getWord ()  {
    const url = 'https://random-word-api.herokuapp.com/word?number=1';
    const response = await fetch(url);
    const decodedData = await response.json(); 
    answer = decodedData[0];
    return answer;
}


(async () => {
    answer = await getWord();
    console.log(answer);

    for(let i = 0; i < answer.length; ++i) {
        wordStatus += "_"
    }
    document.getElementById('wordDashes').innerHTML = wordStatus;

    document.addEventListener('keydown', (event) => {
        pressedKey = event.key.toLowerCase();
        let charCode = event.keyCode;
        if (charCode >= 65 && charCode <= 90)
            if(lives > 0 && !won) 
                handleGuess(pressedKey);
        
        document.getElementById('chances').innerHTML = `❤️: ${lives}`;
        document.getElementById('guessed').innerHTML = `Characters Used: ${guessed}`;

    });

    // this function will be called everytime, whenever we press any key
    function handleGuess(word) {
        if (!guessed.includes(word)) {
            guessed.push(word);

            if (answer.indexOf(word) >= 0) {
                correctGuess(word);
            } else {
                lives--;
                if(lives == 0) {
                    document.getElementById('wordDashes').innerHTML = "Game Over! You will be hanged";
                }
            }
        } 
    }

    // This function will be called if we guess the correct word
    function correctGuess() {
        wordStatus = "";
        for(let i = 0; i < answer.length; ++i) {
            if (guessed.includes(answer[i])) {
                wordStatus += `${answer[i]}`;
            } else {
                wordStatus += "_";
            }
        }

        if(wordStatus == answer) {
            document.getElementById('wordDashes').innerHTML = "You Won";
            won = true;
        } else {
            document.getElementById('wordDashes').innerHTML = wordStatus;
        }

    }

    document.getElementById('chances').innerHTML = `❤️: ${lives}`;
    document.getElementById('guessed').innerHTML = `characters used: ${guessed}`;

})()
