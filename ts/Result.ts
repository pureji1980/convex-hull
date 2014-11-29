/// <reference path="Point.ts" />


module ConvexHull
{

	export class Result
	{

		private counter: number = 0;
		private polygon: Point[] = [];


		count(num: number = 1)
		{
			this.counter += num;
			return this;
		}


		getCounter()
		{
			return this.counter;
		}


		addVertex(v: Point)
		{
			this.polygon.push(v);
			return this;
		}


		getPolygon()
		{
			return this.polygon;
		}


		sortPolygon()
		{
			this.polygon = Helpers.sortConvexPolygon(this.polygon);
			return this;
		}

	}

}
