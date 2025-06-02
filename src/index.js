console.log('%c HI', 'color: firebrick');

document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const container = document.getElementById("dog-image-container");
    const dogBreeds = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");

    let allBreeds = [];

    // Fetch Dog Images
    fetch(imgUrl)
        .then(response => response.json()) 
        .then(data => {
            data.message.forEach(imgSrc => {
                const img = document.createElement("img");
                img.src = imgSrc;
                img.alt = "Random Dog Image";
                container.appendChild(img);
            });
        })
        .catch(error => console.error("Error fetching images:", error));

    // Fetch Dog Breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message); 
            displayBreeds(allBreeds);
        })
        .catch(error => console.error("Error fetching breeds:", error));

    // Function to display breeds
    function displayBreeds(breeds) {
        dogBreeds.innerHTML = ""; 
        breeds.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;
            dogBreeds.appendChild(li);
        });
    }

    // Filter breeds when dropdown changes
    breedDropdown.addEventListener("change", () => {
        const selectedLetter = breedDropdown.value.toLowerCase();
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        displayBreeds(filteredBreeds); 
    });
});
