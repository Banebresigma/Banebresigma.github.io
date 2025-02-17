let balance = 10000;
let betslip = [];

function updateBalance() {
    document.getElementById("balance").innerText = balance;
}

function addToBetslip(match, team, odds) {
    if (betslip.some(bet => bet.match === match)) {
        alert("Već si dodao opkladu za ovaj meč!");
        return;
    }
    betslip.push({ match, team, odds });
    updateBetslip();
}

function updateBetslip() {
    let betslipElement = document.getElementById("betslip");
    betslipElement.innerHTML = "<tr><th>Meč</th><th>Tip</th><th>Kvota</th><th>Ukloni</th></tr>";
    let totalOdds = 1;
    betslip.forEach((bet, index) => {
        totalOdds *= bet.odds;
        let row = `<tr><td>${bet.match}</td><td>${bet.team}</td><td>${bet.odds}</td><td><button onclick="removeFromBetslip(${index})">❌</button></td></tr>`;
        betslipElement.innerHTML += row;
    });
    document.getElementById("totalOdds").innerText = totalOdds.toFixed(2);
    updatePotentialWinnings();
}

function removeFromBetslip(index) {
    betslip.splice(index, 1);
    updateBetslip();
}

function updatePotentialWinnings() {
    let betAmount = parseInt(document.getElementById("betAmount").value);
    let totalOdds = parseFloat(document.getElementById("totalOdds").innerText);
    let potentialWinnings = betAmount * totalOdds;
    document.getElementById("potentialWinnings").innerText = potentialWinnings.toFixed(2);
}

function placeBet() {
    let betAmount = parseInt(document.getElementById("betAmount").value);
    if (betAmount > balance || betAmount <= 0) {
        alert("Nedovoljno sredstava ili neispravan iznos!");
        return;
    }
    balance -= betAmount;
    updateBalance();
    
    let historyElement = document.getElementById("betHistory");
    let row = `<tr><td>${betAmount} din</td><td>${betslip.map(b => `${b.team} @ ${b.odds}`).join(", ")}</td><td><select onchange='updateBetStatus(this)'><option value='pending'>Na čekanju</option><option value='won'>Dobitna</option><option value='lost'>Izgubljena</option></select></td></tr>`;
    historyElement.innerHTML += row;
    
    betslip = [];
    updateBetslip();
}

function updateBetStatus(selectElement) {
    let row = selectElement.parentElement.parentElement;
    row.style.backgroundColor = selectElement.value === "won" ? "lightgreen" : selectElement.value === "lost" ? "lightcoral" : "white";
}

// Dark Mode toggle functionality
function toggleDarkMode() {
    const body = document.body;
    const currentMode = body.classList.contains("dark-mode");
    
    if (currentMode) {
        body.classList.remove("dark-mode");
        localStorage.setItem("mode", "light");
    } else {
        body.classList.add("dark-mode");
        localStorage.setItem("mode", "dark");
    }
}

// On page load, check the stored mode preference
document.addEventListener("DOMContentLoaded", function() {
    const savedMode = localStorage.getItem("mode");
    if (savedMode === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});
