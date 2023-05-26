fetch('wls.txt')
    .then(response => response.text())
    .then(text => {
        // Split the text by newlines to get an array
        const lines = text.split('\n');
        
        // Filter out any empty lines
        const filteredLines = lines.filter(line => line.trim().length > 0);

        // Assign the array to the constant
        window.wls = filteredLines;
        
        console.log(window.wls);
    })
    .catch(error => console.log('Error:', error));
