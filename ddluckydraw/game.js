var numKeys = 16; // number of key images
var displayKeys = 32; // number of keys to show
var maxPrizeKinds = 8;

var sound = {};
var stock;
var displayArea;

// https://www.kirupa.com/html5/random_numbers_js.htm
function random(Low, High) {
  return Math.floor(Math.random()*(1+High-Low))+Low;
}

function getExampleStock() {
  return {
    "Starbucks Gift Card 200 ฿" : 5,
    "Premium Notebook" : 30,
    "Premium T-Shirt" : 20,
    "ถุงผ้า" : 50,
    "ปากกา" : 50
  };
}

function loadStock() {
  var loaded = localStorage.getItem("stock");
  stock = loaded == null ? getExampleStock() : JSON.parse(loaded);
}

function saveStock() {
  localStorage.setItem("stock", JSON.stringify(stock));
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
  return $("<div>").addClass("item-house image").droppable({ drop : renderPrize });
}

function elKey(number) {
  var keyNumber = (number % numKeys) + 1;
  return $("<div>").addClass("item-key image").css("background", 'url("img/Key_' + keyNumber + '.png")' ).draggable({ containment: "parent" });
}

function renderPlayArea() {
  loadStock();

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
}

function renderPrize() {
  // playSound('ding');
  var prizeContent = $("#prize-template").html();
  prizeContent = prizeContent.replace("__PRIZE__", randomPrize());
  prizeContent = prizeContent.replace("__PRIZE_REMAINING__", getTotalStock());

  displayArea.empty().html(prizeContent);
  saveStock();
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

function renderPrizeSetup() {
  displayArea.empty().html($("#prize-setup-template").html());
  var prizeSetupPad = displayArea.find(".prize-setup-pad");
  var setupItem;
  for (var i = 0; i < maxPrizeKinds; i++) {
    setupItem = $('#prize-setup-item-template').html().replace(/NNN/g, i);
    prizeSetupPad.append(setupItem);
  }

  var i = 0;
  for (var k in stock) {
    prizeSetupPad.find("#prize-number-" + i).val(stock[k]);
    prizeSetupPad.find("#prize-text-" + i).val(k);
    i++;
  }
}

function savePrizeList() {
  var number;
  var text;
  var stockObj = {};
  for (var i = 0; i < maxPrizeKinds; i++) {
    number = displayArea.find("#prize-number-" + i).val();
    number = parseInt(number, 10);
    text = displayArea.find("#prize-text-" + i).val();
    if (1 <= number && text != '') stockObj[text] = Math.floor(number);
  }

  stock = stockObj;
  saveStock();
  renderPrizeList();
}

function bindEvents() {
  $(document).on("click", ".btn-render-prize-list", renderPrizeList);
  $(document).on("click", ".btn-render-prize-setup", renderPrizeSetup);
  $(document).on("click", ".btn-save-prize-list", savePrizeList);
  $(document).on("click", ".btn-render-play-area", renderPlayArea);
}

function initializeSoundSystem () {
  // var channel_max = 4;										// number of channels
	// var ch = audio = new Array();
	// for (a=0; a<channel_max; a++) {								// prepare the channels
	// 	ch[a] = new Array();
	// 	ch[a]['channel'] = new Audio();				// create a new audio object
	// 	ch[a]['finished'] = -1;						// expected end time for this channel
	// }
  sound['ding'] = new Audio('sound/Ding.mp3');
}

function playSound (id) {
  sound[id].play();
	// for (a=0;a<ch.length;a++) {
	// 	thisTime = new Date();
	// 	if (ch[a]['finished'] < thisTime.getTime()) {			// is this channel finished?
	// 		ch[a]['finished'] = thisTime.getTime() + document.getElementById(id).duration*1000;
	// 		ch[a]['channel'].src = document.getElementById(id).src;
	// 		ch[a]['channel'].load();
	// 		ch[a]['channel'].play();
	// 		break;
	// 	}
	// }
}

$(function() {
  displayArea = $('#display-area');
  initializeSoundSystem();
  bindEvents();
  renderPlayArea();
});
