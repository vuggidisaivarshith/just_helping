const fs = require('fs');
let findF = 'src/app/find/page.tsx';
let findC = fs.readFileSync(findF, 'utf8');
findC = findC.split('val[0]').join('(val[0] as number)');
// fix the double replacement if it happened
findC = findC.split('((val[0] as number) as number)').join('(val[0] as number)');
fs.writeFileSync(findF, findC);
