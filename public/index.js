var resources = {queens: 1, jellies:0, carbon:0, cash:0}

var templates = {}
var maxJellies = 200
var maxCarbon = 500
var highestCash = 0
var catalog = {}
var resourceMultiplier = 2
var refineCount = 1

var upgrade = function(options) {
	this.name = options.name
	this.cost = options.cost
	this.benefit = options.benefit
	this.description = options.description
	this.max = options.max

	this.owned = 0

	this.addBenefit = function() {
		return this.owned * this.benefit
	}

	this.incrementOwned = function(){
		if ((resources.cash >= this.cost) && (this.owned < this.max)) {		
			this.owned += 1
		    this.benefit()
		    resources.cash -= this.cost
	    }
	}
}

var incrementalUpgrade = function(options) {
	this.data = new upgrade(options)
	var htmlString = templates.upgrade(this.data)
	this.$div = $(htmlString)
	
	catalog[this.data.name] = this.data
	
  	var clickListener = function(){
	    this.data.incrementOwned()
	    var htmlString = templates.upgrade(this.data)
	    this.$div.html(htmlString)
  	}

	var boundClickListener = clickListener.bind(this)

	this.$div.on("click", boundClickListener)

	$("#upgrade-location").append(this.$div)
}



var redeemCarbon = function	() {
	resources.cash += (Math.floor(resources.carbon * .2))
	resources.carbon = 0
	updateDisplay()
}

var updateDisplay = function() {
	if (resources.jellies > maxJellies) {
		resources.jellies = maxJellies
	}
	var htmlString = templates.hud(resources)
	$("#hud-location").html(htmlString)

	listUpgrades()

}

var spawnJelly = function() {
	if (resources.jellies < maxJellies){
		resources.jellies+=resources.queens
		updateDisplay()
	}
}

var refineJelly = function() {
	if (resources.jellies >= refineCount && resources.carbon < maxCarbon) {
		resources.jellies-= refineCount
		resources.carbon += refineCount * (Math.floor(Math.random() * resourceMultiplier + 2))
	}
	updateDisplay()
}


$(document).on("ready", function(){

	templates.hud = Handlebars.compile($("#hud-template").html())
	templates.upgrade = Handlebars.compile($("#upgrade-template").html())

	$(".intro").on("click", function(){
		$(this).toggleClass("active")
		setInterval(spawnJelly, 1000)	
	})

	$("#jelly-button").on("click", function(){
		refineJelly()
	})
	$("#redeem-button").on("click", function() {
		redeemCarbon()
	})


	

})