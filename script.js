
document.getElementById("version").innerHTML = "v 2.0.0";


document.getElementById('indiCatorG').style.display = 'none';
function startBlinkingRed() {
    const div = document.getElementById('indiCatorR');
    // document.getElementById('indiCatorG').style.display = 'none';
    let isRed = true; // Track the current color

    setInterval(() => {
        div.style.backgroundColor = isRed ? '#ffffff1e' : "rgb(240, 12, 0)";
        isRed = !isRed; // Toggle color
    }, 300); // Change color every 1000ms (1 second)
}

function startBlinkingGreen() {
    const div = document.getElementById('indiCatorG');
    document.getElementById('indiCatorG').style.display = 'block';
    document.getElementById('indiCatorR').style.display = 'none';
    let isRed = true; // Track the current color

    setInterval(() => {
        div.style.backgroundColor = isRed ? '#ffffff1e' : "rgb(0, 255, 106)";
        isRed = !isRed; // Toggle color
    }, 400); // Change color every 400ms
}


const text = "Welcome to Gurukul! 🌟 Your one-stop destination for comprehensive chapter-wise study materials designed to elevate your technical knowledge beyond the syllabus. 📚✨ Curated and maintained by the ECE Department of ABACUS Institute of Engineering and Management, Gurukul empowers your learning journey with valuable resources. Whether you want to strengthen your fundamentals or dive into advanced topics, we've got you covered! 🚀💡";
const typewriterElement = document.getElementById("abouttext");
let index = 0;

function type() {
    if (localStorage.getItem("aboutGuruKul") == "load") {
        typewriterElement.textContent = text;
        return 0;
    }
    if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 1); // Adjust speed here (100 ms)
    }
    localStorage.setItem("aboutGuruKul", "load");
}
type();



function toCamelCase(str) {
    if (!str) return str; // Return if the string is empty or undefined
    return str
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string
}

function createStyledDiv(arr) {
    setTimeout(() => {
        arrLength = arr.length

        // Create the main container div
        const container = document.createElement("div");
        container.className = "content_container"
        document.getElementById("content_section").appendChild(container)

        const catagoryHeadContainer = document.createElement("div");
        catagoryHeadContainer.id = "catagoryHeading";
        catagoryHeadContainer.className = "catagoryHeading"
        container.appendChild(catagoryHeadContainer)

        const linkPlacement = document.createElement('div');
        linkPlacement.className = "LinkPlacement"
        container.appendChild(linkPlacement);



        // Create and style the title
        const title = document.createElement('h2');
        title.innerText = toCamelCase(arr[0]);
        title.className = "catagoryName";
        catagoryHeadContainer.appendChild(title);

        for (let a = 1; a < arrLength; a++) {


            // Create and style the inner container for the button
            const innerContainer = document.createElement('div');
            innerContainer.className = "content_title"

            // Create and style the description text
            const description = document.createElement('p');
            description.innerText = arr[a][1];
            description.className = 'title_text'
            innerContainer.appendChild(description);

            arr[a][3] = arr[a][3].replace("Youtube Video", "Watch on YouTube");
            arr[a][3] = arr[a][3].replace("Blog", "Read on Blog");
            arr[a][3] = arr[a][3].replace("Tutorial", "Click Here");
            arr[a][3] = arr[a][3].replace("Others", "Click Here");

            // Create and style the clickable button
            const button = document.createElement('a');
            button.innerText = arr[a][3];
            button.className = "content_url";
            button.href = arr[a][2];
            button.target = '_blank';
            button.style.cursor = "pointer";
            innerContainer.appendChild(button);

            // Create and style the small text
            const smallText = document.createElement('small');
            smallText.innerText = "ID: " + arr[a][0];
            smallText.className = "content_id"
            innerContainer.appendChild(smallText);

            // Append the inner container to the main container
            linkPlacement.appendChild(innerContainer);
        }
    }, 1500);

}


const googleAppsScriptURL = "https://script.google.com/macros/s/AKfycbx9UYO_BWqbtVSt4vKCM_qRd0BffJNfXwGklgH8JpfOvXYM97cvfV16Ltu2hIv7DNtqog/exec";

async function fetchData() {
    try {
        const response = await fetch(googleAppsScriptURL);
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${ response.status } ');
        }

        const data = await response.text(); // Assuming the Apps Script returns JSON
        if (data) {
            // startBlinking();
            startBlinkingGreen()
        }
        // JSON.stringify(data, null, 2;
        // console.log(data);
        // console.log(typeof data);
        let arrb = stringToArray(data)
        // console.log(arrb)

        for (let index = 0; index < arrb.length; index++) {
            createStyledDiv(arrb[index])
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the fetch function on page load
fetchData();

function stringToArray(str) {
    return JSON.parse(str); // Convert JSON string back to an array
}

