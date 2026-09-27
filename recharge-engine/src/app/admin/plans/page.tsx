"use client";

import { useState } from 'react';
import Link from 'next/link';
import { getAllPlans } from '@/lib/data/engine';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Plan } from '@/lib/types';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>(getAllPlans());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    plan.operatorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plans Management</h1>
          <p className="text-gray-500 dark:text-gray-400">View, create, and manage recharge plans.</p>
        </div>
        <Button >
          <Link href="/admin/plans/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Plan
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm relative">
        <Search className="h-4 w-4 text-muted-foreground absolute left-3" />
        <Input 
          type="text" 
          placeholder="Search plans..." 
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Operator</TableHead>
              <TableHead>Name / Category</TableHead>
              <TableHead>Price (₹)</TableHead>
              <TableHead>Validity</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium capitalize">{plan.operatorId}</TableCell>
                  <TableCell>
                    <div className="font-medium">{plan.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{plan.category}</div>
                  </TableCell>
                  <TableCell>₹{plan.price}</TableCell>
                  <TableCell>{plan.validityDays > 0 ? `${plan.validityDays} Days` : 'N/A'}</TableCell>
                  <TableCell>
                    {plan.dataTotalGb ? `${plan.dataTotalGb} GB` : ''}
                    {plan.dataPerDayGb ? `${plan.dataPerDayGb} GB/day` : ''}
                    {!plan.dataTotalGb && !plan.dataPerDayGb ? 'N/A' : ''}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${plan.status === 'ACTIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-300'}`}>
                      {plan.status || 'active'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No plans found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
