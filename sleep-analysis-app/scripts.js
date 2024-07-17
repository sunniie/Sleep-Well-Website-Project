console.log('scripts.js loaded');


// Cập nhật biến API_BASE_URL ở đầu file
const API_BASE_URL = 'http://192.168.1.32:5000';  // Địa chỉ của Flask server

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const detailedSurveyForm = document.getElementById('detailedSurveyForm');
    if (detailedSurveyForm) {
        console.log('Detailed survey form found');
        detailedSurveyForm.addEventListener('submit', handleDetailedSurveySubmit);
    } else {
        console.error('Detailed survey form not found');
    }
});

function handleDetailedSurveySubmit(event) {
    console.log('scripts.js loaded');
    console.log('Form submission started');
    event.preventDefault();
    const formData = new FormData(event.target);
    const surveyData = Object.fromEntries(formData.entries());
    console.log('Survey data:', surveyData);

    // Gửi yêu cầu để lấy Person ID mới
    console.log('Fetching next person ID');
    fetch(`${API_BASE_URL}/api/next-person-id`)
        .then(response => {
            console.log('Next person ID response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Next person ID data:', data);
            const newPersonId = data.nextPersonId;

            const newDataEntry = {
                'Person ID': newPersonId,
                'Gender': surveyData.gender,
                'Age': parseInt(surveyData.age),
                'Occupation': surveyData.occupation,
                'Sleep Duration': parseFloat(surveyData.sleepDuration),
                'Quality of Sleep': parseInt(surveyData.sleepQuality),
                'Physical Activity Level': parseInt(surveyData.physicalActivity),
                'Stress Level': parseInt(surveyData.stressLevel),
                'BMI Category': surveyData.bmiCategory,
                'Blood Pressure': surveyData.bloodPressure,
                'Heart Rate': parseInt(surveyData.heartRate),
                'Daily Steps': parseInt(surveyData.dailySteps),
                'Sleep Disorder': surveyData.sleepDisorder
            };

            console.log('Submitting survey data:', newDataEntry);
            return fetch(`${API_BASE_URL}/api/survey`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDataEntry),
            });
        })
        .then(response => {
            console.log('Survey submission response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Survey submission successful:', data);
            showNotification('Thank you for completing the detailed survey! Your data has been successfully submitted.');
            setTimeout(() => {
                window.location.href = 'results.html';
            }, 3000);
        })
        .catch((error) => {
            console.error('Error:', error);
            showNotification('An error occurred. Please try again.', 'error');
        });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === '' || currentPage === 'index.html') {
        loadCSVData(createSleepDurationChart);
        typeWelcomeText(); // Add this line
    } else if (currentPage === 'statistics.html') {
        loadCSVData(createStatisticsCharts);
    } else if (currentPage === 'survey.html') {
        document.getElementById('surveyForm').addEventListener('submit', handleSurveySubmit);
    } else if (currentPage === 'results.html') {
        displayResults();
    }
    if (currentPage === 'survey.html') {
        document.getElementById('surveyForm').addEventListener('submit', handleSurveySubmit);
        
        // Add click event listener to the survey image
        const surveyImage = document.getElementById('surveyImage');
        if (surveyImage) {
            surveyImage.addEventListener('click', handleSurveyImageClick);
        }
    }
});

// Effects

function handleSurveyImageClick() {
    const detailedSurvey = document.getElementById('detailedSurvey');
    detailedSurvey.style.display = 'block';
    detailedSurvey.scrollIntoView({ behavior: 'smooth' });
}

function handleScroll() {
    const nav = document.querySelector('nav');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        nav.style.backgroundColor = 'rgba(45, 56, 18, 0.9)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    }
}

window.addEventListener('scroll', handleScroll);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function typeWelcomeText() {
    const welcomeText = "Welcome to SleepWell!!";
    const welcomeElement = document.getElementById('welcome-text');
    welcomeElement.innerHTML = ''; // Clear existing content
    
    welcomeText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        welcomeElement.appendChild(span);
    });

    let i = 0;
    function revealChar() {
        if (i < welcomeText.length) {
            welcomeElement.children[i].classList.add('visible');
            i++;
            setTimeout(revealChar, 100);
        }
    }
    
    revealChar();
}

