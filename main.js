const repo = "javascript_test";
const username = "Xer0-PT";
const token = "YOUR_TOKEN";

const filePath = "teste.txt";

// Create the API endpoint for reading a file
const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;

var fileContent;

// Set the API request options
const options = {
  headers: {
    Authorization: `Token ${token}`,
  },
};

getBananas();

async function getBananas() {
  await fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      // The file content is returned as base64-encoded data
      const base64Content = data.content;

      // Decode the base64-encoded data to get the plain text content
      fileContent = atob(base64Content);

      console.log(fileContent);
    });
}

const newContent = fileContent + "," + "NOME_DO_BANANA_LIDO_DO_HTML";

addBananas(newContent);

async function addBananas(newContent) {
  const sha = await getShaFromLastCommit();

  debugger;
  await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    path: {
        owner: username,
        repo: repo,
        path: filePath,
    },
    body: JSON.stringify({
      message: "Adicionar mais bananas",
      content: btoa(newContent),
      sha: sha,
    }),
  });
}

async function getShaFromLastCommit() {
  const response = await fetch(apiUrl);
  debugger;
  const data = await response.json();
  return data.sha;
}
