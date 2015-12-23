$(function() {
	// force redirect to #/
	if (window.location.href.indexOf('#') == -1) {
		window.location.href = _.trim(window.location.href, '/') + '/#/';
	}
});

var Staff = {};

Staff.b2c = [
	"Amornrat Yongpoch",
	"Budsayaphan Khomkham",
	"Chakrit Boonkasem",
	"Chungkwan Nakapraving",
	"Kamolpat Swaengkit",
	"Methavee Phoosriwarangkul",
	"Nattagarn Attaphaiboon",
	"Paninraj Marneewarn",
	"Pimjai Bunchuprasert",
	"Rachawadee Sookmee",
	"Ruchirek Srisaensuk",
	"Sidarat Suangsomboon",
	"Uchuka Paensuwan"
];

Staff.engineer = [
	"Ahmad Satiri Aseli",
	"Ajdanai Yuktanandana",
	"Akarapong Ngearnpra",
	"Andrei Dumitru Blotu",
	"Chalat Luprasit",
	"Chatchai Kritsetsakul",
	"Christian Grassi",
	"Christophe Kevin Vidal",
	"Dan Podeanu",
	"Kitja Chalongdej",
	"Natsiree Futragoon",
	"Nayana Kumara Hettiarachchi",
	"Onsinee Chongsermsirisakul",
	"Pavel Tobias",
	"Peerachai Phanusuwat",
	"Piyawat Chanthanasombut",
	"Shatshai Saeaio",
	"Siriwat Seributra",
	"Tanin Srivaraphong",
	"Vlad Poenaru",
	"Warun Kietduriyakul",
	"Wongsakorn Nitisopa"
];

Staff.marketing = [
	"Araya Siripayuk",
	"Arpaporn Charoenphol",
	"Chaiyasit Bunnag",
	"Chanasit Wiwatwaraphol",
	"Chetapol Manit",
	"Kamonwan Sae-pung",
	"Kanchana Paha",
	"Kittikom Pojanee",
	"Leartronnakorn Arunleartchevin",
	"Napong Panthong",
	"Patanan Neovakul",
	"Pisitachat Lieangnak",
	"Salinket Jareanbunphon",
	"Thanavat Vithyaviranont",
	"Thannicha Yamkratok",
	"Watchara Wongsanga"
];

Staff.operation = [
	"Pailin Kitbumrung",
	"Sarinthip Trakuljae",
	"Sunee Rirkvaleekul",
	"พี่นา (แม่บ้าน)",
	"พี่สุทิน (Messenger)"
];

Staff.teams = {
	engineer: {
		name: "Engineer / Product",
		prizes: 5
	},
	operation: {
		name: "Operation",
		prizes: 1
	},
	marketing: {
		name: "Marketing",
		prizes: 4
	},
	tele: {
		name: "TeleSales & Customer Service",
		prizes: 3
	},
	b2c: {
		name: "B2B & B2C",
		prizes: 3
	}
};

Staff.tele = [
	"Arporn Pinyo",
	"Bhoomipat Jakboripat",
	"Jeeranan Sae-aue",
	"Juthamas Tapaneeyakul",
	"Kingkamon Bunyakhom",
	"Panida Keawyot",
	"Pattharaprapa Pakorntanapat",
	"Phuchisa Pakorntanapat",
	"Sarinphat Ekariyaphong",
	"Thichapan Metheepakornchai",
	"Wirinya Silarujiratthorn",
	"Witoonpokkarak Chanthipa",
	"Wiwat Siriwiwattanakul"
];

var AddAnswer = React.createClass({displayName: "AddAnswer",
	onAnswer: function(e) {
		e.preventDefault();

		var obj = $(this.refs.answer.getDOMNode());

		if (obj.val()) {
			gameDispatcher.addAnswer($(obj).val().substring(0, 3));
			$(obj).val("");
		}
	},

	render: function() {
		return React.createElement("div", {className: "row"}, 
			React.createElement("div", {className: "col-sm-8 col-sm-offset-2 well"}, 
				React.createElement("h4", null, "Answer"), 

				React.createElement("form", {onSubmit:  this.onAnswer}, 
					React.createElement("div", {className: "input-group"}, 
						React.createElement("input", {type: "number", maxLength: "3", className: "form-control", ref: "answer"}), 
						React.createElement("div", {className: "input-group-btn"}, 
							React.createElement("input", {type: "submit", 
							       className: "btn btn-primary", 
							       onClick:  this.onAnswer, 
							       value: "OK"})
						)
					)
				)
			)
		)
	}
});

