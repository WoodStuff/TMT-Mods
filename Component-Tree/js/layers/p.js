addLayer('p', {
	name: 'prestige', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'P', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: '#4BDC13',
	requires: new Decimal(10), // Can be a function that takes requirement increases into account
	resource: 'prestige points', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		if (hasUpgrade('p', 22)) mult = mult.times(upgradeEffect('p', 22));

		if (hasUpgrade('u', 13)) mult = mult.times(upgradeEffect('u', 13));

		if (hasMilestone('m', 0)) mult = mult.times(1.3);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	row: 0, // Row the layer is in on the tree (0 is the first row)
	hotkeys: [
		{ key: 'p', description: 'P: Reset for prestige points', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return true },
	doReset(reset) {
		keep = [];
		if (layers[reset].row > this.row) layerDataReset('p', keep);
	},
	upgrades: {
		11: {
			title: 'P11',
			description: 'Start generating points',
			cost: new Decimal(1),
		},
		12: {
			title: 'P12',
			description: 'Prestige points boost point gain',
			cost: new Decimal(1),
			unlocked() { return hasUpgrade('p', 11) },
			effect() {
				return player.p.points.add(2).sqrt();
			},
			effectDisplay() {
				return `${format(upgradeEffect('p', 12))}x`
			},
		},
		21: {
			title: 'P21',
			description: 'Points boost themselves',
			cost: new Decimal(2),
			unlocked() { return hasUpgrade('p', 12) },
			effect() {
				return player.points.add(1).pow(0.15);
			},
			effectDisplay() {
				return `${format(upgradeEffect('p', 21))}x`
			},
		},
		22: {
			title: 'P22',
			description: 'Amount of prestige upgrades bought boosts point and prestige point gain',
			cost: new Decimal(5),
			unlocked() { return hasUpgrade('p', 21) },
			effect() {
				return new Decimal(player.p.upgrades.length).add(1).sqrt();
			},
			effectDisplay() {
				return `${format(upgradeEffect('p', 22))}x`
			},
		},
	},
});