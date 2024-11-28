
const energyOutputPerUnit = {

};

document.addEventListener("DOMContentLoaded", async () => {
    await fetchEnergyData();

    document.getElementById("calculateButton").addEventListener("click", () => {
        const energyAmount = Number(document.getElementById("energyInput").value);
        const energyType = document.getElementById("energyType").value;

        if (isNaN(energyAmount) || energyAmount <= 0) {
            alert("Please enter a valid energy amount.");
            return;
        }

        const categories = calculatePowerCategories(energyAmount, energyType);
        highlightCountriesByCategory(categories);
        showCategoryChart(categories);
    });

async function getEnergyConsumption(country) {
    const api_url = '../cursed-echnique-amplification-blue/curse-energy/energy.json'; 

    console.log("Fetching from:", api_url); 

    try {
        const response = await fetch(api_url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data fetched:", data); 

        const consumptionData = data[country]?.consumption || "Data unavailable";
        document.getElementById("energy").innerText = `${country}'s energy consumption = ${consumptionData} MWh`;
    } catch (error) {
        console.error("Fetch Error:", error); 
        document.getElementById("energy").innerText = `Could not fetch data for ${country}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".allPaths").forEach(e => {
        e.setAttribute('class', `allPaths ${e.id}`);
        e.addEventListener("mouseover", function () {
            window.onmousemove = function (j) {
                const x = j.clientX;
                const y = j.clientY;
                document.getElementById('name').style.top = y - 60 + 'px';
                document.getElementById('name').style.left = x + 10 + 'px';
            }
            const classes = e.className.baseVal.replace(/ /g, '.');
            document.querySelectorAll(`.${classes}`).forEach(country => {
                country.style.fill = "cyan";
            });
            document.getElementById("name").style.opacity = 1;

            document.getElementById("namep").innerText = e.id;
        });
        e.addEventListener("mouseleave", function () {
            const classes = e.className.baseVal.replace(/ /g, '.');
            document.querySelectorAll(`.${classes}`).forEach(country => {
                country.style.fill = "#ececec";
                
            });
            document.getElementById("name").style.opacity = 0;
        });

        e.addEventListener("click", function () {
            console.log("Country clicked:", e.id); 
            getEnergyConsumption(e.id);
        });
    });
});
});