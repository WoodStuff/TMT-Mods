addLayer('b', {
	name: 'beginner', 
	image: 'resources/B.png',
	position: 0, 
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
		cubes: new Decimal(0),
	}},
	row: 0, 
	color: '#B77A48',
	requires: new Decimal(10), 
	resource: 'beginner power', 
	baseResource: 'points', 
	baseAmount() { return player.points }, 
	type: 'normal', 
	exponent() {
		exp = new Decimal(0.5);
		if (player.u.points.gte(2)) exp = exp.add(0.05);
		return exp;
	},
	branches: ['r', 's', 't'],
	passiveGeneration() {
		pg = 0;
		if (hasAchievement('r', 13)) pg += 1;
		return pg;
	},
	gainMult() { 
		mult = new Decimal(1);
		if (hasUpgrade('b', 13)) mult = mult.times(upgradeEffect('b', 13));
		if (hasUpgrade('b', 22)) mult = mult.times(upgradeEffect('b', 22));
		if (player.u.points.gte(1)) mult = mult.times(2);
		if (player.s.unlocked) mult = mult.times(tmp.s.ngonEffect);
		if (player.u.points.gte(3)) mult = mult.times(layers.u.getEffects([3, 0]));
		if (player.u.points.gte(3)) mult = mult.times(buyableEffect('t', 12));
		return mult;
	},
	gainExp() { 
		exp = new Decimal(1);
		return exp;
	},
	hotkeys: [
		{ key: 'b', description: 'B: Reset for beginner power', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return true },
	doReset(reset) {
		keep = [];
		if (hasMilestone('s', 1) && layers[reset].row == 1) keep.push('upgrades');
		if (player.u.best.gte(2)) keep.push('cubes');
		if (layers[reset].row > this.row) layerDataReset('b', keep);
	},
	tabFormat() { return [
		'main-display',
		'prestige-button',
		'resource-display',
		'blank',
		['display-text', `You have ${format(player[this.layer].cubes)} Beginner Cubes`],
		'blank',
		['bar', 'cubes'],
		'blank',
		['clickable', 11],
		'blank', 'blank',
		'upgrades',
		['display-text', (player[this.layer].cubes.gte(3) && player.u.points.eq(0)) ? `You can get an Unit! Click the white node to gain one.` : ''],
	] },
	cubeReq() {
		req = new Decimal(10).pow(player[this.layer].cubes.add(1));
		return req;
	},
	bars: {
		cubes: {
			direction: RIGHT,
			width: 350,
			height: 35,
			display() { return `Beginner Cubes: ${format(player[this.layer].points)}/${format(tmp[this.layer].cubeReq)} BP` },
			fillStyle: {
				'background-color': '#B77A48',
			},
			progress() { return player[this.layer].points.div(tmp[this.layer].cubeReq) },
		},
	},
	clickables: {
		11: {
			display: 'Gain<br>B Cube',
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
	upgrades: {
		11: {
			title: 'Begin',
			description: 'Beginner upgrades bought boost point gain',
			cost: new Decimal(1),
			effect() {
				base = new Decimal(2);
				if (hasUpgrade('b', 12)) base = base.add(upgradeEffect('b', 12));
				if (hasUpgrade('b', 15)) base = base.add(upgradeEffect('b', 15));

				eff = base.pow(player.b.upgrades.length);
				return eff;
			},
			effectDisplay() { return `${format(upgradeEffect(this.layer, this.id))}x` },
		},
		12: {
			title: 'Begin+',
			description: 'Beginner power boosts Begin base',
			cost: new Decimal(2),
			unlocked() { return hasUpgrade(this.layer, 11) },
			effect() {
				eff = player.b.points.add(1).log(10);
				return eff;
			},
			effectDisplay() { return `+${format(upgradeEffect(this.layer, this.id))}` },
		},
		13: {
			title: 'Cubed',
			description: 'Beginner cubes boost beginner power gain',
			cost: new Decimal(12),
			unlocked() { return hasUpgrade(this.layer, 12) },
			effect() {
				eff = player.b.cubes.add(1).log(3).add(1);
				return eff;
			},
			effectDisplay() { return `${format(upgradeEffect(this.layer, this.id))}x` },
		},
		14: {
			title: 'Cubed+',
			description: 'Beginner cubes boost point gain',
			cost: new Decimal(50),
			unlocked() { return hasUpgrade(this.layer, 13) },
			effect() {
				eff = player.b.cubes.add(1).log(10).add(1);
				return eff;
			},
			effectDisplay() { return `${format(upgradeEffect(this.layer, this.id))}x` },
		},
		15: {
			title: 'Cubeginning',
			description: 'Beginner cubes boost Begin base',
			cost: new Decimal(350),
			unlocked() { return hasUpgrade(this.layer, 14) },
			effect() {
				eff = player.b.cubes.add(1).log(25);
				return eff;
			},
			effectDisplay() { return `+${format(upgradeEffect(this.layer, this.id))}` },
		},
		21: {
			title: 'Point^2',
			description: 'Points boost themselves',
			cost: new Decimal(25000),
			unlocked() { return hasUpgrade(this.layer, 15) && hasMilestone('s', 0) },
			effect() {
				eff = player.points.add(2).log(50).add(1).log(50).add(1);
				return eff;
			},
			effectDisplay() { return `${format(upgradeEffect(this.layer, this.id))}x` },
		},
		22: {
			title: 'Beginner Pointing',
			description: 'Points boost beginner point gain',
			cost: new Decimal(350000),
			unlocked() { return hasUpgrade(this.layer, 21) && hasMilestone('s', 0) },
			effect() {
				eff = player.points.add(1).log(500).add(1);
				return eff;
			},
			effectDisplay() { return `${format(upgradeEffect(this.layer, this.id))}x` },
		},
		23: {
			title: 'Shaping',
			description: 'Beginner power divides shape requirement',
			cost: new Decimal('5e6'),
			unlocked() { return hasUpgrade(this.layer, 22) && hasMilestone('s', 0) },
			effect() {
				eff = player.b.points.add(1).log(100).add(1);
				return eff;
			},
			effectDisplay() { return `/${format(upgradeEffect(this.layer, this.id))}` },
		},
		24: {
			title: 'Ternary to Regular',
			description: 'Ternary points boost point generation',
			cost: new Decimal('e11'),
			unlocked() { return hasUpgrade(this.layer, 23) && hasAchievement('r', 14) },
			effect() {
				eff = player.t.points.add(1).log(8.5).add(1);
				return eff;
			},
			effectDisplay() { return `${format(upgradeEffect(this.layer, this.id))}x` },
		},
		25: {
			title: 'Easy Shapes',
			description: 'Boost the shape effect',
			cost: new Decimal('e12'),
			unlocked() { return hasUpgrade(this.layer, 23) && hasAchievement('r', 14) },
		},
	},
})