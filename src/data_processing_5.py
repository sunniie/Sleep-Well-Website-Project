import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from sklearn.linear_model import LinearRegression
import pandas as pd
'''
Phân tích Hồi Quy:
a) Hai biến đã xác định:
X (Chất lượng giấc ngủ)
Y (Mức độ căng thẳng)
'''

# Load the dataset to see the first few rows and the column names
data_path = "Sleep_health_and_lifestyle_dataset.csv"
data = pd.read_csv(data_path)
data.head(), data.columns


# Step (b): Plotting the scatter plot for Quality of Sleep vs. Stress Level
plt.figure(figsize=(8, 5))
sns.scatterplot(x=data['Quality of Sleep'], y=data['Stress Level'], color='red')
plt.title('Scatter Plot of Quality of Sleep vs. Stress Level')
plt.xlabel('Quality of Sleep')
plt.ylabel('Stress Level')
plt.grid(True)
plt.show()

# Step (c): Calculating the Pearson correlation coefficient
correlation_coefficient_sleep_stress = np.corrcoef(data['Quality of Sleep'], data['Stress Level'])[0, 1]
correlation_coefficient_sleep_stress 

# Step (d): Creating a linear regression model for Quality of Sleep and Stress Level
X_sleep = data['Quality of Sleep'].values.reshape(-1, 1)  # Reshape for sklearn
Y_stress = data['Stress Level'].values

# Creating the linear regression model
regression_model_sleep_stress = LinearRegression()
regression_model_sleep_stress.fit(X_sleep, Y_stress)

# Getting the regression equation coefficients
intercept_sleep_stress = regression_model_sleep_stress.intercept_
slope_sleep_stress = regression_model_sleep_stress.coef_[0]

# Display the regression equation and the correlation coefficient
regression_equation_sleep_stress = f"Estimated Regression Equation: Y = {intercept_sleep_stress:.2f} + {slope_sleep_stress:.2f} * X"
print("Correlation coefficient:", correlation_coefficient_sleep_stress)
print("Regression Equation:", regression_equation_sleep_stress)
