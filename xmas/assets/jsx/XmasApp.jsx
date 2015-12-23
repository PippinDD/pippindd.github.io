var XmasApp = React.createClass({
	home: function() {
		window.location = '#/';
	},

	render: function() {
		var team = routeStore.team.val(),
			teamData = team ? Staff.teams[team] : null;

		return <div className="row">
			{ team == null ?
				<div className="well">
					<h2 className="text-center">
						DD Xmas Lucky Draw Game <i className="glyphicon glyphicon-grain"/>
					</h2>
				</div> :
				<div className="well">
					<h2 className="text-center" onClick={ this.home }>
						<i className="glyphicon glyphicon-gift"/> { teamData.name }
					</h2>
					<div className="text-center">{ gameStore.candidates.count() } pax = { teamData.prizes } prizes</div>
				</div>
			}
			<div className="container">
			{ team == null ?
				<TeamList {...this.props}/> :
				<GamePlay {...this.props} team={ routeStore.team.val() } teamData={ Staff.teams[ routeStore.team.val() ] }/>
			}
			</div>
		</div>;
	}
});

$(function(){
	var xmasApp = React.render(
		<XmasApp
			routeStore={routeStore}
			gameStore={gameStore}
			/>,
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
