var Candidates = React.createClass({
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
			return <div className="row">
				<div className="col-sm-12 candidate prize">
					{pointer+1}. { gameStore.candidates[pointer].val() }
				</div>
			</div>;

		return <table className="table table-compacted table-stripped">
			<thead>
			<tr>
				<th colSpan="2" className="col-sm-12 text-center">Name</th>
			</tr>
			</thead>
			<tbody>{
				gameStore.candidates.map(function (candidate, i) {
					return <tr key={ i }>
						<td>{ i+1 }. { candidate.val() }</td>
					</tr>
				})
			}</tbody>
		</table>
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
