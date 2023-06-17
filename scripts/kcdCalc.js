import nakshatraPadas from '../data/nakshatraPadas.js';
import kcdMasterRef from '../data/kcdMasterRef.js';

const DEBUG = false;

/*-----------------------*/
function calculateMahadashas(moonInfo, dob) {
    let dashaMatrix = {};

    try {
        if (DEBUG) console.log(moonInfo, dob);

        //Validate Birth Data
        validateBirthData(moonInfo, dob);

        let birthData = getInfoFromMoon(moonInfo);
        if (DEBUG) console.log("Birth Data : " + JSON.stringify(birthData))
        //Get the MD sequence without balance
        let imbalancedMD = getImbalancedMDSequence(birthData);
        // Set Deha and Jeev Rashis
        let deha = -1,
            jeeva = -1;
        switch (imbalancedMD.dp) {
            case 'savya':
                deha = imbalancedMD.dashas[2].slice(0, 2);
                jeeva = imbalancedMD.dashas.at(-1).slice(0, 2);
                break;
            case 'asavya':
                jeeva = imbalancedMD.dashas[2].slice(0, 2);
                deha = imbalancedMD.dashas.at(-1).slice(0, 2);
                break;

        }
        let balancedMD = getBalancedMDSequence(imbalancedMD, birthData, dob);
        if (DEBUG) console.log("Balanced MD : " + JSON.stringify(balancedMD))
        dashaMatrix = getADsFromBalancedMD(balancedMD);

        dashaMatrix = [{
            "deha": deha,
            "jeeva": jeeva
        }].concat(dashaMatrix);
        // dashaMatrix - the final payload which contains all data to be displayed to UI
        // if(DEBUG) console.log("Final Dasha Matrix - ")
        // if(DEBUG) console.log(dashaMatrix)
    } catch (e) {
        dashaMatrix = {
            "error": e.message
        }
    } finally {

        //Deleting cache
        if (DEBUG) console.log(kcdMasterRef);
        if (DEBUG) console.log(nakshatraPadas);

        // if(DEBUG) console.log(kcdMasterRef)
        return dashaMatrix;
    }
}

