// HELLO IF YOU ARE READING THIS IM JUST ADDING THIS TO LET YOU KNOW
// THAT I DO NOT KNOW WTF AM I DOING 
// SO BASICALLY I DIDN'T PLAN ANYTHING AND JUST TRUSTED GOD AND IDEAS KEPT POPPING IN A NOT CHRONOLOGICAL ORDER
// SO THINGS GETS MIXED UP I THINK THIS IS THE 4TH? I CHANGED THE WHOLE THING TO KEEP THINGS STRAIGHT
//ANY WHO'S GOD BLESS READING THIS THING 
let energyData = {};
let currentMode = "basic"; 

document.addEventListener("DOMContentLoaded", () => {
    const modeSwitches = document.querySelectorAll(".mode-switches .toggle-switch input");
    const modeContainers = document.querySelectorAll(".modes-container > div");
    console.log(switchEl.checked)
    modeSwitches.forEach((switchEl, index) => {
        switchEl.addEventListener("change", () => {
            if (switchEl.checked) {

                modeSwitches.forEach((otherSwitch, otherIndex) => {
                    if (index !== otherIndex) {
                        otherSwitch.checked = false;
                    }
                });
                modeContainers.forEach((container, containerIndex) => {
                    container.style.display = containerIndex === index ? "block" : "none";
                });
            } else {
                modeContainers.forEach((container) => {
                    container.style.display = "none";
                });
            }
        });
    });

    modeContainers.forEach((container) => {
        const switches = container.querySelectorAll(".toggle-switch input");
        switches.forEach((switchEl, index) => {
            switchEl.addEventListener("change", () => {
                if (switchEl.checked) {
                    switches.forEach((otherSwitch, otherIndex) => {
                        if (index !== otherIndex) {
                            otherSwitch.checked = false;
                        }
                    });
                }
            });
        });
    });

    modeContainers.forEach((container) => {
        container.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modeSwitches = document.querySelectorAll('input[name="mode"]');
    const containers = document.querySelectorAll(".modes-container > div");

    modeSwitches.forEach((switchElem) => {
        switchElem.addEventListener("change", () => {
            modeSwitches.forEach((otherSwitch) => {
                if (otherSwitch !== switchElem) {
                    otherSwitch.checked = false;
                }
            });

            containers.forEach((container) => {
                container.classList.add("hidden");
            });

            if (switchElem.checked) {
                const targetContainerClass = switchElem.getAttribute("data-container");
                const targetContainer = document.querySelector(`.${targetContainerClass}`);

                if (targetContainer) {
                    targetContainer.classList.remove("hidden");
                } else {
                    console.error("No active container found for the selected mode!");
                }
            }
        });
    });
});
function calculateEnergy() {
    const activeMode = document.querySelector('input[name="mode"]:checked');
    if (!activeMode) {
        alert("Please select a mode first!");
        return;
    }

    const targetContainerClass = activeMode.getAttribute("data-container");
    const targetContainer = document.querySelector(`.${targetContainerClass}`);
    if (!targetContainer) {
        alert("No active container found for the selected mode!");
        return;
    }

    const checkboxes = targetContainer.querySelectorAll('input[type="checkbox"]:checked');
    const quantityInputs = targetContainer.querySelectorAll(".energy-quantity");

    let totalEnergy = 0;
    checkboxes.forEach((checkbox, index) => {
        const value = parseInt(checkbox.value, 10);
        const quantityInput = quantityInputs[index];
        const quantity = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;

        totalEnergy += value * quantity;
    });

    document.getElementById("energy-result").textContent = totalEnergy;

    // Update chart with computed data
    const worldValues = Object.values(worldData);
    const computedData = [...worldValues.slice(0, 4), totalEnergy]; // Include the first 4 from world.json and add the computed value

    energyChart.data.datasets[0].data = computedData;
    energyChart.update();
}

// THIS PART IS THE WORLD JS ================================================================================

document.querySelectorAll(".allPaths").forEach(e => {
    e.setAttribute('class', `allPaths ${e.id}`);
    
    // Handle Mouseover Effect
    e.addEventListener("mouseover", function () {
        window.onmousemove = function (j) {
            x = j.clientX
            y = j.clientY
            document.getElementById('name').style.top = y - 60 + 'px';
            document.getElementById('name').style.left = x + 10 + 'px';
        }

        // Highlight the country on hover
        const classes = e.className.baseVal.replace(/ /g, '.');
        document.querySelectorAll(`.${classes}`).forEach(country => {
            country.style.fill = "pink";
        });

        document.getElementById("name").style.opacity = 1;
        document.getElementById("namep").innerText = e.id;
    });

    // Reset the hover effect when mouse leaves
    e.addEventListener("mouseleave", function () {
        const classes = e.className.baseVal.replace(/ /g, '.');
        document.querySelectorAll(`.${classes}`).forEach(country => {
            country.style.fill = "#ececec";
        });

        document.getElementById("name").style.opacity = 0;
    });

    // Handle country clicks and fetch data for chart
    e.addEventListener("click", function () {
        getUser(e.id);
    });
});

// THIS PART IS THE CHART JS ================================================================================


function getLabelsByMode(currentMode) {
    switch (currentMode) {
        case "brainrot":
            return ["Aura", "Rizz", "Skibidi"];
        case "cosmic":
            return ["Starlight", "Nebula", "Gravity"];
        case "whatif":
            return ["Imagination", "Speculation", "Possibility"];
        case "basic":
        default:
            return ["Oil", "Electricity", "Nuclear"];
    }
}

async function loadEnergyData() {
    try {
        let jsonFile;
        switch (currentMode) {
            case "brainrot":
                jsonFile = "aura.json";
                break;
            case "cosmic":
                jsonFile = "cosmic.json";
                break;
            case "whatif":
                jsonFile = "whatif.json";
                break;
            default:
                jsonFile = "energy.json";
                break;
        }

        let response = await fetch(`../cursed-echnique-amplification-blue/curse-energy/${jsonFile}`);
        energyData = await response.json();
        const labelsName = getLabelsByMode(currentMode);
        const firstCountry = Object.values(energyData)[0];
        if (firstCountry) {
            updateChartLabels(labelsName);
            updateChartData(new Array(labelsName.length).fill(0));
            energyChart.data.datasets[0].data = Object.values(firstCountry);
            energyChart.update(); 
        }
    } catch (error) {
        console.error(`Failed to load data for mode "${currentMode}":`, error);
    }
}

function updateChartLabels(labels) {
    energyChart.data.labels = [...labels, "Total"];
    energyChart.update();
}

function updateChartData(data) {
    energyChart.data.datasets[0].data = data;
    energyChart.update();
}


async function loadWorldData() {
    try {
        const response = await fetch("../cursed-echnique-amplification-blue/curse-energy/world.json");
        worldData = await response.json();
        console.log("World data loaded:", worldData);
    } catch (error) {
        console.error("Failed to load world data:", error);
    }
}

document.querySelectorAll(".chart-type-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const newType = button.getAttribute("data-type");

        if (energyChart) {
            energyChart.destroy();
        }

        energyChart = new Chart(document.getElementById("energy-chart"), {
            type: newType,
            data: {
                ...energyChart.data,
            },
            options: {
                ...energyChart.options,
            },
        });
    });
});

let energyChart = new Chart(document.getElementById("energy-chart"), {
    type: "bar", 
    data: {
        labels: ["Loading...", "Please select a mode"],
        datasets: [{
            label: "Energy Usage (TWh)",
            data: [0, 0, 0, 0],
            backgroundColor: ["#ff7f50", "#4682b4", "#90ee90", "#d2691e"]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw} TWh`;
                    }
                }
            }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});


document.querySelectorAll(".mode-switches .toggle-switch input").forEach((switchEl) => {
    switchEl.addEventListener("change", () => {
        if (switchEl.checked) {
            currentMode = switchEl.getAttribute("id"); 
            loadEnergyData(); 
        }
    });
});

document.querySelectorAll(".allPaths").forEach((path) => {
    path.addEventListener("click", () => {
        const countryId = path.getAttribute("id");
        const countryData = energyData[countryId];

        if (countryData) {
            const dataValues = Object.values(countryData);
            const total = dataValues.reduce((sum, val) => sum + val, 0);

            energyChart.data.datasets[0].data = [...dataValues, total];
            energyChart.update();
        } else {
            alert(`No data available for ${countryId}`);
        }
    });
});


loadEnergyData();
loadWorldData();

