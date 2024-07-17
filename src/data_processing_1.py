import pandas as pd
from scipy import stats
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Đọc dữ liệu từ file CSV
file_path = r"D:\Học tập\Kì 3\MAS291\Final-Project\data\raw\Sleep_health_and_lifestyle_dataset.csv"
data = pd.read_csv(file_path)

# Hiển thị thông tin tổng quan về dữ liệu
print(data.info())
print(data.head())

# Chọn biến "Sleep Duration"
sleep_duration = data['Sleep Duration'].dropna()

# Giả thuyết trung bình cần kiểm định
mu = 8

# Thực hiện kiểm định t
t_statistic, p_value = stats.ttest_1samp(sleep_duration, mu)

print(f"T-statistic: {t_statistic}")
print(f"P-value: {p_value}")

# Tính trung bình mẫu và độ lệch chuẩn mẫu
mean_sleep_duration = np.mean(sleep_duration)
std_sleep_duration = np.std(sleep_duration, ddof=1)

# Kích thước mẫu
n = len(sleep_duration)

# Mức ý nghĩa
alpha = 0.05

# Tính khoảng tin cậy
confidence_interval = stats.t.interval(
    1 - alpha,
    df=n-1,
    loc=mean_sleep_duration,
    scale=std_sleep_duration/np.sqrt(n)
)

print(f"Mean Sleep Duration: {mean_sleep_duration}")
print(f"Confidence Interval: {confidence_interval}")

# Visualization
plt.figure(figsize=(12, 6))

# Histogram với đường giả thuyết trung bình
plt.subplot(1, 2, 1)
sns.histplot(sleep_duration, kde=True)
plt.axvline(mean_sleep_duration, color='r', linestyle='--', label=f'Mean: {mean_sleep_duration:.2f}')
plt.axvline(mu, color='b', linestyle='--', label=f'Hypothesis Mean: {mu}')
plt.title('Distribution of Sleep Duration')
plt.xlabel('Sleep Duration (hours)')
plt.ylabel('Frequency')
plt.legend()

# Box plot cho khoảng tin cậy
plt.subplot(1, 2, 2)
sns.boxplot(y=sleep_duration)
plt.axhline(mean_sleep_duration, color='r', linestyle='--', label=f'Mean: {mean_sleep_duration:.2f}')
plt.axhline(confidence_interval[0], color='g', linestyle='--', label=f'CI Lower: {confidence_interval[0]:.2f}')
plt.axhline(confidence_interval[1], color='b', linestyle='--', label=f'CI Upper: {confidence_interval[1]:.2f}')
plt.title('Confidence Interval for Mean Sleep Duration')
plt.ylabel('Sleep Duration (hours)')
plt.legend()
plt.grid(True, axis='y')

plt.tight_layout()
plt.show()
