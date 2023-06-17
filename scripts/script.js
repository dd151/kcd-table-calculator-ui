import {
    calculateMahadashas
} from "./kcdCalc.js";

let submitBtn = document.getElementById('submit');
let kcdForm = document.getElementById('kcdForm');

let dehaDisp = document.getElementById("deha");
let jeevaDisp = document.getElementById("jeeva");
let dpDisp = document.getElementById("dp");

let kcdDisp = document.getElementsByClassName("dasha-tables")[0];

//Event listeners for KCD FORM
kcdForm.addEventListener("submit", function (event) {
    event.preventDefault();
    onSubmit();
});
kcdForm.addEventListener("reset", onReset);

//Function to handle Submit event of form
function onSubmit() {
    submitBtn.disabled = true;
    submitBtn.classList.add("loader");
    setTimeout(function () {
        var dobNew = document.getElementById("dob").value;
        var degrees = document.getElementById("degrees").value;
        var minutes = document.getElementById("minutes").value;
        var seconds = document.getElementById("seconds").value;
        var nakshatra = document.getElementById("nakshatra").value;

        let dob = dobNew;
        let moonInfo = `${degrees}D ${minutes}M ${seconds}S of ${nakshatra}`;
        console.log(moonInfo, dob);
        let kcdMatrix = calculateMahadashas(moonInfo, dob);
        displayKCD(kcdMatrix);
        return false;
    }, 1000);

}

//Function to handle Reset event of form
function onReset() {
    submitBtn.disabled = false;
    kcdDisp.innerHTML = '';
    jeevaDisp.innerText = '';
    dehaDisp.innerText = '';
    dpDisp.innerText = '';
}

function displayKCD(dashaMatrix) {
    console.log(dashaMatrix);
    kcdDisp.innerHTML = '';
    if (dashaMatrix["error"]) {
        onReset();
        let errorDiv = document.createElement("div");
        errorDiv.classList.add("error");
        errorDiv.innerHTML = `<b class="maroon">Message: </b><em class="blue">${dashaMatrix["error"]}</em>`;
        kcdDisp.appendChild(errorDiv);
        return;
    }
    jeevaDisp.innerText = dashaMatrix[0].jeeva;
    dehaDisp.innerText = dashaMatrix[0].deha;
    dpDisp.innerText = `${dashaMatrix[1].dp[0]} - ${dashaMatrix[1].dp[1]}`;
    for (let i = 2; i < dashaMatrix.length; i++) {
        let kcdTable = document.createElement("div");
        kcdTable.classList.add("dasha-table");

        let indexDisp = document.createElement("em");
        indexDisp.classList.add("green", "index");
        indexDisp.innerHTML = `(${i - 1})`;

        let mdDisp = document.createElement("div");
        mdDisp.classList.add("mahadasha");
        mdDisp.innerHTML = `<span class="green">${dashaMatrix[i]["md"]["dasha"]} MD:</span>&emsp;&emsp;<span
        class="maroon">${dashaMatrix[i]["md"]["start"]}&emsp;&emsp;-&emsp;&emsp;${dashaMatrix[i]["md"]["end"]}</span>`;

        kcdTable.appendChild(indexDisp);
        kcdTable.appendChild(mdDisp);

        //ADs
        let adDisp = document.createElement("div");
        adDisp.classList.add("antardashas");

        let adHeader = document.createElement("div");
        adHeader.classList.add("blue", "header");
        adHeader.innerText = "Antardashas in the MD:";

        adDisp.appendChild(adHeader);

        let adTable = document.createElement("table");
        for (let j = 0; j < dashaMatrix[i]["ad"].length; j++) {
            let adTR = document.createElement('tr');

            let adTD1 = document.createElement('td');
            adTD1.innerHTML = `<span class="green">${dashaMatrix[i]["ad"][j]["dasha"]} :</span>`;
            let adTD2 = document.createElement('td');
            adTD2.innerHTML = `&emsp;&emsp;<span class="maroon">${dashaMatrix[i]["ad"][j]["start"]}&emsp;&emsp; -
            &emsp;&emsp;${dashaMatrix[i]["ad"][j]["end"]}</span>`;
            let adTD3 = document.createElement('td');
            adTD3.innerHTML = `&emsp;<em class="maroon">${dashaMatrix[i]["ad"][j]["feature"] != 'na' ? '(' + dashaMatrix[i]["ad"][j]["feature"] + ')' : ""}</em>`;

            adTR.appendChild(adTD1);
            adTR.appendChild(adTD2);
            adTR.appendChild(adTD3);

            adTable.appendChild(adTR);
        }
        adDisp.appendChild(adTable);
        kcdTable.appendChild(adDisp);
        kcdDisp.appendChild(kcdTable);
        submitBtn.disabled = false;
        submitBtn.classList.remove("loader");
    }
}