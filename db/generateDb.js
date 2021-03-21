const fs = require('fs');
const path = require('path');

class Generate {
  static integer(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static float(min, max) {
    return Math.random() * (max - min) + min;
  }

  static phoneNumber() {
    const ddd = this.integer(11, 100);
    const numberPrefix = this.integer(0, 10000);
    const numberSuffix = this.integer(0, 10000);

    const numberPrefixZeroPadded = String(numberPrefix).padStart(4, '0');
    const numberSuffixZeroPadded = String(numberSuffix).padStart(4, '0');

    return `+55 ${ddd} 9${numberPrefixZeroPadded}-${numberSuffixZeroPadded}`;
  }

  static monthlyPrice() {
    return this.float(0, 1).toFixed(2);
  }

  static setupPrice() {
    return this.float(2, 5).toFixed(2);
  }
}

const [, , didsQuantity] = process.argv;

// eslint-disable-next-line no-restricted-globals
if (didsQuantity !== undefined && isNaN(didsQuantity)) {
  throw new Error('Dids quantity must be a number.');
}

const dids = Array(Number(didsQuantity) || 800)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    value: Generate.phoneNumber(),
    monthlyPrice: Generate.monthlyPrice(),
    setupPrice: Generate.setupPrice(),
    currency: 'U$',
  }));

const data = { dids };

fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(data));

console.info('Fake database generated successfully!');
