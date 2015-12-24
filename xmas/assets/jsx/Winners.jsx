var Winners = React.createClass({
	render: function() {
		var team = routeStore.team.val(),
			teamData = Staff.teams[team],
			winners = [],
			i;

		for (i=0; i < teamData.prizes; i++) {
			winners.push(<tr key={ i }><td>{ gameStore.winners[team].val()[i] }</td></tr>);
		}

		return <div className="row">
			<h3>Winners</h3>
			<table className="table table-compacted table-stripped candidates-table">
				<tbody>
					{ winners }
				</tbody>
			</table>
		</div>
	}
});
