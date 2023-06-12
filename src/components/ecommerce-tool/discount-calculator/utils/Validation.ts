export const Validation = {
  'unit-price': {
    required: 'validation--required',
    valueAsNumber: true,
    min: { value: 1, message: 'validation--positive-number' }
  },
  'sell-price': {
    required: 'validation--required',
    valueAsNumber: true,
    min: { value: 1, message: 'validation--positive-number' }
  },
  quantity: {
    required: 'validation--required',
    valueAsNumber: true,
    min: { value: 1, message: 'validation--positive-number' }
  },
  'bill-subtotal': {
    required: 'validation--required',
    valueAsNumber: true,
    min: { value: 1, message: 'validation--positive-number' }
  },
  'bill-total': {
    required: 'validation--required',
    valueAsNumber: true,
    min: { value: 1, message: 'validation--positive-number' }
  }
} as any;