/*---------Utility Functions----------*/
//Calculate Nakshatra Pada
function getNakshatraPada(degrees, minutes, seconds, nakshatra) {
    let nakData = nakshatraPadas.find(nakObj => {
        return Object.keys(nakObj)[0] === nakshatra
    })
    let moonDegreeInSeconds = (degrees * 3600) + (minutes * 60) + seconds;
    if (DEBUG) console.log("Moon Degree in Seconds : " + moonDegreeInSeconds);
    let padaArr = nakData[Object.keys(nakData)[0]]
    let padaMatch = padaArr.find(pada => {
        let start = pada[Object.keys(pada)[0]].start;
        let end = pada[Object.keys(pada)[0]].end;
        return (moonDegreeInSeconds >= start && moonDegreeInSeconds <= end);
    })
    if (!padaMatch) {
        throw new Error("Nakshatra Longitude mismatch")
    }
    if (DEBUG) console.log("Pada : " + JSON.stringify(padaMatch));
    return Object.keys(padaMatch)[0];
}
//Extract Information from Base Moon String
function getInfoFromMoon(moonInfo) {
    let splitInfo = moonInfo.split(" ");
    let degrees = parseInt(splitInfo[0]);
    let minutes = parseInt(splitInfo[1]);
    let seconds = parseInt(splitInfo[2]);
    let nakshatra = splitInfo[4];
    let nakshatraPada = getNakshatraPada(degrees, minutes, seconds, nakshatra);

    return {
        "degrees": degrees,
        "minutes": minutes,
        "seconds": seconds,
        "nakshatra": nakshatra,
        "nakshatraPada": nakshatraPada
    };
}
//Caluclate MD Sequence without Balance
function getImbalancedMDSequence(birthData) {
    let nakshatra = birthData.nakshatra;
    let pada = birthData.nakshatraPada;
    let savyaGrp = kcdMasterRef[3].collections.find(coll => coll.naks.indexOf(nakshatra) > -1);
    let asavyaGrp = kcdMasterRef[4].collections.find(coll => coll.naks.indexOf(nakshatra) > -1);

    return savyaGrp !== undefined ? {
        'dp': 'savya',
        'dashas': savyaGrp.padas[pada - 1]
    } : {
        'dp': 'asavya',
        'dashas': asavyaGrp.padas[pada - 1]
    };
}
//Caluclate MD Sequence with Balance
function getBalancedMDSequence(imbalancedMD, birthData, dob) {
    let balanceAtBirthInYears = getBalanceAtBirth(imbalancedMD, birthData);
    if (DEBUG) console.log("Balance at Birth Years : " + balanceAtBirthInYears)
    let convertedBalanceAtBirthInYears = convertDecimalYear(balanceAtBirthInYears);
    if (DEBUG) console.log("Converted Balance at Years - " + JSON.stringify(convertedBalanceAtBirthInYears));
    let adjustedDashaData = getAdjustedImbalancedSeqWithBalance(imbalancedMD, convertedBalanceAtBirthInYears);
    if (DEBUG) console.log("Adjusted Dasha Data : " + JSON.stringify(adjustedDashaData));
    const DOB = moment(dob, "YYYY-MM-DD");

    //Generate MD Object with Dates
    let startingDate = moment(DOB);
    let endingDate = moment(DOB).add(adjustedDashaData.remainingBalance.years, 'y').add(adjustedDashaData.remainingBalance.months, 'M').add(adjustedDashaData.remainingBalance.days, 'd');
    startingDate = moment(endingDate).subtract(getSignLength(adjustedDashaData.balancedDasha[2]), 'y')
    if (DEBUG) console.log("Initial Starting Date - " + startingDate.format('YYYY-MM-DD'));
    if (DEBUG) console.log("Initial Ending Date - " + endingDate.format('YYYY-MM-DD'));
    let mds = adjustedDashaData.balancedDasha.slice(2).map((md, index) => {
        if (index !== 0) {
            startingDate = moment(endingDate);
            endingDate = moment(startingDate).add(getSignLength(md), 'y');
        }
        return [md, startingDate.format('YYYY-MM-DD'), endingDate.format('YYYY-MM-DD')];
    });
    if (DEBUG) console.log("Imbalanced MD : " + JSON.stringify(imbalancedMD));
    if (DEBUG) console.log("Adjusted Mahadashas : " + mds);
    return {
        "dp": [imbalancedMD.dp, imbalancedMD.dashas[1]],
        "dashas": mds
    };
}
//Calculate Balance At Birth
function getBalanceAtBirth(imbalancedMD, birthData) {
    let degrees = birthData.degrees;
    let minutes = birthData.minutes;
    let seconds = birthData.seconds;

    let moonLongInSeconds = degrees * 3600 + (minutes * 60) + seconds;
    let secondsLeftToTraverse = getSecondsLeftInPada(moonLongInSeconds);
    const DPDuration = kcdMasterRef[1]["mdLengths"][imbalancedMD.dashas[1]];
    if (DEBUG) console.log("DP Duration - " + DPDuration)
    let balanceInYears = (secondsLeftToTraverse * DPDuration) / 12000;
    return balanceInYears;
}
//Calculate seconds left to Traverse in Pada
function getSecondsLeftInPada(seconds) {
    seconds /= 1000;
    var remainder = seconds % 12;
    var nearestHighestPadainSeconds = seconds + (12 - remainder);
    return Math.round((nearestHighestPadainSeconds - seconds) * 1000);
}
//Convert decimal years to {years, months, days}
function convertDecimalYear(decimalYear) {
    const years = Math.floor(decimalYear);
    const months = Math.floor((decimalYear % 1) * 12);
    const days = Math.round(((decimalYear % 1) * 12) % 1 * 30.4368); // Average number of days in a month

    const duration = {
        "years": years,
        "months": months,
        "days": days
    };
    return duration;
}
//Adjust imbalanced MD sequence with balance in years
function getAdjustedImbalancedSeqWithBalance(imbalancedMD, convertedBalanceAtBirthInYears) {
    let dashas = imbalancedMD.dashas.slice(2);
    let balanceInYears = convertedBalanceAtBirthInYears.years;
    let i = 0;
    for (i = dashas.length - 1; i >= 0; i--) {
        let signLength = getSignLength(dashas[i]);
        if (balanceInYears < signLength) break;
        balanceInYears -= signLength;
    }
    let adjustedDashas = imbalancedMD.dashas.slice(0, 2).concat(dashas.slice(i).concat(dashas.slice(0, i)));
    let newConvertedBalanceAtBirthInYears = convertedBalanceAtBirthInYears;
    newConvertedBalanceAtBirthInYears.years = balanceInYears;

    return {
        "balancedDasha": adjustedDashas,
        "remainingBalance": newConvertedBalanceAtBirthInYears
    };
}
//Get Sign length
function getSignLength(dashaSign) {
    return kcdMasterRef[0]["signLengths"][dashaSign.slice(0, 2)];
}
//Calcualte AD Dates
function getDateKCDTable(kcdTable) {
    let finalKCDTable = [];
    let start = moment();
    let end = moment();
    for (let i = 1; i < kcdTable.length; i++) {
        let mdWithDir = kcdTable[i].md.dasha;
        let md = mdWithDir.slice(0, 2);
        let mdDir = parseInt(mdWithDir.at(-1));
        kcdTable[i].md["dasha"] = md;
        start = moment(kcdTable[i].md.start);
        finalKCDTable[i] = {
            "md": kcdTable[i].md,
            "ad": []
        }
        let mdEnd = moment(kcdTable[i].md.end);
        for (let j = 0; j < kcdTable[i].ad.length; j++) {
            let adWithFeatures = kcdTable[i].ad[j].split(".");
            let ad = adWithFeatures[0];
            let adFeature = mdDir > 0 ? adWithFeatures[1] : adWithFeatures[2];
            let dashaSpan = kcdMasterRef[1]["mdLengths"][md];
            let adSpan = (kcdMasterRef[0]["signLengths"][md] * kcdMasterRef[0]["signLengths"][ad]) / dashaSpan;
            let adSpanData = convertDecimalYear(adSpan);
            end = j === kcdTable[i].ad.length - 1 ? mdEnd : moment(start).add(adSpanData.years, 'y').add(adSpanData.months, 'M').add(adSpanData.days, 'd');
            finalKCDTable[i].ad[j] = {
                "dasha": ad,
                "start": start.format("YYYY-MM-DD"),
                "end": end.format("YYYY-MM-DD"),
                "feature": adFeature
            }
            start = moment(end);
        }
    }
    finalKCDTable[0] = kcdTable[0];
    return finalKCDTable;
}
//Calcualte AD
function getADsFromBalancedMD(balancedMD) {
    let adTable = kcdMasterRef[2];

    if (DEBUG) console.log("Reference AD Seq Table : " + JSON.stringify(adTable));
    let kcdTable = [];
    for (let i = 0; i < balancedMD.dashas.length; i++) {
        kcdTable[i] = {
            "md": {
                "dasha": balancedMD.dashas[i][0],
                "start": balancedMD.dashas[i][1],
                "end": balancedMD.dashas[i][2]

            },
            "ad": parseInt(balancedMD.dashas[i][0].at(-1)) > 0 ? adTable[balancedMD.dashas[i][0].slice(0, 2)] : adTable[balancedMD.dashas[i][0].slice(0, 2)].slice().reverse()
        }
    }
    kcdTable = [{
        "dp": balancedMD.dp
    }].concat(kcdTable)
    if (DEBUG) console.log("\n");
    if (DEBUG) console.log("KCD Table W/O Dates : ");
    if (DEBUG) console.log(kcdTable);
    let finalKCDMatrix = getDateKCDTable(kcdTable);
    return finalKCDMatrix;
}

//Validate Birth Data
function validateBirthData(moonInfo, dob) {
    const moonInfoMatch = /^\d{1,2}D\s\d{1,2}M\s\d{1,2}S\sof\s\w{3}$/;
    if (!moonInfoMatch.test(moonInfo) || !moment(dob).isValid()) {
        throw new Error("Invalid Input(s)");
    }
}

//Exports
export {
    calculateMahadashas
};