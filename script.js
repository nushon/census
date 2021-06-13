let censusData;
let individualDistrict;
let districtValue;

fetch('./census.json')
    .then(response => response.json())
    .then(data => {
        censusData = data.population;

        // Getting total Male Popilation Using Map
        let male = censusData.map(ele => {
            return ele.male
        });
        // Getting total Male Popilation Using reduce
        const MalePopulation = (accumulator, currentValue) => accumulator + currentValue;
        let malePop = (male.reduce(MalePopulation));

        let totalmalePop = document.getElementById("malePop").innerHTML = new Intl.NumberFormat().format(malePop);
        console.log("Male", totalmalePop);

        // Getting total Female Popilation Using Map
        let female = censusData.map(ele => {
            return ele.female;
        });
        // Getting total Female Popilation Using reduce
        const FemalePopulation = (accumulator, currentValue) => accumulator + currentValue;
        let femalePop = (female.reduce(FemalePopulation));
        let totalfemalePop = document.getElementById("femalePop").innerHTML = new Intl.NumberFormat().format(femalePop);;
        console.log("Female", totalfemalePop);

        let county = censusData.map(ele => {
            return ele.county;
        });


        let totalCounties = county.filter((c, index) => {
            return county.indexOf(c) === index;
        });

        console.log('List counties', totalCounties);
        // Getting Total Population
        let getTotal = (malePop + femalePop);
        let totalpop = document.getElementById("totalpop").innerHTML = new Intl.NumberFormat().format(getTotal);

        console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(totalpop));

        // Getting Total for individual county

        let individualCounty = censusData.reduce((acc, value) => (acc[value.county] = (acc[value.county] || 0) + value.male + value.female, acc), {})
        console.log('Total for county', individualCounty);

        // Graph

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

        new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {

                datasets: [{
                    label: "Population (millions)",
                    backgroundColor: ["#FFFFFF", "#B1D2C2"],
                    data: [femalePop, malePop]
                }],
                labels: ["Female", "Male"],
                // borderRadius: 20,


            },
            options: {
                title: {
                    display: true,
                    text: 'Liberia census 2008'
                },
                aspectRatio: 1.2
            }
        });
        // GETTING DISTRICTS
        totalCounties.forEach((element, index) => {
            document.getElementById('counties').innerHTML += `<option value="${element.id}">${element}</option>`;
        });

        let district = censusData.map(ele => {
            return ele.district;
        });


        let districsList = district.filter((c, index) => {
            return district.indexOf(c) === index;
        });

        console.log(districsList);

        individualDistrict = censusData.reduce((acc, value) => (acc[value.district] = (acc[value.district] || 0) + value.male + value.female, acc), {})
        console.log(individualDistrict);


        function countyAndDistrict(select) {
            let selectedCounty = select;
            console.log(selectedCounty);

            censusData.map(ele => {
                if (ele.county === selectedCounty) {
                    districtValue = ele.district;


                }
            });

        }

        console.log(districtValue);

        // DISTRICT CHART


        var ctx = document.getElementById('districtChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: districsList,
                datasets: [{
                    label: 'Small Radius',
                    label: 'Counties Population',
                    borderRadius: 5,
                    barThickness: 20,
                    data: individualDistrict,
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
        // document.getElementById("tbody").innerHTML = "";
        totalCounties.forEach((element, value) => {
            document.getElementById("counties").innerHTML += `<option value="${element.name}">${element}</option>`;


            function refreshChart(district) {

            }



            // if (element.id === (element.value)) {

            // }

        });



    })