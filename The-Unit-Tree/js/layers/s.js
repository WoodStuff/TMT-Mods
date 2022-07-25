addLayer('s', {
	name: 'shape',
	image: 'resources/S.png',
	position: 1,
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
		cubes: new Decimal(0),
	}},
	row: 1,
	color: '#D1D1D1',
	requires() {
		req = new Decimal(100000);
		if (hasUpgrade('b', 23)) req = req.div(upgradeEffect('b', 23));
		if (player.u.points.gte(2)) req = req.div(2);
		return req;
	},
	resource: 'shapes',
	baseResource: 'points',
	baseAmount() { return player.points },
	type: 'static',
	base: 5,
	exponent: 1.5,
	branches: ['r', 't'],
	gainMult() {
		mult = new Decimal(1);
		return mult;
	},
	gainExp() {
		exp = new Decimal(1);
		return exp;
	},
	hotkeys: [
		{ key: 's', description: 'S: Reset for shapes', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return player.u.best.gte(1) },
	tabFormat() { return [
		'main-display',
		'prestige-button',
		'resource-display',
		'blank',
		['display-text', `You have ${format(player[this.layer].cubes)} Shape Cubes`],
		'blank',
		['bar', 'cubes'],
		'blank',
		['clickable', 11],
		'blank',
		['display-text', `<h2>Your best shape is a ${format(tmp[this.layer].getNgon)}-gon</h2>`],
		['display-text', `which is multiplying point and beginner point gain by ${format(tmp[this.layer].ngonEffect)}`],
		'blank', 'blank',
		'milestones',
		'blank',
		'upgrades',
	] },
	effect() {
		eff = player[this.layer].points;
		if (hasUpgrade('b', 25)) eff = eff.pow(1.25);
		return eff;
	},
	effectDescription() {
		return `which are giving ${format(tmp[this.layer].effect)} additional sides to the n-gon`;
	},
	cubeReq() {
		req = new Decimal(2).pow(player[this.layer].cubes.add(1));
		return req;
	},
	getNgon() {
		if (!player.s.unlocked) return new Decimal(0);

		ngon = new Decimal(3);
		ngon = ngon.add(tmp[this.layer].effect);
		ngon = ngon.times(buyableEffect('t', 11));
		if (player.u.points.gte(3)) ngon = ngon.times(layers.u.getEffects([3, 1]));
		return ngon;
	},
	ngonEffect() {
		ngon = tmp[this.layer].getNgon.add(1);
		log = hasUpgrade(this.layer, 11) ? 2 : 3;

		eff = ngon.log(log).add(1);
		if (hasAchievement('r', 11)) eff = eff.pow(2);
		return eff;
	},
	bars: {
		cubes: {
			direction: RIGHT,
			width: 350,
			height: 35,
			display() { return `Shape Cubes: ${format(player[this.layer].points)}/${format(tmp[this.layer].cubeReq)} S` },
			fillStyle: {
				'background-color': '#D1D1D1',
			},
			textStyle: {
				'color': '#7A7A7A',
			},
			progress() { return player[this.layer].points.div(tmp[this.layer].cubeReq) },
		},
	},
	clickables: {
		11: {
			display: 'Gain<br>S Cube',
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
	milestones: {
		0: {
			requirementDescription: '2 shapes',
			effectDescription: 'Unlock 3 more beginner upgrades',
			done() { return player[this.layer].best.gte(2) },
		},
		1: {
			requirementDescription: '4 shapes',
			effectDescription: 'Keep beginner upgrades on row 2 resets',
			done() { return player[this.layer].best.gte(4) },
		}
	},
	upgrades: {
		11: {
			title: 'Powers of 2',
			description: 'The n-gon effect is better',
			cost: new Decimal(2),
		},
	},
})