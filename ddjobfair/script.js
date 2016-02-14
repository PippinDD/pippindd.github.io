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
  $(document).on("tap", ".game-body .question-choice", onAnswer);
});

var questionNumber, maxQuestionNumber = 7;
var numCorrect;
var audio = [];
var answered;

function startGame () {
  initializeSoundSystem();

  question.shuffle();
  questionNumber = 0;
  numCorrect = 0;

  renderNextQuestion();
}

function initializeSoundSystem () {
  var channel_max = 4;										// number of channels
	var ch = audio = new Array();
	for (a=0; a<channel_max; a++) {								// prepare the channels
		ch[a] = new Array();
		ch[a]['channel'] = new Audio();				// create a new audio object
		ch[a]['finished'] = -1;						// expected end time for this channel
	}
}

function playSound (id) {
	var thisTime;
	var ch = audio;
	for (a=0;a<ch.length;a++) {
		thisTime = new Date();
		if (ch[a]['finished'] < thisTime.getTime()) {			// is this channel finished?
			ch[a]['finished'] = thisTime.getTime() + document.getElementById(id).duration*1000;
			ch[a]['channel'].src = document.getElementById(id).src;
			ch[a]['channel'].load();
			ch[a]['channel'].play();
			break;
		}
	}
}

function onAnswer (event) {
  if (!answered) {
    var answer = $(this).text();
    var correctAnswer = currentQuestion.o;
    $('.game-body .question-choice').css({ 'background-color' : 'black' })
    if (answer == correctAnswer) {
      playSound("correct");
      $(this).animate({ 'backgroundColor' : 'lime' });
      numCorrect++;
    } else {
      playSound("wrong");
      $(this).animate({ 'backgroundColor' : 'red' });
      for (var i = 1; i <= 4; i++) {
        if ($('.game-body #choice' + i).text() == correctAnswer) {
          $('.game-body #choice' + i).animate({ 'backgroundColor' : 'lime' });
        }
      }
    }
    answered = true;
    window.setTimeout(renderNextQuestion, 2000);
  }
}

function renderNextQuestion () {
  if (questionNumber < maxQuestionNumber) {
    questionNumber++;
    renderQuestion(question[questionNumber]);
  } else {
    endGame();
  }
}

function renderQuestion (q) {
  currentQuestion = q;
  answered = false;

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

function endGame () {
  var content = getTemplate("end-game").replace("%SCORE%", numCorrect);
  renderBody(content);
}

function renderBody (content) {
  $('#game-body').empty();
  $('#game-body').html(content);
}

function getTemplate (templateId) {
  return $("#template #" + templateId)[0].outerHTML;
}
