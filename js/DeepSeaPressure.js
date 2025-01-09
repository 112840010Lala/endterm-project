console.log("JavaScript loaded");

// Store the selected answer for a question
function selectAnswer(questionNumber, answer) {
    const questionKey = `Q${questionNumber}`; // Create a unique key for each question
    localStorage.setItem(questionKey, answer); // Store the answer in localStorage
    console.log(`Answer for ${questionKey} saved as ${answer}`); // Log for debugging

    // Highlight the selected answer
    highlightSelectedAnswer(questionNumber, answer);

    // Check if all questions have been answered
    checkIfAllAnswered();
}

// Highlight the selected answer visually
function highlightSelectedAnswer(questionNumber, selectedAnswer) {
    const question = document.querySelector(`#Q${questionNumber}`); // Select the specific question
    if (question) {
        const answers = question.querySelectorAll('.answers'); // Get all answer divs for this question
        answers.forEach((answerDiv) => {
            // Remove the 'selected' class from all answers
            answerDiv.classList.remove('selected');
        });

        // Add the 'selected' class to the clicked answer's parent div
        const selectedAnswerDiv = Array.from(answers).find((answerDiv) => {
            return answerDiv.textContent.trim().startsWith(selectedAnswer); // Match the selected answer
        });

        if (selectedAnswerDiv) {
            selectedAnswerDiv.classList.add('selected');
        }
    }
}

// Check if all answers have been selected
function checkIfAllAnswered() {
    let allAnswered = true;

    // Loop through each question to check if an answer has been selected
    for (let i = 1; i <= 10; i++) {
        if (!localStorage.getItem(`Q${i}`)) {
            allAnswered = false;
            break;
        }
    }

    // If all questions are answered, calculate and display the result
    if (allAnswered) {
        calculateAndDisplayResult();
    }
}

// Calculate and display the result on the result page
function calculateAndDisplayResult() {
    const answers = { A: 0, B: 0, };

    // Loop through each question's stored answer in localStorage
    for (let i = 1; i <= 10; i++) { // Adjust range based on actual question count
        const answer = localStorage.getItem(`Q${i}`);
        if (answer) answers[answer]++;
    }

    const resultContent = calculateResult(answers);

    // Display the result based on the dominant answer
    const resultTitle = document.querySelector('.type h1');
    const resultDescription = document.querySelector('.type p');
    const resultImage = document.querySelector('.descriptionImg .img');
    resultTitle.textContent = resultContent.title;
    resultDescription.textContent = resultContent.description;
    resultImage.src = resultContent.imgSrc;

    // Make sure the result section is visible
    const resultSection = document.getElementById('result'); // Ensure the ID matches your HTML
    if (resultSection) {
        resultSection.style.display = 'block';
        setTimeout(() => {
            resultSection.classList.remove('hidden');
            resultSection.classList.add('visible');
        }, 50);
    }

    console.log("Result displayed:", resultContent);
}

// Calculate the result based on answers
function calculateResult(answers) {
    if (answers.A >= 7) {
        return {
            title: "鯊魚",
            description: "你天生是個社交達人，熱情外向，擅長活躍氣氛。你能快速建立新關係，讓人覺得和你在一起很有趣，是朋友圈中的開心果！",
            imgSrc: "./img/shark.png"
        };
    } else if (answers.A >= 5) {
        return {
            title: "小丑魚",
            description: "你重視深度的友情，對朋友非常忠誠且關懷備至。你會用心維護每段關係，給予他人情感上的支持，是大家的情感支柱!",
            imgSrc: "./img/nemo.png"
        };
    } else if (answers.A >= 2) {
        return {
            title: "鰻魚",
            description: "你更喜歡選擇性社交，對友情要求質量而非數量。你冷靜理性，不會過度依賴友情，卻在需要時給予最具建設性的幫助!",
            imgSrc: "./img/eel.png"
        };
    } else if (answers.A >= 0) {
        return {
            title: "鮭魚",
            description: "你是朋友之間的橋樑，擅長將不同圈子的人聯繫起來。你靈活多變，喜歡促成合作與創新，讓朋友圈充滿活力與多樣性!",
            imgSrc: "./img/salmon.png"
        };
    } else {
        return {
            title: "鯊魚",
            description: "你是朋友之間的橋樑，擅長將不同圈子的人聯繫起來。你靈活多變，喜歡促成合作與創新，讓朋友圈充滿活力與多樣性!",
            imgSrc: "./img/shark.png"
        };
    }
}

// Optional: Clear stored answers
function clearAnswers() {
    for (let i = 1; i <= 10; i++) {
        localStorage.removeItem(`Q${i}`);
    }
    console.log("All answers cleared.");

    const resultSection = document.getElementById('result');
    if (resultSection) {
        resultSection.classList.remove('visible');
        resultSection.classList.add('hidden'); // Add hidden class for fade-out
        setTimeout(() => {
            resultSection.style.display = 'none'; // Fully hide after animation
        }, 50); // Match the CSS transition duration
    }

    const allAnswers = document.querySelectorAll('.answers');
    allAnswers.forEach((answerDiv) => {
        answerDiv.classList.remove('selected'); // Remove selected class from all answers
    });
}

document.getElementById('againButton').addEventListener('click', clearAnswers);





// Show share modal
document.querySelector('.share-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    const modal = document.getElementById('share-modal');
    
    // Get the result title and image from the result section
    const resultTitle = document.getElementById('result-title').textContent;
    const resultImageSrc = document.getElementById('result-image').src;

    // Update the modal content
    document.getElementById('share-result-title').textContent = resultTitle; // Set the result title
    document.getElementById('share-result-image').src = resultImageSrc; // Set the result image

    modal.classList.add('visible'); // Show the modal
});

// Close share modal
document.getElementById('close-modal').addEventListener('click', function () {
    const modal = document.getElementById('share-modal');
    modal.classList.remove('visible'); // Hide the modal
});





  


