const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

const onSearchClicked = location => {
  const url = "/weather?address=" + location;
  const encodedUrl = encodeURI(url);
  fetch(encodedUrl).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = "There was an Error, " + data.error;
      } else {
        messageOne.textContent =
          "The daily forecast for " +
          data.location +
          " is " +
          data.forecast.dailySummary +
          " The current tempreture is " +
          Math.round(parseFloat(data.forecast.currentTemperatue)) +
          " degrees, with a " +
          Math.round(
            parseFloat(data.forecast.currentPrecipProbability, 10) * 100
          ) +
          "% chance of rain.";
        messageTwo.textContent = location;
      }
    });
  });
};

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  onSearchClicked(location);
  search.value = "";
});