// Home page chart
function createSleepDurationChart(data) {
    const maleData = data.filter(d => d['Gender'] === 'Male');
    const femaleData = data.filter(d => d['Gender'] === 'Female');
    
    const avgMaleSleep = maleData.reduce((sum, d) => sum + parseFloat(d['Sleep Duration']), 0) / maleData.length;
    const avgFemaleSleep = femaleData.reduce((sum, d) => sum + parseFloat(d['Sleep Duration']), 0) / femaleData.length;

    const ctx = document.getElementById('sleepDurationChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Men', 'Women'],
            datasets: [{
                label: 'Average Sleep Duration (hours)',
                data: [avgMaleSleep, avgFemaleSleep],
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }, {
                label: 'Recommended Sleep Duration (hours)',
                data: [8, 8.5],
                backgroundColor: 'rgba(255, 99, 132, 0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Hours of Sleep'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Gender'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Average vs Recommended Sleep Duration by Gender'
                }
            }
        }
    });
}


window.addEventListener('scroll', handleScroll);
// Statistics page charts
function createStatisticsCharts(data) {
    createSleepQualityChart(data);
    createPhysicalActivityChart(data);
    createStressLevelChart(data);
    createBMICategoryChart(data);
    createSleepDisorderChart(data);
}

function createSleepQualityChart(data) {
    const ctx = document.getElementById('sleepQualityChart').getContext('2d');
    const qualityLevels = [...new Set(data.map(d => d['Quality of Sleep']))].sort((a, b) => a - b);
    const counts = qualityLevels.map(level => data.filter(d => d['Quality of Sleep'] == level).length);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: qualityLevels,
            datasets: [{
                label: 'Number of People',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of People'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Quality of Sleep (1-10)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Distribution of Sleep Quality'
                }
            }
        }
    });
}

function createPhysicalActivityChart(data) {
    const ctx = document.getElementById('physicalActivityChart').getContext('2d');
    const activityLevels = ['Low', 'Medium', 'High'];
    const counts = activityLevels.map(level => data.filter(d => {
        const activity = parseInt(d['Physical Activity Level']);
        if (activity < 30) return level === 'Low';
        if (activity < 60) return level === 'Medium';
        return level === 'High';
    }).length);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: activityLevels,
            datasets: [{
                data: counts,
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribution of Physical Activity Levels'
                }
            }
        }
    });
}

function createStressLevelChart(data) {
    const ctx = document.getElementById('stressLevelChart').getContext('2d');
    const stressLevels = [...new Set(data.map(d => d['Stress Level']))].sort((a, b) => a - b);
    const counts = stressLevels.map(level => data.filter(d => d['Stress Level'] == level).length);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stressLevels,
            datasets: [{
                label: 'Number of People',
                data: counts,
                backgroundColor: 'rgba(255, 159, 64, 0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of People'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Stress Level (1-10)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Distribution of Stress Levels'
                }
            }
        }
    });
}

function createBMICategoryChart(data) {
    const ctx = document.getElementById('bmiCategoryChart').getContext('2d');
    const categories = [...new Set(data.map(d => d['BMI Category']))];
    const counts = categories.map(category => data.filter(d => d['BMI Category'] === category).length);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: counts,
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribution of BMI Categories'
                }
            }
        }
    });
}

function createSleepDisorderChart(data) {
    const ctx = document.getElementById('sleepDisorderChart').getContext('2d');
    const disorders = [...new Set(data.map(d => d['Sleep Disorder']))];
    const counts = disorders.map(disorder => data.filter(d => d['Sleep Disorder'] === disorder).length);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: disorders,
            datasets: [{
                data: counts,
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribution of Sleep Disorders'
                }
            }
        }
    });
}

// Survey form submission
function handleSurveySubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const surveyData = Object.fromEntries(formData.entries());
    
    // Calculate sleep duration
    const bedtime = new Date(`2000-01-01T${surveyData.bedtime}`);
    const wakeupTime = new Date(`2000-01-01T${surveyData.wakeupTime}`);
    if (wakeupTime < bedtime) wakeupTime.setDate(wakeupTime.getDate() + 1);
    const sleepDuration = (wakeupTime - bedtime) / 3600000; // in hours

    surveyData.sleepDuration = sleepDuration.toFixed(2);

    localStorage.setItem('surveyData', JSON.stringify(surveyData));
    window.location.href = 'results.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const detailedSurveyForm = document.getElementById('detailedSurveyForm');
    if (detailedSurveyForm) {
        detailedSurveyForm.addEventListener('submit', handleDetailedSurveySubmit);
    }
});

