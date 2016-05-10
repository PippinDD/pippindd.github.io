var numKeys = 5; // number of key images
var displayKeys = 10; // number of keys to show
var stock = {
  "พวงกุญแจ" : 3,
  "ถุงผ้า" : 2
};
var playArea;

// https://www.kirupa.com/html5/random_numbers_js.htm
function random(Low, High) {
  return Math.floor(Math.random()*(1+High-Low))+Low;
}

function getTotalStock() {
  var totalStock = 0;
  for (var i in stock) {
    totalStock += stock[i];
  }
  return totalStock;
}

function randomPrize() {
  var totalStock = 0;
  var cumulativeStock = {};
  for (var i in stock) {
    cumulativeStock[i] = {};
    cumulativeStock[i].low = totalStock + 1;
    cumulativeStock[i].high = totalStock + stock[i];
    totalStock += stock[i];
  }

  var randomNumber = random(1, totalStock);
  var prize = "";
  for (var i in cumulativeStock) {
    if (cumulativeStock[i].low <= randomNumber && randomNumber <= cumulativeStock[i].high) {
      prize = i;
      break;
    }
  }

  stock[i] -= 1;
  if (stock[i] == 0) delete stock[i];
  return prize;
}

function elHouse() {
  return $("<div>").addClass("item-house").droppable({ drop : onKeyDrop });
}

function elKey(number) {
  return $("<div>").addClass("item-key" + (number % numKeys)).draggable({ containment: "parent" });
}

function elGear() {
  return $("<div>").addClass("item-gear");
}

function renderPlayArea() {
  if (getTotalStock() == 0) {
    renderZeroPrize();
    return;
  }
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

function renderPrize() {
  var prizeContent = $("#prize-template").html();
  var prize = randomPrize();
  var stock = getTotalStock();
  prizeContent = prizeContent.replace("__PRIZE__", prize);
  prizeContent = prizeContent.replace("__PRIZE_REMAINING__", stock);

  playArea.empty().html(prizeContent);
}

function renderZeroPrize() {
  playArea.empty().html($("#prize-zero-template").html());
}

function renderSetup() {
  playArea.empty().html($("#prize-list-template").html());

  prizeList = [];
  for (var i in stock) {
    prizeList.push(i + " : " + stock[i]);
  }
  $(".prize-list").html(prizeList.join("<br />"));
}

function onKeyDrop() {
  renderPrize();
}

function onGearClick() {
  renderSetup();
}

function onPrizeOkClick() {
  renderPlayArea();
}

function bindEvents() {
  $(document).on("click", ".item-gear", onGearClick);
  $(document).on("click", ".prize-ok", onPrizeOkClick);
}

$(function() {
  playArea = $('#play-area');
  bindEvents();
  renderPlayArea();
});
