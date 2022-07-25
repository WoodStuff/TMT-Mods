addLayer('j', {
	name: 'j', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'J', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
		subtabbings: [false],
	}},
	color: '#9F20FA',
	requires: new Decimal(10), // Can be a function that takes requirement increases into account
	resource: 'J points', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
	tabFormat: [
		'main-display',
		'prestige-button',
		'resource-display',
		'blank',
		['microtabs', 'first'],
	],
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		if (hasUpgrade('j', 12)) mult = mult.times(upgradeEffect('j', 12));
		if (hasUpgrade('j', 14)) mult = mult.times(buyableEffect('j', 12));
		if (new Decimal(challengeCompletions('j', 11)).gte(1)) mult = mult.times(2);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		exp = new Decimal(1);
		return exp;
	},
	row: 0, // Row the layer is in on the tree (0 is the first row)
	hotkeys: [
		{ key: 'ctrl+s', description: 'Ctrl+S: Save the game', unlocked: true, onPress() {
			save(true);
		} },
		{ key: 'j', description: 'J: Reset for J points', onPress() {
			if (canReset(this.layer)) doReset(this.layer)
		} },
	],
	layerShown() { return true },
	microtabs: {
		first: {
			'Bonuses': {
				content: [
					'buyables',
				],
			},
			'Upgrades': {
				content: [
					'upgrades',
				],
				unlocked() { return player.j.subtabbings[0] },
			},
			'Challenges': {
				content: [
					['display-text', 'Entering a challenge will reset your J bonuses and points.'],
					'challenges',
				],
				unlocked() { return hasUpgrade('j', 15) },
			},
		},
	},
	buyables: {
		11: {
			display() { return `<h2>Point Boosters</h1><br><b>${formatWhole(getBuyableAmount(this.layer, this.id))}/${formatWhole(tmp.j.buyables[this.id].limit)}</b><br><p>Multiply point gain by <b>x${format(buyableEffect(this.layer, this.id))}</b></p><br><b>Cost:</b> ${format(this.cost())} J points` },
			cost(x) {
				if (between(0, 4, x)) return x.plus(1);
				else if (between(5, 9, x)) return x.times(10);
				else if (between(10, 14, x)) return new Decimal(2).pow(x);
				else return new Decimal(10).pow(x);
			},
			canAfford() { return player[this.layer].points.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(tmp.j.buyables[this.id].limit) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost());
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
				if (player.j.buyables[11].gte(3)) player.j.subtabbings[0] = true;
			},
			effect(x) {
				eff = new Decimal(2).pow(x);
				if (inChallenge('j', 11)) return new Decimal(1.5).pow(x);
				return eff;
			},
			limit() {
				lim = new Decimal(10);
				if (new Decimal(challengeCompletions('j', 11)).gte(1)) lim = lim.plus(5);
				return lim;
			},
		},
		12: {
			display() { return `<h2>J Bonuses</h1><br><b>${formatWhole(getBuyableAmount(this.layer, this.id))}/${formatWhole(tmp.j.buyables[this.id].limit)}</b><br><p>Multiply J point gain by <b>x${format(buyableEffect(this.layer, this.id))}</b></p><br><b>Cost:</b> ${format(this.cost())} J points` },
			unlocked() { return hasUpgrade('j', 14) },
			cost(x) {
				if (x.eq(0)) return new Decimal(20);
				if (between(1, 3, x)) return x.add(1).times(15).add(x.times(5));
				if (between(4, 5, x)) return x.add(3).times(40).add(x.times(15));
				else return new Decimal(1000).pow(x);
			},
			canAfford() { return player[this.layer].points.gte(this.cost()) && getBuyableAmount(this.layer, this.id).lt(tmp.j.buyables[this.id].limit) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost());
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
				if (player.j.buyables[11].gte(3)) player.j.subtabbings[0] = true;
			},
			effect(x) {
				eff = new Decimal(1.25).pow(x);
				if (inChallenge('j', 11)) return new Decimal(1.1).pow(x);
				return eff;
			},
			limit() {
				lim = new Decimal(4);
				if (new Decimal(challengeCompletions('j', 11)).gte(1)) lim = lim.plus(2);
				return lim;
			},
		},
	},
	upgrades: {
		11: {
			title: 'First Boost',
			description: 'Amount of J upgrades bought boosts point gain',
			cost: new Decimal(2),
			effect() {
				eff = new Decimal(player.j.upgrades.length).add(1).pow(1/3);
				return eff;
			},
			effectDisplay() {
				return `${format(upgradeEffect(this.layer, this.id))}x`
			},
			unlocked() {
				return player.j.subtabbings[0];
			},
		},
		12: {
			title: 'Upgrade Boost',
			description: 'Amount of J upgrades bought boosts J point gain',
			cost: new Decimal(4),
			effect() {
				eff = new Decimal(player.j.upgrades.length).add(1).pow(0.25);
				return eff;
			},
			effectDisplay() {
				return `${format(upgradeEffect(this.layer, this.id))}x`
			},
			unlocked() {
				return player.j.buyables[11].gte(5) || hasUpgrade(this.layer, this.id);
			},
			currencyDisplayName: 'PB levels',
			currencyLocation() { return player.j.buyables },
			currencyInternalName: 11,
		},
		13: {
			title: 'Finally, Effect',
			description() { return `J points boost point gain ${shiftDown ? 'log50(log50(J+3)+1)+1' : ''}` },
			cost: new Decimal(30),
			effect() {
				eff = new Decimal(player.j.points).add(3).log(50).add(1).log(50).add(1);
				if (inChallenge('j', 12)) eff = new Decimal(1).div(eff.times(4));
				return eff;
			},
			effectDisplay() {
				return `${format(upgradeEffect(this.layer, this.id))}x`
			},
			unlocked() {
				return (player.j.points.gte(10) && hasUpgrade('j', 11) && hasUpgrade('j', 12)) || hasUpgrade(this.layer, this.id);
			},
		},
		14: {
			title: 'Buyabl',
			description: 'Unlock a new bonus',
			cost: new Decimal(5),
			unlocked() {
				return (player.j.buyables[11].gte(6) && hasUpgrade('j', 13)) || hasUpgrade(this.layer, this.id);
			},
			currencyDisplayName: 'PB levels',
			currencyLocation() { return player.j.buyables },
			currencyInternalName: 11,
		},
		15: {
			title: 'Expansions',
			description: 'Unlock Challenges',
			cost: new Decimal(500),
			unlocked() {
				return (player.j.buyables[11].gte(10) && player.j.buyables[12].gte(4) && hasUpgrade('j', 14)) || hasUpgrade(this.layer, this.id);
			},
		},
	},
	challenges: {
		11: {
			name: 'Bonus Degrade',
			challengeDescription: 'Point Booster and J Bonus are greatly nerfed',
			goalDescription: '6 Point Boosters',
			rewardDescription: 'Point and J Point gain x2',
			canComplete() { return player.j.buyables[11].gte(6) },
			onEnter() {
				player.j.buyables = { 11: new Decimal(0), 12: new Decimal(0) };
				player.j.points = new Decimal(0);
			},
		},
		12: {
			name: 'Downgrades',
			challengeDescription: 'Finally, Effect nerfs point and J point gain',
			goalDescription: '4 J Bonuses',
			rewardDescription: 'You can further upgrade the first 2 bonuses',
			unlocked() { return new Decimal(challengeCompletions('j', 11)).gte(1) },
			canComplete() { return player.j.buyables[12].gte(4) },
			onEnter() {
				player.j.buyables = { 11: new Decimal(0), 12: new Decimal(0) };
				player.j.points = new Decimal(0);
			},
		},
	},
})