function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	this.controller.pushScene({
		name: "first",
		disableSceneScroller: true
	}, false);
};
