addLayer('sp', {
	name: 'Power Shards', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'P', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
		absorbed: new Decimal(0),
		power() {
			return new Decimal(1);
		},
	} },
	color: '#D7D7D7',
	requires() { // Can be a function that takes requirement increases into account // its now
		cost = new Decimal(5);
		return cost;
	},
	resource: 'power shards', // Name of prestige currency
	baseResource: 'YP', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() { return 0.5 },
	row: -1, // Row the layer is in on the tree (0 is the first row)
	layerShown() { return true; },
	gainMult() { // Calculate the multiplier for main currency from bonuses
		let mult = new Decimal(1);

		if (hasUpgrade('sp', 12)) mult = mult.times(upgradeEffect('sp', 12));

		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	hotkeys: [
		{ key: 'p', description: 'P: Reset for power shards', unlocked: true, onPress() {
			if (canReset(this.layer)) doReset(this.layer);
		} },
	],
	tabFormat: [
		'main-display',
		'prestige-button',
		'resource-display',
		['clickable', 11],
		['display-text', function() { return `You have absorbed <b>${formatWhole(player.sp.absorbed)}</b> power shards` } ],
		'blank',
		'upgrades',
	],
	clickables: {
		11: {
			display() { return `Absorb <h3>${formatWhole(player.sp.points)}</h3> power shards for <h3>${formatWhole(player.sp.points.times(player.sp.power()))}</h3> power` },
			canClick() { return player.sp.points.gte(1) },
			onClick() {
				player.sp.absorbed = player.sp.absorbed.add(player.sp.points); // add to the absorbed attribute
				player.s.points = player.s.points.add(player.sp.points.times(player.sp.power())); // add power
				player.sp.points = new Decimal(0); // set shards back to 0
			},
		},
	},
	upgrades: {
		11: {
			title: 'YP Summon',
			description: 'Gain more YP based on your power',
			cost: new Decimal(1),
			effect() {
				return hasUpgrade('sp', 13) ? player.s.points.add(1).pow(0.65) : player.s.points.add(1).pow(0.5);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + 'x';
			},
		},
		12: {
			title: 'Teleportation',
			description: 'Increases power shard gain based on power',
			cost: new Decimal(5),
			effect() {
				return player.s.points.add(1).pow(1/3);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + 'x';
			},
		},
		13: {
			title: 'YP Materialization',
			description: 'YP Summon gives more YP',
			cost: new Decimal(15),
			unlocked() {
				return hasUpgrade('sp', 11);
			},
		},
		21: {
			title: 'YP Recursion',
			description: 'Gain more YP based on YP',
			cost: new Decimal(50),
			effect() {
				return player.points.add(1).pow(0.15);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + 'x';
			},
			unlocked() {
				return hasUpgrade('sp', 12) && hasUpgrade('sp', 13);
			},
		},
		22: {
			title: 'Power Use',
			description: 'Gain more YP based on all upgrades bought',
			cost: new Decimal(500),
			effect() {
				return new Decimal(getUps()).add(1).pow(0.8);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + 'x';
			},
			unlocked() {
				return hasUpgrade('sp', 21);
			},
		},
		23: {
			title: 'Achievement Boost',
			description: 'Gain more YP based on amount of achievements',
			cost: new Decimal(1000),
			effect() {
				return new Decimal(getAchs()).add(1).pow(0.8);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + 'x';
			},
			unlocked() {
				return hasUpgrade('sp', 22);
			},
		},
	},
});