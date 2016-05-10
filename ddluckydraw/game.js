var stock = {};
var playArea;

function elHouse() {
  return $("<div>").addClass("item-house").droppable();
}

function renderPlayArea() {
  playArea.empty();

  var house = elHouse().appendTo(playArea);
  house.css({ left: "40%" });
}

$(function() {
  playArea = $('#play-area');
  renderPlayArea();
});
