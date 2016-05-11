var numKeys = 16; // number of key images
var displayKeys = 16; // number of keys to show
var stock = {
  "Starbucks Card มูลค่า 200 ฿" : 5,
  "Premium Notebook" : 30,
  "Premium T-Shirt" : 20,
  "ถุงผ้า" : 50,
  "ปากกา" : 50
};
var displayArea;

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

function elPlayArea() {
  return $("<div id='play-area'>");
}

function elHouse() {
  return $("<div>").addClass("item-house image").droppable({ drop : onKeyDrop });
}

function elKey(number) {
  var keyNumber = (number % numKeys) + 1;
  return $("<div>").addClass("item-key image").css("background", 'url("img/Key_' + keyNumber + '.png")' ).draggable({ containment: "parent" });
}

function elGear() {
  return $("<div>").addClass("item-gear image");
}

function renderPlayArea() {
  if (getTotalStock() == 0) {
    renderZeroPrize();
    return;
  }
  displayArea.empty();
  var playArea = elPlayArea().appendTo(displayArea);
  playArea.html($('#play-area-template').html());
  playArea.find('.prize-remaining').html(getTotalStock());
  elHouse().appendTo(playArea);

  var randomLeft, randomTopl
  for (var k = 0; k < displayKeys; k++) {
    randomLeft = random(1,2) == 1 ? random(10,35) : random (65,85);
    randomTop = random(1,2) == 1 ? random(10,35) : random (65,85);
    elKey(k).appendTo(playArea).css({ position: "absolute", left: randomLeft + "%", top: randomTop + "%" });
  }
  elGear().appendTo(playArea);
}

function renderPrize() {
  var prizeContent = $("#prize-template").html();
  prizeContent = prizeContent.replace("__PRIZE__", randomPrize());
  prizeContent = prizeContent.replace("__PRIZE_REMAINING__", getTotalStock());

  displayArea.empty().html(prizeContent);
}

function renderZeroPrize() {
  displayArea.empty().html($("#prize-zero-template").html());
}

function renderPrizeList() {
  displayArea.empty().html($("#prize-list-template").html());

  prizeList = ["เหลือรางวัล " + getTotalStock() + " ชิ้น", ""];
  for (var i in stock) {
    prizeList.push(stock[i] + " x " + i);
  }
  $(".prize-list").html(prizeList.join("<br />"));
}

function onKeyDrop() {
  renderPrize();
}

function onGearClick() {
  renderPrizeList();
}

function onPrizeOkClick() {
  renderPlayArea();
}

function bindEvents() {
  $(document).on("click", ".item-gear", onGearClick);
  $(document).on("click", ".prize-ok", onPrizeOkClick);
}

$(function() {
  displayArea = $('#display-area');
  bindEvents();
  renderPlayArea();
});
