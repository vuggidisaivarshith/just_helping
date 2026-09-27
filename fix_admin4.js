const fs = require('fs');

let f1 = 'src/app/admin/plans/page.tsx';
let c1 = fs.readFileSync(f1, 'utf8');
c1 = c1.split("{plan.dataTotalGb?.totalGb ? `${plan.dataTotalGb} GB` : ''}").join("{plan.dataTotalGb ? `${plan.dataTotalGb} GB` : ''}");
c1 = c1.split("{plan.dataTotalGb?.perDayGb ? `${plan.dataPerDayGb} GB/day` : ''}").join("{plan.dataPerDayGb ? `${plan.dataPerDayGb} GB/day` : ''}");
c1 = c1.split("{!plan.dataTotalGb?.totalGb && !plan.dataTotalGb?.perDayGb ? 'N/A' : ''}").join("{!plan.dataTotalGb && !plan.dataPerDayGb ? 'N/A' : ''}");
fs.writeFileSync(f1, c1);

let f2 = 'src/app/admin/plans/new/page.tsx';
let c2 = fs.readFileSync(f2, 'utf8');
c2 = c2.split("handleSelectChange('operator', val)").join("handleSelectChange('operator', val as string)");
c2 = c2.split("handleSelectChange('category', val)").join("handleSelectChange('category', val as string)");
c2 = c2.split("handleSelectChange('status', val)").join("handleSelectChange('status', val as string)");
fs.writeFileSync(f2, c2);
