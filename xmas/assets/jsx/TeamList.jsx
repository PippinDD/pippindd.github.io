var TeamList = React.createClass({
	render: function() {
		return <div className="row text-center">
			<div className="btn-group-vertical">
				{ _.map(Staff.teams, function(teamData, team){
					return <a href={"#/" + team}
					          key={ team }
					          className="btn btn-default btn-lg">
						{ teamData.name }
					</a>
				}) }
			</div>
		</div>
	}
});
