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
    const answers = { A: 0, B: 0, C: 0, D: 0 };

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
    if (answers.A > answers.B && answers.A > answers.C && answers.A > answers.D) {
        return {
            title: "恭喜你成功被錄取！\n你擔任的部門為拐杖糖",
            description: "#節日象徵\n#聖誕節\n#具紀念意義\n#堅韌固執\n#形狀獨特\n#堅持自我風格",
            imgSrc: "./img/Candy_cane.png"
        };
    } else if (answers.B > answers.A && answers.B > answers.C && answers.B > answers.D) {
        return {
            title: "恭喜你成功被錄取！\n你擔任的部門為棒棒糖",
            description: "#甜美可愛\n#色彩繽紛\n#帶來快樂感\n#耐心等待\n#慢慢享受\n#耐性十足",
            imgSrc: "./img/Lollipop.PNG"
        };
    } else if (answers.C > answers.B && answers.C > answers.A && answers.C > answers.D) {
        return {
            title: "恭喜你成功被錄取！\n你擔任的部門為泡泡糖",
            description: "#輕鬆快樂\n#可以吹出泡泡\n#自由隨性\n#隨意嚼食\n#帶來快感",
            imgSrc: "./img/Bubble_gum.png"
        };
    } else if (answers.D > answers.B && answers.D > answers.C && answers.D > answers.A) {
        return {
            title: "恭喜你成功被錄取！\n你擔任的部門為棉花糖",
            description: "#柔軟甜美\n#如雲朵般輕盈\n#甜蜜無比\n#夢幻浪漫\n#童話世界",
            imgSrc: "./img/Marshmallow.png"
        };
    } else {
        return {
            title: "恭喜你成功被錄取！\n你擔任的部門為跳跳糖",
            description: "#充滿驚喜\n#有趣的口感\n#活潑俏皮\n#歡樂和驚奇",
            imgSrc: "./img/Popping_Candy.png"
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



  


