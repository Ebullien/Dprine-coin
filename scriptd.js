document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("vibratingImage");
  const balanceDisplay = document.getElementById("balanceValue");
  const addTokenBtn = document.getElementById("addTokenBtn");

  // Retrieve balance from localStorage or initialize it to 0
  let balance = parseInt(localStorage.getItem("balance")) || 0;
  balanceDisplay.textContent = balance; // Display the retrieved balance

  addTokenBtn.addEventListener("click", () => {
    // Start the vibration effect
    image.classList.add("vibrate");

    // Simulate adding tokens to balance
    setTimeout(() => {
      balance += 1;
      balanceDisplay.textContent = balance;

      // Save the updated balance to localStorage
      localStorage.setItem("balance", balance);

      // Stop the vibration effect after 1 second
      setTimeout(() => {
        image.classList.remove("vibrate");
      }, 1000);
    }, 500);
  });
});



// Navigate to different sections
function navigateTo(section) {
  // Clear existing content
  const content = document.getElementById('content');
  content.innerHTML = '';

  // Set new content based on section
  switch (section) {
    case 'home':
      content.innerHTML = '<h1>Home</h1><p>Welcome to the home page!</p>';
      break;
    case 'friends':
      content.innerHTML = '<h1>Friends</h1><p>Here are your friends.</p>';
      break;
    case 'tasks':
      content.innerHTML = '<h1>Tasks</h1><p>View your tasks here.</p>';
      break;
    case 'airdrop':
      content.innerHTML = `
        <h1>Airdrop</h1>
        <div id="airdropActions">
          <button id="requirementsBtn">Airdrop Requirements</button>
          <button id="withdrawBtn">Withdraw</button>
        </div>
        <div id="airdropContent"></div>
      `;

      // Event listener for "Airdrop Requirements"
      document.getElementById("requirementsBtn").addEventListener("click", () => {
        console.log("Airdrop Requirements clicked"); // Debugging
        const airdropContent = document.getElementById("airdropContent");
        airdropContent.innerHTML = `
          <ul>
            <li>✅ Complete tasks</li>
            <li>👥 Make referrals</li>
            <li>🎮 Play games to earn more tokens</li>
            <li>🔗 Connect your wallet when the date is announced</li>
          </ul>
        `;
      });

      // Event listener for "Withdraw"
      document.getElementById("withdrawBtn").addEventListener("click", () => {
        console.log("Withdraw clicked"); // Debugging
        const airdropContent = document.getElementById("airdropContent");
        airdropContent.innerHTML = `
          <div>
            <label for="withdrawAddress">Paste your withdrawal address:</label>
            <input type="text" id="withdrawAddress" placeholder="Enter wallet address" />
            <button id="connectWalletBtn">Connect</button>
            <p id="walletStatus"></p>
          </div>
        `;

        // Handle Wallet Connection
        document.getElementById("connectWalletBtn").addEventListener("click", () => {
          const address = document.getElementById("withdrawAddress").value;
          const walletStatus = document.getElementById("walletStatus");

          // Simple validation for wallet address
          if (address.toLowerCase().includes("dprine")) {
            walletStatus.textContent = "Wallet connected successfully!";
            walletStatus.style.color = "green";
          } else {
            walletStatus.textContent = "Invalid wallet address. Please enter a DPRINE wallet.";
            walletStatus.style.color = "red";
          }
        });
      });

      break;
    default:
      content.innerHTML = '<h1>Welcome</h1><p>Select an option from the navigation bar.</p>';
  }

  // Update active button (optional)
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeButton = document.querySelector(`.nav-btn[onclick="navigateTo('${section}')"]`);
  if (activeButton) activeButton.classList.add('active');
}

// Function to update the UI
function updateDisplay() {
  const balanceElement = document.getElementById("balanceValue");
  const levelElement = document.getElementById("levelValue");
  const progressBar = document.getElementById("levelProgress");

  if (balanceElement) {
    balanceElement.textContent = totalBalance.toLocaleString();
  }

  if (levelElement) {
    levelElement.textContent = currentLevel;
  }

  if (progressBar) {
    progressBar.value = totalBalance % 5000000; // Reset progress bar for every level
    progressBar.max = 5000000; // Max value is 5,000,000
  }
}

