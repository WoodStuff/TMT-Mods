addLayer('infor', {
	name: 'information', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'I', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	} },
	color: '#DFDFDF',
	requires: new Decimal(Infinity), // Can be a function that takes requirement increases into account
	resource: 'seconds of playtime', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
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
	update(diff) {
		player[this.layer].points = player[this.layer].points.plus(diff)
	},
	tabFormat: {
		'Main': {
			content: [
				'main-display',
				['display-text', 'This is a generic mod. More to come in this tab soon.'],
				'blank',
				['display-text', '<h1>Stuff</h1><ul><li>Layer unlocks don\'t remove any resources</li></ul>'],
			],
		},
	},
});