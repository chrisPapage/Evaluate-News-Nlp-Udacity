import { checkForUrl } from "./urlChecker";

async function handleSubmit(event) {
  event.preventDefault();

  const articleUrl = document.getElementById("name").value;

  const result = document.getElementById("results");

  if (!checkForUrl(articleUrl)) {
    result.textContent = "Not a valid url.";
    return;
  }

  const someData = {
    url: articleUrl
  };

  const res = await postData("http://localhost:3030/save", someData);
  result.textContent = `The article polarity and polarity confidence are: ${res.message} and ${res.message1}`;
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export { handleSubmit };
