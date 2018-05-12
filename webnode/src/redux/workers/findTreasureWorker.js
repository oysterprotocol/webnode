self.onmessage = ({ data: action }) => {
	const { content } = action.payload;
	console.log("findTreasureWorker Worker works!");
	// here need epics business logic
	self.postMessage({
		type: action.type,
		payload: {
			dataMapHash: action.payload.dataMapHash,
			chunkIdx: action.payload.chunkIdx
		}
	});
};
