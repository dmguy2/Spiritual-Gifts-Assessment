const landingPage = document.getElementById('landing-page');
const beginSurveyBtn = document.getElementById('begin-survey');
const participantNameInput = document.getElementById('participant-name');
const surveyContainer = document.getElementById('survey-container');

beginSurveyBtn.addEventListener('click', () => {
    if (participantNameInput.value.trim() === '') {
        alert('Please enter your name before beginning the survey.');
        return;
    }
    landingPage.style.display = 'none';
    surveyContainer.style.display = 'flex';
    showQuestion(currentQuestion);
});

const questions = [
    "I have the ability to organize ideas, resources, time, and people effectively.",
    // ... (rest of the questions)
    "I feel assured that a situation will change for the glory of God even when the situation seems impossible."
];

const spiritualGifts = {
    "Leadership": [6, 16, 27, 43, 65],
    "Administration": [1, 17, 31, 47, 59],
    "Teaching": [2, 18, 33, 61, 73],
    "Knowledge": [9, 24, 39, 68, 79],
    "Wisdom": [3, 19, 48, 62, 74],
    "Prophecy": [10, 25, 40, 54, 69],
    "Discernment": [11, 26, 41, 55, 70],
    "Exhortation": [20, 34, 49, 63, 75],
    "Shepherding": [4, 21, 35, 50, 76],
    "Faith": [12, 28, 42, 56, 80],
    "Evangelism": [5, 36, 51, 64, 77],
    "Apostleship": [13, 29, 44, 57, 71],
    "Service/Helps": [14, 30, 46, 58, 72],
    "Mercy": [7, 22, 37, 52, 66],
    "Giving": [8, 23, 38, 53, 67],
    "Hospitality": [15, 32, 45, 60, 78]
};

let currentQuestion = 0;
let answers = new Array(questions.length).fill(0);

const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.option');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const resultsContainer = document.getElementById('results-container');
const downloadPdfBtn = document.getElementById('download-pdf');

function showQuestion(index) {
    questionContainer.style.opacity = 0;
    setTimeout(() => {
        questionText.textContent = `${index + 1}. ${questions[index]}`;
        options.forEach(option => {
            option.classList.remove('selected');
            if (parseInt(option.dataset.value) === answers[index]) {
                option.classList.add('selected');
            }
        });
        prevBtn.disabled = index === 0;
        nextBtn.disabled = answers[index] === 0;
        nextBtn.textContent = index === questions.length - 1 ? 'Finish' : 'Next';
        questionContainer.style.opacity = 1;
    }, 300);
}

function calculateScores() {
    const scores = {};
    for (const [gift, questionNumbers] of Object.entries(spiritualGifts)) {
        scores[gift] = questionNumbers.reduce((sum, qNum) => {
            const answer = answers[qNum - 1];
            return sum + (Number.isInteger(answer) ? answer : 0);
        }, 0);
    }
    return scores;
}

function showResults() {
    surveyContainer.style.opacity = 0;
    setTimeout(() => {
        surveyContainer.style.display = 'none';
        resultsContainer.style.display = 'flex';
        resultsContainer.style.opacity = 1;
    }, 300);
    
    const scores = calculateScores();
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    const displayScores = window.innerWidth < 600 ? sortedScores.slice(0, 10) : sortedScores;
    
    const ctx = document.getElementById('results-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: displayScores.map(([gift, _]) => gift),
            datasets: [{
                label: 'Spiritual Gifts Scores',
                data: displayScores.map(([_, score]) => score),
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 25,
                    title: {
                        display: true,
                        text: 'Score',
                        font: {
                            size: window.innerWidth < 600 ? 10 : 14
                        }
                    },
                    ticks: {
                        font: {
                            size: window.innerWidth < 600 ? 8 : 12
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Spiritual Gifts',
                        font: {
                            size: window.innerWidth < 600 ? 10 : 14
                        }
                    },
                    ticks: {
                        font: {
                            size: window.innerWidth < 600 ? 8 : 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Your Spiritual Gifts Profile',
                    font: {
                        size: window.innerWidth < 600 ? 14 : 18
                    }
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('portrait');
    const scores = calculateScores();

    const participantName = participantNameInput.value;
    const currentDate = new Date().toLocaleDateString();

    doc.setFontSize(20);
    doc.text('Spiritual Gifts Survey Results', 110, 15, null, null, 'center');

    doc.setFontSize(14);
    doc.text(`Participant: ${participantName}`, 20, 30);
    doc.text(`Date: ${currentDate}`, 20, 40);

    doc.setFontSize(12);
    let yPos = 55;

    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    sortedScores.forEach(([gift, score], index) => {
        if (index < 3) {
            doc.setFont(undefined, 'bold');
            doc.text(`${gift}: ${score}`, 20, yPos);
            doc.setFont(undefined, 'normal');
        } else {
            doc.text(`${gift}: ${score}`, 20, yPos);
        }
        yPos += 10;
    });

    doc.addPage();
    doc.setFontSize(16);
    
    const pdfCanvas = document.createElement('canvas');
    pdfCanvas.width = 800;
    pdfCanvas.height = 600;
    const pdfCtx = pdfCanvas.getContext('2d');
    const pdfChart = new Chart(pdfCtx, {
        type: 'bar',
        data: {
            labels: sortedScores.map(([gift, _]) => gift),
            datasets: [{
                label: 'Spiritual Gifts Scores',
                data: sortedScores.map(([_, score]) => score),
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 25,
                    title: {
                        display: true,
                        text: 'Score',
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '',
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Your Spiritual Gifts Profile',
                    font: {
                        size: 18
                    }
                }
            }
        }
    });

    setTimeout(() => {
        doc.addImage(pdfCanvas.toDataURL('image/png'), 'PNG', 8, 20, 190, 150);
        doc.save('spiritual_gifts_survey_results.pdf');
    }, 1000);
}

showQuestion(currentQuestion);

options.forEach(option => {
    option.addEventListener('click', () => {
        answers[currentQuestion] = parseInt(option.dataset.value);
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        nextBtn.disabled = false;
    });
});

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        showResults();
    }
});

downloadPdfBtn.addEventListener('click', generatePDF);
