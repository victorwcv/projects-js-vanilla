const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");

const apiKey = "dt/aozkljjVlLQMJpwKBMA==tnpUADaFNfSoPk77";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1";

async function getJoke() {
  try {
    jokeEl.innerText = "Getting Joke...";
    btnEl.disabled = true;
    btnEl.innerText = "Loading...";
    const response = await fetch(apiURL, options);
    const data = await response.json();
    btnEl.disabled = false;
    btnEl.innerText = "tell me a joke";
    console.log(data[0].joke);
    jokeEl.innerHTML = data[0].joke;
  } catch (error) {
    jokeEl.innerHTML = "An error happened, Try again later";
    btnEl.disabled = false;
    btnEl.innerText = "tell me a joke";
    console.log(error);
  }
}

btnEl.addEventListener("click", getJoke);
