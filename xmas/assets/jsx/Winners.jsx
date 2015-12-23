var Winners = React.createClass({
	render: function() {
		var team = routeStore.team.val(),
			teamData = Staff.teams[team],
			winners = [],
			i;

		for (i=0; i < teamData.prizes; i++) {
			winners.push(<li key={i}>{ gameStore.winners[team].val()[i] }</li>);
		}

		return <div className="row">
			<div className="col-sm-8 col-sm-offset-2 well">
				<h4>Winners</h4>

				<ol>
					{ winners }
				</ol>
			</div>
		</div>
	}
});
