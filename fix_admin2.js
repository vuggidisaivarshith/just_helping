const fs = require('fs');

let f1 = 'src/app/admin/plans/page.tsx';
let c1 = fs.readFileSync(f1, 'utf8');
c1 = c1.replace(/plan\.dataTotalGb\.totalGb/g, 'plan.dataTotalGb');
c1 = c1.replace(/plan\.dataTotalGb\.perDayGb/g, 'plan.dataPerDayGb');
fs.writeFileSync(f1, c1);

let f2 = 'src/app/admin/plans/new/page.tsx';
let c2 = fs.readFileSync(f2, 'utf8');
c2 = c2.replace(/onValueChange=\{\(value\) => setFormData\(\{ \.\.\.formData, operatorId: value \}\)\}/g, "onValueChange={(value) => setFormData({ ...formData, operatorId: value as string })}");
c2 = c2.replace(/onValueChange=\{\(value\) => setFormData\(\{ \.\.\.formData, category: value \}\)\}/g, "onValueChange={(value) => setFormData({ ...formData, category: value as any })}");
c2 = c2.replace(/onValueChange=\{\(value\) => setFormData\(\{ \.\.\.formData, status: value \}\)\}/g, "onValueChange={(value) => setFormData({ ...formData, status: value as any })}");
c2 = c2.replace(/e\.target\.textContent/g, "(e.target as any).textContent || ''");
fs.writeFileSync(f2, c2);
