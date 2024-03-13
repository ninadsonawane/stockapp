// Fetch data for each time interval (1 day, 1 week, 1 year, 5 years, 10 years) from an API
// You need to replace the API_URL with the actual API endpoint for fetching stock data
const API_URL = 'https://groww.in/';

// Function to fetch stock data from the API
async function fetchStockData(timeInterval) {
    const response = await fetch(${API_URL}?interval=${timeInterval});
    const data = await response.json();
    return data;
}

// Function to render a graph using Chart.js
function renderGraph(canvasId, labels, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }]
            }
        }
    });
}

// Function to initialize the graphs
function initGraphs() {
    // Fetch data for each time interval and render the corresponding graph
    fetchStockData('1d')
        .then(data => {
            const labels = data.map(item => item.date);
            const prices = data.map(item => item.price);
            renderGraph('graph-1day', labels, prices);
        });

    fetchStockData('1w')
        .then(data => {
            const labels = data.map(item => item.date);
            const prices = data.map(item => item.price);
            renderGraph('graph-1week', labels, prices);
        });

    fetchStockData('1y')
        .then(data => {
            const labels = data.map(item => item.date);
            const prices = data.map(item => item.price);
            renderGraph('graph-1year', labels, prices);
        });

    fetchStockData('5y')
        .then(data => {
            const labels = data.map(item => item.date);
            const prices = data.map(item => item.price);
            renderGraph('graph-5years', labels, prices);
        });

    fetchStockData('10y')
        .then(data => {
            const labels = data.map(item => item.date);
            const prices = data.map(item => item.price);
            renderGraph('graph-10years', labels, prices);
        });
}

// Call the function to initialize the graphs when the page is loaded
document.addEventListener('DOMContentLoaded', initGraphs);