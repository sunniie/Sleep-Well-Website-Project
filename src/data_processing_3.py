import pandas as pd
from scipy import stats
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Đọc dữ liệu từ file CSV
file_path = r"D:\Học tập\Kì 3\MAS291\Final-Project\data\raw\Sleep_health_and_lifestyle_dataset.csv"
data = pd.read_csv(file_path)

# Lọc dữ liệu theo giới tính
sleep_duration_male = data[data['Gender'] == 'Male']['Sleep Duration'].dropna()
sleep_duration_female = data[data['Gender'] == 'Female']['Sleep Duration'].dropna()

# Kiểm định t-test cho hai mẫu độc lập
t_statistic, p_value = stats.ttest_ind(sleep_duration_male, sleep_duration_female)

print(f"T-statistic: {t_statistic}")
print(f"P-value: {p_value}")

# Tính trung bình và độ lệch chuẩn của hai nhóm
mean_sleep_duration_male = np.mean(sleep_duration_male)
std_sleep_duration_male = np.std(sleep_duration_male, ddof=1)
n_male = len(sleep_duration_male)

mean_sleep_duration_female = np.mean(sleep_duration_female)
std_sleep_duration_female = np.std(sleep_duration_female, ddof=1)
n_female = len(sleep_duration_female)

# Tính độ lệch chuẩn của sự khác biệt giữa hai trung bình
std_diff = np.sqrt((std_sleep_duration_male**2 / n_male) + (std_sleep_duration_female**2 / n_female))

# Tính khoảng tin cậy cho sự khác biệt giữa hai trung bình
alpha = 0.05
df = min(n_male, n_female) - 1
t_critical = stats.t.ppf(1 - alpha/2, df)

mean_diff = mean_sleep_duration_male - mean_sleep_duration_female
confidence_interval = (mean_diff - t_critical * std_diff, mean_diff + t_critical * std_diff)

print(f"Mean Difference: {mean_diff}")
print(f"Confidence Interval: {confidence_interval}")

# Visualization
plt.figure(figsize=(14, 6))

# Boxplot để so sánh trung bình số giờ ngủ hàng ngày giữa nam và nữ
plt.subplot(1, 2, 1)
sns.boxplot(x='Gender', y='Sleep Duration', data=data)
plt.title('Boxplot of Sleep Duration by Gender')
plt.xlabel('Gender')
plt.ylabel('Sleep Duration (hours)')

# Plot cho khoảng tin cậy của sự khác biệt giữa hai trung bình
plt.subplot(1, 2, 2)
sns.pointplot(x=['Difference'], y=[mean_diff], capsize=.1)
plt.errorbar(x=['Difference'], y=[mean_diff], yerr=[[mean_diff - confidence_interval[0]], [confidence_interval[1] - mean_diff]], fmt='o', color='red')
plt.axhline(0, color='grey', linestyle='--')
plt.title('Confidence Interval for Difference in Mean Sleep Duration')
plt.ylabel('Difference in Sleep Duration (hours)')

plt.tight_layout()
plt.show()
