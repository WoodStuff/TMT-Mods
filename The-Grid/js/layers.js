function parseDesc(desc, id, layer) {
	var left = id - 1;
	var up = id - 10;
	if (left.toString().includes(0)) {
		left = false;
	}
	if (up.toString().includes(0)) {
		up = false;
	}
	return (hasUpgrade(layer, left) || hasUpgrade(layer, up)) ? desc : 'Locked!'
};
function parseCost(cost, id, layer) {
	var left = id - 1;
	var up = id - 10;
	if (left.toString().includes(0)) {
		left = false;
	}
	if (up.toString().includes(0)) {
		up = false;
	}
	return (hasUpgrade(layer, left) || hasUpgrade(layer, up)) ? cost : big
};
const big = new Decimal(Infinity);






addLayer('b', {
	name: 'basic', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'B', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: '#FFBF00',
	requires: new Decimal(5000), // Can be a function that takes requirement increases into account
	resource: 'basic points', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	row: 0, // Row the layer is in on the tree (0 is the first row)
	hotkeys: [
		{ key: 'ctrl+s', description: 'Ctrl+S: Save the game', unlocked: true, onPress() { save(true); } },
		{ key: 'b', description: 'B: Reset for basic points', onPress() { if (canReset(this.layer) && hasUpgrade('b', 23)) doReset(this.layer) } },
	],
	layerShown() { return true },
	tabFormat() {
		return [
		hasUpgrade('b', 23) ? 'main-display' : '',
		hasUpgrade('b', 23) ? 'prestige-button' : '',
		['display-text', '<h1>Upgrades</h1>'],
		'blank',
		'upgrades']
	},
	upgrades: {
		11: {
			title: 'Basic 11',
			description: 'Generate 1 point per second',
			cost: new Decimal(5),
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		12: {
			title: 'Basic 12',
			description() {
				return parseDesc('Gain more points based on points', this.id, this.layer);
			},
			cost() {
				return parseCost(new Decimal(5), this.id, this.layer);
			},
			effect() {
				gain = player.points.add(1).pow(0.25);
				if (hasUpgrade('b', 41)) gain = gain.times(upgradeEffect('b', 41)) // basic points boost the upgrade
				return gain;
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		13: {
			title: 'Basic 13',
			description() {
				return parseDesc('Gain more points based on time spent in the current layer', this.id, this.layer);
			},
			cost() {
				return parseCost(new Decimal(165), this.id, this.layer);
			},
			effect() {
				return Math.pow(player.b.resetTime + 1, 0.22);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		14: {
			title: 'Basic 14',
			description() {
				return parseDesc('Basic points boost Basic 22<br>Requires <b>Basic 23</b>', this.id, this.layer);
			},
			cost() {
				return parseCost(hasUpgrade('b', 23) ? new Decimal(15000) : new Decimal(big), this.id, this.layer);
			},
			effect() {
				return player.b.points.add(1).pow(0.5);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		21: {
			title: 'Basic 21',
			description() {
				return parseDesc('Quadruple point gain', this.id, this.layer);
			},
			cost() {
				return parseCost(new Decimal(15), this.id, this.layer);
			},
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		22: {
			title: 'Basic 22',
			description() {
				return parseDesc('Amount of upgrades bought boosts point gain', this.id, this.layer);
			},
			cost() {
				return parseCost(new Decimal(100), this.id, this.layer);
			},
			effect() {
				gain = new Decimal(Math.pow(player.b.upgrades.length + 1, 0.65));
				if (hasUpgrade('b', 14)) gain = gain.times(upgradeEffect('b', 14)) // basic points boost the upgrade
				return gain;
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		23: {
			title: 'Basic 23',
			description() {
				return parseDesc('Unlock resetting for basic points', this.id, this.layer);
			},
			cost() {
				return parseCost(new Decimal(7500), this.id, this.layer);
			},
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		24: {
			title: 'Basic 24',
			description() {
				return parseDesc('Multiply Basic 32\'s effect by 1.2', this.id, this.layer);
			},
			cost() {
				return parseCost(new Decimal(25), this.id, this.layer);
			},
		},
		31: {
			title: 'Basic 31',
			description() {
				return parseDesc('Double point gain', this.id, this.layer);
			},
			cost() {
				return parseCost(new Decimal(1000), this.id, this.layer);
			},
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		32: {
			title: 'Basic 32',
			description() {
				return parseDesc('Gain more points based on basic points<br>Requires <b>Basic 23</b>', this.id, this.layer);
			},
			cost() {
				return parseCost(hasUpgrade('b', 23) ? new Decimal(2600) : new Decimal(big), this.id, this.layer);
			},
			effect() {
				gain = player.b.points.add(1).pow(0.75);
				if (hasUpgrade('b', 24)) gain = gain.times(1.2) // multiply by 1.2
				return gain;
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		33: {
			title: 'Basic 33',
			description() {
				return parseDesc('Power point generation by 1.01', this.id, this.layer);
			},
			cost() {
				return parseCost(new Decimal(15000), this.id, this.layer);
			},
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		41: {
			title: 'Basic 41',
			description() {
				return parseDesc('Basic points boost Basic 12<br>Requires <b>Basic 23</b>', this.id, this.layer);
			},
			cost() {
				return parseCost(hasUpgrade('b', 23) ? new Decimal(250000) : new Decimal(big), this.id, this.layer);
			},
			effect() {
				return player.b.points.add(1).pow(0.15);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
	}
})