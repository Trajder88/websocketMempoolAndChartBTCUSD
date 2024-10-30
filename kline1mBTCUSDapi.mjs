import WebSocket from 'ws';
import fs from 'fs';

const socket = new WebSocket('wss://stream.binance.com:443/ws/btcusdt@kline_1m');

let aggregatedCandlesticks = [];

function processData(data) {
  try {
    const timestamp = data.k.t;
    const open = parseFloat(data.k.o);
    const high = parseFloat(data.k.h);
    const low = parseFloat(data.k.l);
    const close = parseFloat(data.k.c);

    return { timestamp, open, high, low, close };
  } catch (error) {
    console.error('Error processing data:', error);
    return null;
  }
}

function aggregateCandlestick(data) {
  const aggregatedCandlestick = {
    timestamp: data.timestamp,
    open: data.open,
    high: data.high,
    low: data.low,
    close: data.close,
  };

  aggregatedCandlesticks.push(aggregatedCandlestick);

  
}

function appendDataToFile(filename, data) {
  let existingData = [];

  // Check if the file exists and read its contents
  if (fs.existsSync(filename)) {
    const fileContents = fs.readFileSync(filename, 'utf-8');

    try {
      // Attempt to parse the file contents as JSON
      existingData = JSON.parse(fileContents);

      // Ensure existingData is an array
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
    } catch (error) {
      console.error('Error parsing existing data:', error);
    }
  }

  // Append the new data to the existing data
  existingData.push(data);

  // Write the updated data to the file
  fs.writeFileSync(filename, JSON.stringify(existingData, null, 2));
  console.log('Data appended to', filename);
}



function subscribeToCandlesticks(callback) {
  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const processedData = processData(data);

    if (processedData) {
      // Check if it's within the same minute
      if (aggregatedCandlesticks.length > 0 && processedData.timestamp === aggregatedCandlesticks[aggregatedCandlesticks.length - 1].timestamp) {
        aggregateCandlestick(processedData);
      } else {
        // Send aggregated data from the previous minute
        if (aggregatedCandlesticks.length > 0) {
          // Zapisz dane do pliku po zaktualizowaniu
          appendDataToFile('candlestick_data.json', aggregatedCandlesticks[aggregatedCandlesticks.length - 1]);
          callback(aggregatedCandlesticks[aggregatedCandlesticks.length - 1]);
        }

        // Start aggregation for the new minute
        aggregatedCandlesticks = [processedData];
      }
    }
  };
}

export { subscribeToCandlesticks };
