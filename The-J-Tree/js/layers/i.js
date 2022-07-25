addLayer('i', {
	name: 'i', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'I', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
	}},
	color: '#DADADA',
	requires: new Decimal(10000), // Can be a function that takes requirement increases into account
	resource: 'I points', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'static', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base() { return 5 },
	exponent() { return 1.25 }, // Prestige currency exponent
	roundUpCost: true,
	nodeStyle() { return player.points.gte(10000) || player.i.unlocked ? {
		'background': 'linear-gradient(0.4turn, rgb(140 204 231), rgb(217 234 204), rgb(232 185 133))',
	} : {} },
	tabFormat: [
		'main-display',
		'prestige-button',
		'resource-display',
		'blank',
		['microtabs', 'first'],
	],
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		exp = new Decimal(1);
		return exp;
	},
	row: 0, // Row the layer is in on the tree (0 is the first row)
	hotkeys: [
		{ key: 'i', description: 'I: Reset for I points', onPress() {
			if (canReset(this.layer)) doReset(this.layer)
		} },
	],
	branches: ['j'],
	layerShown() { return (new Decimal(challengeCompletions('j', 12)).gte(1) || player.i.unlocked) && false },
	componentStyles: {
		'prestige-button': {
			'background': 'linear-gradient(0.4turn, rgb(140 204 231), rgb(217 234 204), rgb(232 185 133))',
		},
	},
	microtabs: {
		first: {
			'Main': {
				content: [
					'buyables',
				],
			},
		},
	},
})