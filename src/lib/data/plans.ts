import { Plan, PlanCategory, DataType, PlanStatus } from '@/lib/types';

const generatePlans = (): Plan[] => {
  const generatedPlans: Plan[] = [];
  const operators = ['jio', 'airtel', 'vi', 'bsnl'];
  
  const baseCombos = [
    { price: 149, v: 20, d: 1 }, { price: 199, v: 28, d: 1.5 },
    { price: 239, v: 28, d: 1.5 }, { price: 299, v: 28, d: 2 },
    { price: 349, v: 28, d: 2.5 }, { price: 399, v: 28, d: 3 },
    { price: 479, v: 56, d: 1.5 }, { price: 533, v: 56, d: 2 },
    { price: 666, v: 84, d: 1.5 }, { price: 719, v: 84, d: 2 },
    { price: 999, v: 84, d: 3 }, { price: 2999, v: 365, d: 2.5 },
    { price: 3359, v: 365, d: 2.5, ott: ['Prime'] },
  ];

  const baseDataPacks = [
    { price: 15, v: 1, td: 1 }, { price: 19, v: 1, td: 1.5 },
    { price: 25, v: 1, td: 2 }, { price: 29, v: 1, td: 2.5 },
    { price: 61, v: 28, td: 6 }, { price: 121, v: 28, td: 12 },
  ];

  const baseTalktimes = [
    { price: 10, tt: 7.47 }, { price: 20, tt: 14.95 },
    { price: 50, tt: 39.37 }, { price: 100, tt: 81.75 },
  ];

  const now = '2026-09-27';

  let idCounter = 1;

  operators.forEach(op => {
    // Generate Combo Plans
    baseCombos.forEach((c, idx) => {
      generatedPlans.push({
        id: `plan-${op}-combo-${idCounter++}`,
        operatorId: op,
        name: `${op.toUpperCase()} ${c.price} Unlimited Combo`,
        category: c.v >= 365 ? 'ANNUAL' : (c.price >= 666 ? 'LONG_VALIDITY' : 'COMBO') as PlanCategory,
        price: c.price + (op === 'airtel' ? 10 : op === 'vi' ? 5 : op === 'bsnl' ? -20 : 0),
        validityDays: c.v,
        dataTotalGb: null,
        dataPerDayGb: c.d,
        dataType: 'DAILY' as DataType,
        voice: 'Unlimited',
        smsPerDay: 100,
        smsTotal: null,
        unlimited5g: c.price >= 239 && op !== 'bsnl',
        fiveG: op !== 'bsnl',
        ottBenefits: c.ott || [],
        appBenefits: [`${op.toUpperCase()} TV`, `${op.toUpperCase()} Music`],
        additionalBenefits: [],
        description: `Unlimited calls with ${c.d}GB/day for ${c.v} days.`,
        rechargeUrl: `https://www.${op}.in/recharge`,
        sourceUrl: `https://www.${op}.in/plans`,
        circleIds: [],
        status: 'SAMPLE' as PlanStatus,
        lastVerifiedAt: now,
        createdAt: now,
        updatedAt: now,
      });
      // Add variations to reach 50+ per operator
      generatedPlans.push({
        id: `plan-${op}-combo-var-${idCounter++}`,
        operatorId: op,
        name: `${op.toUpperCase()} ${c.price + 50} Premium Combo`,
        category: 'OTT' as PlanCategory,
        price: c.price + 50 + (op === 'airtel' ? 10 : 0),
        validityDays: c.v,
        dataTotalGb: null,
        dataPerDayGb: c.d,
        dataType: 'DAILY' as DataType,
        voice: 'Unlimited',
        smsPerDay: 100,
        smsTotal: null,
        unlimited5g: c.price >= 239 && op !== 'bsnl',
        fiveG: op !== 'bsnl',
        ottBenefits: ['Disney+ Hotstar'],
        appBenefits: [],
        additionalBenefits: [],
        description: `Unlimited calls with ${c.d}GB/day for ${c.v} days with Hotstar.`,
        rechargeUrl: `https://www.${op}.in/recharge`,
        sourceUrl: `https://www.${op}.in/plans`,
        circleIds: [],
        status: 'SAMPLE' as PlanStatus,
        lastVerifiedAt: now,
        createdAt: now,
        updatedAt: now,
      });
    });

    // Generate Data Packs
    baseDataPacks.forEach(d => {
      generatedPlans.push({
        id: `plan-${op}-data-${idCounter++}`,
        operatorId: op,
        name: `${op.toUpperCase()} ${d.price} Data Pack`,
        category: 'DATA' as PlanCategory,
        price: d.price + (op === 'airtel' ? 2 : op === 'bsnl' ? -5 : 0),
        validityDays: d.v,
        dataTotalGb: d.td,
        dataPerDayGb: null,
        dataType: 'FIXED' as DataType,
        voice: 'NA',
        smsPerDay: null,
        smsTotal: null,
        unlimited5g: false,
        fiveG: op !== 'bsnl',
        ottBenefits: [],
        appBenefits: [],
        additionalBenefits: [],
        description: `${d.td}GB data for ${d.v} days.`,
        rechargeUrl: `https://www.${op}.in/recharge`,
        sourceUrl: `https://www.${op}.in/plans`,
        circleIds: [],
        status: 'SAMPLE' as PlanStatus,
        lastVerifiedAt: now,
        createdAt: now,
        updatedAt: now,
      });
    });

    // Generate Talktime
    baseTalktimes.forEach(t => {
      generatedPlans.push({
        id: `plan-${op}-tt-${idCounter++}`,
        operatorId: op,
        name: `${op.toUpperCase()} ${t.price} Talktime`,
        category: 'TOPUP' as PlanCategory,
        price: t.price,
        validityDays: 0,
        dataTotalGb: null,
        dataPerDayGb: null,
        dataType: 'NONE' as DataType,
        voice: `₹${t.tt} Talktime`,
        smsPerDay: null,
        smsTotal: null,
        unlimited5g: false,
        fiveG: false,
        ottBenefits: [],
        appBenefits: [],
        additionalBenefits: [],
        description: `₹${t.tt} core talktime.`,
        rechargeUrl: `https://www.${op}.in/recharge`,
        sourceUrl: `https://www.${op}.in/plans`,
        circleIds: [],
        status: 'SAMPLE' as PlanStatus,
        lastVerifiedAt: now,
        createdAt: now,
        updatedAt: now,
      });
    });

    // Generate some international roaming
    [499, 999, 2999].forEach(price => {
      generatedPlans.push({
        id: `plan-${op}-ir-${idCounter++}`,
        operatorId: op,
        name: `${op.toUpperCase()} ${price} IR Pack`,
        category: 'INTERNATIONAL' as PlanCategory,
        price,
        validityDays: price === 499 ? 1 : price === 999 ? 7 : 30,
        dataTotalGb: price === 499 ? 1 : price === 999 ? 5 : 15,
        dataPerDayGb: null,
        dataType: 'FIXED' as DataType,
        voice: '100 mins',
        smsPerDay: null,
        smsTotal: 100,
        unlimited5g: false,
        fiveG: false,
        ottBenefits: [],
        appBenefits: [],
        additionalBenefits: [],
        description: `International roaming data and voice for ${price === 499 ? 1 : price === 999 ? 7 : 30} days.`,
        rechargeUrl: `https://www.${op}.in/recharge`,
        sourceUrl: `https://www.${op}.in/plans`,
        circleIds: [],
        status: 'SAMPLE' as PlanStatus,
        lastVerifiedAt: now,
        createdAt: now,
        updatedAt: now,
      });
    });
    
    // Add extra padding to reach 50 per operator
    for(let i=0; i<11; i++) {
        generatedPlans.push({
            id: `plan-${op}-pad-${idCounter++}`,
            operatorId: op,
            name: `${op.toUpperCase()} Extra ${200 + i}`,
            category: 'COMBO' as PlanCategory,
            price: 200 + i*10,
            validityDays: 28,
            dataTotalGb: null,
            dataPerDayGb: 1,
            dataType: 'DAILY' as DataType,
            voice: 'Unlimited',
            smsPerDay: 100,
            smsTotal: null,
            unlimited5g: false,
            fiveG: op !== 'bsnl',
            ottBenefits: [],
            appBenefits: [],
            additionalBenefits: [],
            description: `Generic combo plan.`,
            rechargeUrl: `https://www.${op}.in/recharge`,
            sourceUrl: `https://www.${op}.in/plans`,
            circleIds: [],
            status: 'SAMPLE' as PlanStatus,
            lastVerifiedAt: now,
            createdAt: now,
            updatedAt: now,
        });
    }
  });

  return generatedPlans;
};

export const plans: Plan[] = generatePlans();

export function getPlanById(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}
