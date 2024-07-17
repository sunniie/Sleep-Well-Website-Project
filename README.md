# Sleep Well Website Project
# Sleep Health and Lifestyle Analysis Web App

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Statistical Analysis](#statistical-analysis)
7. [Web Application Details](#web-application-details)
8. [Data Source](#data-source)
9. [Technologies Used](#technologies-used)
10. [Future Improvements](#future-improvements)
11. [Contributing](#contributing)
12. [License](#license)

## Project Overview

This web application analyzes sleep health and lifestyle data, providing insights and personalized recommendations. It combines statistical analysis of a Kaggle dataset with an interactive web interface, allowing users to explore sleep-related statistics and input their own sleep habits data.

## Features

- Interactive data visualization of sleep health statistics
- User survey for collecting individual sleep and lifestyle data
- Personalized sleep health recommendations based on user input
- Responsive design for desktop and mobile devices
- Server-side data processing and analysis
- Client-side dynamic chart generation

## Project Structure

- `app.py`: Flask server handling API requests and data processing
- `index.html`: Home page introducing the project
- `statistics.html`: Page displaying statistical charts and graphs
- `survey.html`: Page with the sleep habits survey form
- `results.html`: Page showing personalized results based on survey responses
- `scripts.js`: Client-side logic and chart creation
- `styles.css`: Styling for the web pages
- `Sleep_health_and_lifestyle_dataset.csv`: Dataset used for analysis
- `report/`: Folder containing project documentation
  - `presentation.pdf`: Project presentation slides
  - `report.tex`: LaTeX source for the detailed project report

## Installation

1. Ensure you have Python 3.7+ installed on your system.
2. Clone this repository:
   ```
   git clone https://github.com/your-username/sleep-health-analysis.git
   cd sleep-health-analysis
   ```
3. Install required Python packages:
   ```
   pip install flask flask-cors pandas
   ```
4. Install Node.js and npm (for running http-server)

## Running the Application

1. Start the Flask server:
   ```
   python app.py
   ```
2. In a new terminal, start the http-server:
   ```
   npx http-server -c-1
   ```
3. Open a web browser and navigate to `http://localhost:8080`

## Statistical Analysis

The project performs the following statistical analyses:

1. Hypothesis testing and confidence interval construction for:
   - Population mean
   - Population proportion
   - Difference in means of two populations
   - Difference in proportions of two populations

2. Regression analysis:
   - Scatter plot creation
   - Correlation coefficient computation
   - Regression line estimation and future value prediction

## Web Application Details

### Home Page (index.html)
- Introduces the project with an animated welcome message
- Displays a chart showing average sleep duration by gender
- Provides general sleep duration recommendations

### Statistics Page (statistics.html)
- Visualizes various aspects of sleep health data:
  - Sleep quality distribution
  - Physical activity levels
  - Stress level distribution
  - BMI category distribution
  - Sleep disorder prevalence

### Survey Page (survey.html)
- Collects user data on sleep habits and lifestyle
- Includes both a basic and a detailed survey option
- Uses a custom-designed background image

### Results Page (results.html)
- Displays personalized results based on survey responses
- Shows a radar chart comparing user's profile to an ideal sleep profile
- Provides tailored recommendations for improving sleep health

## Data Source

The project uses the "Sleep Health and Lifestyle Dataset" from Kaggle. This dataset includes various sleep-related metrics such as sleep duration, quality of sleep, physical activity level, stress level, BMI category, blood pressure, heart rate, daily steps, and sleep disorder.

## Technologies Used

- Backend: Python, Flask, pandas
- Frontend: HTML5, CSS3, JavaScript
- Data Visualization: Chart.js
- API: RESTful API using Flask
- Deployment: Local deployment using http-server

## Future Improvements

- Implement user authentication for saving and tracking progress
- Add more advanced statistical analyses (e.g., multivariate regression)
- Integrate machine learning models for predictive analysis
- Improve mobile responsiveness and add PWA capabilities
- Implement data caching for improved performance

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

No License

---

This project was developed as part of MAS291 at FPT University.

For any questions or feedback, please contact Mr.Vinh (Leader of Project) at vinhle392004@gmail.com.
