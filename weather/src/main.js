console.log('main.js is chained');
$els = {
  body: $('#bodyDiv'),
  upperApp: $('#upperApp'),
  zipcode: $('#zip'),
  submit: $('#forward'),
  lowerApp: $('#lowerApp'),
  location: $('#location'),
  temp: $('#temp'),
  status: $('#status'),
  minInfo: $('#minInfo'),
  maxInfo: $('#maxInfo'),
}
$apiEls = {};

$(document).ready(() => {
  $els.submit.on('click', (event) => {
    let $zip = $els.zipcode.val();

    scoopAPI($zip);
  });
});

function scoopAPI(zip) {
  $.getJSON(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=3cccf32acba85a5d9c945458fd461663`, (data) => {

    console.log('Successfully obtained')
    dataAssign(data);
  })
}

function dataAssign(data) {
  $apiEls['location'] = `${data.name}, ${data.sys.country}`;
  $apiEls['temp'] = Math.round(data.main.temp);
  $apiEls['status'] = data.weather[0].main;
  $apiEls['min'] = Math.round(data.main.temp_min);
  $apiEls['max'] = Math.round(data.main.temp_max);

  domWetWork($apiEls.location, $apiEls.temp, $apiEls.status, $apiEls.min, $apiEls.max);
}
function domWetWork(locale, temp, status, min, max) {
  if (temp <= 40) {
    $els.temp.css('color', '#1B15E5');
    $els.minInfo.css('color', '#0AF');
  }
  else if (temp >= 90) {
    $els.temp.css('color', '#B00B00');
    $els.maxInfo.css('color', '#DE1F1C')
  }

  $els.location.text(locale);
  $els.temp.text(`${temp}\u00B0`);
  $els.status.text(status);
  $els.minInfo.text(`${min}\u00B0`);
  $els.maxInfo.text(`${max}\u00B0`);

  $els.lowerApp.css('visibility', 'visible');
  $els.upperApp.css('animation', 'move 1.5s ease-out 1s forwards');
  $els.lowerApp.css('animation', 'fadeIn 1.5s ease-out 1s forwards')
}
/*

1. when the page loads
  - add an event listener to the button
2. When the button is clicked
  - grab the input
  - store the value
  - make an API request based on the input value
3. When the API response is returned
  - grab all the appropriate DOM elements
  - append the data to the DOM

*/
