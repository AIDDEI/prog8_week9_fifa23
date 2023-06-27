// Globals
let nn;

// Potential placeholder
let potentialPlaceholder = document.getElementById("potential");
let p = document.createElement("p");
p.innerHTML = "Voer de velden in om achter de potentie te komen!";
potentialPlaceholder.appendChild(p);

// Button
const button = document.getElementById("potentialButton");
button.addEventListener("click", getPlayer);

// Load
function loadData() {
    nn = ml5.neuralNetwork();
    nn.load('models/potential/model.json');
    modelLoaded();
}

// Model Loaded
function modelLoaded() {
    console.log("Model is geladen");
}

// Get player values
function getPlayer() {
    let overall = document.getElementById("overall").value;
    let playerValue = document.getElementById("value").value;
    let age = document.getElementById("age").value;

    if (overall === ''|| playerValue === '' || age === ''){
        potentialPlaceholder.removeChild(p);
        p.innerHTML = "Voer alle velden in!";
        potentialPlaceholder.appendChild(p);
    } else {
        let player = {
            'overall': Number(overall),
            'value': Number(playerValue),
            'age': Number(age),
        };
    
        predict(player);
    }
}

// Predict the potential of the player
async function predict(player) {
    const prediction = await nn.predict(player);
    let predictedPotential = Math.round(prediction[0].potential);
    console.log(predictedPotential);

    potentialPlaceholder.removeChild(p);
    p.innerHTML = `Het potentie is ${predictedPotential}!`;
    potentialPlaceholder.appendChild(p);
}

// Execute
loadData();