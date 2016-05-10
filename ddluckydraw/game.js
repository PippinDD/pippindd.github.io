var numKeys = 5; // number of key images
var displayKeys = 10; // number of keys to show
var stock = {};
var playArea;

// https://www.kirupa.com/html5/random_numbers_js.htm
function random(Low, High) {
  return Math.floor(Math.random()*(1+High-Low))+Low;
}

function elHouse() {
  return $("<div>").addClass("item-house").droppable({ drop : onKeyDrop });
}

function elKey(number) {
  return $("<div>").addClass("item-key" + (number % numKeys)).draggable();
}

function elGear() {
  return $("<div>").addClass("item-gear").on({
    "click" : onGearClick,
    "touchstart" : onGearClick
  });
}

function renderPlayArea() {
  playArea.empty();

  var house = elHouse().appendTo(playArea);
  house.css({ left: "40%" });

  var key;
  for (var k = 0; k < displayKeys; k++) {
    key = elKey(k);
    key.appendTo(playArea).css({ position: "absolute", left: random(0,70) + "%", top: random(20,70) + "%" });
  }

  var gear = elGear().appendTo(playArea);
  gear.css({ position: "absolute", top: 0, right: 0 });
}

function onKeyDrop() {
  alert("dropped!");
}

function onGearClick() {
  alert("clicked!");
}

$(function() {
  playArea = $('#play-area');
  renderPlayArea();
});
