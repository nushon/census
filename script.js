let listOfCounties = document.querySelector('#counties');
let listOfHousehold = document.querySelector('#householdList');
let householdData;
let censusData;
let individualMale;
let individualFemale;
let individualDistrict;
var ctx = document.getElementById('districtChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})

var ctx = document.getElementById("householdDataChart").getContext('2d');

var householdChart = new Chart(ctx, {
    type: 'bar',
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})


fetch('./census.json')
    .then(response => response.json())
    .then(data => {
        censusData = data.population;
        householdData = data.households;

        // Getting total Male Popilation Using Map
        let male = censusData.map(ele => {
            return ele.male
        });
        // Getting total Male Popilation Using reduce
        const MalePopulation = (accumulator, currentValue) => accumulator + currentValue;
        let malePop = (male.reduce(MalePopulation));

        document.getElementById("malePop").innerHTML = new Intl.NumberFormat().format(malePop);

        // Getting total Female Popilation Using Map
        let female = censusData.map(ele => {
            return ele.female;
        });
        // Getting total Female Popilation Using reduce
        const FemalePopulation = (accumulator, currentValue) => accumulator + currentValue;
        let femalePop = (female.reduce(FemalePopulation));
        document.getElementById("femalePop").innerHTML = new Intl.NumberFormat().format(femalePop);;

        // Getting Total Population
        let getTotal = (malePop + femalePop);
        document.getElementById("totalpop").innerHTML = new Intl.NumberFormat().format(getTotal);


        //Counties without duplicate
        let county = censusData.map(ele => {
            return ele.county;
        });
        let totalCounties = county.filter((c, index) => {
            return county.indexOf(c) === index;
        });
        //county total for male and female
        let individualCounty = censusData.reduce((acc, value) => (acc[value.county] = (acc[value.county] || 0) + value.male + value.female, acc), {})
            // console.log("County:", individualCounty);

        individualMale = censusData.reduce((acc, value) => (acc[value.county] = (acc[value.county] || 0) + value.male, acc), {})
            // console.log("Male:", individualMale);

        individualFemale = censusData.reduce((acc, value) => (acc[value.county] = (acc[value.county] || 0) + value.female, acc), {})
            // console.log("Female", individualFemale);



        rank();
        // console.log(rankObj);
        // Counties bar chart
        var ctx = document.getElementById('chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: totalCounties,
                datasets: [{
                    label: 'Small Radius',
                    label: 'Counties Population',
                    borderRadius: 5,
                    barThickness: 20,
                    data: individualCounty,
                    backgroundColor: [
                        '#B1D2C2',
                        '#B1D2C2',
                        '#B1D2C2',
                        '#B1D2C2',
                        '#B1D2C2',
                        '#B1D2C2'
                    ],
                    borderColor: [
                        '#B1D2C2',
                        '#B1D2C2',
                        '#B1D2C2',
                        '#B1D2C2',
                        '#B1D2C2',
                        '#B1D2C2'
                    ],
                    borderWidth: 2,

                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        //Doughnut chart for total male and female seperately
        new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: "Population (millions)",
                    backgroundColor: ["#FFFFFF", "#B1D2C2"],
                    data: [femalePop, malePop]
                }],
                labels: ["Female", "Male"],
            },
            options: {
                title: {
                    display: true,
                    text: 'Liberia census 2008'
                },
                aspectRatio: 1.2
            }
        });

        function Districtname(list) {
            list.forEach((element) => {
                listOfCounties.insertAdjacentHTML("beforeend", `<option style="font-family: 'Source Code Pro', monospace;">${element}</option>`);
            });
        }
        Districtname(totalCounties);

        update();

        function householdName(list) {
            list.forEach((element) => {
                householdList.insertAdjacentHTML("beforeend", `<option style="font-family: 'Source Code Pro', monospace;">${element}</option>`);
            });
        }
        householdName(totalCounties);

        updateHousehold();
    })


// DISTRICT CHART Functions

function update() {
    let select_county = listOfCounties.value
    let districtName = [];
    let districtMale = [];
    let districtFemale = [];
    censusData.forEach(ele => {

        if (ele.county === select_county) {
            let value = ele.district;
            districtName.push(value);


            if (ele.county === select_county) {
                let value = ele.male;
                districtMale.push(value);
            }

            if (ele.county === select_county) {
                let value = ele.female;
                districtFemale.push(value);
            }


        }
    })



    ChartUpdate(districtName, districtMale, districtFemale);
}

function ChartUpdate(districtName, districtMale, districtFemale) {

    myChart.data.labels = districtName;

    myChart.data.datasets = [];
    myChart.data.datasets.push({
        data: districtMale,
        label: 'Small Radius',
        label: "Male",
        backgroundColor: "#B1D2C2",
        borderColor: "#B1D2C2",
        borderRadius: 5,
        barThickness: 20,
        barPercentage: 0.5
    }, {
        data: districtFemale,
        label: 'Small Radius',
        label: "Female",
        backgroundColor: "#F0F2EF",
        borderColor: "#F0F2EF",
        borderRadius: 5,
        barThickness: 20,
        // barPercentage: 0.5

    });

    myChart.update();
}


function updateHousehold() {
    let select_county = listOfCounties.value
    let housholdNumber = [];
    let settlementName = [];
    let householdMale = [];
    let householdFemale = [];
    householdData.forEach(ele => {

        if (ele.county === select_county) {
            let val = ele.settlement;
            settlementName.push(val);


            if (ele.county === select_county) {
                let value = ele.male;
                householdMale.push(value);
            }

            if (ele.county === select_county) {
                let value = ele.female;
                householdFemale.push(value);
            }

            if (ele.county === select_county) {
                let value = ele.household_number;
                housholdNumber.push(value);
            }


        }
    })


    // console.log("Settlement:", settlementName);
    // console.log("Settlement Male:", householdMale);
    // console.log("Settlement Female:", householdFemale);
    householdUpdate(settlementName, householdMale, householdFemale, housholdNumber);
}

function householdUpdate(settlementName, householdMale, householdFemale, housholdNumber) {


    householdChart.data.labels = settlementName;

    householdChart.data.datasets = [];
    householdChart.data.datasets.push({
        data: householdMale,
        label: 'Small Radius',
        label: "Male",
        backgroundColor: "#B1D2C2",
        borderColor: "#B1D2C2",
        borderRadius: 5,
        barThickness: 20,
        barPercentage: 5
    }, {
        data: householdFemale,
        label: 'Small Radius',
        label: "Female",
        backgroundColor: "#F0F2EF",
        borderColor: "#F0F2EF",
        borderRadius: 5,
        barThickness: 20
    }, {
        data: housholdNumber,
        label: 'Small Radius',
        label: "Household",
        backgroundColor: "#2E3138",
        borderColor: "#2E3138",
        borderRadius: 5,
        barThickness: 20,
    });
    // myChart.data.datasets.push();
    householdChart.update();
}

// Ranking top 5 Males and Females


function rank() {

    // Getting Male and Female Values
    let resultMale = Object.entries(individualMale);

    let resultFemale = Object.entries(individualFemale);

    // Sorting
    let sortedMale = resultMale.sort((a, b) => b - a).slice(0, 5);
    console.log("Top 5 Males", sortedMale);

    let sortedFemale = resultFemale.sort((a, b) => b - a).slice(0, 5);
    console.log("Top 5 Females", sortedFemale);
}