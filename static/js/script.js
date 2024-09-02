// Function to populate the table based on filters

function populateTable(data, filterCategory = 'all', filterService = 'all') {
    console.log("Populating table with filters: Category =", filterCategory, "Service =", filterService);

    const tableBody = document.getElementById('calculatorTableBody');
    tableBody.innerHTML = ''; // Clear the table

    let residentialStarted = false;
    let businessStarted = false;
    let attStarted = false;
    let colorToggle = true; // Initialize the color toggle

    data.forEach(service => {
        // Apply filters
        if (filterCategory !== 'all') {
            if (filterCategory === 'residential' && (service.isBusiness || service.isATT)) return;
            if (filterCategory === 'business' && (!service.isBusiness || service.isATT)) return;
            if (filterCategory === 'att' && !service.isATT) return;
        }
        if (filterService !== 'all' && filterService !== service.service) {
            return;
        }

        // Add residential and business headers
        if (!residentialStarted && !service.isBusiness && !service.isATT) {
            const residentialHeader = document.createElement('tr');
            residentialHeader.innerHTML = `<td colspan="6" class="residential-header">Residential</td>`;
            tableBody.appendChild(residentialHeader);
            residentialStarted = true;
        }

        if (service.isBusiness && !businessStarted) {
            const businessHeader = document.createElement('tr');
            businessHeader.innerHTML = `<td colspan="6" class="business-header">Business</td>`;
            tableBody.appendChild(businessHeader);
            businessStarted = true;
        }

        // Add AT&T header
        if (service.isATT && !attStarted) {
            const attHeader = document.createElement('tr');
            attHeader.innerHTML = `<td colspan="6" class="att-header">AT&T Internet</td>`;
            tableBody.appendChild(attHeader);

            const attSubHeader = document.createElement('tr');
            attSubHeader.innerHTML = `
                <td class="service-header">Service Name</td>
                <td class="plan-header">Plan Name</td>
                <td class="points-header">Single Service</td>
                <td class="points-header">2 Service Bundle</td>
                <td class="points-header">3 Service Bundle</td>
                <td class="cost-header">Cost</td>`;
            tableBody.appendChild(attSubHeader);

            attStarted = true;
        }

        // Set text color based on toggle
        const textColorClass = colorToggle ? 'black-text' : 'orange-text';
        colorToggle = !colorToggle; // Toggle the color for the next service

        // Insert image or service name
        let serviceCell;
        switch(service.service) {
            case "Truvvi Lifestyle":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/Nr0vv2h/La-libertad-porta-truvvi-768x432-1.png" alt="Truvvi Lifestyle" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "ID Seal":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/dKF0G52/ID-Seal.png" alt="Id Seal" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Vivint":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/BnZvb7B/vivintcheck.png" alt="Vivint" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Flash Mobile":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/jV6Y715/images-2-1.png" alt="Flash Mobile" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Xoom":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/2F9gkLX/xe-logo-color.jpg" alt="Xoom Energy" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Dish Network":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/nBp9XVK/dish-1000x431-1.jpg" alt="Dish Network" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "DirectV":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/ZfP4Sfn/1689300085422-1.jpg" alt="DirectV" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "DirectV Business":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/hFb1PTz/1689300085422.jpg" alt="DirectV" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Spectrum":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/TvyF0wj/77295d1471c24b7953064f6617cf0395.jpg" alt="Spectrum" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Impact":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/mbfBQcG/logo-primary-1.webp" alt="Impact" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Impact Business":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/mbfBQcG/logo-primary-1.webp" alt="Impact" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Home & Business Security & Automation":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/PhFwfcC/65674479dfb2953b600fa625-65660278bb41ad573002f5e0-Vivint2-website-logo-Mockup-1-Mockup-2-2804373-1.png" alt="Home & Business Security & Automation" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "ADP":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/wzSymzd/ADP.png" alt="ADP" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Business Internet":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/5jJZ3Z1/unnamed.png" alt="Business Internet" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Intermedia":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/92nPcw9/intermedia-Logo-1.jpg" alt="Intermedia" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "nmi":
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/wpX6Q80/nmi-logo-gradient-purple-rgb-2.jpg" alt="nmi" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "AT&T Internet":
                
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/fxphz3h/AT-T-logo-2016.png" alt="nmi" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            
            case "AT&T Wireless":
                
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/fxphz3h/AT-T-logo-2016.png" alt="nmi" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;

            case "Kinetic by Windstream Internet":
                
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/D1j47gk/kinetic-by-windstream-black.png" alt="nmi" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Ziply Fiber Internet":
                
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/dgvvkR3/d.png" alt="nmi" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;
            case "Frontier Internet":
                
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}" style="padding: 0; text-align: center; vertical-align: middle;">
                    <img src="https://i.ibb.co/fGqrY9R/Frontier-Primary-Logo-RGB-Red.jpg" alt="nmi" style="width: 150px; height: 100px; object-fit: contain;">
                </td>`;
                break;

            default:
                serviceCell = `<td rowspan="${service.plans.length}" class="service-name ${textColorClass}">${service.service}</td>`;
                break;
        }

        // Populate plans
        service.plans.forEach((plan, index) => {
            let pointsCell = "";
            if (service.isATT) {
                pointsCell = `<td class="points ${textColorClass}">${plan.singleService}</td>
                              <td class="points ${textColorClass}">${plan.twoServiceBundle}</td>
                              <td class="points ${textColorClass}">${plan.threeServiceBundle}</td>`;
            } else {
                pointsCell = `<td class="points ${textColorClass}">${plan.points}</td>`;
            }

            let costCell = plan.cost === 'TBD' || plan.cost.includes('-') || plan.cost.includes('+') || plan.cost.includes('up to') ?
                `<td class="cost-cell ${textColorClass}"><span class="cost-value">${plan.cost}</span><span class="pencil-icon">✏️</span><input type="text" class="cost-input" style="display:none;"><span class="icon-container" style="display:none;"><i class="tick-icon">✔️</i><i class="cancel-icon">❌</i></span></td>` :
                `<td class="cost-cell ${textColorClass}"><span class="cost-value">${plan.cost}</span></td>`;

            const row = document.createElement('tr');
            if (index === 0) {
                row.innerHTML = `${serviceCell}<td class="plan-details ${textColorClass}">${plan.name}</td>${pointsCell}${costCell}<td><input type="checkbox" class="plan-checkbox"></td>`;
            } else {
                row.innerHTML = `<td class="plan-details ${textColorClass}">${plan.name}</td>${pointsCell}${costCell}<td><input type="checkbox" class="plan-checkbox"></td>`;
            }
            tableBody.appendChild(row);
        });
    });

    console.log("Table populated with filtered data.");
    reapplyEventListeners(); // Reapply event listeners
    toggleCheckboxesVisibility(false); // Ensure visibility is consistent after repopulating the table
}


console.log(servicesData);

populateTable(servicesData);

// Function to populate filter dropdowns with service names
function populateFilterDropdowns() {
    const filterService = document.getElementById('filterService');
    filterService.innerHTML = '<option value="all">All Services</option>'; // Reset dropdown
    const uniqueServices = new Set();

    servicesData.forEach(service => {
        uniqueServices.add(service.service);
    });

    uniqueServices.forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        filterService.appendChild(option);
    });
    console.log("Filter dropdowns populated.");
}

// Function to toggle checkboxes and pencil icons visibility
function toggleCheckboxesVisibility(showCheckboxes) {
    const checkboxes = document.querySelectorAll('.plan-checkbox');
    const pencilIcons = document.querySelectorAll('.pencil-icon');
    const calculateBtn = document.getElementById('calculateBtn');
    const toggleOffBtn = document.getElementById('toggleOffBtn');

    checkboxes.forEach(checkbox => {
        checkbox.style.display = showCheckboxes ? "inline-block" : "none";
        checkbox.checked = false; // Uncheck all checkboxes when hiding
    });

    pencilIcons.forEach(icon => {
        icon.style.display = showCheckboxes ? "inline-block" : "none";
    });

    calculateBtn.style.display = showCheckboxes ? "inline-block" : "none";
    toggleOffBtn.style.display = showCheckboxes ? "inline-block" : "none";
}

// Function to reapply event listeners
function reapplyEventListeners() {
    console.log("Reapplying event listeners...");
    
    // Handle cost editing
    handleCostEditing();

    // Reattach listeners for calculating selected items
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.removeEventListener('click', calculateSelected); // Prevent duplicate listeners
    calculateBtn.addEventListener('click', calculateSelected);

    console.log("Event listeners reapplied.");
}

// Function to handle editing of cost
// Function to handle editing of cost
function handleCostEditing() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('pencil-icon')) {
            const costCell = e.target.closest('.cost-cell');
            const costValue = costCell.querySelector('.cost-value');
            const costInput = costCell.querySelector('.cost-input');
            const iconContainer = costCell.querySelector('.icon-container');

            costValue.style.display = 'none';
            costInput.style.display = 'inline-block';
            iconContainer.style.display = 'inline-block';
            costInput.value = ''; // Clear previous input

            console.log("Pencil icon clicked, showing input field.");
        } else if (e.target.classList.contains('tick-icon')) {
            const costCell = e.target.closest('.cost-cell');
            const costValue = costCell.querySelector('.cost-value');
            const costInput = costCell.querySelector('.cost-input');
            const iconContainer = costCell.querySelector('.icon-container');

            const newCost = costInput.value ? `$${parseFloat(costInput.value).toFixed(2)}` : costValue.innerText;  // Keeps range if no value is provided
            costValue.innerText = newCost;
            costValue.style.display = 'inline-block';
            costInput.style.display = 'none';
            iconContainer.style.display = 'none';

            console.log("Tick icon clicked, updating cost value to:", newCost);
        } else if (e.target.classList.contains('cancel-icon')) {
            const costCell = e.target.closest('.cost-cell');
            const costValue = costCell.querySelector('.cost-value');
            const costInput = costCell.querySelector('.cost-input');
            const iconContainer = costCell.querySelector('.icon-container');

            costValue.style.display = 'inline-block';
            costInput.style.display = 'none';
            iconContainer.style.display = 'none';

            console.log("Cancel icon clicked, reverting to original value:", costValue.innerText);
        }
    });
}

// Ensure all inputs and icons are hidden on launch
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cost-input, .icon-container').forEach(element => {
        element.style.display = 'none';
    });
});

function getServiceNameFromRow(row) {
    const imgSrc = row.querySelector('img') ? row.querySelector('img').src : '';
    let serviceName = '';

    console.log(imgSrc)

    switch (imgSrc) {
        case "https://i.ibb.co/Nr0vv2h/La-libertad-porta-truvvi-768x432-1.png":
            serviceName = "Truvvi Lifestyle";
            break;
        case "https://i.ibb.co/dKF0G52/ID-Seal.png":
            serviceName = "ID Seal";
            break;
        case "https://i.ibb.co/BnZvb7B/vivintcheck.png":
            serviceName = "Vivint";
            break;
        case "https://i.ibb.co/jV6Y715/images-2-1.png":
            serviceName = "Flash Mobile";
            break;
        case "https://i.ibb.co/2F9gkLX/xe-logo-color.jpg":
            serviceName = "Xoom";
            break;
        case "https://i.ibb.co/nBp9XVK/dish-1000x431-1.jpg":
            serviceName = "Dish Network";
            break;
        case "https://i.ibb.co/ZfP4Sfn/1689300085422-1.jpg":
            serviceName = "DirectV";
            console.log(serviceName)
            break;
        case "https://i.ibb.co/hFb1PTz/1689300085422.jpg":
            serviceName = "DirectV Business"
            console.log (serviceName)
            break; 
        case "https://i.ibb.co/TvyF0wj/77295d1471c24b7953064f6617cf0395.jpg":
            serviceName = "Spectrum";
            break;
        case "https://i.ibb.co/mbfBQcG/logo-primary-1.webp":
            serviceName = "Impact";
            break;
        case "https://i.ibb.co/fxphz3h/AT-T-logo-2016.png":
            serviceName = "AT&T Wireless";
            break;
        // Add other cases here...
        default:
            serviceName = "Unknown Service";
            break;
    }

    return serviceName;
}
// Function to calculate selected plans' costs and points
function calculateSelected() {
    const checkboxes = document.querySelectorAll('.plan-checkbox');
    let totalCost = 0;
    let totalPoints = 0;
    let totalServices = 0;

    let attWirelessSelected = false;
    let attCategorySelected = false;

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            totalServices++;
            const row = checkbox.closest('tr');

            // Get the service name using the helper function
            const serviceName = getServiceNameFromRow(row);

            console.log("Service Name:", serviceName);  // Debugging log
            console.log(serviceName.imgSrc)

            const costText = row.querySelector('.cost-value').innerText;
            const cost = costText.includes('-') || costText.includes('+') || costText.includes('up to') ? 0 : parseFloat(costText.replace('$', ''));

            let pointsText = row.querySelector('.points').textContent.trim();

            // Check if AT&T Wireless is selected
            if (serviceName.includes("AT&T Wireless")) {
                attWirelessSelected = true;
                console.log("AT&T Wireless is selected");
            }

            // Check if any AT&T category service is selected
            if (row.closest('.att-header')) {
                attCategorySelected = true;
                console.log("AT&T category service is selected");

                // If AT&T Wireless is selected with any AT&T service, use the 2-service bundle points
                if (attWirelessSelected) {
                    pointsText = row.querySelectorAll('.points')[1].textContent.trim(); // Selects 2-service bundle points
                }
            }

            const points = parseInt(pointsText) || 0;

            totalCost += cost;
            totalPoints += points;

            console.log(`Row ${index + 1} selected: Cost = ${cost}, Points = ${points}`);
        }
    });

    // Add points for AT&T Wireless if selected
    if (attWirelessSelected && !attCategorySelected) {
        const atTWServicePoints = servicesData.find(service => service.service === "AT&T Wireless").plans[0].points;
        totalPoints += parseInt(atTWServicePoints) || 0;
    }

    // Update the calculation summary
    document.getElementById('totalServices').innerText = totalServices;
    document.getElementById('totalPoints').innerText = totalPoints;
    document.getElementById('totalCost').innerText = `$${totalCost.toFixed(2)}`;

    // Show the calculation summary and download section
    const divider = document.getElementById('calculationDivider');
    if (divider) divider.style.display = 'block';

    const calculationHeadline = document.getElementById('calculationHeadline');
    if (calculationHeadline) calculationHeadline.style.display = 'block';

    const calculationSummary = document.getElementById('calculationSummary');
    if (calculationSummary) calculationSummary.style.display = 'block';

    const downloadHeadline = document.getElementById('downloadHeadline');
    if (downloadHeadline) downloadHeadline.style.display = 'block';

    // Provide feedback based on the user's calculation
    provideFeedback(totalServices, totalPoints);

    const calculationFeedback = document.getElementById('calculationFeedback');
    if (calculationFeedback) calculationFeedback.style.display = 'block';

    console.log("Calculation complete: Total Services =", totalServices, "Total Cost =", totalCost, "Total Points =", totalPoints);
}
// function calculateSelected() {
//     const checkboxes = document.querySelectorAll('.plan-checkbox');
//     let totalCost = 0;
//     let totalPoints = 0;
//     let totalServices = 0;

//     checkboxes.forEach((checkbox, index) => {
//         if (checkbox.checked) {
//             totalServices++;
//             const row = checkbox.closest('tr');
            
//             const costText = row.querySelector('.cost-value').innerText;
//             const cost = costText.includes('-') || costText.includes('+') || costText.includes('up to') ? 0 : parseFloat(costText.replace('$', ''));
            
//             const pointsText = row.querySelector('.points').textContent.trim();
//             const points = parseInt(pointsText) || 0;

//             totalCost += cost;
//             totalPoints += points;

//             console.log(`Row ${index + 1} selected: Cost = ${cost}, Points = ${points}`);
//         }
//     });

//     // Update the calculation summary
//     document.getElementById('totalServices').innerText = totalServices;
//     document.getElementById('totalPoints').innerText = totalPoints;
//     document.getElementById('totalCost').innerText = `$${totalCost.toFixed(2)}`;

//     // Show the calculation summary and download section
//     const divider = document.getElementById('calculationDivider');
//     if (divider) divider.style.display = 'block';

//     const calculationHeadline = document.getElementById('calculationHeadline');
//     if (calculationHeadline) calculationHeadline.style.display = 'block';

//     const calculationSummary = document.getElementById('calculationSummary');
//     if (calculationSummary) calculationSummary.style.display = 'block';

//     const downloadHeadline = document.getElementById('downloadHeadline');
//     if (downloadHeadline) downloadHeadline.style.display = 'block';

//     // Provide feedback based on the user's calculation
//     provideFeedback(totalServices, totalPoints);

//     const calculationFeedback = document.getElementById('calculationFeedback');
//     if (calculationFeedback) calculationFeedback.style.display = 'block';

//     console.log("Calculation complete: Total Services =", totalServices, "Total Cost =", totalCost, "Total Points =", totalPoints);
// } 

// Function to provide feedback based on calculation
function provideFeedback(totalServices, totalPoints) {
    const feedbackContainer = document.getElementById('calculationFeedback');
    feedbackContainer.innerHTML = ''; // Clear previous feedback

    let feedbackText = '';

    console.log("Generating feedback...");

    // Initialize arrays to collect needed services and points
    let servicesNeeded = 0;
    let pointsNeeded = 0;

    // Check CQ qualification
    if (totalServices < 3) {
        servicesNeeded = 3 - totalServices;
        pointsNeeded = Math.max(0, 7 - totalPoints);
        feedbackText += `You need ${servicesNeeded} more service${servicesNeeded > 1 ? 's' : ''} and ${pointsNeeded} more point${pointsNeeded > 1 ? 's' : ''} to reach CQ. `;
    } else if (totalPoints < 7) {
        pointsNeeded = 7 - totalPoints;
        feedbackText += `You need ${pointsNeeded} more point${pointsNeeded > 1 ? 's' : ''} to reach CQ. `;
    }

    // Check $200 bonus qualification
    if (totalServices < 5 || totalPoints < 10) {
        servicesNeeded = 5 - totalServices;
        pointsNeeded = 10 - totalPoints;
        feedbackText += `To reach the $200 bonus, you need ${servicesNeeded > 0 ? servicesNeeded + ' more service' + (servicesNeeded > 1 ? 's' : '') : ''}${servicesNeeded > 0 && pointsNeeded > 0 ? ' and ' : ''}${pointsNeeded > 0 ? pointsNeeded + ' more point' + (pointsNeeded > 1 ? 's' : '') : ''}. `;
    }

    // Check EQL qualification
    if (totalPoints < 30) {
        pointsNeeded = 30 - totalPoints;
        feedbackText += `To reach EQL, you need ${pointsNeeded} more point${pointsNeeded > 1 ? 's' : ''}. `;
    }

    // Check $500 bonus qualification (requires at least 15 points and 1 downline)
    if (totalPoints < 15) {
        pointsNeeded = 15 - totalPoints;
        feedbackText += `For the $500 bonus, you need ${pointsNeeded} more point${pointsNeeded > 1 ? 's' : ''} and 1 team member downline.`;
    }

    console.log("Feedback generated:", feedbackText);

    // Display the feedback
    feedbackContainer.innerText = feedbackText.trim();
}

// Function to download selected items as Excel
function downloadAsExcel() {
    const selectedData = getSelectedData();
    let csvContent = convertToCSV(selectedData);

    let blob = new Blob([csvContent], { type: 'application/vnd.ms-excel' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'selected-data.xls';
    a.click();
    window.URL.revokeObjectURL(url);

    console.log("Data downloaded as Excel.");
}

// Function to download selected items as CSV
function downloadAsCsv() {
    const selectedData = getSelectedData();
    let csvContent = convertToCSV(selectedData);

    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'selected-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    console.log("Data downloaded as CSV.");
}

// Helper function to get selected data
function getSelectedData() {
    const checkboxes = document.querySelectorAll('.plan-checkbox');
    const selectedRows = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            const service = row.querySelector('.service-name') ? row.querySelector('.service-name').innerText.trim() : '';
            const plan = row.querySelector('.plan-details').innerText.trim();
            const points = row.querySelector('.points').innerText.trim();
            const cost = row.querySelector('.cost-value').innerText.trim();

            selectedRows.push({ service, plan, points, cost });
        }
    });

    console.log("Selected data extracted:", selectedRows);
    return selectedRows;
}

// Helper function to convert data to CSV
function convertToCSV(data) {
    const headers = ['Service Name', 'Plan Name', 'Customer Points', 'Cost'];
    let csvRows = data.map(row => `${row.service},${row.plan},${row.points},${row.cost}`);
    csvRows.unshift(headers.join(','));
    
    // Add detailed summary at the end of the CSV
    csvRows.push('');
    csvRows.push(`Total Services,${document.getElementById('totalServices').innerText}`);
    csvRows.push(`Total Points,${document.getElementById('totalPoints').innerText}`);
    csvRows.push(`Total Cost,${document.getElementById('totalCost').innerText}`);
    
    console.log("CSV content generated.");
    return csvRows.join('\n');
}

// Toggle filters visibility
// Function to toggle filters visibility and reset button visibility
function toggleFilters() {
    const filterCategory = document.getElementById('filterCategory');
    const filterService = document.getElementById('filterService');
    const goBtn = document.getElementById('goBtn');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');

    const isFiltersVisible = filterCategory.style.display !== 'none';

    filterCategory.style.display = isFiltersVisible ? 'none' : 'inline-block';
    filterService.style.display = isFiltersVisible ? 'none' : 'inline-block';
    goBtn.style.display = isFiltersVisible ? 'none' : 'inline-block';
    resetFiltersBtn.style.display = isFiltersVisible ? 'none' : 'inline-block';
}

document.getElementById('getServiceLinksBtn').addEventListener('click', function () {
    document.getElementById('iboInputContainer').style.display = 'flex';
});

document.getElementById('submitIboBtn').addEventListener('click', function () {
    const iboNumber = document.getElementById('iboNumber').value;
    if (!iboNumber) {
        alert('Please enter your IBO number.');
        return;
    }

    // Show loading indicator or progress bar (optional)
    alert('Generating links, please wait...');

    fetch('https://calculatorvercel-lnjps57xz-gary-roys-projects.vercel.app/scrape-links', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ iboNumber: iboNumber })
    })
        .then(response => response.json())
        .then(data => {
            if (data.links && data.links.length > 0) {
                alert('Download your service links from below.');
                const csvContent = data.links.map(link => link).join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = window.URL.createObjectURL(blob);
                const downloadBtn = document.createElement('button');
                downloadBtn.innerText = 'Download your service links';
                downloadBtn.onclick = () => {
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'service-links.csv';
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
                document.body.appendChild(downloadBtn);
            } else {
                alert('No links found.');
            }
        })
        .catch(error => {
            alert('An error occurred: ' + error.message);
        });
});

// Initialize the table and button functionality
console.log("Initializing table and event listeners...");
populateTable(servicesData);
populateFilterDropdowns();
reapplyEventListeners();

const startCalculatingBtn = document.getElementById('startCalculatingBtn');
const toggleOffBtn = document.getElementById('toggleOffBtn');
const calculateBtn = document.getElementById('calculateBtn');
const downloadExcelBtn = document.getElementById('downloadExcelBtn');
const filtersBtn = document.getElementById('filtersBtn');
const goBtn = document.getElementById('goBtn');

const toggleFunction = () => toggleCheckboxesVisibility(true);
startCalculatingBtn.addEventListener('click', toggleFunction);
toggleOffBtn.addEventListener('click', () => toggleCheckboxesVisibility(false));
calculateBtn.addEventListener('click', calculateSelected);
downloadExcelBtn.addEventListener('click', downloadAsExcel);

// Event listeners for filters
filtersBtn.addEventListener('click', toggleFilters);
goBtn.addEventListener('click', () => {
    const filterCategory = document.getElementById('filterCategory').value;
    const filterService = document.getElementById('filterService').value;
    console.log("Filter applied: Category =", filterCategory, "Service =", filterService);
    populateTable(servicesData, filterCategory, filterService);
});

// Reset Filters Button functionality
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
resetFiltersBtn.addEventListener('click', () => {
    // Reset filter dropdowns to 'all'
    document.getElementById('filterCategory').value = 'all';
    document.getElementById('filterService').value = 'all';

    // Repopulate the table with all services
    populateTable(servicesData);

    // Hide Reset Filters button after resetting
    resetFiltersBtn.style.display = 'none';
});