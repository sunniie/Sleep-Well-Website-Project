import pandas as pd
import numpy as np
from scipy.stats import norm
import matplotlib.pyplot as plt

# Load the dataset
file_path = r"D:\Học tập\Kì 3\MAS291\Final-Project\data\raw\Sleep_health_and_lifestyle_dataset.csv"
data = pd.read_csv(file_path)

# Check the unique values in 'Sleep Disorder' and 'BMI Category' to ensure there are no typos or unexpected values
print(data['Sleep Disorder'].unique())
print(data['BMI Category'].unique())

# Define the groups
normal_group = data[data['BMI Category'].isin(['Normal', 'Normal Weight'])]
overweight_group = data[data['BMI Category'] == 'Overweight']

# Calculate proportions of people with sleep disorders in each group
normal_sleep_disorder_count = normal_group['Sleep Disorder'].notna().sum()
overweight_sleep_disorder_count = overweight_group['Sleep Disorder'].notna().sum()

normal_group_count = len(normal_group)
overweight_group_count = len(overweight_group)

# Proportions
normal_sleep_disorder_prop = normal_sleep_disorder_count / normal_group_count if normal_group_count != 0 else 0
overweight_sleep_disorder_prop = overweight_sleep_disorder_count / overweight_group_count if overweight_group_count != 0 else 0

print(f"Proportion of people with sleep disorders in the normal group: {normal_sleep_disorder_prop:.2%}")
print(f"Proportion of people with sleep disorders in the overweight group: {overweight_sleep_disorder_prop:.2%}")

# Sample sizes
n_normal = len(normal_group)
n_overweight = len(overweight_group)

# Standard error of the difference in proportions
pooled_prop = (normal_sleep_disorder_count + overweight_sleep_disorder_count) / (n_normal + n_overweight)
standard_error = np.sqrt(pooled_prop * (1 - pooled_prop) * (1/n_normal + 1/n_overweight))

# Confidence interval calculation
z_score = norm.ppf(0.975)  # for 95% confidence interval
diff_prop = overweight_sleep_disorder_prop - normal_sleep_disorder_prop
confidence_interval = (diff_prop - z_score * standard_error, diff_prop + z_score * standard_error)

print(f"Difference in proportions: {diff_prop:.2%}")
print(f"95% confidence interval: ({confidence_interval[0]:.2%}, {confidence_interval[1]:.2%})")

# Data for visualization
categories = ['Normal Group', 'Overweight Group']
proportions = [normal_sleep_disorder_prop, overweight_sleep_disorder_prop]

# Create bar plot
plt.figure(figsize=(10, 6))
bars = plt.bar(categories, proportions, color=['blue', 'orange'])

# Add text annotations
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width() / 2.0, height, f'{height:.2%}', ha='center', va='bottom', fontsize=12)

# Title and labels
plt.title('Proportion of People with Sleep Disorders by BMI Category', fontsize=16)
plt.xlabel('BMI Category', fontsize=14)
plt.ylabel('Proportion with Sleep Disorders', fontsize=14)
plt.ylim(0, 1)

# Display plot
plt.show()

# Visualization of the confidence interval for the difference in proportions
plt.figure(figsize=(10, 6))
plt.errorbar(
    x=["Difference in Proportions"],
    y=[diff_prop],
    yerr=[z_score * standard_error],
    fmt='o',
    color='red',
    ecolor='black',
    elinewidth=2,
    capsize=4
)

plt.title("95% Confidence Interval for the Difference in Proportions", fontsize=16)
plt.ylabel("Difference in Proportions", fontsize=14)
plt.ylim(0, 1)
plt.grid(True)

# Annotate the confidence interval
plt.text(0, diff_prop, f'{diff_prop:.2%}', ha='center', va='bottom', fontsize=12)
plt.text(0, confidence_interval[0], f'{confidence_interval[0]:.2%}', ha='center', va='top', fontsize=12, color='green')
plt.text(0, confidence_interval[1], f'{confidence_interval[1]:.2%}', ha='center', va='bottom', fontsize=12, color='green')

# Display the confidence interval plot
plt.show()
