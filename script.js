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

        // Graph
        var ctx = document.getElementById('chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Bomi', 'Bong', 'Gbarpolu', 'Grand Bassa', 'Grand CapeMount', 'Grand Gedeh', 'Grand Kru', 'Lofa', 'Margibi', 'Maryland', 'Montserrado', 'Nimba', 'Rivercess', 'River Gee', 'Sinoe'],
                datasets: [{
                    label: 'Counties Population',
                    data: [totalpop],
                    backgroundColor: [
                        '#519872',
                        '#519872',
                        '#519872',
                        '#519872',
                        '#519872',
                        '#519872'
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
    })