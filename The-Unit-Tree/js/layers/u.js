addLayer('u', {
	name: 'unit', 
	symbol: '',
	position: 0, 
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	row: 'side', 
	color: 'white',
	resetsNothing: true,
	resource: 'units', 
	type: 'custom', 
	hotkeys: [
		{ key: 'ctrl+s', description: 'Ctrl+S: Save the game', onPress() { save(true) } },
		{ key: 'u', description: 'U: Gain an unit', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return true },
	tabFormat: {
		'Rewards': {
			content() { return [
				'main-display',
				'prestige-button',
				'blank',
				['display-text', tmp.u.getRewards],
			] },
		},
	},
	prestigeButtonText() {
		return `Gain ${formatWhole(player[this.layer].points.add(1))}${suffix(player[this.layer].points.add(1))} unit<br><br><b>${format(this.getResets()[player[this.layer].points][0])}</b> ${this.getResets()[player[this.layer].points][2]} needed`;
	},
	getEffects(unit, number) {
		switch ([unit, number].join(', ')) {
			case '3, 0':
				eff = player.r.cubes.add(1).log(2).add(0.5).add(player.t.cubes.add(1).log(2).add(0.5));
				break;

			case '3, 1':
				eff = player.s.cubes.add(1).log(7.5).add(1);
				break;
				
			default:
				eff = 2;
		}

		return eff;
	},
	getRewards() {
		unit = player[this.layer].points;
		rewards = '';
		if (unit.lt(1)) return rewards;

		rewards += `
			<h1>1 unit</h1>
			<p>Beginner point gain x2</p>
			<p>Point gain x2</p>
			<p>Unlock row 2</p>
		`;
		if (unit.lt(2)) return rewards;
		rewards += `<br><br>
			<h1>2 units</h1>
			<p>Beginner point exponent 0.5 -> 0.55</p>
			<p>Shape requirement /2</p>
			<p>Point gain ^1.1</p>
			<p>Keep beginner cubes on all resets</p>
		`;
		if (unit.lt(3)) return rewards;
		rewards += `<br><br>
			<h1>3 units</h1>
			<p>Rock and ternary cubes boost BP gain (currently ${format(this.getEffects(3, 0))}x)</p>
			<p>Shape cubes slightly multiply the n-gon's side count (currently ${format(this.getEffects(3, 1))}x)</p>
			<p>Unlock a new ternary buyable</p>
			<p>Unlock some new rock achievements and row 3</p>
		`;
		return rewards;
	},
	getResets() {
		return [
			[new Decimal(3), player.b.cubes, 'beginner cubes'],
			[new Decimal('2e10'), player.points,   'points'],
			[new Decimal('6'), player.t.buyables[11],   'ternary sides'],
			[new Decimal(Infinity), player.points, 'points'],
		];
	},
	getResetGain() {
		return this.canReset() ? 1 : 0;
	},
	getNextAt() {
		return new Decimal(10);
	},
	canReset() {
		return this.getResets()[player[this.layer].points] == undefined ? new Decimal(1000).pow(player[this.layer].points) : this.getResets()[player[this.layer].points][1].gte(this.getResets()[player[this.layer].points][0]);
	},
	prestigeNotify() {
		return this.canReset();
	},
})