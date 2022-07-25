addLayer('c', {
	name: 'curve',
	symbol: 'C',
	position: 0,
	startData() { return {
		unlocked: false,

		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
	}},
	color: '#9526e0',
	requires() {
		req = new Decimal(15000);
		return req;
	},
	resource: 'curves',
	baseResource: 'lines',
	baseAmount() { return player.l.points },
	type: 'normal',
	exponent: 1/3,
	gainMult() {
		mult = new Decimal(1);
		return mult;
	},
	gainExp() {
		exp = new Decimal(1);
		return exp;
	},
	row: 1,
	hotkeys: [
		{ key: 'c', description: 'C: Reset for curves', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	branches: ['l'],
	layerShown() { return hasUpgrade('l', 34) || hasAchievement('a', 14) },
	resetDescription() { return `Bend <b>${formatWhole(player.l.points)}</b> lines to make ` },
	tabFormat: [
		'main-display',
		'prestige-button',
		'resource-display',
		'milestones',
		'upgrades',
		'buyables',
	],
	effect() {
		eff = player.c.points.add(2).log(10).add(2);
		eff = softcap(eff, new Decimal(100), 0.5)
		if (player.c.total.eq(0)) eff = new Decimal(1);
		return eff;
	},
	effectDescription() { return `which are boosting point gain by ${format(tmp.c.effect)}x` },
	milestones: {
		0: {
			requirementDescription: '2 curves',
			effectDescription: 'Unlock a new production option and keep <b>Acceleration</b> on reset',
			done() { return player.c.points.gte(2) },
		},
	},
	buyables: {
		
	}
});