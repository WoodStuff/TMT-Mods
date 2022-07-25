addLayer('r', {
	name: 'rock', 
	image: 'resources/R.png',
	position: 0, 
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
		cubes: new Decimal(0),
	}},
	row: 1, 
	color: '#676771',
	requires: new Decimal('e12'),
	resource: 'rock power', 
	baseResource: 'points', 
	baseAmount() { return player.points }, 
	type: 'normal', 
	exponent() {
		exp = new Decimal(1/7);
		return exp;
	}, 
	gainMult() { 
		mult = new Decimal(1);
		if (player.u.points.gte(3)) mult = mult.times(buyableEffect('t', 12));
		return mult;
	},
	gainExp() { 
		exp = new Decimal(1);
		return exp;
	},
	hotkeys: [
		{ key: 'r', description: 'R: Reset for rock power', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return player.s.unlocked },
	doReset(reset) {
		keep = [];
		if (layers[reset].row > this.row) layerDataReset('r', keep);
	},
	tabFormat() { a = [
		'main-display',
		'prestige-button',
		'resource-display',
		'blank',
		['display-text', `You have ${format(player[this.layer].cubes)} Rock Cubes`],
		'blank',
		['bar', 'cubes'],
		'blank',
		['clickable', 11],
		'blank', 'blank',
		'achievements',
		'blank',
		'upgrades',];

		return a;
	},
	cubeReq() {
		req = new Decimal(15).pow(player[this.layer].cubes.add(1));
		return req;
	},
	bars: {
		cubes: {
			direction: RIGHT,
			width: 350,
			height: 35,
			display() { return `Rock Cubes: ${format(player[this.layer].points)}/${format(tmp[this.layer].cubeReq)} RP` },
			fillStyle: {
				'background-color': '#676771',
			},
			progress() { return player[this.layer].points.div(tmp[this.layer].cubeReq) },
		},
	},
	clickables: {
		11: {
			display: 'Gain<br>R Cube',
			style: {
				'min-height': '60px',
				'height': '60px',
				'width': '60px',
			},
			canClick() {
				return player[this.layer].points.gte(tmp[this.layer].cubeReq);
			},
			onClick() {
				player[this.layer].cubes = player[this.layer].cubes.add(1);
			},
		},
	},
	achievements: {
		11: {
			name: 'Single Lines',
			tooltip() { return `Get 1.11e11 points<br><br>Reward: Square the n-gon effect` },
			done() { return player[this.layer].unlocked && player.points.gte('1.11e11') },
		},
		12: {
			name: 'Triple Ternary',
			tooltip() { return `Get 3 ternary points<br><br>Reward: Rock power boosts point gain<br>Currently: ${format(achievementEffect(this.layer, this.id))}x` },
			unlocked() { return player[this.layer].unlocked },
			done() { return player[this.layer].unlocked && player.t.best.gte(3) },
			effect() { return player[this.layer].points.add(1).log(7.5).add(1) },
		},
		13: {
			name: 'Unusual Shape',
			tooltip() { return `Get 1 rock cube<br><br>Reward: Gain 100% of beginner power gain per second` },
			unlocked() { return player[this.layer].unlocked },
			done() { return player[this.layer].unlocked && player.r.cubes.gte(1) },
		},
		14: {
			name: 'Single Cubes',
			tooltip() { return `Get 11 beginner cubes<br><br>Reward: Unlock 2 new beginner upgrades` },
			unlocked() { return player[this.layer].unlocked },
			done() { return player[this.layer].unlocked && player.b.cubes.gte(11) },
		},
		15: {
			name: 'Early Buffing',
			tooltip() { return `Get 4 Ternary Boosters<br><br>Reward: Ternary Booster base 1.1 -> 1.15` },
			unlocked() { return player.u.points.gte(3) },
			done() { return this.unlocked() && player.t.buyables[12].gte(4) },
		},
		21: {
			name: 'Double Lines',
			tooltip() { return `Get 2.22e22 points<br><br>Reward: idk yet lol` },
			unlocked() { return player.u.points.gte(3) },
			done() { return player[this.layer].unlocked && player.points.gte('2.22e22') },
		},
		22: {
			name: 'Quadruple Ternary',
			tooltip() { return `Get 3333 ternary points<br><br>Reward: ?` },
			unlocked() { return player[this.layer].unlocked },
			done() { return player[this.layer].unlocked && player.t.best.gte(3333) },
		},
		23: {
			name: 'Row Cooperation',
			tooltip() { return `Get the sum of row 2 cubes to 8<br>Currently: ${formatWhole(player.r.cubes)} + ${formatWhole(player.s.cubes)} + ${formatWhole(player.t.cubes)} = ${formatWhole(player.r.cubes.add(player.s.cubes).add(player.t.cubes))}<br><br>Reward:` },
			unlocked() { return player[this.layer].unlocked },
			done() { return player[this.layer].unlocked && player.r.cubes.add(player.s.cubes).add(player.t.cubes).gte(8) },
		},
		24: {
			name: 'Not Cubes Anymore',
			tooltip() { return `Get Begin effect to 1e13<br><br>Reward: -` },
			unlocked() { return player[this.layer].unlocked },
			done() { return player[this.layer].unlocked && upgradeEffect('b', 11).gte('e13') },
		},
		25: {
			name: 'Centigon',
			tooltip() { return `Get a 100-gon<br><br>Reward: nothing` },
			unlocked() { return player.u.points.gte(3) },
			done() { return this.unlocked() && layers.s.getNgon().gte(100) },
		},
	},
})