const fs = require('fs');
const names = ['functionProductsView', 'functionInventoryView', 'functionPricingView', 'functionPromotionsView'];
for (const name of names) {
  const text = fs.readFileSync(`src/_extract_${name}.txt`, 'utf8');
  let out = '';
  for (let i = 0; i < text.length; i += 300) out += text.slice(i, i + 300) + '\n';
  fs.writeFileSync(`src/_chunked_${name}.txt`, out, 'utf8');
}
