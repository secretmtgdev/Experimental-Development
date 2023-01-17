(function() {
    const HOSTNAME = '127.0.0.1';
    const PORT = 3000;
    function getWeight() {
        fetch(`http://${HOSTNAME}:${PORT}/weight_data`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            const graphContainer = document.querySelector('#graph-container');
            for(const month in data) {
                let bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${data[month]}px`;
                graphContainer.appendChild(bar);
            }
        })
        .catch(err => console.log(`Error found: ${err}`));
    }

    getWeight();
})();