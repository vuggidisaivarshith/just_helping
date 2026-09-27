const fs = require('fs');

function rep(f, o, n) {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  c = c.split(o).join(n);
  fs.writeFileSync(f, c);
}

rep('src/app/find/page.tsx', 'values[0]', '(values[0] as number)');
rep('src/app/page.tsx', 'p.metrics.valueScore', 'p.valueScore');
rep('src/app/page.tsx', 'p.metrics.totalData', 'p.totalData');
rep('src/app/plan/[operator]/[price]/page.tsx', 'plan.isPopular', 'plan.badges.includes("POPULAR")');
rep('src/app/plan/[operator]/[price]/page.tsx', 'plan.validity', 'plan.validityDays');
rep('src/app/plan/[operator]/[price]/page.tsx', 'plan.data', 'plan.dataTotalGb');
rep('src/app/plan/[operator]/[price]/page.tsx', 'plan.costPerDay.toFixed', '(plan.costPerDay || 0).toFixed');
rep('src/app/plan/[operator]/[price]/page.tsx', 'plan.costPerGb.toFixed', '(plan.costPerGb || 0).toFixed');
rep('src/app/plan/[operator]/[price]/page.tsx', 'plan.sms', 'plan.smsPerDay');
rep('src/app/plan/[operator]/[price]/page.tsx', 'plan.has5G', 'plan.fiveG');
rep('src/app/plan/[operator]/[price]/page.tsx', ' asChild', '');
rep('src/app/plan/[operator]/[price]/page.tsx', '<PlanGrid plans={similarPlans} />', '<PlanGrid plans={similarPlans} compareIds={[]} onToggleCompare={()=>{}} />');
rep('src/app/plan/[operator]/[price]/page.tsx', '<PlanGrid plans={cheaperAlternatives} />', '<PlanGrid plans={cheaperAlternatives} compareIds={[]} onToggleCompare={()=>{}} />');
rep('src/app/plan/[operator]/[price]/page.tsx', '<PlanGrid plans={higherDataAlternatives} />', '<PlanGrid plans={higherDataAlternatives} compareIds={[]} onToggleCompare={()=>{}} />');
rep('src/app/plan/[operator]/[price]/page.tsx', 'import { Card, CardContent } from "@/components/ui/card";', 'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";');
rep('src/app/plan/[operator]/[price]/page.tsx', 'valueScore.toFixed', '(plan.valueScore || 0).toFixed');
rep('src/app/plans/[operator]/page.tsx', '"popularity"', '"recommended"');
rep('src/app/plans/page.tsx', '"popularity"', '"recommended"');
rep('src/components/plans/SearchBar.tsx', 'interface SearchBarProps { value?: string;', 'interface SearchBarProps { value?: string; onChange?: (val: string) => void;');
rep('src/app/plans/page.tsx', 'setFilters({})', 'setFilters({operators:[],circleId:null,minPrice:null,maxPrice:null,minValidity:null,maxValidity:null,minData:null,minDataPerDay:null,fiveG:null,unlimited5g:null,hasOtt:null,category:null,hasVoice:null,hasSms:null,search:""})');

console.log('done');
