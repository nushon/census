let censusData;


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

        let totalmalePop = document.getElementById("malePop").innerHTML = malePop;
        console.log("Male", totalmalePop);

        // Getting total Female Popilation Using Map
        let female = censusData.map(ele => {
            return ele.female;
        });
        // Getting total Female Popilation Using reduce
        const FemalePopulation = (accumulator, currentValue) => accumulator + currentValue;
        let femalePop = (female.reduce(FemalePopulation));
        let totalfemalePop = document.getElementById("femalePop").innerHTML = femalePop;
        console.log("Female", totalfemalePop);

        let county = censusData.map(ele => {
            return ele.county;
        });


        let totalCounties = county.filter((c, index) => {
            return county.indexOf(c) === index;
        });

        console.log(totalCounties)
            // Getting Total Population
        let getTotal = (totalmalePop + totalfemalePop);
        let totalpop = document.getElementById("totalpop").innerHTML = getTotal;
        console.log("Total", totalpop);

        // Getting Total for individual county

        const individualCounty = censusData.reduce((acc, value) => {
            const county = value.county;

            // console.log(county);

            if (!acc[county]) {
                acc[county] = {};
            }

            const allCountyMales = acc[county].male || 0;
            const allCountyFemales = acc[county].female || 0;
            const updatedMales = allCountyMales + value.male;
            const updatedFemales = allCountyFemales + value.female;
            acc[county] = updatedMales + updatedFemales;


            return acc;

        }, {})


        // let countyValues = ;

        console.log(individualCounty);

        // Graph
        var ctx = document.getElementById('chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: totalCounties,
                datasets: [{
                    label: 'Counties Population',
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
                    borderWidth: 1
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
                    data: [totalfemalePop, totalmalePop]
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
    })