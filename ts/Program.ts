/// <reference path="Point.ts" />
/// <reference path="Controls.ts" />
/// <reference path="ConvexHull.ts" />


class Program
{

	canvas: Canvas;
	controls: Controls;
	points: Point[] = [];


	constructor(canvas: Canvas, controls: Controls)
	{
		this.canvas = canvas;
		this.controls = controls;
	}


	run()
	{
		var onPointCountChange = () => {
			this.controls.pointCountInfo.text(this.controls.getPointCount());
		}

		onPointCountChange();

		this.controls.pointCountSlider.on('input change', (event) => {
			onPointCountChange();
		});


		this.processAlgButtons((button: JQuery) => {
			button.on('click', (event) => {
				this.setAlgButtonsDisabled(true);
				this.controls.clearButton.attr('disabled', null);
			});
		});


		this.controls.generatorButton.on('click', (event) => {
			this.generatePoints(this.controls.getPointCount());
			this.canvas.drawPoints(this.points);
			this.setAlgButtonsDisabled(false);
			this.controls.clearButton.attr('disabled', true);
		});


		this.controls.quickHullButton.on('click', (event) => {
			this.runAlgorithm(ConvexHull.quickHull, 'quick hull');
		});


		this.controls.giftWrappingButton.on('click', (event) => {
			this.runAlgorithm(ConvexHull.giftWrapping, 'gift wrapping');
		});


		this.controls.primitiveButton.on('click', (event) => {
			this.runAlgorithm(ConvexHull.primitive, 'primitive');
		});


		this.controls.clearButton.on('click', (event) => {
			this.canvas.clearSolution();
			this.setAlgButtonsDisabled(false);
			this.controls.clearButton.attr('disabled', true);
		});
	}


	private generatePoints(num: number)
	{
		this.points = [];

		while (this.points.length < num) {
			var duplicate = false;
			var x = this.canvas.getPadding() + Math.floor((this.canvas.getWidth() - 2 * this.canvas.getPadding()) * Math.random());
			var y = this.canvas.getPadding() + Math.floor((this.canvas.getHeight() - 2 * this.canvas.getPadding()) * Math.random());

			for (var i = 0, len = this.points.length; i < len; i++) {
				if (this.points[i].getX() === x || this.points[i].getY() === y) {
					duplicate = true;
					break;
				}
			}

			if (!duplicate) {
				this.points.push(new Point(x, y, i));
			}
		}
	}


	private runAlgorithm(callback: (points: Point[]) => Result, name: string)
	{
		var start = (new Date()).getTime();
		var result = callback(this.points);
		var elapsed = (new Date()).getTime() - start;

		this.canvas.drawPolygon(result.getPolygon(), '#44f', '#99f');
		this.canvas.operationCountInfo(result.getCounter(), elapsed, name);
	}


	private setAlgButtonsDisabled(disabled: boolean = true)
	{
		this.processAlgButtons((button: JQuery) => {
			button.attr('disabled', disabled ? true : null);
		});
	}


	private processAlgButtons(callback: (button: JQuery) => void)
	{
		var buttons = [ this.controls.quickHullButton, this.controls.giftWrappingButton, this.controls.primitiveButton ];

		for (var i = 0, len = buttons.length; i < len; i++) {
			callback(buttons[i]);
		}
	}

}
