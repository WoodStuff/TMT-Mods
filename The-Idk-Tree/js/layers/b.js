addLayer('b', {
	name: 'basic',
	symbol: 'B',
	position: 0,
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: '#4b68c9',
	requires: new Decimal(5),
	resource: 'basic points',
	baseResource: 'points',
	baseAmount() { return player.points },
	type: 'normal',
	exponent: 0.5,
	gainMult() {
		let mult = new Decimal(1)
		return mult;
	},
	gainExp() {
		return new Decimal(1);
	},
	row: 0,
	hotkeys: [
		{ key: 'b', description: 'B: Reset for basic points', onPress() { if (canReset(this.layer)) doReset(this.layer); } },
		{ key: 'ctrl+s', description: 'Ctrl+S: Save the game', onPress() { save() } },
	],
	layerShown() { return true; },
	upgrades: {
		11: {
			title: 'Basic Boost',
			description: 'Basic points increase point production speed',
			cost: 1,
			effect() {
				eff = player[this.layer].points.plus(2).sqrt()
				eff = softcap(eff, 25000, 0.25);
				return eff;
			},
			effectDisplay() { return `${format(upgradeEffect('b', 11))}x` }
		},
		12: {
			title: 'Basic Boost',
			description: 'Gain more points based on your basic points',
			cost: 5,
			effect() {
				eff = player[this.layer].best.plus(1).sqrt()
				eff = softcap(eff, 25000, 0.25);
				return eff;
			},
			effectDisplay() { return `${format(upgradeEffect('b', 11))}x` }
		},
	},
});