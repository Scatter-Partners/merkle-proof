fetch('wls.txt')
    .then(response => response.text())
    .then(text => {
        // Determine which line break character is used
        const lineBreak = text.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

        const lines = text.split(lineBreak);
        const filteredLines = lines.filter(line => line.trim().length > 0);

        window.wls = filteredLines;
        window.dispatchEvent(new CustomEvent('wlsReady'));
		
		document.getElementById('getDataBtn').disabled = false;
    })
    .catch(error => console.log('Error:', error));
