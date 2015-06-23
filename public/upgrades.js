var listUpgrades = function() {
	if (resources.cash > highestCash) {
		highestCash = resources.cash
	}

	if (highestCash >= 10 && catalog["Queen Jelly"] === undefined) {

		newQueen = new incrementalUpgrade({
			name: "Queen Jelly",
			cost: 25,
			owned: 0,
			benefit: function() {
				resources.queens+=1
			},
			description: "This gives our factory a new queen, producing an extra jelly every second.",
			max: 3,
		})			
	}

	if (highestCash >= 25 && catalog["Conveyor Belt"] === undefined) {
		conveyorBelt = new incrementalUpgrade({
			name: "Conveyor Belt",
			cost: 50,
			benefit: function() {
				this.cost = 150
				setInterval(function(){
					refineJelly()
				}, 3000)
			},
			description: "Handily conveys some of your jellies straight to the refiner.",
			max: 2,
		})
	}

	if (highestCash >= 75 && catalog["Hydraulic Press"] === undefined) {
		hydraulicPress = new incrementalUpgrade({
			name: "Hydraulic Press",
			cost: 150,
			benefit: function() {
				resourceMultiplier = 3.5
			},
			description: "Squeezes extra resources out of each batch of jellies.",
			max: 1,
		})
	}

	if (highestCash >= 25 && catalog["Automatic Grinder"] === undefined) {
		automaticGrinder = new incrementalUpgrade({
			name: "Automatic Grinder",
			cost: 100,
			benefit: function() {
				refineCount = 3
			},
			description: "Allows you to refine multiple jellies with each click.",
			max: 1,
		})
	}



	if (highestCash >= 125 && catalog["Stacked Cages"] === undefined) {
		stackedCage = new incrementalUpgrade({
			name: "Stacked Cages",
			cost: 200,
			benefit: function(){
				maxJellies+=300
			},
			description: "These cages allow you to cram more jellies into the same amount of floorspace.",
			max: 2,
		})		
	}



}