// Results page
function displayResults() {
    const surveyData = JSON.parse(localStorage.getItem('surveyData'));
    if (surveyData) {
        document.getElementById('bedtime').textContent = surveyData.bedtime;
        document.getElementById('wakeupTime').textContent = surveyData.wakeupTime;
        document.getElementById('sleepDuration').textContent = `${surveyData.sleepDuration} hours`;
        document.getElementById('fatigueLevel').textContent = surveyData.fatigueLevel;
        document.getElementById('eatingHabits').textContent = surveyData.eatingHabits;
        document.getElementById('physicalActivity').textContent = surveyData.physicalActivity;
        document.getElementById('screenTime').textContent = `${surveyData.screenTime} hours`;

        createSleepProfileChart(surveyData);
        displayRecommendations(surveyData);
    } else {
        document.getElementById('resultsContainer').innerHTML = '<p>No survey data found. Please complete the survey first.</p>';
    }
}


function createSleepProfileChart(surveyData) {
    const ctx = document.getElementById('sleepProfileChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Sleep Duration', 'Fatigue Level', 'Eating Habits', 'Physical Activity', 'Screen Time'],
            datasets: [{
                label: 'Your Profile',
                data: [
                    calculateScore(surveyData.sleepDuration, 7, 9),
                    calculateScore(surveyData.fatigueLevel, 'low', 'high', true),
                    calculateScore(surveyData.eatingHabits, 'healthy', 'unhealthy', true),
                    calculateScore(surveyData.physicalActivity, 'daily', 'rarely', true),
                    calculateScore(surveyData.screenTime, 0, 4, true)
                ],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
            }, {
                label: 'Ideal Profile',
                data: [10, 10, 10, 10, 10],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            }
        }
    });
}

function calculateScore(value, min, max, isReverse = false) {
    if (typeof value === 'string') {
        const scoreMap = {[min]: isReverse ? 10 : 0, [max]: isReverse ? 0 : 10};
        return scoreMap[value] || 5;
    } else {
        value = parseFloat(value);
        if (isReverse) [min, max] = [max, min];
        return Math.max(0, Math.min(10, ((value - min) / (max - min)) * 10));
    }
}

function displayRecommendations(surveyData) {
    const recommendations = [];

    if (surveyData.sleepDuration < 7) {
        recommendations.push("Try to increase your sleep time. Aim for 7-9 hours of sleep each night.");
    }
    if (surveyData.fatigueLevel === 'high') {
        recommendations.push("Your fatigue level is high. Consider adjusting your sleep schedule and improving sleep quality.");
    }
    if (surveyData.eatingHabits === 'unhealthy') {
        recommendations.push("Improve your diet by adding more fruits, vegetables and whole grains. A balanced diet can contribute to improved sleep.");
    }
    if (surveyData.physicalActivity === 'rarely') {
        recommendations.push("Increase physical activity. Try to get at least 30 minutes of moderate exercise every day, but not too close to bedtime.");
    }
    if (surveyData.screenTime > 2) {
        recommendations.push("Reduce screen time before bed. Try to avoid using electronic devices at least an hour before bed to improve sleep quality.");
    }

    const recommendationsList = document.getElementById('recommendations');
    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });
}

// Add this function at the beginning of your script
function logError(message, error) {
    console.error(message, error);
    // You can also display this error on the page if needed
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.textContent = `Error: ${message}. Check console for details.`;
    document.body.insertBefore(errorDiv, document.body.firstChild);
}

// Modify the loadCSVData function
function loadCSVData(callback) {
    fetch('http://localhost:5000/api/data')
        .then(response => response.json())
        .then(data => {
            console.log('Data loaded successfully:', data[0]);
            callback(data);
        })
        .catch(error => {
            logError('Error loading data', error);
        });
}

//Get Data

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#f44336';
        notification.style.color = 'white';
    }

    document.body.appendChild(notification);

    // Xóa thông báo sau 3 giây
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

//http://localhost:8080
//http-server -c-1