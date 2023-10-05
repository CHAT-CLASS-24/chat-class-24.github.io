# Lab Activity: Building a Simple Analog Clock

### Objective:
Understand and apply basic principles of HTML, CSS, and JavaScript to build a real-time updating analog clock.


### Instructions:

1. #### Setting up the Environment
    - Open your code editor and create a new folder named <span style="color:green">**ClockProject**</span>.
    - Inside this folder, create three files: <span style="color:green">**index.html**</span>, <span style="color:green">**styles.css**</span>, and <span style="color:green">**app.js**</span>
    <hr>

1. #### Building the Clock Structure *(<span style="color:lightyellow">HTML</span>)*
    In the <span style="color:green">**index.html**</span> file, do the following:
    1. Update the title tag
    1. Create a link to the CSS file
    1. Create a link to javascript file
    1. Create div elements for the clock in the body section
    ```HTML
        <div class="clock">
            <div class="hand hour-hand"></div>
            <div class="hand minute-hand"></div>
            <div class="hand second-hand"></div>
        </div>
    ```
    <hr>

1. #### Styling the Clock *(<span style="color:lightyellow">CSS</span>)*
    In the <span style="color:green">**styles.css**</span> file, add this code to make your clock visually appealing
    ```CSS
    body {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background-color: #f4f4f4;
    }

    .clock {
        width: 200px;
        height: 200px;
        border: 3px solid black;
        border-radius: 50%;
        position: relative;
    }

    .hand {
        position: absolute;
        bottom: 50%;
        left: 50%;
        transform-origin: 50% 100%;
        transform: rotate(90deg);
        z-index: 1;
    }

    .hour-hand {
        width: 6px;
        height: 50px;
        background: black;
        margin-left: -3px;
    }

    .minute-hand {
        width: 4px;
        height: 70px;
        background: blue;
        margin-left: -2px;
    }

    .second-hand {
        width: 2px;
        height: 90px;
        background: red;
        margin-left: -1px;
    }

    ```
    <hr>

1. #### Making the Clock Tick (<span style="color:lightyellow">*JavaScript*</span>)
    In the <span style="color:green">**app.js**</span> file, add the following code
    ```JavaScript
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
    ```

1. #### Bringing it All Together 
    Open <span style="color:green">**index.html**</span> in your web browser. You should see your clock, and the hands should move in real-time!

1. Challenges:
Intermediate: Add numbers (1-12) around the clock face using HTML and CSS.
Advanced: Add a button that switches the clock from analog to digital display using JavaScript.
Review & Reflection:
What was the most challenging part of this lab?
How do HTML, CSS, and JavaScript work together to create web apps like this clock?
Can you think of any other real-world applications that might use similar principles?