require('dotenv').config();

process.env.ACCESS_TOKEN;

const repo = "javascript_test";
const username = "Xer0-PT";
const token = ACCESS_TOKEN;

const filePath = "path/to/my-file.txt";

// Create the API endpoint for reading a file
const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;

// Set the API request options
const options = {
  headers: {
    Authorization: `Token ${token}`,
  },
};

// Send the API request
fetch(apiUrl, options)
  .then((response) => response.json())
  .then((data) => {
    // The file content is returned as base64-encoded data
    const base64Content = data.content;

    // Decode the base64-encoded data to get the plain text content
    const fileContent = atob(base64Content);

    console.log(fileContent);
  });
