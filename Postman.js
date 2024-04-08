const sendRequest = async () => {
  debugger;
  let method = document.getElementById("method").value;
  let url = document.getElementById("url").value;


  if (!url.trim()) {
    alert("Please enter a valid URL.");
    return;
  }

  if (!isValidUrl(url)) {
    alert("Please enter a valid URL format.");
    return;
  }

  var loader = document.getElementById("loader");
  loader.style.display = "block";


  // Extract parameters from the URL for all methods
  let urlParams = getUrlParams(url),
    tableData = {},
    response = {};

  try {
    if (method !== "GET") {
      tableData = getAllTableValues();

      !Object.keys(tableData || {}).length
        ? displayParamsInTable(urlParams) // Display parameters in the table for non-GET methods
        : null;

      response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableData),
      });
    } else {
      response = await fetch(url, {
        method: method,
      });
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (method === "POST") {
      displayPostParamsFromUrl(urlParams); // Display POST parameters in the response
    }
    displayResponse(data); // Display response data
    loader.style.display = "none";
  } catch (error) {
    console.error("Error:", error);
    loader.style.display = "none";
  }
};

// to get all the table values
const getAllTableValues = () => {
  const table = document.getElementById("params");
  const rows = table.querySelectorAll("tr");
  const values = {};
  rows.forEach((row) => {
    const keyInput = row.querySelector(".key");
    const valueInput = row.querySelector(".value");
    const key = keyInput ? keyInput.value.trim() : "";
    const value = keyInput ? valueInput.value.trim() : "";

    if (key !== "" && value !== "") {
      values[key] = value;
    }
  });
  return values;
};

// Function to display POST parameters in the response
// function displayPostParamsFromUrl(urlParams) {
//     var responseElement = document.getElementById("response");
//     responseElement.innerHTML += "<h2>POST Parameters:</h2>";
//     responseElement.innerHTML += "<pre>" + JSON.stringify(urlParams, null, 2) + "</pre>";
// }
function displayPostParamsFromUrl(urlParams) {
  var responseElement = document.getElementById("response");
  responseElement.innerHTML += JSON.stringify(urlParams, null, 2);
}

// Function to extract parameters from URL
function getUrlParams(url) {
  var searchParams = new URLSearchParams(new URL(url).search);
  var params = {};
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
}

// Function to display parameters in the table
function displayParamsInTable(params) {
  var table = document.getElementById("params");
  var tbody = table.querySelector("tbody");
  tbody.innerHTML = ""; // Clear previous content

  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const value = params[key];
      addRowWithValue(key, value);
    }
  }
}

// Function to add a row to the table
function addRowWithValue(key, value) {
  var table = document.getElementById("params");
  var row = table.insertRow(); // Insert a new row at the end of the table
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = '<input type="text" class="key" value="' + key + '">';
  cell2.innerHTML = '<input type="text" class="value" value="' + value + '">';
  cell3.innerHTML =
    '<button class="delete-row" onclick="deleteRow(this)">Remove</button>';
}

function addRow() {
  var table = document.getElementById("params");
  var row = table.insertRow(); // Insert a new row at the end of the table
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = '<input type="text" class="key" placeholder="Enter key">';
  cell2.innerHTML =
    '<input type="text" class="value" placeholder="Enter value">';
  cell3.innerHTML =
    '<button class="delete-row" onclick="deleteRow(this)">Remove</button>';
}

function deleteRow(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row); // Remove the row from the table
}

function isValidUrl(url) {
  // var urlPattern = new RegExp('^(https?:\\/\\/)?' +
  //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
  //     '((\\d{1,3}\\.){3}\\d{1,3}))' +
  //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
  //     '(\\?[;&a-z\\d%_.~+=-]*)?' +
  //     '(\\#[-a-z\\d_]*)?$', 'i');

  // return urlPattern.test(url);
  return url;
}

function displayResponse(responseData) {
  var responseElement = document.getElementById("response");
  responseElement.innerText = JSON.stringify(responseData, null, 2);
}
