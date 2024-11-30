document.addEventListener("DOMContentLoaded", () => {
    const modeSwitches = document.querySelectorAll(".mode-switches .toggle-switch input");
    const modeContainers = document.querySelectorAll(".modes-container > div");

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
    const quantityInputs = targetContainer.querySelectorAll('.energy-quantity');

    let totalEnergy = 0;

    checkboxes.forEach((checkbox, index) => {
        const value = parseInt(checkbox.value, 10);
        const quantityInput = quantityInputs[index];
        const quantity = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;

        totalEnergy += value * quantity;
    });

    document.getElementById("energy-result").textContent = totalEnergy;
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

let energyData = {};
let currentMode = "basic";

async function loadEnergyData() {
    try {
        let jsonFile;

        switch(currentMode) {
            case "brainrot":
                jsonFile = "../cursed-echnique-amplification-blue/curse-energy/aura.json";
                break;
            case "cosmic":
                jsonFile = "../cursed-echnique-amplification-blue/curse-energy/cosmic.json";
                break;
            case "whatif":
                jsonFile = "../cursed-echnique-amplification-blue/curse-energy/whatif.json";
                break;
            default:
                jsonFile = "../cursed-echnique-amplification-blue/curse-energy/energy.json";
                break;
        }

    } catch (error) {
        console.error('Failed to load energy data:', error);
    }
}

let energyChart = new Chart(document.getElementById('energy-chart'), {
    type: 'bar',
    data: {
        labels: ['Oil', 'Electricity', 'Nuclear', 'Total'],
        datasets: [{
            label: 'Energy Usage (TWh)',
            data: [0, 0, 0, 0],
            backgroundColor: ['#ff7f50', '#4682b4', '#90ee90', '#d2691e']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

document.querySelectorAll('.allPaths').forEach(path => {
    path.addEventListener('click', () => {
        const countryId = path.getAttribute('id');
        const countryData = energyData[countryId];

        if (countryData) {
            const total = countryData.oil + countryData.electricity + countryData.nuclear;
            energyChart.data.datasets[0].data = [
                countryData.oil,
                countryData.electricity,
                countryData.nuclear,
                total
            ];
            energyChart.update();
        } else {
            alert(`No data available for ${countryId}`);
        }
    });
});

loadEnergyData();
