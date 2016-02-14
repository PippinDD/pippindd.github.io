$(function(){
  renderQuestion();
});

function renderQuestion () {
  var content = getTemplate("question");
  renderBody(content);
}

function renderBody (content) {
  $('#game-body').html(content);
}

function getTemplate (templateId) {
  return $("#template #" + templateId);
}
