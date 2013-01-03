function SecondAssistant(cardValue, options) {
	  this.cardValue = cardValue;
	  Mojo.Log.info("options:" + options);
	  this.changeVals = options;
	  
}

SecondAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);
	
	this.controller.get("cardValue").update(this.cardValue)
	if(this.controller.get("cardValue").innerText.length > 1) {
	  	this.controller.get("cardValue").style.cssText += "font-size: 100pt;";
	  }	  
	
	var cardValueString = this.cardValue + '';
	
    this.buttonModel = {
	    "label" : cardValueString,
	    "buttonClass" : "",
	    "disabled" : false
    };
	
    this.controller.setupWidget("cardValue", null, this.buttonModel);
	Mojo.Event.listen(this.controller.get("cardValue"), Mojo.Event.tap, 
    	this.handleTap.bind(this));
};

SecondAssistant.prototype.activate = function(event) {
};

SecondAssistant.prototype.deactivate = function(event) {
};

SecondAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.get("cardValue"), Mojo.Event.tap, 
    	this.handleTap.bind(this));
};

SecondAssistant.prototype.handleTap = function(event){
	this.controller.get(event.srcElement.id).style.cssText += "-webkit-animation-name: flip; -webkit-animation-duration: 1s; -webkit-animation-direction: alternate; -webkit-animation-timing-function: ease-in-out; -webkit-animation-iteration-count: infinite;";
	
	 var nextScene = function(){
		this.controller.stageController.popScene();
		this.controller.stageController.pushScene({
			name: "first",
			disableSceneScroller: true,
			transition: Mojo.Transition.crossFade,
		}, this.changeVals);
	}
	
	var callNextScene = nextScene.bind(this);
	setTimeout(function(){
		callNextScene();
	}, 1000);
};
