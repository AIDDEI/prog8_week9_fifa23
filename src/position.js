// Globals
let nn;

// Best position placeholder
let bestPositionPlaceholder = document.getElementById("position");
let p = document.createElement("p");
p.innerHTML = "Voer alle velden in om achter de beste posities te komen!";
bestPositionPlaceholder.appendChild(p);

// Button
const button = document.getElementById("positionButton");
button.addEventListener("click", getPlayer);

// Load
function loadData() {
    nn = ml5.neuralNetwork();
    nn.load('models/bestPosition/model.json');
    modelLoaded();
}

// Model loaded
function modelLoaded() {
    console.log("Model is geladen");
}

// Get Player values
function getPlayer() {
    let overall = document.getElementById("overall").value;
    let finishing = document.getElementById("finishing").value;
    let positioning = document.getElementById("positioning").value;
    let shotPower = document.getElementById("shotPower").value;
    let longShots = document.getElementById("longShots").value;
    let penalties = document.getElementById("penalties").value;
    let volleys = document.getElementById("volleys").value;
    let agility = document.getElementById("agility").value;
    let balance = document.getElementById("balance").value;
    let reactions = document.getElementById("reactions").value;
    let composure = document.getElementById("composure").value;
    let ballControl = document.getElementById("ballControl").value;
    let dribbling = document.getElementById("dribbling").value;
    let jumping = document.getElementById("jumping").value;
    let stamina = document.getElementById("stamina").value;
    let strength = document.getElementById("strength").value;
    let aggression = document.getElementById("aggression").value;
    let sprintSpeed = document.getElementById("sprintSpeed").value;
    let acceleration = document.getElementById("acceleration").value;
    let vision = document.getElementById("vision").value;
    let crossing = document.getElementById("crossing").value;
    let freekickAccuracy = document.getElementById("freekickAccuracy").value;
    let longPassing = document.getElementById("longPassing").value;
    let shortPassing = document.getElementById("shortPassing").value;
    let curve = document.getElementById("curve").value;
    let interceptions = document.getElementById("interceptions").value;
    let headingAccuracy = document.getElementById("headingAccuracy").value;
    let marking = document.getElementById("marking").value;
    let standingTackle = document.getElementById("standingTackle").value;
    let slidingTackle = document.getElementById("slidingTackle").value;
    let goalkeeperHandling = document.getElementById("goalkeeperHandling").value;
    let goalkeeperDiving = document.getElementById("goalkeeperDiving").value;
    let goalkeeperPositioning = document.getElementById("goalkeeperPositioning").value;
    let goalkeeperReflexes = document.getElementById("goalkeeperReflexes").value;
    let goalkeeperKicking = document.getElementById("goalkeeperKicking").value;

    if (overall === '' || finishing === '' || positioning === '' || shotPower === '' || longShots === '' || penalties === '' ||
        volleys === '' || agility === '' || balance === '' || reactions === '' || composure === '' || ballControl === '' ||
        dribbling === '' || jumping === '' || stamina === '' || strength === '' || aggression === '' || sprintSpeed === '' ||
        acceleration === '' || vision === '' || crossing === '' || freekickAccuracy === '' || longPassing === '' ||
        shortPassing === '' || curve === '' || interceptions === '' || headingAccuracy === '' || marking === '' ||
        standingTackle === '' || slidingTackle === '' || goalkeeperHandling === '' || goalkeeperDiving === '' ||
        goalkeeperPositioning === '' || goalkeeperReflexes === '' || goalkeeperKicking === '') {
        bestPositionPlaceholder.removeChild(p);
        p.innerHTML = "Voer alle velden in!";
        bestPositionPlaceholder.appendChild(p);
    } else {
        let player = {
            overall: Number(overall),
            finishing: Number(finishing),
            positioning: Number(positioning),
            shotPower: Number(shotPower),
            longShots: Number(longShots),
            penalties: Number(penalties),
            volleys: Number(volleys),
            agility: Number(agility),
            balance: Number(balance),
            reactions: Number(reactions),
            composure: Number(composure),
            ballControl: Number(ballControl),
            dribbling: Number(dribbling),
            jumping: Number(jumping),
            stamina: Number(stamina),
            strength: Number(strength),
            aggression: Number(aggression),
            sprintSpeed: Number(sprintSpeed),
            acceleration: Number(acceleration),
            vision: Number(vision),
            crossing: Number(crossing),
            freekickAccuracy: Number(freekickAccuracy),
            longPassing: Number(longPassing),
            shortPassing: Number(shortPassing),
            curve: Number(curve),
            interceptions: Number(interceptions),
            headingAccuracy: Number(headingAccuracy),
            marking: Number(marking),
            standingTackle: Number(standingTackle),
            slidingTackle: Number(slidingTackle),
            goalkeeperHandling: Number(goalkeeperHandling),
            goalkeeperDiving: Number(goalkeeperDiving),
            goalkeeperPositioning: Number(goalkeeperPositioning),
            goalkeeperReflexes: Number(goalkeeperReflexes),
            goalkeeperKicking: Number(goalkeeperKicking)
        };

        predict(player);
    }
}

// Predict the positions of the player
async function predict(player) {
    const prediction = await nn.predict(player);
    console.log(prediction);

    let ratings = [
        { position: 'ST', rating: Math.round(prediction[0].stRating) },
        { position: 'LW', rating: Math.round(prediction[1].lwRating) },
        { position: 'LF', rating: Math.round(prediction[2].lfRating) },
        { position: 'CF', rating: Math.round(prediction[3].cfRating) },
        { position: 'RF', rating: Math.round(prediction[4].rfRating) },
        { position: 'RW', rating: Math.round(prediction[5].rwRating) },
        { position: 'CAM', rating: Math.round(prediction[6].camRating) },
        { position: 'LM', rating: Math.round(prediction[7].lmRating) },
        { position: 'CM', rating: Math.round(prediction[8].cmRating) },
        { position: 'RM', rating: Math.round(prediction[9].rmRating) },
        { position: 'LWB', rating: Math.round(prediction[10].lwbRating) },
        { position: 'CDM', rating: Math.round(prediction[11].cdmRating) },
        { position: 'RWB', rating: Math.round(prediction[12].rwbRating) },
        { position: 'LB', rating: Math.round(prediction[13].lbRating) },
        { position: 'CB', rating: Math.round(prediction[14].cbRating) },
        { position: 'RB', rating: Math.round(prediction[15].rbRating) },
        { position: 'GK', rating: Math.round(prediction[16].gkRating) }
    ];

    ratings.sort((a, b) => b.rating - a.rating);

    bestPositionPlaceholder.removeChild(p);
    p.innerHTML = `De beste positie is: ${ratings[0].position} - ${ratings[0].rating}`;
    bestPositionPlaceholder.appendChild(p);
}

// Execute
loadData();