var Answers = React.createClass({displayName: "Answers",
	render: function() {
		return React.createElement("div", {className: "text-center row"}, 
			 gameStore.answers.map(function(answer) {
				return React.createElement("div", {className: "col-sm-2 text-center well"}, 
					React.createElement("h3", null,  answer.val() )
				);
			}), 
			React.createElement("div", {className: "col-sm-2 text-center well"}, 
				"="
			), 
			React.createElement("div", {className: "col-sm-2 text-center well"}, 
				React.createElement("h3", null,  gameStore.sumAnswer.val() )
			)
		)
	}
});

var Candidates = React.createClass({displayName: "Candidates",
	//render: function() {
	//	return <div className="row">{
	//		gameStore.candidates.map(function(candidate, i) {
	//			return <div className="candidate col-sm-12" key={ i }>
	//				<div className={0 == i ?
	//						"prize" : null}>
	//					{ candidate.val() }
	//				</div>
	//			</div>
	//		})
	//	}</div>
	//}
	//render: function() {
	//	return <div className="row">{
	//		gameStore.candidates.map(function(candidate, i) {
	//			return <div className="candidate col-sm-4" key={ i }>
	//				<div className={gameStore.pointer.val() == i ?
	//						"prize" : null}>
	//					{ candidate.val().substring(0, candidate.val().indexOf(" ") + 2) }
	//				</div>
	//			</div>
	//		})
	//	}</div>
	//}
	render: function() {
		var pointer = gameStore.pointer.val();

		if (gameStore.displayCounter.val())
			return React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "col-sm-12 candidate prize"}, 
					pointer+1, ". ",  gameStore.candidates[pointer].val() 
				)
			);

		return React.createElement("table", {className: "table table-compacted table-stripped"}, 
			React.createElement("thead", null, 
			React.createElement("tr", null, 
				React.createElement("th", {colSpan: "2", className: "col-sm-12 text-center"}, "Name")
			)
			), 
			React.createElement("tbody", null, 
				gameStore.candidates.map(function (candidate, i) {
					return React.createElement("tr", {key:  i }, 
						React.createElement("td", null,  i+1, ". ",  candidate.val() )
					)
				})
			)
		)
	}
	//render: function() {
	//	return <div className="row">
	//		<table className="table table-compacted table-stripped">
	//			<thead>
	//				<tr>
	//					<th className="col-sm-2">&nbsp;</th>
	//					<th className="col-sm-10 text-center">Name</th>
	//				</tr>
	//			</thead>
	//			<tbody>{
	//				gameStore.candidates.map(function(candidate, i) {
	//					return <tr key={ i }>
	//						<td>{
	//							gameStore.pointer.val() == i ?
	//								<i className="glyphicon glyphicon-arrow-right"/>
	//								: null
	//						}</td>
	//						<td>{ candidate.val() }</td>
	//					</tr>
	//				})
	//			}</tbody>
	//		</table>
	//	</div>
	//}
});

var GamePlay = React.createClass({displayName: "GamePlay",
	componentWillMount: function() {
		gameDispatcher.reset();
		gameDispatcher.setCandidates(this.props.team);
	},

	render: function() {
		var page;

		switch (routeStore.page.val()) {
			case "answer":
				page = React.createElement(AddAnswer, React.__spread({},  this.props ));
				break;

			case "winners":
				page = React.createElement(Winners, React.__spread({},  this.props ));
				break;

			default:
				page = React.createElement(Candidates, React.__spread({},  this.props ));
		}

		return React.createElement("div", {className: "container"}, 
			React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "col-sm-9"}, 
					 !gameStore.reviewAnswers.val() ? null :
						React.createElement(Answers, React.__spread({},  this.props )), 
					
					 page 
				), 
				React.createElement(RightMenu, React.__spread({},  this.props))
			)
		)
	}
});

