addLayer('t', {
	name: 'ternary', 
	image: 'resources/T.png',
	position: 2, 
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
		cubes: new Decimal(0),
	}},
	row: 1, 
	color: '#959fca',
	requires: new Decimal('e12'),
	resource: 'ternary points', 
	baseResource: 'points', 
	baseAmount() { return player.points }, 
	type: 'normal', 
	exponent() {
		exp = new Decimal(0.3);
		return exp;
	}, 
	gainMult() { 
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { 
		exp = new Decimal(1);
		return exp;
	},
	hotkeys: [
		{ key: 't', description: 'T: Reset for ternary power', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return player.s.unlocked },
	doReset(reset) {
		keep = [];
		if (layers[reset].row > this.row) layerDataReset('T', keep);
	},
	tabFormat() { return [
		'main-display',
		'prestige-button',
		'resource-display',
		'blank',
		['display-text', `You have ${format(player[this.layer].cubes)} Ternary Cubes`],
		'blank',
		['bar', 'cubes'],
		'blank',
		['clickable', 11],
		'blank', 'blank',
		'buyables',];
	},
	cubeReq() {
		req = new Decimal(50).pow(player[this.layer].cubes.add(1));
		return req;
	},
	bars: {
		cubes: {
			direction: RIGHT,
			width: 350,
			height: 35,
			display() { return `Ternary Cubes: ${format(player[this.layer].points)}/${format(tmp[this.layer].cubeReq)} TP` },
			fillStyle: {
				'background-color': '#959fca',
			},
			progress() { return player[this.layer].points.div(tmp[this.layer].cubeReq) },
		},
	},
	clickables: {
		11: {
			display: 'Gain<br>T Cube',
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
	buyables: {
		11: {
			display() { return `<h2>Ternary Sides<br>${formatWhole(getBuyableAmount(this.layer, this.id))}</h2><br><big>Multiply the n-gon's side amount.<br><b>Cost:</b> ${format(this.cost(getBuyableAmount(this.layer, this.id)))} TP<br><b>Currently:</b> ${format(buyableEffect(this.layer, this.id))}x</big>` },
			cost(x) { return new Decimal(3).pow(x) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) {
				eff = new Decimal(1);
				eff = eff.add(x.times(0.25));
				return eff;
			},
		},
		12: {
			display() { return `<h2>Ternary Boosters<br>${formatWhole(getBuyableAmount(this.layer, this.id))}</h2><br><big>Multiply rock power and beginner power gain.<br><b>Cost:</b> ${format(this.cost(getBuyableAmount(this.layer, this.id)))} TP<br><b>Currently:</b> ${format(buyableEffect(this.layer, this.id))}x</big>` },
			unlocked() { return player.u.points.gte(3) },
			cost(x) { return new Decimal(5).pow(x.add(1)) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) {
				base = new Decimal(1.1);
				if (hasAchievement('r', 15)) base = base.add(0.05);
				eff = base.pow(x);
				return eff;
			},
		},
	},
})