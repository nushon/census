let listOfCounties = document.querySelector('#counties');
let listOfHousehold = document.querySelector('#householdList');
let householdData;
let censusData;
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
                listOfCounties.insertAdjacentHTML("beforeend", `<option>${element}</option>`);
            });
        }
        Districtname(totalCounties);

        update();

        function householdName(list) {
            list.forEach((element) => {
                householdList.insertAdjacentHTML("beforeend", `<option>${element}</option>`);
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

    // console.log("Chart", districtName);
    myChart.data.datasets = [];
    myChart.data.datasets.push({
        data: districtMale,
        // label: 'Small Radius',
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
        barThickness: 20
    });

    myChart.update();
}


function updateHousehold() {
    let select_county = listOfCounties.value
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


        }
    })


    console.log("Settlement:", settlementName);
    console.log("Settlement Male:", householdMale);
    console.log("Settlement Female:", householdFemale);
    householdUpdate(settlementName, householdMale, householdFemale);
}

function householdUpdate(settlementName, householdMale, householdFemale) {
    // console.log("Joseph Chart", );

    householdChart.data.labels = settlementName;

    console.log("Household Chart", settlementName);
    householdChart.data.datasets = [];
    householdChart.data.datasets.push({
        data: householdMale,
        label: "Male",
        backgroundColor: "#B1D2C2",
        borderColor: "#B1D2C2",
        barThickness: 20,
        barPercentage: 0.5
    }, {
        data: householdFemale,
        label: "Female",
        backgroundColor: "#F0F2EF",
        borderColor: "#F0F2EF",
        barThickness: 20
    });
    // myChart.data.datasets.push();
    householdChart.update();
}