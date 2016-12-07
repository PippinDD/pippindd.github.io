var GamePlay = React.createClass({
	componentWillMount: function() {
		gameDispatcher.reset();
		gameDispatcher.setCandidates(this.props.team);
	},

	render: function() {
		var page;

		switch (routeStore.page.val()) {
			case "answer":
				page = <AddAnswer {...this.props }/>;
				break;

			case "winners":
				page = <Winners {...this.props }/>;
				break;

			case "lucky-draw":
				page = <WheelOfFortune {...this.props}/>;
				break;

			default:
				page = <Candidates {...this.props }/>;
		}

		return <div className="container">
			<div className="row">
				<div className="col-sm-12">
					<RightMenu {...this.props}/>
				</div>
				<div className="col-sm-12">
					{ page }
				</div>
			</div>
		</div>
	}
});
