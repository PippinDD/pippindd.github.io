Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}

$(function(){
  startGame();
});

var questionNumber, maxQuestionNumber = 7;

function startGame () {
  question.shuffle();
  questionNumber = 1;

  renderQuestion(question[0]);
}

function renderQuestion (q) {
  var content = getTemplate("question");
  var c = [ q.o, q.x1, q.x2, q.x3 ].shuffle();

  var questionStatus = "Question " + questionNumber + " / " + maxQuestionNumber;
  content = content.replace("%QUESTION_STATUS%", questionStatus);
  content = content.replace("%QUESTION_HEADER%", q.q);
  content = content.replace("%QUESTION_CHOICE_1%", c[0]);
  content = content.replace("%QUESTION_CHOICE_2%", c[1]);
  content = content.replace("%QUESTION_CHOICE_3%", c[2]);
  content = content.replace("%QUESTION_CHOICE_4%", c[3]);
  renderBody(content);
}

function renderBody (content) {
  $('#game-body').html(content);
}

function getTemplate (templateId) {
  return $("#template #" + templateId)[0].outerHTML;
}
