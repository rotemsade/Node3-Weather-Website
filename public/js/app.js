const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const messageThree = document.getElementById("message-3");

const onSearchClicked = location => {
  const url = "/weather?address=" + location;
  const encodedUrl = encodeURI(url);
  fetch(encodedUrl).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = "There was an Error, " + data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast.dailyForecast;
        messageThree.textContent = data.forecast.todayHighLow;
      }
    });
  });
};

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  onSearchClicked(location);
  search.value = "";
});
