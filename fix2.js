const fs = require('fs');

function rep(f, o, n) {
  if (!fs.existsSync(f)) {
     console.log('not found', f);
     return;
  }
  let c = fs.readFileSync(f, 'utf8');
  c = c.split(o).join(n);
  fs.writeFileSync(f, c);
}

rep('src/app/find/page.tsx', 'values[0]', '(values[0] as number)');
rep('src/app/plan/[operator]/[price]/page.tsx', 'import { Card, CardContent } from "@/components/ui/card";', 'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";');
rep('src/app/plan/[operator]/[price]/page.tsx', 'plan.dataTotalGb', '(plan.dataTotalGb || 0)');
rep('src/app/plan/[operator]/[price]/page.tsx', '((plan.dataTotalGb || 0) || 0)', '(plan.dataTotalGb || 0)');
rep('src/app/plan/[operator]/[price]/page.tsx', 'plan.valueScore || 0', '(plan.valueScore || 0)');
rep('src/app/plan/[operator]/[price]/page.tsx', '((plan.valueScore || 0) || 0)', '(plan.valueScore || 0)');
rep('src/app/plans/[operator]/page.tsx', 'value={searchQuery} onChange={setSearchQuery}', 'initialValue={searchQuery} onSearch={setSearchQuery}');
rep('src/app/plans/page.tsx', 'value={searchQuery} onChange={setSearchQuery}', 'initialValue={searchQuery} onSearch={setSearchQuery}');
