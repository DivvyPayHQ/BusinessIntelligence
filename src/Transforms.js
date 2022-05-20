import "intl";
import "intl/locale-data/jsonp/en";

export const getRevenue = (revenue) => {
    const sum = revenue?.reduce((a, b) => a + (b.value || 0), 0);
    return { value: sum, formatted: bigCurrencyFormatter(sum) };
};

export const bigCurrencyFormatter = (val) => {
    return typeof val === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(val) : null;
};

export const sortArray = (arr, direction, key) => {
  return arr.sort((a,b) => {
    if(direction==='asc') {
      if ( a[key] < b[key] ){ return -1 }
      if ( a[key] > b[key] ){ return 1 }
      return 0;
    } else {
      if ( a[key] < b[key] ){ return 1 }
      if ( a[key] > b[key] ){ return -1 }
      return 0;
    }
  })
}