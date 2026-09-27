const fs = require('fs');

let f1 = 'src/app/admin/plans/page.tsx';
let c1 = fs.readFileSync(f1, 'utf8');
c1 = c1.replace(/{plan\.dataTotalGb\?\.totalGb \? `\$\{plan\.dataTotalGb\} GB` : ''}/, "{plan.dataTotalGb ? `${plan.dataTotalGb} GB` : ''}");
c1 = c1.replace(/{plan\.dataTotalGb\?\.perDayGb \? `\$\{plan\.dataPerDayGb\} GB\\/day` : ''}/, "{plan.dataPerDayGb ? `${plan.dataPerDayGb} GB/day` : ''}");
c1 = c1.replace(/\{\!plan\.dataTotalGb\?\.totalGb && \!plan\.dataTotalGb\?\.perDayGb \? 'N\\/A' : ''\}/, "{!plan.dataTotalGb && !plan.dataPerDayGb ? 'N/A' : ''}");
fs.writeFileSync(f1, c1);

let f2 = 'src/app/admin/plans/new/page.tsx';
let c2 = fs.readFileSync(f2, 'utf8');
c2 = c2.replace(/handleSelectChange\('operator', val\)/g, "handleSelectChange('operator', val as string)");
c2 = c2.replace(/handleSelectChange\('category', val\)/g, "handleSelectChange('category', val as string)");
c2 = c2.replace(/handleSelectChange\('status', val\)/g, "handleSelectChange('status', val as string)");
fs.writeFileSync(f2, c2);
