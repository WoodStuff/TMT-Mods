addLayer('p2', {
	name: 'super prestige', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'P<sub>2</sub>', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
	} },
	color: '#31aeb0',
	requires: new Decimal(25), // Can be a function that takes requirement increases into account
	resource: 'super prestige points', // Name of prestige currency
	baseResource: 'prestige points', // Name of resource prestige is based on
	baseAmount() { return player.p1.points }, // Get the current amount of baseResource
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
	branches: ['p1'],
	row: 1, // Row the layer is in on the tree (0 is the first row)
	hotkeys: [
		{ key: 'P', description: 'Shift+P: Reset for super prestige points', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return player[this.layer].unlocked },
	milestones: {
		0: {
			requirementDescription: '5 super prestige points',
			effectDescription: 'P<sub>1</sub>\'s layer upgrade doubles point gain',
			done() { return player.p2.best.gte(5) },
		},
		1: {
			requirementDescription: '25 super prestige points',
			effectDescription: 'Keep prestige point upgrades on row 2 reset',
			done() { return player.p2.best.gte(25) },
		},
	},
	upgrades: {
		11: {
			title: 'Enhanced Start',
			description: 'Triple your point gain',
			cost: new Decimal(1),
		},
		12: {
			title: 'Super Prestige Boost',
			description: 'Gain more prestige points based on your super prestige points',
			cost: new Decimal(1),
			unlocked() { return hasUpgrade('p2', 11) },
			effect() { return player[this.layer].points.add(2).log(10).add(1) },
			effectDisplay() { return `${format(upgradeEffect('p2', 12))}x` },
		},
		13: {
			title: 'Self-Self-Synergy',
			description: 'Self-Synergy (P<sub>1</sub>) is stronger based on your super prestige points',
			cost: new Decimal(3),
			unlocked() { return hasUpgrade('p2', 11) },
			effect() { return player[this.layer].points.add(2).pow(0.25) },
			effectDisplay() { return `${format(upgradeEffect('p2', 13))}x` },
		},
		21: {
			title: 'Prestige Overgrade',
			description: 'Prestige point gain is 2.5x',
			cost: new Decimal(100),
			unlocked() { return hasUpgrade('p2', 12) && hasUpgrade('p2', 13) },
		},
	},
});