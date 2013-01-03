var cardValues = ["1/2", "1", "2", "3", "5", "8", "13", "20", "40", "100", "?"];
var cardValues2 = ["1", "2", "3", "4" ,"5", "6", "7", "8", "9", "10", "?"];

function FirstAssistant(options) {
	Mojo.Log.info("options:" + options);
	this.changeVals = options;
}

FirstAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);
	
	for(var i = 0; i < cardValues.length; i++) {
		var iString;
		
		if (!this.changeVals) {
			iString = cardValues[i];
			this.controller.get("change").style.cssText = "";
		}
		else {
			iString = cardValues2[i];
			this.controller.get("change").style.cssText += "background-color: white; color: black; border-color: black;";
		}
	
	    this.buttonModel = {
		    "label" : iString,
		    "buttonClass" : "",
		    "disabled" : false
	    };
		
		this.controller.get(cardValues[i]).innerText = iString;
		
	    this.controller.setupWidget(cardValues[i], null, this.buttonModel); 
		
	    Mojo.Event.listen(this.controller.get(cardValues[i]), Mojo.Event.tap, 
	    	this.handleButtonPress.bind(this));
	}
	
	this.buttonModel = {
		    "label" : "change",
		    "buttonClass" : "",
		    "disabled" : false
	    };
	this.controller.setupWidget("change", null, this.buttonModel); 
	Mojo.Event.listen(this.controller.get("change"), Mojo.Event.tap, 
	    	this.change.bind(this));
  	
};

FirstAssistant.prototype.activate = function(event) {
};

FirstAssistant.prototype.deactivate = function(event) {
};

FirstAssistant.prototype.cleanup = function(event) {
	for (var i = 0; i < cardValues.length; i++) {
		var iString = cardValues[i];
		Mojo.Event.stopListening(this.controller.get(iString), Mojo.Event.tap, this.handleButtonPress.bind(this));
	}
};

FirstAssistant.prototype.change = function(event){
	this.changeVals = !this.changeVals;
	
	if(this.changeVals) {
		this.controller.get("change").style.cssText += "background-color: white; color: black; border-color: black;";
	}
	else {
		this.controller.get("change").style.cssText = "";
	}
	
	if (this.changeVals) {
		for (var i = 0; i < cardValues.length; i++) {		
			this.controller.get(cardValues[i]).style.cssText += "-webkit-animation-name: tilt; -webkit-animation-duration: 1s; -webkit-animation-direction: alternate; -webkit-animation-timing-function: ease-in-out;";
			this.controller.get(cardValues[i]).innerText = cardValues2[i];
		}
	}
	else {
		for (var i = 0; i < cardValues.length; i++) {			
			this.controller.get(cardValues[i]).style.cssText += "-webkit-animation-name: tilt; -webkit-animation-duration: 1s; -webkit-animation-direction: alternate; -webkit-animation-timing-function: ease-in-out;";
			this.controller.get(cardValues[i]).innerText = cardValues[i];
		}
	}
	
	var clear = function() {
		for (var i = 0; i < cardValues.length; i++) {
			this.controller.get(cardValues[i]).style.cssText = "";
		}
	}
	
	var clearCall = clear.bind(this);
	setTimeout(function(){
		clearCall();
	}, 1000);
}

FirstAssistant.prototype.handleButtonPress = function(event){

	this.controller.get(event.srcElement.id).style.cssText += "-webkit-animation-name: flip; -webkit-animation-duration: 1s; -webkit-animation-direction: alternate; -webkit-animation-timing-function: ease-in-out; ";
	
	var nextScene = function(){
		this.controller.stageController.popScene();
		this.controller.stageController.pushScene({
			name: "second",
			disableSceneScroller: true,
			transition: Mojo.Transition.crossFade,
		}, event.srcElement.innerText, this.changeVals);
	}
	
	var callNextScene = nextScene.bind(this);
	setTimeout(function(){
		callNextScene();
	}, 1000);
	
	
};
