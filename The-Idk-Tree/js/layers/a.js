addLayer('a', {
	name: 'achievements',
	symbol: 'A',
	position: 0,
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: 'yellow',
	requires: new Decimal(Infinity),
	resource: 'achievement tokens',
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
	row: 'side',
	layerShown() { return true; },
});