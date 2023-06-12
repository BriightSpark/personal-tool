interface IDiscountCalculator {
  'unit-price': number
  'quantity': number
  'sell-price'?: number
  'bill-subtotal'?: number
  'bill-total'?: number
  [key: string]: number | boolean | undefined
}

export const calcDiscount = ( params : IDiscountCalculator ) => {
  const {
    'unit-price': unitPrice,
    quantity: quantity,
    'sell-price': sellPrice = NaN,
    'bill-subtotal': billSubtotal = NaN,
    'bill-total': billTotal = NaN
  } = params;

  const isUsingPrice = sellPrice && sellPrice > 1;

  const discountAmount = isUsingPrice ? findDiscountAmountFromPrice( unitPrice, quantity, sellPrice ) : findDiscountAmountFromTotal( billTotal, billSubtotal );
  const discountPercent = isUsingPrice ? ( discountAmount / ( unitPrice * quantity ) ) : ( discountAmount / billSubtotal );


  return {
    amount: discountAmount,
    percentage: `${ ( discountPercent * 100 ).toFixed( 2 ).toLocaleString() }%`,
    total: isUsingPrice ? sellPrice : billTotal
  };
};

const findDiscountAmountFromTotal = ( total?: number, subTotal?: number ) => {
  return ( subTotal && total ) ? ( subTotal - total ) : NaN;
};

const findDiscountAmountFromPrice = ( unitPrice: number, quantity: number, sellPrice: number ) => {
  return ( unitPrice * quantity - sellPrice );
};

export const calComboItemSplit = ( params: IDiscountCalculator, comboItems: string[], subTotal: number ) => {
  return comboItems.map( ( item, idx ) => {
    return ( { id: idx, billPercentage: ( params?.[item] as number ) / subTotal } );
  } );
};