var routeStore = new Cortex({
		team: null,
		page: null,
		action: null
	}),

	routeDispatcher = {
		setPage: function(team, page, action) {
			team = team || null;
			page = page || null;
			action = action || null;

			routeStore.team.set(team);
			routeStore.page.set(page);
			routeStore.action.set(action);
		},

		goBack: function(e) {
			e && e.preventDefault();
			history.back();
		}
	},

	router = new Router({
		'/([\\w\-\_]+)/?([\\w\-\_]+)?/?([\\w\-\_]+)?': {
			on: function(team, page, action) {
				routeDispatcher.setPage(team, page, action);
			}
		},
		'': {
			on: function() {
				routeDispatcher.setPage(null, null, null);
			}
		}
	}).configure({});

$(function(){
	router.init();
});

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
		gameStore.candidates.set(_.shuffle(Staff[team]));
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
			setTimeout(gameDispatcher.spin, 80);

			return;
		}

		if (counter > 0) {
			gameStore.counter.set(counter);
			setTimeout(gameDispatcher.spin, gameDispatcher.getTimeout());
		} else {
			gameStore.counter.set(0);
			gameDispatcher.setSpinning(false);
			gameStore.won.set(true);

			winner = gameStore.candidates.val()[gameStore.pointer.val()];

			gameStore.winner.set(winner);
		}
	},
	getTimeout: function() {
		var counter = gameStore.counter.val();

		if (counter > 1000)
			return 5;

		if (counter > 250)
			return 7;

		if (counter > 100)
			return 9;

		if (counter > 50)
			return 20;

		if (counter > 40)
			return 50;

		if (counter > 20)
			return 75;

		if (counter > 5)
			return 100;

		if (counter > 3)
			return 250;

		if (counter > 1)
			return 700;

		return 1000;
	}
};

var RightMenu = React.createClass({displayName: "RightMenu",
	render: function() {
		var team = this.props.team,
			gameEnded = gameStore.winners[team].count() == this.props.teamData.prizes;

		if (gameStore.displayCounter.val()) {
			return React.createElement("div", {className: "col-sm-3 right-menu"}, 
				React.createElement("div", {className: "well text-center"}, 
					React.createElement("h2", null,  gameStore.counter.val() )
				), 

				 gameStore.winner.val() == null ?
					React.createElement("a", {className: "col-xs-12 btn btn-primary", 
					   onClick:  gameDispatcher.startSpinning}, 
						React.createElement("i", {className: "glyphicon glyphicon-heart"}), " Lucky Draw!"
					) :
					React.createElement("a", {className: "col-xs-12 btn btn-default", 
					   onClick:  gameDispatcher.hideCounter}, 
						React.createElement("i", {className: "glyphicon glyphicon-repeat"}), " Start new round"
					)
				
			)
		}

		if (routeStore.page.val() == 'answer') {
			return React.createElement("div", {className: "col-sm-3 right-menu"}, 
				React.createElement("a", {className: "col-xs-12 btn btn-default", 
				   href: "#/" + team}, 
					React.createElement("i", {className: "glyphicon glyphicon-ok"}), " Done"
				)
			)
		}

		if (routeStore.page.val() == 'winners') {
			return React.createElement("div", {className: "col-sm-3 right-menu"}, 
				React.createElement("a", {className: "col-xs-12 btn btn-default", 
				   href: "#/" + team}, 
					"Close"
				)
			)
		}

		if (gameEnded) {
			return React.createElement("div", {className: "col-sm-3 right-menu"}, 
				React.createElement("a", {className: "col-xs-12 btn btn-success", href:  "#/" + team + "/winners"}, 
					React.createElement("i", {className: "glyphicon glyphicon-gift"}), " Winner"
				)
			)
		}

		return React.createElement("div", {className: "col-sm-3 right-menu"}, 
			React.createElement("a", {className: "col-xs-12 btn btn-default", 
			   href: "#/" + team + "/answer"}, 
				React.createElement("i", {className: "glyphicon glyphicon-plus"}), " Add Answer"
			), 

			React.createElement("a", {className: "col-xs-12 btn btn-default", 
			   onClick:  gameDispatcher.shuffleCandidate}, 
				React.createElement("i", {className: "glyphicon glyphicon-refresh"}), " Shuffle"
			), 

			 gameStore.reviewAnswers.val() ?
				React.createElement("a", {className: "col-xs-12 btn btn-default", onClick:  gameDispatcher.hideAnswers}, 
					React.createElement("i", {className: "glyphicon glyphicon-eye-close"}), " Hide Answer"
				) :
				React.createElement("a", {className: "col-xs-12 btn btn-warning", onClick:  gameDispatcher.showAnswers}, 
					React.createElement("i", {className: "glyphicon glyphicon-eye-open"}), " Show Answer"
				), 
			

			 gameStore.sumAnswer.val() <= 0 ? null :
				React.createElement("a", {className: "col-xs-12 btn btn-primary", onClick:  gameDispatcher.showCounter}, 
					React.createElement("i", {className: "glyphicon glyphicon-eye-open"}), " Start"
				), 
			

			React.createElement("a", {className: "col-xs-12 btn btn-success", href:  "#/" + team + "/winners"}, 
				React.createElement("i", {className: "glyphicon glyphicon-gift"}), " Winner"
			)
		)
	}
});

