// Fetch pets from the backend and display them
fetch('http://localhost:5000/api/pets')
    .then(response => response.json())
    .then(data => {
        const petsContainer = document.getElementById('pets-container');
        data.forEach(pet => {
            const petDiv = document.createElement('div');
            petDiv.classList.add('pet');
            petDiv.innerHTML = `
                <h3>${pet.name}</h3>
                <img src="${pet.image}" alt="${pet.name}">
                <p><strong>Breed:</strong> ${pet.breed}</p>
                <p><strong>Age:</strong> ${pet.age}</p>
                <p>${pet.description}</p>
            `;
            petsContainer.appendChild(petDiv);
        });
    })
    .catch(err => console.error(err));

// Handle form submission to add a new pet
document.getElementById('add-pet-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const pet = {
        name: document.getElementById('name').value,
        breed: document.getElementById('breed').value,
        age: document.getElementById('age').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value
    };

    fetch('http://localhost:5000/api/pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet)
    })
    .then(response => response.json())
    .then(newPet => {
        alert('Pet added successfully!');
        location.reload(); // Refresh the page to show the new pet
    })
    .catch(err => console.error(err));
});
// Fetch pets from the backend and display them
function fetchPets(searchQuery = '') {
    fetch(`http://localhost:5000/api/pets?${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            const petsContainer = document.getElementById('pets-container');
            petsContainer.innerHTML = ''; // Clear the previous pet profiles

            if (data.length > 0) {
                data.forEach(pet => {
                    const petDiv = document.createElement('div');
                    petDiv.classList.add('pet');
                    petDiv.innerHTML = `
                        <h3>${pet.name}</h3>
                        <img src="${pet.image}" alt="${pet.name}">
                        <p><strong>Breed:</strong> ${pet.breed}</p>
                        <p><strong>Age:</strong> ${pet.age}</p>
                        <p>${pet.description}</p>
                    `;
                    petsContainer.appendChild(petDiv);
                });
            } else {
                petsContainer.innerHTML = '<p>No pets found matching your search criteria.</p>';
            }
        })
        .catch(err => console.error('Error:', err));
}

// Call the function initially to fetch all pets
fetchPets();

// Search functionality
document.getElementById('search-button').addEventListener('click', function() {
    const searchName = document.getElementById('search-name').value.trim();
    
    let searchQuery = '';
    if (searchName) {
        searchQuery = `name=${searchName}`;
    }

    // Fetch pets with search query
    fetchPets(searchQuery);
});
document.getElementById("petForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let petName = document.getElementById("petName").value;
    let petType = document.getElementById("petType").value;
    let breed = document.getElementById("breed").value;
    let age = document.getElementById("age").value;
    let photo = document.getElementById("photo").files[0];

    if (photo) {
        let reader = new FileReader();
        reader.onload = function(e) {
            displayProfile(petName, petType, breed, age, e.target.result);
        };
        reader.readAsDataURL(photo);
    }
});

function displayProfile(name, type, breed, age, imgSrc) {
    let profile = `
        <h3>Pet Profile</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Breed:</strong> ${breed}</p>
        <p><strong>Age:</strong> ${age} years</p>
        <img src="${imgSrc}" alt="Pet Photo">
    `;
    document.getElementById("petProfile").innerHTML = profile;
}
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    
    if (name && email && message) {
        document.getElementById("responseMessage").innerText = "Thank you for contacting us, " + name + "!";
    } else {
        document.getElementById("responseMessage").innerText = "Please fill out all fields.";
    }
});
// Add event listener to the login form
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Capture the form input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate form data
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Prepare the data to send in the request
    const loginData = {
        email: email,
        password: password
    };

    // Send the login data to the backend for authentication
    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // If login is successful, store the JWT token and redirect to a protected page
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            window.location.href = 'home.html'; // Redirect to the home page (or a protected route)
        } else {
            alert(data.message); // Show error message if any
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Something went wrong. Please try again later.');
    });
});
