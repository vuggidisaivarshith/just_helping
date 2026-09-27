const fs = require('fs');

function rep(f, o, n) {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  c = c.split(o).join(n);
  fs.writeFileSync(f, c);
}

// admin/page.tsx
rep('src/app/admin/page.tsx', 'stats.plansByOperator', 'stats.byOperator');
rep('src/app/admin/page.tsx', 'stats.lowestPrice', 'stats.minPrice');
rep('src/app/admin/page.tsx', 'stats.highestPrice', 'stats.maxPrice');
rep('src/app/admin/page.tsx', '<div key={op} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-md">', '<div key={op as string} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-md">');


// admin/plans/new/page.tsx
rep('src/app/admin/plans/new/page.tsx', 'asChild', '');
rep('src/app/admin/plans/new/page.tsx', "onValueChange={(value) => setFormData({ ...formData, operatorId: value })}", "onValueChange={(value) => setFormData({ ...formData, operatorId: value as string })}");
rep('src/app/admin/plans/new/page.tsx', "onValueChange={(value) => setFormData({ ...formData, category: value })}", "onValueChange={(value) => setFormData({ ...formData, category: value as any })}");
rep('src/app/admin/plans/new/page.tsx', "onValueChange={(value) => setFormData({ ...formData, status: value })}", "onValueChange={(value) => setFormData({ ...formData, status: value as any })}");
rep('src/app/admin/plans/new/page.tsx', "setFormData({ ...formData, operatorId: value })", "setFormData({ ...formData, operatorId: value as string })");
rep('src/app/admin/plans/new/page.tsx', "setFormData({ ...formData, category: value })", "setFormData({ ...formData, category: value as any })");
rep('src/app/admin/plans/new/page.tsx', "setFormData({ ...formData, status: value })", "setFormData({ ...formData, status: value as any })");
rep('src/app/admin/plans/new/page.tsx', "e.target.textContent", "(e.target as HTMLElement).textContent || ''");

// admin/plans/page.tsx
rep('src/app/admin/plans/page.tsx', 'asChild', '');
rep('src/app/admin/plans/page.tsx', 'plan.data', 'plan.dataTotalGb');
rep('src/app/admin/plans/page.tsx', "status === 'active'", "status === 'ACTIVE'");

console.log('done');
