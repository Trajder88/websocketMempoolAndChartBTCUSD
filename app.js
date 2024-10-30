const express = require('express');
const app = express();
const path = require('path');  // Importuj moduł path
const fs = require('fs');  // Importuj moduł fs (file system)

let processedCandlesticks = [];

// Wczytaj dane z pliku JSON
const candlestickDataPath = path.join(__dirname, 'candlestick_data.json');

try {
  const data = fs.readFileSync(candlestickDataPath);
  processedCandlesticks = JSON.parse(data);
} catch (error) {
  console.error('Error reading candlestick data:', error);
}

// Użyj dynamicznego importu dla modułu ES6
const kline1mBTCUSDapiPromise = import("./kline1mBTCUSDapi.mjs");

kline1mBTCUSDapiPromise.then((kline1mBTCUSDapi) => {
  kline1mBTCUSDapi.subscribeToCandlesticks((chartData) => {
    processedCandlesticks.push(chartData);
  });
});

// Wskazuje katalog, który ma być serwowany jako statyczny (ten, który zawiera plik index.html)
app.use(express.static(path.join(__dirname, 'index')));

// Obsługa dostępu do strony głównej
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.get('/history', (req, res) => {
  try {
    res.json(processedCandlesticks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

app.get('/chart', (req, res) => {
  res.sendFile(path.join(__dirname, 'chart.html'));
});

app.get('/fee', (req, res) => {
  res.sendFile(path.join(__dirname, 'fee.html'));
});

// app.get('/rekomendacjaFee', (req, res) => {
//   res.sendFile(path.join(__dirname, 'rekomendacjaFee.html'));
// });



const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
