const fs = require('fs');

function rep(f, regex, n) {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(regex, n);
  fs.writeFileSync(f, c);
}

rep('src/app/find/page.tsx', /onValueChange=\{\(val\) \=\> updateAnswer\('budget', val\[0\]\)\}/g, "onValueChange={(val) => updateAnswer('budget', val[0] as number)}");
rep('src/app/plan/[operator]/[price]/page.tsx', /<PlanGrid plans=\{similarPlans\} \/>/g, "<PlanGrid plans={similarPlans} compareIds={[]} onToggleCompare={()=>{}} />");
rep('src/app/plan/[operator]/[price]/page.tsx', /<PlanGrid plans=\{cheaperAlternatives\} \/>/g, "<PlanGrid plans={cheaperAlternatives} compareIds={[]} onToggleCompare={()=>{}} />");
rep('src/app/plan/[operator]/[price]/page.tsx', /<PlanGrid plans=\{higherDataAlternatives\} \/>/g, "<PlanGrid plans={higherDataAlternatives} compareIds={[]} onToggleCompare={()=>{}} />");
rep('src/app/plan/[operator]/[price]/page.tsx', /import \{ Card, CardContent \} from "@\/components\/ui\/card";/g, 'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";');
rep('src/app/plan/[operator]/[price]/page.tsx', /plan\.metrics\.valueScore/g, '(plan.valueScore || 0)');
rep('src/app/plan/[operator]/[price]/page.tsx', /plan\.metrics\.totalData/g, '(plan.totalData || 0)');

console.log('done 3');
