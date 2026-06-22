const SYMBOLS = { XAF: 'XAF', EUR: '€', USD: '$' };

export const formatPrice = (price, currency = 'XAF') => {
  const sym = SYMBOLS[currency] || currency;
  const formatted = price.toLocaleString('fr-FR');
  return currency === 'EUR' ? `${sym}${formatted}` : `${formatted} ${sym}`;
};

export const currencyLabel = (currency = 'XAF') => {
  const labels = { XAF: 'XAF (CFA Franc)', EUR: 'EUR (Euro)', USD: 'USD (Dollar)' };
  return labels[currency] || currency;
};
