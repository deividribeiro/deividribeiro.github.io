---
layout: post
title: Regression Analysis
date: 2025-08-04
categories: [blog, technology]
excerpt: Predicting Bottle Feeding with Regression Models
---

After collecting a good amount of baby feeding data, I wanted to take the next step: build a predictive model. The idea was simple—could I predict either the **amount of milk in the next bottle** or the **time until the next bottle**? If the model worked well, it might offer a useful tool for planning daily routines.

Here’s the process I followed:

1. **Data preparation.** I split the bottle data into the right format, carefully enforcing time and numerical fields so that the models had clean inputs.
2. **Feature engineering.** I calculated moving averages, rolling windows, and extracted calendar-based features such as day of week and hour of day.
3. **Model experimentation.** I tried several regression models to see which one could capture the patterns best.
4. **Data splitting.** I divided the dataset into training, testing, and validation sets.
5. **Pipelines.** I created a training pipeline that automatically fit all the models and returned the best performer.
6. **Evaluation.** I built analysis plots and ran predictions to evaluate how well the models worked.


My strategy was to use two separate models:

* One model predicted the amount of milk in the next bottle (in milliliters).
* The other model predicted the time until the next bottle (in minutes).

Both were regression models, trained independently.

<figure style="text-align: center;">
    <img src="/assets/images/bottle_feature_importance_0.png"
        alt="Feature Importance" width="100%">
<img src="/assets/images/bottle_feature_importance_1.png"
        alt="Feature Importance" width="100%">
    <figcaption style="text-align: center;"><i> Feature importance plot showing which variables most influenced bottle predictions. </i></figcaption>
</figure>
<br>  

The results, however, were mixed. The fit wasn’t great. Predictions varied wildly—from nearly 0 to 12 hours between bottles. I experimented with ensemble models, cross-validation, and even a walk-forward validation strategy designed for time series data. While these helped improve stability a bit, the core problem remained.

The main challenge is that the two variables—amount and timing—are not independent. A baby who drinks a large bottle may wait longer for the next one, and vice versa. Modeling them separately breaks the relationship. On top of that, feeding data has a trend-like structure (gradual growth, then eventual decline), which makes single-event predictions harder. Moving differences and detrending helped somewhat, but at the cost of losing valuable data points.

<figure style="text-align: center;">
    <img src="/assets/images/bottle_prediction.png"
        alt="Prediction vs Actual" width="100%">
    <figcaption style="text-align: center;"><i> Predictions versus actual bottle feeding intervals and amounts. Large variance highlights model instability. </i></figcaption>
</figure>
<br>  
<figure style="text-align: center;">
    <img src="/assets/images/bottle_feeding_schedule.png"
        alt="Prediction vs Actual" width="100%">
    <figcaption style="text-align: center;"><i> Forecast for next 5 feeding events, with time and amount. Clear issues (about 6 hours difference?) </i></figcaption>
</figure>
<br>  

Ultimately, I hit a fundamental limitation: the dataset is too small. A few hundred points is rarely enough to train robust regression models, especially when the underlying process is complex and coupled.

The lesson here is that this problem is really a time series challenge. Bottles follow daily rhythms, short-term fluctuations, and long-term trends. Treating them as independent regression tasks misses that structure. Next, I’ll try vanilla time series methods.

<figure style="text-align: center;">
    <img src="/assets/images/total_daily_feeding.png"
        alt="Time Series" width="100%">
    <figcaption style="text-align: center;"><i> Time series view of bottle amounts across days, showing trend and variability. </i></figcaption>
</figure>
<br>  

Even though the first attempt wasn’t perfect, it was a valuable experiment. It clarified what makes feeding data hard to model and highlighted the importance of choosing the right tool for the problem. 
