const fs = require('fs');
let findF = 'src/app/find/page.tsx';
let findC = fs.readFileSync(findF, 'utf8');
findC = findC.split('onValueChange={(val)').join('onValueChange={(val: number[])');
fs.writeFileSync(findF, findC);
