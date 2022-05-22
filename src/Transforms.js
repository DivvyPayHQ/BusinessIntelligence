import "intl";
import "intl/locale-data/jsonp/en";

export const getRevenue = (revenue) => {
    const sum = revenue?.reduce((a, b) => a + (b.value || 0), 0);
    return { value: sum, formatted: bigCurrencyFormatter(sum) };
};

export const bigCurrencyFormatter = (val) => {
    return typeof val === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(val) : null;
};

export const sortArray = (arr, sortColumn, isAscending) => {
  const sortField = sortColumn === 'Company' ? 'name' : 'totalRevenue';
  return arr.sort((a,b) => {
    if(isAscending) {
      if ( a[sortField] < b[sortField] ){ return -1 }
      if ( a[sortField] > b[sortField] ){ return 1 }
      return 0;
    } else {
      if ( a[sortField] < b[sortField] ){ return 1 }
      if ( a[sortField] > b[sortField] ){ return -1 }
      return 0;
    }
  })
}

export const mapDataPerTimeRange =  (array, timeRange) => {
  const timeRangeMap = { 0: 1, 1: 3, 2: 5}; //Which timerange corresponds to how many months
  return array.map(obj => {
    const slicedRev = obj?.revenue?.slice(0, timeRangeMap[timeRange]);
    return { 
      ...obj, 
      revenue: slicedRev,
      totalRevenue: getRevenue(slicedRev).value // Will be used for sorting 
    }
  });
};