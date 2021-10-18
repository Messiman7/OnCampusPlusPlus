// Matthew Marsico
// I made this because nobody cares about grade history and the GPA calculater didn't work

function goToProgressPage() {
  document.getElementById('progress-btn').click();
}

// Get the class grades and names
function getClassesAndGrades() {
    document.getElementsByClassName("btn btn-default btn-sm bold  ")[0].click()
    const htmlRowsCollection = document.getElementsByTagName("h3");
    const textRowsCollection = [];

    for (let ele of htmlRowsCollection) {
        textRowsCollection.push(ele.innerText);
    }
    return textRowsCollection
}

// create a map with each even element being class and each odd being grade
function createMapWithArray(collection) {
    let gradeAndClassMap = new Map();
    for (let i=0; i < 18; i+=2) {
        gradeAndClassMap.set(collection[i], collection[i+1]);
    }
    return gradeAndClassMap;
}

// Get rid of key-value pairs where the grade value is "-- "
function ridMapOfGradelessClasses(collection) {
    let finalCollection = new Map();
    collection.forEach(function(value, key) {
        if (value != '--  ') {
            finalCollection.set(key, value);
        }
    })
    return finalCollection;
}

// Round grades their nearest integer
function roundAllGrades(map) {
    const returnMap = new Map();
    map.forEach(function (value, key) {
        returnMap.set(key, Math.round(parseFloat(value)))
    })
    return returnMap;
}


// get rid of illegal values by setting all values greater than 100 to 99 and all values under 70 to 69.
// This formats our data so that it works with the next function.
function ridIllegalValues(map) {
    let returnMap = new Map();
    const correctValue = value => {
    if (value > 99)
        return 99;
    else if (value < 70)
        return 69;
    else
        return value; 
    }

    map.forEach(function (value, key) {
        returnMap.set(key, correctValue(value))
    });
    return returnMap;
}



// convert percentages to Grade point values
function makeClassAndGPMap(map) {
    const returnMap = new Map();
    const gpaValues = [4.86, 4.71, 4.57, 4.43, 4.29, 4.14, 4.00,
        3.88, 3.75, 3.63, 3.50, 3.38, 3.25, 3.13, 3.00,
        2.89, 2.78, 2.67, 2.56, 2.44, 2.33, 2.22, 2.11, 2.0,
        1.83, 1.66, 1.5, 1.33, 1.16, 1.00, 0]
        map.forEach(function (value, key) {
        returnMap.set(key, gpaValues[100-value])
    })
    return returnMap;
}

// add the GPA boosts from AP Classes and Honors Classes and adds them
function addGPABoosts(map) {
    const returnMap = new Map();
    function boostValue(key) {
        let totalBoost = 0;
        if (key.search("-H - ") != -1) 
            totalBoost += 1;
        if (key.search("AP " != -1))
            totalBoost += .25; 
        return totalBoost;
    }
    map.forEach(function(value, key) {
        returnMap.set(key, (value + boostValue(key)))
    })
    return returnMap;
}

// take the average of this array of Grade points
function averageTheGradePoints(map) {
    const arrayOfGPs = [];
    map.forEach((value, key) => arrayOfGPs.push(value))
    console.log(arrayOfGPs)
    let avGPA = (arrayOfGPs.reduce((a, b) => a + b) / arrayOfGPs.length);
    console.log(avGPA);
    avGPA = Math.round(avGPA * 100) / 100;
    console.log(avGPA);
    return avGPA;
}

// style everything and set the GPAText variable
function styleGPASection(finalGPA) {
    // Rename the Conduct tile to GPA because nobody cares abt the demerits
    let headers = document.getElementsByClassName("bb-tile-header");
    headers[1].innerText = "GPA";

    // Set the inside text to the GPA
    let gpaText = document.getElementsByClassName("col-md-12")[4];
    gpaText.innerText = finalGPA;
    gpaText.align = 'center'
    gpaText.style.color = 'rgb(0, 124, 166)';
    gpaText.style.fontSize = '40px'
}

function returnGPA() {
    return averageTheGradePoints(
        addGPABoosts(
        makeClassAndGPMap(
        ridIllegalValues(
        roundAllGrades(
        ridMapOfGradelessClasses(
        createMapWithArray(
        getClassesAndGrades())))))))
}
function runGPACalculator() {
    goToProgressPage();
    return styleGPASection(returnGPA());
}

runGPACalculator();
