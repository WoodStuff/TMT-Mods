addLayer('b1', {
	name: 'boost', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'B<sub>1</sub>', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
	} },
	color: '#6e64c4',
	requires: new Decimal(25), // Can be a function that takes requirement increases into account
	resource: 'boosters', // Name of prestige currency
	baseResource: 'prestige points', // Name of resource prestige is based on
	baseAmount() { return player.p1.points }, // Get the current amount of baseResource
	type: 'static', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 1.25, // Prestige currency exponent
    base: 5,
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		exp = new Decimal(1);
		return exp;
	},
    branches: ['p1'],
    roundUpCost: true,
	row: 1, // Row the layer is in on the tree (0 is the first row)
	hotkeys: [
		{ key: 'b', description: 'B: Reset for boosters', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return player[this.layer].unlocked },
    effect(next = false) {
		b = next ? player.b1.points.add(1) : player.b1.points;
        return new Decimal(2).pow(b);
    },
    effectDescription() {
        return `which are multiplying point gain by ${format(tmp.b1.effect)}x (next: ${format(layers.b1.effect(true))}x)`;
    },
	upgrades: {
		11: {
			title: 'Double Boost',
			description: 'Boosters boost prestige point gain at a reduced rate',
			cost: new Decimal(2),
			effect() {
				return player[this.layer].points.add(1.5).pow(0.25);
			},
			effectDisplay() { return `${format(upgradeEffect('b1', 11))}x` }
		},
		12: {
			title: 'Effective',
			description: 'Prestige Boost (P<sub>1</sub>)\'s effect is doubled',
			cost: new Decimal(9),
		},
	},
    milestones: {
		0: {
			requirementDescription: '4 boosters',
			effectDescription: 'Gain 100% of your prestige point gain per second',
			done() { return player.b1.best.gte(4) },
		},
	},
});