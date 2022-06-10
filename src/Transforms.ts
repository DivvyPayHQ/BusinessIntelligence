import numeral from 'numeral';
import moment from 'moment';

// makes raw number formatted to currency
export const bigCurrencyFormatter = (val) => (typeof val === 'number' ? numeral(val).format('$0.00 a') : undefined);

// sums all values inside revenue array, return formatted and raw value
export const getRevenue = (revenue) => {
	const sum = revenue.reduce((a, b) => a + (b.value || 0), 0);
	return { value: sum, formatted: bigCurrencyFormatter(sum) };
};

// sorts arr based on sort column and direction
export const sortArray = (arr, sortColumn, isAscending) => {
	const sortField = sortColumn === 'Company' ? 'name' : 'totalRevenue';
	return arr.sort((a: any, b: any) => {
		if (a[sortField] < b[sortField]) {
			return isAscending ? -1 : 1;
		}
		if (a[sortField] > b[sortField]) {
			return isAscending ? 1 : -1;
		}
		return 0;
	});
};

// returns sliced array based on the current timerange, and adds totalRevenue sort/display field
export const mapDataPerTimeRange = (array, timeRange) => {
	const timeRangeMap = { 0: 1, 1: 3, 2: 5 }; // Which timerange corresponds to how many months
	return array.map((obj) => {
		const slicedRev = obj.revenue.slice(0, timeRangeMap[timeRange]);
		const totalRevenue = getRevenue(slicedRev);
		return {
			...obj,
			revenue: slicedRev,
			totalRevenue: totalRevenue.value, // Will be used for sorting
			sortRevenue: totalRevenue.formatted, // Will be used for sorting
		};
	});
};

export const formatDate = (date) => moment(date, 'yyyy-MM-dd HH:mm:ss').format('MMM YYYY');

// Will take company object and return x and y arrays of months and value
export const getLineChartData = (company) => {
	const ONE_MILLION = 1000000;
	const xAxis = company?.revenue?.map((a) => formatDate(a.date)).reverse();
	const yAxis = company?.revenue?.map((a) => a.value / ONE_MILLION).reverse();
	return { xAxis, yAxis };
};
