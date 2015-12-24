var gameStore = new Cortex({
	winners: {
		engineer: [],
		operation: [],
		marketing: [],
		tele: [],
		b2c: []
	},

	candidates: [],

	answers: [],
	sumAnswer: null,
	reviewAnswers: false,

	spinning: false,
	winner: null,
	won: false,

	displayCounter: false,

	pointer: 0,
	candidateCount: null,
	counter: null
});

var gameDispatcher = {
	reset: function() {
		gameDispatcher.initializeSound();
		gameStore.candidates.set([]);

		gameStore.answers.set([]);
		gameStore.sumAnswer.set(null);
		gameStore.reviewAnswers.set(false);

		gameStore.spinning.set(false);
		gameStore.winner.set(null);
		gameStore.won.set(false);

		gameStore.displayCounter.set(false);

		gameStore.pointer.set(0);
		gameStore.candidateCount.set(null);
		gameStore.counter.set(null);
	},

	setCandidates: function(team) {
		//gameStore.candidates.set(_.shuffle(Staff[team]));
		gameStore.candidates.set(Staff[team]);
	},

	addWinner: function(team, winner) {
		// add to winners
		gameStore.winners[team].push(winner);

		// remove from candidate
		var idWinner = gameStore.candidates.findIndex(function(candidate){
			return candidate.val() == winner;
		});
		gameStore.candidates.removeAt(idWinner);

		if (gameStore.winners[team].count() == Staff.teams[team].prizes) {
			window.location = "#/" + team + "/winners";
		}
	},

	resetAnswers: function() {
		gameStore.answers.set([]);
		gameStore.sumAnswer.set(null);
		gameStore.reviewAnswers.set(false);
		gameStore.winner.set(null);

		gameStore.pointer.set(0);
		gameStore.counter.set(null);
	},
	addAnswer: function(answer) {
		gameStore.answers.push(parseInt(answer, 10));
	},

	calAnswers: function() {
		gameStore.sumAnswer.set(_.sum(gameStore.answers.val()));
	},

	showAnswers: function() {
		gameDispatcher.calAnswers();
		gameStore.reviewAnswers.set(true);
	},
	hideAnswers: function() {
		gameStore.reviewAnswers.set(false);
	},

	showCounter: function() {
		gameDispatcher.hideAnswers();
		gameStore.counter.set(gameStore.sumAnswer.val());
		gameStore.displayCounter.set(true);

		gameDispatcher.setSpinning(false);
		gameStore.pointer.set(0);
		gameStore.candidateCount.set(gameStore.candidates.count());
		gameStore.counter.set(gameStore.sumAnswer.val());

		setTimeout(gameDispatcher.spin, gameDispatcher.getTimeout());
	},
	hideCounter: function() {
		gameDispatcher.setSpinning(false);
		gameDispatcher.addWinner(routeStore.team.val(), gameStore.winner.val());
		gameDispatcher.resetAnswers();
		gameStore.displayCounter.set(false);
	},

	shuffleCandidate: function() {
		gameStore.candidates.set(_.shuffle(gameStore.candidates.val()));
	},

	setSpinning: function(spinning) {
		gameStore.spinning.set(spinning);
	},

	startSpinning: function(e) {
		e.preventDefault();

		gameDispatcher.calAnswers();
		gameDispatcher.hideAnswers();

		gameDispatcher.setSpinning(true);

		gameStore.pointer.set(0);
		gameStore.candidateCount.set(gameStore.candidates.count());
		gameStore.counter.set(gameStore.sumAnswer.val());
	},
	spin: function() {
		var counter = gameStore.counter.val() - 1,
			pointer = gameStore.pointer.val() + 1,
			winner;

		if (pointer > gameStore.candidateCount.val()-1) {
			pointer = 0;
		}

		gameStore.pointer.set(pointer);

		if (gameStore.spinning.val() == false) {
			setTimeout(gameDispatcher.spin, 120);
			return;
		}

		if (counter > 0) {
			gameStore.counter.set(counter);
			setTimeout(gameDispatcher.spin, gameDispatcher.getTimeout());
			gameDispatcher.playSound("pop");
		} else {
			gameStore.counter.set(0);
			gameDispatcher.setSpinning(false);
			gameStore.won.set(true);
			gameDispatcher.playSound("tada");

			winner = gameStore.candidates.val()[gameStore.pointer.val()];

			gameStore.winner.set(winner);
		}
	},

	audioChannels: [],

	initializeSound: function() {
		var channel_max = 4;										// number of channels
		var ch = gameDispatcher.audioChannels = new Array();
		for (a=0; a<channel_max; a++) {								// prepare the channels
			ch[a] = new Array();
			ch[a]['channel'] = new Audio();				// create a new audio object
			ch[a]['finished'] = -1;						// expected end time for this channel
		}
	},

	playSound: function(id) {
/*		if (audioElement == null) {
			audioElement = document.createElement("audio");
			audioElement.setAttribute("src", "/xmas/assets/" + name);
			audioElement.addEventListener("load", function () {
				audioElement.play()
			}, true);
			audioElement.addEventListener("ended", function () {
            document.removeChild(this);
        	}, false);

			gameDispatcher.sounds[name] = audioElement;
		}
		
		audioElement.pause();
		audioElement.play();*/

		var thisTime;
		var ch = gameDispatcher.audioChannels;
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
	},
	getTimeout: function() {
		var counter = gameStore.counter.val();

		if (counter > 1000)
			return 5;

		if (counter > 250)
			return 10;

		if (counter > 100)
			return 15;

		if (counter > 50)
			return 25;

		if (counter > 20)
			return 50;

		if (counter > 5)
			return 100;

		if (counter > 3)
			return 300;

		if (counter > 1)
			return 500;

		return 1000;
	},

	onAnswerInput: function(event) {
		var keyCode = event.keyCode;

		if (keyCode == 13) { // Enter Key
			gameDispatcher.playSound("enter");
		} else {
			gameDispatcher.playSound("beep");
		}
	}
};
