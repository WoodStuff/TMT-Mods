addLayer('b', {
	name: 'bonus', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'B', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
		resets: new Decimal(0),
	} },
	color: '#6fc08a',
	requires() { // Can be a function that takes requirement increases into account // its now
		cost = new Decimal('e35');
		return cost;
	},
	onPrestige() {
		player[this.layer].resets = player[this.layer].resets.add(1);
	},
	doReset(reset) {
		keep = [];
		if (layers[reset].row > this.row) layerDataReset(this.layer, keep);
	},
	canBuyMax() { return false },
	tabFormat: defaultTab('f'),
	resource: 'feathers', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() {
		exp = 1.4;
		return exp;
	},
	base() { return 5 },
	row: 2, // Row the layer is in on the tree (0 is the first row)
	layerShown() { return player.c.unlocked },
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		exp = new Decimal(1);
		return exp;
	},
	hotkeys: [
		{ key: 'f', description: 'F: Reset for feathers', onPress() { if (canReset(this.layer)) doReset(this.layer) }, unlocked() { return player[this.layer].unlocked } },
	],
});