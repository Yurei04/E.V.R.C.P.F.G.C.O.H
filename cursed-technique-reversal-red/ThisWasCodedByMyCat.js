const energyOutputPerUnit = {
    uranium: 100,
    solar: 100,
    biomass: 100,
    rizz: 1000,
    aura: 1000,
    skibidi: 1000,
    darkEnergy: 100000000,
    celestialEnergy: 10000000000,
    starDust: 1000000000000,
};

let activeSwitch = null;
let energyData = null;

async function fetchEnergyData() {
    const api_url = "../cursed-echnique-amplification-blue/curse-energy/energy.json";

    try {
        const response = await fetch(api_url);

        if (!response.ok) {
            throw new Error(`This not working why: ${response.status}`);
        }

        energyData = await response.json();
        console.log("check energy loaded", energyData);
    } catch (error) {
        console.error("Not working no getting", error);

    }
}

function calculatePower(energyAmount, energyType) {
    const energyOutput = energyOutputPerUnit[energyType];
    if (!energyOutput) {
        alert("Invalid energy type selected.");
        return {};
    }

    const categories = {
        green: [],
        yellow: [],
        red: [],
        purple: []
    };

    for (const [country, data] of Object.entries(energyData)) {
        const consumption = data.consumption;

        if (!consumption) continue;

        const monthsPowered = (energyAmount * energyOutput) / consumption;

        if (monthsPowered >= 120) {
            categories.purple.push(country); 
        } else if (monthsPowered >= 24) {
            categories.red.push(country); 
        } else if (monthsPowered >= 1) {
            categories.yellow.push(country);
        } else {
            categories.green.push(country);
        }
    }

    return categories;
}

function highlightCountriesByCategory(categories) {
    document.querySelectorAll(".allPaths").forEach((countryElement) => {
        countryElement.style.fill = "#ececec"; // Reset to default

        const countryId = countryElement.id;

        if (categories.green.includes(countryId)) {
            countryElement.style.fill = "green";
        } else if (categories.yellow.includes(countryId)) {
            countryElement.style.fill = "yellow";
        } else if (categories.red.includes(countryId)) {
            countryElement.style.fill = "red";
        } else if (categories.purple.includes(countryId)) {
            countryElement.style.fill = "purple";
        }
    });
}

function showCategoryChart(categories) {
    const ctx = document.getElementById("categoryChart").getContext("2d");
    const data = {
        labels: ["Green (Temporary)", "Yellow (Months)", "Red (Years)", "Purple (Forever)"],
        datasets: [
            {
                label: "Number of Countries",
                data: [
                    categories.green.length,
                    categories.yellow.length,
                    categories.red.length,
                    categories.purple.length
                ],
                backgroundColor: ["green", "yellow", "red", "purple"]
            }
        ]
    };

    new Chart(ctx, {
        type: "bar",
        data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    // Fetch energy data
    await fetchEnergyData();

    const toggleSwitches = document.querySelectorAll(".toggle-switch input[type='checkbox']");
    const switchContents = {
        switch1: document.getElementById("normalMode"),
        switch2: document.getElementById("auraMode"),
        switch3: document.getElementById("riftMode")
    };

    // Handle toggle switch behavior
    toggleSwitches.forEach((switchInput) => {
        switchInput.addEventListener("change", () => {
            // Deactivate all other switches
            toggleSwitches.forEach(input => input !== switchInput && (input.checked = false));

            // Show corresponding div based on active switch
            Object.keys(switchContents).forEach(key => {
                if (switchInput.id === key) {
                    switchContents[key].classList.remove("hidden");
                    switchContents[key].classList.add("visible");
                } else {
                    switchContents[key].classList.remove("visible");
                    switchContents[key].classList.add("hidden");
                }
            });
        });
    });

    // Calculate button behavior
    document.getElementById("calculateButton").addEventListener("click", () => {
        // Identify the active switch
        const activeSwitch = Array.from(toggleSwitches).find(switchInput => switchInput.checked);
        if (!activeSwitch) {
            alert("Please activate a switch first.");
            return;
        }

        // Get the corresponding div for the active switch
        const activeDiv = switchContents[activeSwitch.id];
        const energyInput = activeDiv.querySelector(".energyInput");
        const energyAmount = Number(energyInput.value);
        const energyTypeButton = activeDiv.querySelector(".buttons button[data-type]:focus");
        const energyType = energyTypeButton ? energyTypeButton.getAttribute("data-type") : null;

        if (isNaN(energyAmount) || energyAmount <= 0) {
            alert("Please enter a valid energy amount.");
            return;
        }

        if (!energyType) {
            alert("Please select an energy type.");
            return;
        }

        // Calculate categories and update the visualization
        const categories = calculatePower(energyAmount, energyType);
        highlightCountriesByCategory(categories);
        showCategoryChart(categories);
    });
});


document.addEventListener("DOMContentLoaded", async () => {
    await fetchEnergyData();

    document.querySelectorAll(".switches > div").forEach((switchElement) => {
        switchElement.addEventListener("click", () => {
            activateSwitch(switchElement);
        });
    });

    document.getElementById("calculateButton").addEventListener("click", () => {
        if (!activeSwitch) {
            alert("Please activate a switch first.");
            return;
        }

        const energyInput = activeSwitch.querySelector(".energyInput");
        const energyAmount = Number(energyInput.value);
        const energyType = energyInput.getAttribute("data-type");

        if (isNaN(energyAmount) || energyAmount <= 0) {
            alert("Please enter a valid energy amount.");
            return;
        }

        const categories = calculatePowerCategories(energyAmount, energyType);
        highlightCountriesByCategory(categories);
        showCategoryChart(categories);
    });

    document.querySelectorAll(".allPaths").forEach((countryElement) => {
        countryElement.addEventListener("mouseover", (event) => {
            const x = event.clientX;
            const y = event.clientY;

            document.getElementById("name").style.top = `${y - 60}px`;
            document.getElementById("name").style.left = `${x + 10}px`;
            document.getElementById("name").style.opacity = 1;
            document.getElementById("namep").innerText = countryElement.id;

            countryElement.style.fill = "cyan";
        });

        countryElement.addEventListener("mouseleave", () => {
            document.getElementById("name").style.opacity = 0;
            countryElement.style.fill = "#ececec";
        });

        countryElement.addEventListener("click", () => {
            console.log("Country clicked:", countryElement.id);
        });
    });
});