// Function to handle leveling up
function checkLevelUpByBalance() {
  if (totalBalance >= 5000000) {
    // Calculate the number of levels to increase
    const levelsToAdd = Math.floor(totalBalance / 5000000);

    // Update level and adjust balance
    currentLevel += levelsToAdd;
    totalBalance = totalBalance % 5000000; // Keep the remainder after leveling up

    // Save the updated values to localStorage
    localStorage.setItem("level", currentLevel);
    localStorage.setItem("balance", totalBalance);

    // Notify the user
    alert(`Congratulations! You've reached Level ${currentLevel}!`);

    // Update the UI
    updateDisplay();
  }
}

// Function to add balance (simulate earning tokens)
function addBalance(amount) {
  totalBalance += amount;

  // Save the updated balance to localStorage
  localStorage.setItem("balance", totalBalance);

  // Check for level-up condition
  checkLevelUpByBalance();

  // Update the UI
  updateDisplay();
}

// Initialize the app
window.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  // Simulate adding balance (for testing)
  document.getElementById("addBalanceBtn").addEventListener("click", () => {
    addBalance(1000000); // Add 1,000,000 tokens per click
  });
});


let totalBalance = playerBalance ++ ;// Initialize totalBalance with playerBalance

console.log(playerBalance);

// Declare and initialize playerBalance and totalBalance variables at the top
let playerBalance = parseInt(localStorage.getItem("playerBalance")) || 0; // Get from localStorage or default to 0

// Example: Set the username dynamically
const usernameElement = document.getElementById('username');
const balanceElement = document.getElementById('balance');

// Replace with the actual player's username fetched from your app or server
const playerUsername = 'Player456'; // Replace this with dynamic data

function updateDisplay() {
// Update totalBalance with the latest playerBalance
totalBalance = playerBalance; 
console.log("Total Balance:", totalBalance);

// Update the balance display inside the span with id="balanceValue"
document.getElementById("balanceValue").textContent = totalBalance; // Update the span with the balance
}
// Update the username and balance
usernameElement.textContent = playerUsername;
balanceElement.textContent = playerBalance;

// Initialize variables for token balance and referrals
let tokenBalance = parseInt(localStorage.getItem("balance")) || 0;
let lastClaimTime = parseInt(localStorage.getItem("lastClaimTime")) || 0;
let referrals = JSON.parse(localStorage.getItem("referrals")) || [];
const claimCooldown = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Referral System
function updateReferrals() {
  const referralsList = document.getElementById("referralsList");
  if (referralsList) {
    referralsList.innerHTML = ""; // Clear the list
    referrals.forEach((referral) => {
      const listItem = document.createElement("li");
      listItem.textContent = referral;
      referralsList.appendChild(listItem);
    });
  }
}

function addReferral(referralName) {
  if (!referralName) {
    console.error("Referral name is required");
    return;
  }

  referrals.push(referralName);
  tokenBalance += 100; // Award 100 tokens per referral
  localStorage.setItem("referrals", JSON.stringify(referrals));
  localStorage.setItem("balance", tokenBalance);
  updateBalanceDisplay();
  updateReferrals();
}

// Navigation handler
function navigateTo(page) {
  document.querySelectorAll(".page").forEach((pageElement) => {
    pageElement.classList.remove("active");
  });

  const selectedPage = document.getElementById(`${page}Page`);
  if (selectedPage) {
    selectedPage.classList.add("active");
  } else {
    console.error(`Page "${page}" not found`);
  }
}

