document.addEventListener("DOMContentLoaded", function() {
    fetch('fullcontact.json')
        .then(response => response.json())
        .then(data => {
            data = shuffleArray(data);
            data.sort((a, b) => {
                return (Object.values(b).filter(item => item).length - Object.values(a).filter(item => item).length)
            });
            populateTable(data);
            const nameSearchInput = document.getElementById('nameSearch');
            const tickerSearchInput = document.getElementById('tickerSearch');
            nameSearchInput.addEventListener('keyup', function() {
                let nameFilter = this.value.toUpperCase();
                let filteredData;
                if (nameFilter) {
                    filteredData = data.filter(pool => pool.name.toUpperCase().includes(nameFilter));
                    filteredData.sort((a, b) => {
                        return (Object.values(b).filter(item => item).length - Object.values(a).filter(item => item).length)
                    });
                } else {
                    filteredData = data;
                }
                populateTable(filteredData);
            });
            tickerSearchInput.addEventListener('keyup', function() {
                let tickerFilter = this.value.toUpperCase();
                let filteredData;
                if (tickerFilter) {
                    filteredData = data.filter(pool => pool.ticker.toUpperCase().includes(tickerFilter));
                    filteredData.sort((a, b) => {
                        return (Object.values(b).filter(item => item).length - Object.values(a).filter(item => item).length)
                    });
                } else {
                    filteredData = data;
                }
                populateTable(filteredData);
            });
        });
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function populateTable(data) {
    const table = document.getElementById('results');
    table.innerHTML = '';
    const header = table.createTHead();
    const headerRow = header.insertRow();
    const columns = ['Name', 'Ticker', 'Homepage', 'Twitter', 'Discord', 'Telegram'];
    columns.forEach(header =>
        headerRow.appendChild(document.createElement('th')).textContent = header
    );

    data.forEach(pool => {
        const row = table.insertRow();
        [pool.name, pool.ticker, pool.homepage, pool.twitter, pool.discord, pool.telegram].forEach((item, index) => {
            const cell = row.insertCell();
            if(index >= 2 && item) { // For homepage and social media links
                const anchor = document.createElement('a');
                anchor.href = item;
                anchor.target = '_blank'; // Opens link in a new window or tab
                if (index === 2) {
                    anchor.text = item.length > 30 ? item.substring(0, 27) + '...' : item;
                } else {
                    anchor.text = columns[index];
                }
                cell.appendChild(anchor);
            } else {
                cell.textContent = item || '';
            }
        });
    });
}
