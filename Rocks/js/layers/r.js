// =======
// LAYER 1
// =======

// EGG POINTS

addLayer('r', {
	name: 'Rocks', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'R', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
		resets: new Decimal(0),
	} },
	color: '#ab9f8e',
	requires() { // Can be a function that takes requirement increases into account // its now
		cost = new Decimal(10);
		return cost;
	},
	onPrestige() {
		player[this.layer].resets = player[this.layer].resets.add(1);
	},
	resource: 'rocks', // Name of prestige currency
	baseResource: 'pebbles', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() { return 0.5 },
	row: 0, // Row the layer is in on the tree (0 is the first row)
	layerShown() { return true; },
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		exp = new Decimal(1);
		return exp;
	},
	hotkeys: [
		{ key: 'ctrl+s', description: 'Ctrl+S: Save the game', unlocked: true, onPress() {
			save(true);
		} },
		{ key: 'r', description: 'R: Reset for rocks', onPress() {
			if (canReset(this.layer)) doReset(this.layer);
		} },
	],
	infoboxes: {
		lore: {
			title: 'lore',
			body: `you're extremely talented in making stuff with pebbles and rocks. one day, you wake up and
			find yourself on an island. you manage to find some pebbles on it. well, looks like you've got some work to do`,
		},
	},
	buyables: {
		11: {
			title: 'Things',
			cost(x) { return new Decimal(x).pow(x).add(x + 1).round() },
			display() { return `<b>Cost:</b> ${this.cost(getBuyableAmount('r', 11))}<br><b>Amount:</b> ${getBuyableAmount('r', 11)}<br>Multiplies pebble gain by ${buyableEffect('r', 11)}` },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			unlocked() { return hasUpgrade('r', 21) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost());
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
			},
			effect(x) {
				return new Decimal(1.5).pow(x);
			},
		},
	},
	upgrades: {
		11: {
			title: 'Pet Rocks',
			description() {
				return `Increases pebble production per rocks`;
			},
			cost: new Decimal(1),
			effect() {
				return player.r.points.add(1).log(10).times(1.2);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; },
		},
		12: {
			title: 'Pebble Motivation',
			description: 'Increases pebble gain per pebbles',
			cost: new Decimal(2),
			effect() {
				return player.points.add(1).log(15);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; },
			unlocked() { return hasUpgrade('r', 11) },
		},
		13: {
			title: 'Compact Rocks',
			description: 'Multiplies pebble production by 1.2x.',
			cost: new Decimal(5),
			unlocked() { return hasUpgrade('r', 12) },
		},
		21: {
			title: 'Thing Creation',
			description: 'Unlock creating rock things',
			cost: new Decimal(10),
			unlocked() { return hasUpgrade('r', 13) },
		},
		22: {
			title: 'Thing Creation',
			description: 'Unlock creating rock things',
			cost: new Decimal(100),
			unlocked() { return false },
		},
	},
});