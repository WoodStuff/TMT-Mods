addLayer('u', {
	name: 'upgrade', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'U', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
	}},
	color: '#ffd000',
	requires: new Decimal(15), // Can be a function that takes requirement increases into account
	resource: 'upgrade points', // Name of prestige currency
	baseResource: 'prestige points', // Name of resource prestige is based on
	baseAmount() { return player.p.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ['p'],
	hotkeys: [
		{ key: 'u', description: 'U: Reset for upgrade particles', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return hasUpgrade('p', 22) || player.u.unlocked || player.m.unlocked },
	upgrades: {
		11: {
			title: 'U11',
			description: 'Upgrade points boost point gain',
			cost: new Decimal(1),
			effect() {
				return player.u.points.add(3).sqrt();
			},
			effectDisplay() {
				return `${format(upgradeEffect('u', 11))}x`
			},
		},
		12: {
			title: 'U12',
			description: 'Milestone cubes boost point gain',
			cost: new Decimal(1),
			effect() {
				return player.m.points.add(2).sqrt();
			},
			effectDisplay() {
				return `${format(upgradeEffect('u', 12))}x`
			},
			unlocked() { return hasUpgrade('u', 11) },
		},
		13: {
			title: 'U13',
			description: 'Prestige and UP upgrades bought boosts point and prestige point gain',
			cost: new Decimal(3),
			effect() {
				return new Decimal(player.p.upgrades.length + (player.u.upgrades.length * 1.25)).pow(0.25);
			},
			effectDisplay() {
				return `${format(upgradeEffect('u', 13))}x`
			},
			unlocked() { return hasUpgrade('u', 12) },
		},
		14: {
			title: 'U14',
			description: 'Prestige and UP upgrades bought boosts point and prestige point gain',
			cost: new Decimal(3),
			effect() {
				return new Decimal(player.p.upgrades.length + (player.u.upgrades.length * 1.25)).pow(0.25);
			},
			effectDisplay() {
				return `${format(upgradeEffect('u', 14))}x`
			},
			unlocked() { return hasUpgrade('u', 12) },
		},
	},
});