import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns

# Đọc dữ liệu từ file CSV
file_path = r"D:\Học tập\Kì 3\MAS291\Final-Project\data\raw\Sleep_health_and_lifestyle_dataset.csv"
data = pd.read_csv(file_path)

# Chọn biến "Sleep Disorder"
sleep_disorder = data['Sleep Disorder'].dropna()

# Tính tỷ lệ mẫu
n = len(data)
x = sleep_disorder.count()  # Số người bị rối loạn giấc ngủ
p_hat = x / n
p = 0.20  # Tỷ lệ giả thuyết

# Thực hiện kiểm định z
z_statistic = (p_hat - p) / np.sqrt(p * (1 - p) / n)
p_value = 2 * (1 - stats.norm.cdf(abs(z_statistic)))

# Tính khoảng tin cậy
alpha = 0.05
z_critical = stats.norm.ppf(1 - alpha/2)
margin_of_error = z_critical * np.sqrt(p_hat * (1 - p_hat) / n)
confidence_interval = (p_hat - margin_of_error, p_hat + margin_of_error)

print(f"Sample proportion (p̂): {p_hat}")
print(f"Z-statistic: {z_statistic}")
print(f"P-value: {p_value}")
print(f"Confidence Interval: {confidence_interval}")

# Visualization
plt.figure(figsize=(12, 6))

# Biểu đồ tròn tỷ lệ người bị rối loạn giấc ngủ
labels = ['Disorder', 'No Disorder']
sizes = [x, n - x]
colors = ['#ff9999','#66b3ff']
explode = (0.1, 0)

plt.subplot(1, 2, 1)
plt.pie(sizes, explode=explode, labels=labels, colors=colors,
        autopct='%1.1f%%', shadow=True, startangle=140)
plt.title('Proportion of Sleep Disorder')

# Biểu đồ khoảng tin cậy cho tỷ lệ người bị rối loạn giấc ngủ
plt.subplot(1, 2, 2)
sns.barplot(x=['Proportion'], y=[p_hat], yerr=[margin_of_error], capsize=0.1)
plt.axhline(p, color='r', linestyle='--', label='Hypothesized Proportion (0.20)')
plt.title('Confidence Interval for Proportion of Sleep Disorder')
plt.ylabel('Proportion')
plt.ylim(0, max(p_hat + margin_of_error, p) + 0.05)
plt.legend()

plt.tight_layout()
plt.show()
