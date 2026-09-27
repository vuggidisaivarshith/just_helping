const fs = require('fs');

let planF = 'src/app/plan/[operator]/[price]/page.tsx';
let planC = fs.readFileSync(planF, 'utf8');

planC = planC.replace("import { Card, CardContent } from '@/components/ui/card';", "import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';");
planC = planC.replace('Math.round(plan.valueScore)', 'Math.round(plan.valueScore || 0)');
planC = planC.replace('<PlanGrid plans={similarPlans.map(computeMetrics)} />', '<PlanGrid plans={similarPlans.map(computeMetrics)} compareIds={[]} onToggleCompare={()=>{}} />');
planC = planC.replace('<PlanGrid plans={cheaperPlans.map(computeMetrics)} />', '<PlanGrid plans={cheaperPlans.map(computeMetrics)} compareIds={[]} onToggleCompare={()=>{}} />');
planC = planC.replace('<PlanGrid plans={higherDataPlans.map(computeMetrics)} />', '<PlanGrid plans={higherDataPlans.map(computeMetrics)} compareIds={[]} onToggleCompare={()=>{}} />');

fs.writeFileSync(planF, planC);

let findF = 'src/app/find/page.tsx';
let findC = fs.readFileSync(findF, 'utf8');
findC = findC.replace("onValueChange={(val) => updateAnswer('budget', val[0])}", "onValueChange={(val) => updateAnswer('budget', val[0] as number)}");
fs.writeFileSync(findF, findC);
