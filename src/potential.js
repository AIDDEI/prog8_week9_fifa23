// Globals
let nn;

// Load
function loadData() {
    nn = ml5.neuralNetwork();
    nn.load('models/potential/model.json');
}