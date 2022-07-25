addLayer('ach', {
	name: 'achievement', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'A', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	} },
	color: 'yellow',
	requires: new Decimal(Infinity), // Can be a function that takes requirement increases into account
	resource: 'achievements', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
    update(diff) {
		player.ach.points = new Decimal(getAchs());
	},
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		exp = new Decimal(1);
		return exp;
	},
	row: 'side', // Row the layer is in on the tree (0 is the first row)
	layerShown() { return true },
	tabFormat: [
		'main-display',
		'achievements',
	],
	achievements: {
		11: {
			name: 'The Endgame',
			tooltip: 'Do a Prestige reset',
			done() {
				return player.p1.points.gte(1);
			},
		},
		12: {
			name: 'Upgraded',
			tooltip: 'Unlock Super Prestige and Boosters',
			done() {
				return player.p2.unlocked;
			},
		},
		13: {
			name: 'Inflation',
			tooltip: 'Get 1 million super prestige points',
			done() {
				return player.p2.total.gte(1000000);
			},
		},
	},
});