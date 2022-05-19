export const getRevenue = (timeRange, item) => {
    let revenue;
    switch (timeRange) {
      case 0:
        revenue = item?.revenue[0]?.value;
        break;
      case 1:
        revenue = item?.revenue?.slice(0, 3)?.reduce((a, b) => a + (b.value || 0), 0);
        break;
      case 2:
        revenue = item?.revenue?.slice(0, 6)?.reduce((a, b) => a + (b.value || 0), 0);
        break;
      default:
        revenue = item?.revenue[0];
    }
    return bigCurrencyFormatter(revenue);
};

export const bigCurrencyFormatter = (val) => {
    return typeof val === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(val) : null;
};