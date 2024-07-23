const landingPage = document.getElementById('landing-page');
const beginSurveyBtn = document.getElementById('begin-survey');

beginSurveyBtn.addEventListener('click', () => {
    landingPage.style.display = 'none';
    surveyContainer.style.display = 'flex';
    showQuestion(currentQuestion);
});

const questions = [
    "I have the ability to organize ideas, resources, time, and people effectively.", 
    "I am willing to study and prepare for the task of teaching.", 
    "I am able to relate the truths of God to specific situations.", 
    "I have a God-given ability to help others grow in their faith.", 
    "I possess a special ability to communicate the truth of salvation.", 
    "I have the ability to make critical decisions when necessary.", 
    "I am sensitive to the hurts of people.", 
    "I experience joy in meeting needs through sharing possessions.", 
    "I enjoy studying.", 
    "I have delivered God’s message of warning and judgment.", 
    "I am able to sense the true motivation of persons and movements.", 
    "I have a special ability to trust God in difficult situations.", 
    "I have a strong desire to contribute to the establishment of new churches.", 
    "I take action to meet physical and practical needs rather than merely talking about or planning to help.", 
    "I enjoy entertaining guests in my home.", 
    "I can adapt my guidance to fit the maturity of those working with me.", 
    "I can delegate and assign meaningful work.", 
    "I have an ability and desire to teach.", 
    "I am usually able to analyze a situation correctly.", 
    "I have a natural tendency to encourage others.", 
    "I am willing to take the initiative in helping other Christians grow in their faith.", 
    "I have an acute awareness of the emotions of other people, such as loneliness, pain, fear, and anger.", 
    "I am a cheerful giver.", 
    "I spend time digging into facts.", 
    "I feel that I have a message from God to deliver to others.", 
    "I can recognize when a person is genuine/honest.", 
    "I am a person of vision (a clear mental portrait of a preferable future given by God). I am able to communicate vision in such a way that others commit to making the vision a reality.", 
    "I am willing to yield to God’s will rather than question and waver.", 
    "I would like to be more active in getting the gospel to people in other lands.", 
    "It makes me happy to do things for people in need.", 
    "I am successful in getting a group to do its work joyfully.", 
    "I am able to make strangers feel at ease.", 
    "I have the ability to plan learning approaches.", 
    "I can identify those who need encouragement.", 
    "I have trained Christians to be more obedient disciples of Christ.", 
    "I am willing to do whatever it takes to see others come to Christ.", 
    "I am attracted to people who are hurting.", 
    "I am a generous giver.", 
    "I am able to discover new truths.", 
    "I have spiritual insights from Scripture concerning issues and people that compel me to speak out.", 
    "I can sense when a person is acting in accord with God’s will.", 
    "I can trust in God even when things look dark.", 
    "I can determine where God wants a group to go and help it get there.", 
    "I have a strong desire to take the gospel to places where it has never been heard.", 
    "I enjoy reaching out to new people in my church and community.", 
    "I am sensitive to the needs of people.", 
    "I have been able to make effective and efficient plans for accomplishing the goals of a group.", 
    "I often am consulted when fellow Christians are struggling to make difficult decisions.", 
    "I think about how I can comfort and encourage others in my congregation.", 
    "I am able to give spiritual direction to others.", 
    "I am able to present the gospel to lost persons in such a way that they accept the Lord and His salvation.", 
    "I possess an unusual capacity to understand the feelings of those in distress.", 
    "I have a strong sense of stewardship based on the recognition that God owns all things.", 
    "I have delivered to other persons messages that have come directly from God.", 
    "I can sense when a person is acting under God’s leadership.", 
    "I try to be in God’s will continually and be available for His use.", 
    "I feel that I should take the gospel to people who have different beliefs from me.", 
    "I have an acute awareness of the physical needs of others.", 
    "I am skilled in setting forth positive and precise steps of action.", 
    "I like to meet visitors at church and make them feel welcome.", 
    "I explain Scripture in such a way that others understand it.", 
    "I can usually see spiritual solutions to problems.", 
    "I welcome opportunities to help people who need comfort, consolation, encouragement, and counseling.", 
    "I feel at ease in sharing Christ with nonbelievers.", 
    "I can influence others to perform to their highest God-given potential.", 
    "I recognize the signs of stress and distress in others.", 
    "I desire to give generously and unpretentiously to worthwhile projects and ministries.", 
    "I can organize facts into meaningful relationships.", 
    "God gives me messages to deliver to His people.", 
    "I am able to sense whether people are being honest when they tell of their religious experiences.", 
    "I enjoy presenting the gospel to persons of other cultures and backgrounds.", 
    "I enjoy doing little things that help people.", 
    "I can give a clear, uncomplicated presentation.", 
    "I have been able to apply biblical truth to the specific needs of my church.", 
    "God has used me to encourage others to live Christlike lives.", 
    "I have sensed the need to help other people become more effective in their ministries.", 
    "I like to talk about Jesus to those who do not know Him.", 
    "I have the ability to make strangers feel comfortable in my home.", 
    "I have a wide range of study resources and know how to secure information.", 
    "I feel assured that a situation will change for the glory of God even when the situation seem impossible."
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
let answers = new Array(80).fill(0); // Ensure the array is always 80 in length

const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.option');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const surveyContainer = document.getElementById('survey-container');
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
        nextBtn.textContent = index === 79 ? 'Finish' : 'Next';
        questionContainer.style.opacity = 1;
    }, 300);
}

function calculateScores() {
    const scores = {};
    for (const [gift, questionNumbers] of Object.entries(spiritualGifts)) {
        scores[gift] = questionNumbers.reduce((sum, qNum) => {
            const answer = answers[qNum - 1];
            console.log(`Gift: ${gift}, Question: ${qNum}, Answer: ${answer}`);
            return sum + (Number.isInteger(answer) ? answer : 0);
        }, 0);
    }
    console.log('Final Scores:', scores);
    return scores;
}

function showResults() {
    surveyContainer.style.opacity = 0;
    setTimeout(() => {
        surveyContainer.style.display = 'none';
        resultsContainer.style.display = 'flex';
        setTimeout(() => {
            resultsContainer.style.opacity = 1;
        }, 50);
    }, 300);
    
    const scores = calculateScores();
    console.log('Scores in showResults:', scores);
    
    const ctx = document.getElementById('results-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(scores),
            datasets: [{
                label: 'Spiritual Gifts Scores',
                data: Object.values(scores),
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 25,
                    title: {
                        display: true,
                        text: 'Score'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Spiritual Gifts'
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
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const scores = calculateScores();

    doc.setFontSize(20);
    doc.text('Spiritual Gifts Survey Results', 105, 15, null, null, 'center');

    doc.setFontSize(12);
    let yPos = 30;
    for (const [gift, score] of Object.entries(scores)) {
        doc.text(`${gift}: ${score}`, 20, yPos);
        yPos += 10;
    }

    doc.addPage();
    doc.setFontSize(16);
    doc.text('Your Spiritual Gifts Profile', 105, 15, null, null, 'center');
    doc.addImage(document.getElementById('results-chart').toDataURL(), 'PNG', 15, 30, 180, 100);

    doc.save('spiritual_gifts_survey_results.pdf');
}

showQuestion(currentQuestion);

options.forEach(option => {
    option.addEventListener('click', () => {
        answers[currentQuestion] = parseInt(option.dataset.value);
        console.log(`Question ${currentQuestion + 1} answered: ${answers[currentQuestion]}`);
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
    if (currentQuestion < 79) { // Explicitly check for 80 questions
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        showResults();
    }
});

downloadPdfBtn.addEventListener('click', generatePDF);
