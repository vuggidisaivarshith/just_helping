"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewPlanPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    operator: '',
    name: '',
    category: '',
    price: '',
    validityDays: '',
    totalDataGb: '',
    dataPerDayGb: '',
    voice: 'Unlimited',
    smsPerDay: '100',
    has5G: false,
    unlimited5G: false,
    ottBenefits: '',
    status: 'active'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
     setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving new plan:", formData);
    // Mock save
    router.push('/admin/plans');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" >
          <Link href="/admin/plans">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Plan</h1>
          <p className="text-gray-500 dark:text-gray-400">Add a new recharge plan to the catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Plan Details</CardTitle>
            <CardDescription>Enter the basic information and benefits of the plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="operator">Operator</Label>
                <Select onValueChange={(val) => handleSelectChange('operator', val as string)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jio">Jio</SelectItem>
                    <SelectItem value="airtel">Airtel</SelectItem>
                    <SelectItem value="vi">Vi</SelectItem>
                    <SelectItem value="bsnl">BSNL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(val) => handleSelectChange('category', val as string)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                    <SelectItem value="data">Data Add-on</SelectItem>
                    <SelectItem value="validity">Validity</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Plan Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Hero Unlimited" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} placeholder="299" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validityDays">Validity (Days)</Label>
                <Input id="validityDays" name="validityDays" type="number" value={formData.validityDays} onChange={handleChange} placeholder="28" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalDataGb">Total Data (GB)</Label>
                <Input id="totalDataGb" name="totalDataGb" type="number" value={formData.totalDataGb} onChange={handleChange} placeholder="e.g. 50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataPerDayGb">Data/Day (GB)</Label>
                <Input id="dataPerDayGb" name="dataPerDayGb" type="number" step="0.1" value={formData.dataPerDayGb} onChange={handleChange} placeholder="e.g. 1.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="voice">Voice</Label>
                <Input id="voice" name="voice" value={formData.voice} onChange={handleChange} placeholder="e.g. Unlimited" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smsPerDay">SMS/Day</Label>
                <Input id="smsPerDay" name="smsPerDay" type="number" value={formData.smsPerDay} onChange={handleChange} placeholder="100" />
              </div>
            </div>

            <div className="flex gap-6 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="has5G" checked={formData.has5G} onCheckedChange={(c) => handleCheckboxChange('has5G', c as boolean)} />
                <Label htmlFor="has5G">5G Access</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="unlimited5G" checked={formData.unlimited5G} onCheckedChange={(c) => handleCheckboxChange('unlimited5G', c as boolean)} />
                <Label htmlFor="unlimited5G">Unlimited 5G</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ottBenefits">OTT Benefits (comma separated)</Label>
              <Input id="ottBenefits" name="ottBenefits" value={formData.ottBenefits} onChange={handleChange} placeholder="e.g. Disney+ Hotstar, Prime Video" />
            </div>

            <div className="space-y-2 w-full md:w-1/2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={formData.status} onValueChange={(val) => handleSelectChange('status', val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button type="button" variant="outline" >
              <Link href="/admin/plans">Cancel</Link>
            </Button>
            <Button type="submit">Save Plan</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
