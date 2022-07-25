addLayer('sf', {
	name: 'Fire Shards', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'F', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
		absorbed: new Decimal(0),
		power() {
			return new Decimal(5);
		},
	} },
	color: '#f05c26',
	requires() { // Can be a function that takes requirement increases into account // its now
		cost = new Decimal('e6');
		return cost;
	},
	resource: 'fire shards', // Name of prestige currency
	baseResource: 'YP', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() { return 0.125 },
	row: -1, // Row the layer is in on the tree (0 is the first row)
	layerShown() { return true; },
	branches: ['sp'],
	gainMult() { // Calculate the multiplier for main currency from bonuses
		let mult = new Decimal(1);

		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	onPrestige() {
		player.s.points = player.s.points.sub(player.sp.absorbed);
		layerDataReset('sp', []);
	},
	hotkeys: [
		{ key: 'f', description: 'F: Reset for fire shards', unlocked: true, onPress() {
			if (canReset(this.layer)) doReset(this.layer);
		} },
	],
	tabFormat: [
		'main-display',
		'prestige-button',
		'resource-display',
		['clickable', 11],
		['display-text', function() { return `You have absorbed <b>${formatWhole(player.sf.absorbed)}</b> fire shards` } ],
		'blank',
		'milestones',
		'upgrades',
	],
	clickables: {
		11: {
			display() { return `Absorb <h3>${formatWhole(player.sf.points)}</h3> fire shards for <h3>${formatWhole(player.sf.points.times(player.sf.power()))}</h3> power` },
			canClick() { return player.sf.points.gte(1) },
			onClick() {
				player.sf.absorbed = player.sf.absorbed.add(player.sf.points); // add to the absorbed attribute
				player.s.points = player.s.points.add(player.sf.points.times(player.sf.power())); // add power
				player.sf.points = new Decimal(0); // set shards back to 0
			},
		},
	},
	milestones: {
		0: {
			requirementDescription: '10 fire shards',
			effectDescription: 'Keep power shard upgrades on fire shard reset',
			done() {
				return player.sf.points.gte(10);
			},
		},
	},
	upgrades: {
		11: {
			title: 'YP Generation',
			description: 'Gain even more YP based on your power',
			cost: new Decimal(1),
			effect() {
				return player.s.points.add(2).log(10).add(1);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + 'x';
			},
		},
	},
});