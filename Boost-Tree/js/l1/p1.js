addLayer('p1', {
	name: 'prestige', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'P<sub>1</sub>', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	} },
	color: '#31aeb0',
	requires: new Decimal(10), // Can be a function that takes requirement increases into account
	resource: 'prestige points', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		if (hasUpgrade('p1', 21)) mult = mult.times(1.8);

		if (hasUpgrade('p2', 12)) mult = mult.times(upgradeEffect('p2', 12));
		if (hasUpgrade('p2', 21)) mult = mult.times(2.5);
		
		if (hasUpgrade('b1', 11)) mult = mult.times(upgradeEffect('b1', 11));
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		exp = new Decimal(1);
		return exp;
	},
	passiveGeneration() {
		return hasMilestone('b1', 0) ? 1 : 0;
	},
	row: 0, // Row the layer is in on the tree (0 is the first row)
	hotkeys: [
		{ key: 'ctrl+s', description: 'Ctrl+S: Save the game', onPress() { save(true) } },
		{ key: 'p', description: 'P: Reset for prestige points', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return true },
	doReset(reset) {
		keep = [];
		if (hasMilestone('p2', 1) && (reset == 'p2' || reset == 'b1')) keep.push('upgrades');
		if (layers[reset].row > this.row) layerDataReset('p1', keep);
	},
	upgrades: {
		11: {
			title: 'Start',
			description: 'Generate 1 more point/sec',
			cost: new Decimal(1),
		},
		12: {
			title: 'Prestige Boost',
			description: 'Gain more points based on your prestige points',
			cost: new Decimal(1),
			unlocked() { return hasUpgrade('p1', 11) },
			effect() { 
				gain = player[this.layer].points.add(2).log(10).add(1);
				if (hasUpgrade('b1', 12)) gain = gain.times(2);
				gain = softcap(gain, new Decimal(25000), 0.5);
				return gain;
			},
			effectDisplay() { return `${format(upgradeEffect('p1', 12))}x` },
		},
		13: {
			title: 'Self-Synergy',
			description: 'Gain more points based on your points',
			cost: new Decimal(3),
			unlocked() { return hasUpgrade('p1', 11) },
			effect() {
				gain = player.points.add(2).log(player.points.add(2).log(10).add(1)).add(0.5).div(2);
				if (hasUpgrade('p2', 13)) gain = gain.times(upgradeEffect('p2', 13));
				return gain;
			},
			effectDisplay() { return `${format(upgradeEffect('p1', 13))}x` },
		},
		21: {
			title: 'Prestige Upgrade',
			description: 'Prestige point gain is 1.8x',
			cost: new Decimal(10),
			unlocked() { return hasUpgrade('p1', 12) && hasUpgrade('p1', 13) },
		},
		22: {
			title: 'Upgrade Power',
			description: 'Upgrades boost point gain',
			cost: new Decimal(15),
			unlocked() { return hasUpgrade('p1', 21) },
			effect() { return new Decimal(getUps()).pow(1/3) },
			effectDisplay() { return `${format(upgradeEffect('p1', 22))}x` },
		},
		31: {
			title: 'Layer Upgrade',
			description: 'Unlock new layers',
			cost: new Decimal(25),
			unlocked() { return hasUpgrade('p1', 22) },
			onPurchase() {
				player.p1.points = player.p1.points.add(25);
				player.p2.unlocked = true;
				player.b1.unlocked = true;
			},
			style: {
				'width': '360px',
			},
		},
	},
});