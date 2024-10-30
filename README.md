**Real-Time BTC to USD Converter**

This project provides a real-time BTC to USD conversion using WebSocket data from the Binance API. It includes a simple interface for entering BTC values and instantly seeing corresponding USD values based on the current exchange rate. Additionally, it integrates data from mempool.space, displaying information about blockchain blocks, transactions, and recommended transaction fees.
Features
Real-Time BTC to USD Conversion: Updated using Binance's WebSocket API.
Mempool Information: Displays real-time blockchain data, including blocks, transactions, and recommended fees.
Simple Interface: Users can input BTC values and view live USD conversions.

Requirements

    Node.js
    NPM

Installation
Clone this repository:

bash: 

    git clone https://github.com/Trajder88/websocketMempoolAndChartBTCUSD.git

Navigate to the project directory:

bash: 

    cd your-repo-name

Install the necessary packages:

bash: 

    npm install express ws

Usage
Start the application:

bash: 

    node app

Open your browser and navigate to http://localhost:8000 to access the BTC to USD converter interface.

Additional Notes

Ensure you have a stable internet connection for live data updates from Binance and mempool.space.
This project uses the Binance WebSocket API for real-time price data, so WebSocket support is essential.
