let listOfCounties = document.querySelector('#counties');
let listOfHousehold = document.querySelector('#householdList');
let householdData;
let censusData;
let individualDistrict;
// let districtValue;
// let eachDistrict;
// // let result;
// // let maleResult;
// // let femaleResult;
// // let distObj = {};
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
        // console.log("Male", totalmalePop);

        // Getting total Female Popilation Using Map
        let female = censusData.map(ele => {
            return ele.female;
        });
        // Getting total Female Popilation Using reduce
        const FemalePopulation = (accumulator, currentValue) => accumulator + currentValue;
        let femalePop = (female.reduce(FemalePopulation));
        document.getElementById("femalePop").innerHTML = new Intl.NumberFormat().format(femalePop);;
        // console.log("Female", totalfemalePop);

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
        // console.log('List counties', totalCounties);


        //county total for male and female
        let individualCounty = censusData.reduce((acc, value) => (acc[value.county] = (acc[value.county] || 0) + value.male + value.female, acc), {})
            // console.log('Total for county', individualCounty);

        // Countyies bar chart
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


        // console.log(householdData);
        // GETTING DISTRICTS
        // let counties_district = {}

        function name(list) {
            list.forEach((element) => {
                listOfCounties.insertAdjacentHTML("beforeend", `<option>${element}</option>`);
            });
        }
        name(totalCounties);

        update();

        function householdName(list) {
            list.forEach((element) => {
                householdList.insertAdjacentHTML("beforeend", `<option>${element}</option>`);
            });
        }
        householdName(totalCounties);

        updateHousehold();
    })





// let districtName;
// DISTRICT CHART


function update() {
    let select_county = listOfCounties.value
    let districtName = [];
    let districtMale = [];
    let districtFemale = [];
    censusData.forEach(ele => {

        if (ele.county === select_county) {
            let val = ele.district;
            districtName.push(val);


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


    var ctx = document.getElementById('districtChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: districtName,

            datasets: [{
                    label: 'Small Radius',
                    borderRadius: 5,
                    // barThickness: 20,
                    data: districtMale,
                    label: "Male",
                    backgroundColor: "#B1D2C2",
                    borderColor: "#B1D2C2",
                    barPercentage: 0.5
                },
                {
                    label: 'Small Radius',
                    borderRadius: 5,
                    barThickness: 20,
                    data: districtFemale,
                    label: "Female",
                    backgroundColor: "#F0F2EF",
                    borderColor: "#F0F2EF"
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })

    console.log("County name:", districtName);
    console.log("County Males:", districtMale);
    console.log("County Females:", districtFemale);

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


    var ctx = document.getElementById("householdChart").getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: settlementName,

            datasets: [{
                    label: 'Small Radius',
                    borderRadius: 5,
                    // barThickness: 20,
                    data: householdMale,
                    label: "Male",
                    backgroundColor: "#B1D2C2",
                    borderColor: "#B1D2C2",
                    barPercentage: 0.5
                },
                {
                    label: 'Small Radius',
                    borderRadius: 5,
                    barThickness: 20,
                    data: householdFemale,
                    label: "Female",
                    backgroundColor: "#F0F2EF",
                    borderColor: "#F0F2EF"
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })

    console.log("Settlement:", settlementName);
    console.log("Settlement Male:", householdMale);
    console.log("Settlement Female:", householdFemale);
}