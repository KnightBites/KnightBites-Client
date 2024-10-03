// Description: A simple profanity filter that censors inappropriate words in a given text.
// This will be used to censor any not-Calvin-appropriate words in comments.
// The censorText function reads a list of inappropriate words from a file and censors them in a given text.
// The escapeRegExp function escapes special characters in a string for use in a regular expression.
// The censorText function uses the escapeRegExp function to create a regular expression for each inappropriate word.
// The censorText function replaces all occurrences of the inappropriate words with asterisks for every character in the bad word.

// inappropriate.txt mostly gotten from http://www.bannedwordlist.com/lists/swearWords.txt
// This is not a 100% accurate filter, if someone finds a creative way to break the filter, it is what it is, but I am trying to make it as robust as possible.

// Import the file system module
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Read the list of inappropriate words
const inappropriateWordsPath = path.join(__dirname, 'inappropriate.txt');
const inappropriateWords = fs.readFileSync(inappropriateWordsPath, 'utf-8').split('\n').map(word => word.trim());

// Log the inappropriate words to verify they are read correctly (green text)
console.log('Inappropriate Words:', inappropriateWords);

// Function to escape special characters in a string for use in a regular expression
function escapeRegExp(string) {
    return string.replace(/[_.*+?^${}()|[\]\\]/g, '\\$&');
}

// Function to censor inappropriate words in a given text
function censorText(text) {
    let censoredText = text;
    inappropriateWords.forEach(word => {
        const escapedWord = escapeRegExp(word);
        const regex = new RegExp(escapedWord.split('').join('[\\s-._]*'), 'gi');
        censoredText = censoredText.replace(regex, '*'.repeat(word.length));
    });
    return censoredText;
}

/* Test the censorText function
const inputText = "This is some example text with badword, BADWORD, Badword, and anotherbadword.";
const censoredText = censorText(inputText);
console.log(censoredText);

const inputText2 = "This is some example text with b a d w o r d , B-A-D-W-O-R-D, B.a.d.w.o.r.d., and a-n-o-t-h-e-r-b-a-d-w-o-r-d.";
const censoredText2 = censorText(inputText2);
console.log(censoredText2);

const inputText3 = "This is some example text with b.a.d.w.o.r.d, badwordbadwordbadword, bad.word, and anotherbadword.";
const censoredText3 = censorText(inputText3);
console.log(censoredText3);

const inputText4 = "This is some example text with badwordinside, badwordinsidebadwordinside, badwordinside.badwordinside, and anotherbadwordinside.";
const censoredText4 = censorText(inputText4);
console.log(censoredText4);

const inputText5 = "This pizza FUCKING sucks!"
const censoredText5 = censorText(inputText5);
console.log(censoredText5);
*/

// Interactive tester. Be an immature child when you play with this hahaha
const readUserInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    readUserInput.question('Enter a message to censor (or type "exit" to quit): ', (input) => {
        if (input.toLowerCase() === 'exit') {
            readUserInput.close();
        } else {
            const censoredMessage = censorText(input);
            console.log('Censored Message:', censoredMessage);
            promptUser();
        }
    });
}

promptUser();