var TeamList = React.createClass({displayName: "TeamList",
	render: function() {
		return React.createElement("div", {className: "row text-center"}, 
			React.createElement("div", {className: "btn-group-vertical"}, 
				 _.map(Staff.teams, function(teamData, team){
					return React.createElement("a", {href: "#/" + team, 
					          key:  team, 
					          className: "btn btn-default btn-lg"}, 
						 teamData.name
					)
				}) 
			)
		)
	}
});

var Winners = React.createClass({displayName: "Winners",
	render: function() {
		var team = routeStore.team.val(),
			teamData = Staff.teams[team],
			winners = [],
			i;

		for (i=0; i < teamData.prizes; i++) {
			winners.push(React.createElement("li", {key: i},  gameStore.winners[team].val()[i] ));
		}

		return React.createElement("div", {className: "row"}, 
			React.createElement("div", {className: "col-sm-8 col-sm-offset-2 well"}, 
				React.createElement("h4", null, "Winners"), 

				React.createElement("ol", null, 
					 winners 
				)
			)
		)
	}
});

var XmasApp = React.createClass({displayName: "XmasApp",
	home: function() {
		window.location = '#/';
	},

	render: function() {
		var team = routeStore.team.val(),
			teamData = team ? Staff.teams[team] : null;

		return React.createElement("div", {className: "row"}, 
			 team == null ?
				React.createElement("div", {className: "well"}, 
					React.createElement("h2", {className: "text-center"}, 
						"DD Xmas Lucky Draw Game ", React.createElement("i", {className: "glyphicon glyphicon-grain"})
					)
				) :
				React.createElement("div", {className: "well"}, 
					React.createElement("h2", {className: "text-center", onClick:  this.home}, 
						React.createElement("i", {className: "glyphicon glyphicon-gift"}), " ",  teamData.name
					), 
					React.createElement("div", {className: "text-center"},  gameStore.candidates.count(), " pax = ",  teamData.prizes, " prizes")
				), 
			
			React.createElement("div", {className: "container"}, 
			 team == null ?
				React.createElement(TeamList, React.__spread({},  this.props)) :
				React.createElement(GamePlay, React.__spread({},  this.props, {team:  routeStore.team.val(), teamData:  Staff.teams[ routeStore.team.val()] }))
			
			)
		);
	}
});

$(function(){
	var xmasApp = React.render(
		React.createElement(XmasApp, {
			routeStore: routeStore, 
			gameStore: gameStore}
			),
		document.getElementById('xmas-app')
	);

	// -- register cortex update --

	routeStore.on('update', function(routeStore){
		xmasApp.setProps({ routeStore: routeStore });
	});

	gameStore.on('update', function(gameStore){
		xmasApp.setProps({ gameStore: gameStore });
	});
});
