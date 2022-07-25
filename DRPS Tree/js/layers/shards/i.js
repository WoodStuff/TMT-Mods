addLayer('si', {
	name: 'Ice Shards', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'I', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
		absorbed: new Decimal(0),
		power() {
			return new Decimal(5);
		},
	} },
	color: '#15B7FF',
	requires() { // Can be a function that takes requirement increases into account // its now
		cost = new Decimal('e6');
		return cost;
	},
	resource: 'ice shards', // Name of prestige currency
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
		{ key: 'i', description: 'I: Reset for ice shards', unlocked: true, onPress() {
			if (canReset(this.layer)) doReset(this.layer);
		} },
	],
	tabFormat: [
		'main-display',
		'prestige-button',
		'resource-display',
		['clickable', 11],
		['display-text', function() { return `You have absorbed <b>${formatWhole(player.si.absorbed)}</b> ice shards` } ],
		'blank',
		'milestones',
		'buyables',
		'upgrades',
	],
	clickables: {
		11: {
			display() { return `Absorb <h3>${formatWhole(player.si.points)}</h3> ice shards for <h3>${formatWhole(player.si.points.times(player.si.power()))}</h3> power` },
			canClick() { return player.si.points.gte(1) },
			onClick() {
				player.si.absorbed = player.si.absorbed.add(player.si.points); // add to the absorbed attribute
				player.s.points = player.s.points.add(player.si.points.times(player.si.power())); // add power
				player.si.points = new Decimal(0); // set shards back to 0
			},
		},
	},
	buyables: {
		11: {
			display() {
				return `<h1>Icicles</h1>
				<b>Cost:</b> ${format(this.cost(getBuyableAmount(this.layer, this.id)))}
				<b>Amount:</b> ${format(getBuyableAmount(this.layer, this.id))}<br>
				Multiplies YP gain by ${format(buyableEffect(this.layer, this.id))}`;
			},
			cost(x) { return new Decimal(2).pow(x) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) { return x.eq(0) ? 1 : x.add(3).log(5).add(1); },
		}
	},
	milestones: {
		0: {
			requirementDescription: '10 ice shards',
			effectDescription: 'Keep power shard upgrades on ice shard reset',
			done() {
				return player.si.points.gte(10);
			},
		},
	},
});