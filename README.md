Welcome to my app! 
It consists of three screens:
- A login screen where you can input your name
<img width="471" alt="image" src="https://user-images.githubusercontent.com/42392321/185258697-5bee0c7f-03cc-4f55-8921-d2f8625de491.png">
- A crypto list screen where you can see the first 50 cryptocurrencies provided by the CoinLore API, and filter them by their 24hr % variation
 <img width="475" alt="image" src="https://user-images.githubusercontent.com/42392321/185258775-dab202e7-9ac2-46ed-a911-808f1340e8c1.png">
- A crypto chart which shows you the coin value in USD in a chart, with 5 automatic updates that happen every 30 seconds
 <img width="477" alt="image" src="https://user-images.githubusercontent.com/42392321/185258954-76a2fd1a-fd50-41fa-9cff-b7f273e78b06.png">

All the app's state is managed with a modern implementation of redux-toolkit and the navigation is accomplished with react-navigation

Some possible improvements that were left out due to time constraints are:
- Implementing of TypesCript
- Implementing I18N for react native, to make all texts dynamic and locale dependant (instead of string literals)
