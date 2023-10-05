// Wait for the content of the document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Grab references to the hour, minute, and second hands
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    // Define a function to set the positions of the clock hands
    function setClock() {
        // Get the current date and time
        const currentDate = new Date();
        
        // Calculate the ratio of the seconds, minutes, and hours passed 
        // (e.g., 30 seconds = 0.5 ratio, 30 minutes = 0.5 ratio, 6 hours = 0.5 ratio)
        const secondsRatio = currentDate.getSeconds() / 60;
        const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
        const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

        // Set the rotation of the hands based on the calculated ratios
        setRotation(secondHand, secondsRatio);
        setRotation(minuteHand, minutesRatio);
        setRotation(hourHand, hoursRatio);
    }

    // Define a function to set the rotation of a given element based on the provided ratio
    function setRotation(element, rotationRatio) {
        // Update the CSS variable '--rotation' with the calculated degree value (for potential CSS use)
        element.style.setProperty('--rotation', rotationRatio * 360);
        
        // Rotate the element by the calculated degree value (+90 to start from the top)
        element.style.transform = `rotate(${rotationRatio * 360 + 90}deg)`;
    }

    // Initially set the clock hands to the correct position
    setClock();

    // Update the position of the clock hands every second (1000ms)
    setInterval(setClock, 1000);
});
