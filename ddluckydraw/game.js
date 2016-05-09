var stock = {};
var playArea;

function elHouse() {
  return $("<div>").addClass("item-house").droppable();
}

function renderPlayArea() {
  playArea.empty();
  var house = elHouse().appendTo(playArea).position({ top: "50%", left: "50%" });
}

$(function() {
  playArea = $('#play-area');
  renderPlayArea();
});