// Set up the app when the DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  // Navigation setup
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const targetPage = event.currentTarget.getAttribute("data-page");
      navigateTo(targetPage);
    });
  });

  // Claim button setup
  const claimButton = document.getElementById("claimButton");
  if (claimButton) {
    claimButton.addEventListener("click", claimTokens);
  }

  // Referral link setup
  const referralLinkElement = document.getElementById("referralLink");
  if (referralLinkElement) {
    const userName = "Player"; // Simulated username
    const referralLink = `${window.location.origin}/?ref=${userName}`;
    referralLinkElement.href = referralLink;
    referralLinkElement.textContent = referralLink;
  }

  // Initialize UI
  updateBalanceDisplay();
  checkClaimEligibility();
  updateReferrals();

  // Default page
  navigateTo("home");
});

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded and task page initialized.");

  // Specific storage key for task-related balance
  const storageKey = 'tasksPlayerBalance';

  // Retrieve or initialize player balance specifically for tasks
  let taskPlayerBalance = parseInt(localStorage.getItem(storageKey)) || 0;

  // DOM elements specific to the task page
  const tasksPage = document.getElementById('tasksPage');
  const tasksList = document.getElementById('tasksList');
  const claimMessage = document.getElementById('claimMessage');
  const balanceDisplay = document.getElementById('playerBalanceDisplay');

  // Ensure all required DOM elements exist
  if (!tasksPage || !tasksList || !claimMessage) {
    console.error("Task page elements are missing. Ensure proper HTML structure.");
    return;
  }

  // Define tasks
  const tasks = [
    { id: 1, description: "Subscribe to our channel", referralLink: "https://t.me/Dprine001" },
    { id: 2, description: "Join our group", referralLink: "https://t.me/+ZiNlnODSrZA2YThk" },
    { id: 3, description: "Follow us on Instagram", referralLink: "https://www.instagram.com/accounts/edit/" }
  ];

  // Function to update the task-specific balance display
  function updateBalanceDisplay() {
    balanceDisplay.textContent = `Balance: ${taskPlayerBalance}$Dp`;
  }

  // Function to render tasks in the task list
  function renderTasks() {
    tasksList.innerHTML = ''; // Clear the task list before rendering

    tasks.forEach(task => {
      // Create task list item
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-item');

      // Add task description
      const taskDescription = document.createElement('p');
      taskDescription.textContent = task.description;
      taskItem.appendChild(taskDescription);

      // Add "Open Task" button
      const openTaskButton = document.createElement('button');
      openTaskButton.classList.add('open-task-button');
      openTaskButton.textContent = 'Open Task';

      // Attach click event to the button
      openTaskButton.addEventListener('click', function () {
        completeTask(task.referralLink);
      });

      taskItem.appendChild(openTaskButton);
      tasksList.appendChild(taskItem);
    });
  }

  // Function to handle task completion
  function completeTask(referralLink) {
    // Open the referral link in a new tab
    window.open(referralLink, '_blank');

    // Add 100$Dp to the task-specific balance
    taskPlayerBalance += 100;
    localStorage.setItem(storageKey, taskPlayerBalance); // Save the updated balance

    // Update the balance display
    updateBalanceDisplay();

    // Show claim message
    claimMessage.textContent = `Task completed! You've been credited 100$Dp.`;

    // Hide the claim message after 5 seconds
    setTimeout(() => {
      claimMessage.textContent = '';
    }, 5000);
  }

  // Initialize the task page
  renderTasks(); // Render the tasks
  updateBalanceDisplay(); // Update the balance display on page load
});
document.addEventListener('DOMContentLoaded', function () {
  console.log("Tasks page loaded");

  // Select elements from the DOM
  const tasksList = document.getElementById('tasksList');
  const claimMessage = document.getElementById('claimMessage');
  const balanceDisplay = document.getElementById('playerBalanceDisplay');

  // Initialize player balance (use localStorage for persistence)
  let playerBalance = parseInt(localStorage.getItem('playerBalance')) || 0;

  // Function to update the player's balance display
  function updateBalanceDisplay() {
    balanceDisplay.textContent = `Balance: ${playerBalance}$Dp`;
  }

  // Function to handle task completion
  function completeTask(taskButton) {
    // Prevent multiple credits for the same task
    if (taskButton.disabled) return;

    // Simulate task completion
    playerBalance += 200; // Credit 200$Dp
    localStorage.setItem('playerBalance', playerBalance); // Save updated balance to localStorage
    updateBalanceDisplay(); // Update balance display

    // Show success message
    claimMessage.textContent = "Task completed! You've been credited 200$Dp.";
    claimMessage.style.color = "green";

    // Disable the task button to prevent repeated credits
    taskButton.disabled = true;
    taskButton.textContent = "Task Completed";

    // Clear the message after 5 seconds
    setTimeout(() => {
      claimMessage.textContent = "";
    }, 5000);
  }

  // Add event listeners to all task buttons
  tasksList.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', function () {
      completeTask(button);
    });
  });

  // Initialize balance display on page load
  updateBalanceDisplay();
});
