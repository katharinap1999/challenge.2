

var interfaceEl = document.querySelector('.interface');
var clockAnalogEl = document.querySelector('.clock-analog');
var clockBgEl = clockAnalogEl.querySelector('.clock-bg'); 
var clockHoursHandEl = clockAnalogEl.querySelector('.hours-line');
var clockMinHandEl = clockAnalogEl.querySelector('.minutes-line');
var clockSecHandEl = clockAnalogEl.querySelector('.seconds-line');
var clockDisplayEl = document.querySelector('.clock-display');
var btnRight = document.querySelector('.btn-right');
var btnLeft = document.querySelector('.btn-left');
var btnPower = document.querySelector('.btn-power');

var cityViewEl = document.querySelector('.city-view');
var cityDisplayEl = cityViewEl.querySelector('.city-display');
var cityImgEl  = cityDisplayEl.querySelector('img');
var cityLineEl = cityDisplayEl.querySelector('.line');  

var weatherBoxEl = document.querySelector('.weather-box');
var weatherImgEl = weatherBoxEl.querySelector('img');

var astronautBoxEl = document.querySelector('.astronaut-box');
var astronautImgEl = astronautBoxEl.querySelector('img');

var powerStatus = false;

var cityIndex = 0;
var cityPosArray = [50, 185, 335]; // 105 VC, 185 FRA, 335 JP
var cityTimezoneArray = [-7, 1, 8]; // https://en.wikipedia.org/wiki/Coordinated_Universal_Time#/media/File:World_Time_Zones_Map.png
var cityImgArray = ['assets/img/city-vancouver.jpg', 'assets/img/city-frankfurt.jpg', 'assets/img/city-japan.jpg'];

var astronautImgArray = ['assets/img/astronaut_kjell.jpg', 'assets/img/astronaut_alexander.jpg', 'assets/img/astronaut_kimiya.jpg'];

var weatherImgArray = ['assets/img/weather_day.png', 'assets/img/weather_night.png'];

TweenMax.set(interfaceEl, {opacity: .2});

// Eventhandler
btnRight.addEventListener('click', onBtnRightClick);
btnLeft.addEventListener('click', onBtnLeftClick);
btnPower.addEventListener('click', onBtnPowerClick);

function setCityPos() {
  var scanLine = document.querySelector('.world-map .scan-line');
  TweenMax.to(scanLine, 1, {
    x: cityPosArray[cityIndex],
    ease: Power2.easeOut
  });
}

setCityPos(cityIndex);


function onBtnPowerClick() {
  console.log('click');

  if (powerStatus == false) {
    powerStatus = true;
    TweenMax.to(interfaceEl, 1.5, {
      opacity: 1,
      ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false})
    });
  } else {
    powerStatus = false;
    TweenMax.to(interfaceEl, 1.5, {
      opacity: .2,
      ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false})
    });
  }
}

function onBtnRightClick() {
   console.log('click');
  cityIndex += 1; 

  if (cityIndex > 2) {
    cityIndex = 0;
  }
  setAstronaut();
  setCityPos();
  changeCity();
}

function onBtnLeftClick() {
  console.log('click');
  cityIndex -= 1; 
  if (cityIndex < 0) {
    cityIndex = 2;
  }

  setAstronaut();
  setCityPos();
  changeCity();
}


function setAstronaut() {
  var tl = new TimelineMax();
  tl.to(astronautImgEl, .6, {opacity: 0});
  tl.set(astronautImgEl, {
    src: astronautImgArray[cityIndex]
  });
  tl.to(astronautImgEl, .6, {opacity: 1})
}

function changeCity() {
  var tl = new TimelineMax();
  tl.to(cityImgEl, 1, {
    ease: Power1.easeOut,
    y: '100%'
  });
  tl.to(cityLineEl, .5, {
    width: 0,
    ease: Power1.easeOut
  });
  tl.to(cityLineEl, .5, {
    width: '100%',
    ease: Power1.easeOut
  });
  tl.set(cityImgEl, {
    src: cityImgArray[cityIndex]
  });
  tl.to(cityImgEl, 1, {
    ease: Power1.easeOut,
    y: '0%'
  });
}

function clockBgRotation() {
  TweenMax.set(clockBgEl, {rotation: 0});
  TweenMax.to(clockBgEl, 60, {
    rotation: 359, 
    ease: Power1.linear,
    onComplete: clockBgRotation
  });
};
 clockBgRotation();



var myTimer = 1000;

// CLOCK AND DATE
var time = function() {
    var date = new Date(); 
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    date = new Date(utc + (3600000* cityTimezoneArray[cityIndex]));
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var day = date.getDate();
    var month = date.getMonth();
    var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var year = date.getFullYear();

    analogWatch(hour,min,sec);

    if( hour < 18 && hour > 8) {
      weatherImgEl.src = weatherImgArray[0];
    } else {
      weatherImgEl.src = weatherImgArray[1];
    }
    

    clockDisplayEl.innerHTML = hour + " : " + min + " : " + sec + " | " + day + "." + monthArray[month] + "." + year;
}


function analogWatch(hour,min,sec) {
  var secondsDeg = 360 * (sec / 60);
  var minutesDeg = 360 * (min / 60);
  var hoursDeg = 360 * (hour + min /60) / 12;


  clockHoursHandEl.style.transform = `rotate(${hoursDeg}deg)`;
  clockMinHandEl .style.transform = `rotate(${minutesDeg}deg)`;
  clockSecHandEl .style.transform = `rotate(${secondsDeg}deg)`;  


}



// calling functions every second
var count = setInterval(time, myTimer);

var counter = 0;

// CLOCK AND DATE END



