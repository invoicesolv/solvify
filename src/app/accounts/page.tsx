'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Search, Info, Plus, Filter, ArrowUpDown, Eye } from "lucide-react";
import * as XLSX from 'xlsx';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Customer {
  account: string;
  type: string;
  contacts: string;
  amount: string;
  accountValue: string | number;
  priority: "Hög" | "Medium" | "Låg";
  industry: string;
  epost: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#00A6B4'];

// Initial customer data can be kept for default state or removed if fetched from the API
const initialCustomers: Customer[] = [
  { account: "Glancehair", type: "Potentiell kund", contacts: "Tobias Ottosson", amount: "Glancehair", accountValue: "99 600 kr", priority: "Medium", industry: "", epost: "" },
  { account: "Lenito AB", type: "Klient", contacts: "Fadi Naccache", amount: "IT & Marknadsc...", accountValue: "168 800 kr", priority: "Hög", industry: "", epost: "" },
  { account: "Solceller och lad", type: "Klient", contacts: "Hawaii", amount: "Solceller", accountValue: "120 000 kr", priority: "Hög", industry: "", epost: "" },
  { account: "Leikur", type: "Potentiell kund", contacts: "-", amount: "", accountValue: "", priority: "Medium", industry: "", epost: "" },
];

const initialEjKundCustomers: Customer[] = [
  { account: "Husbyggen Väst", type: "Potentiell kund", contacts: "Richard Bergemo", amount: "-", accountValue: "", priority: "Medium", industry: "", epost: "" },
  { account: "Elkontakten i Sto", type: "Potentiell kund", contacts: "Marcus Svensson", amount: "IT & Marknadsc...", accountValue: "203 800 kr", priority: "Låg", industry: "", epost: "" },
  { account: "Bergkvist Rör & S", type: "Potentiell kund", contacts: "Björn Bergkvist", amount: "IT & Marknadsc...", accountValue: "203 800 kr", priority: "Låg", industry: "", epost: "" },
  { account: "Trygg ID", type: "Potentiell kund", contacts: "Alexander Sch...", amount: "IT & Marknadsc...", accountValue: "251 000 kr", priority: "Medium", industry: "", epost: "" },
  { account: "Flemingson AB", type: "Potentiell kund", contacts: "Tobias Ottosson", amount: "Glancehair", accountValue: "99 600 kr", priority: "Medium", industry: "Redovisning", epost: "" },
  { account: "EVAS AB", type: "Potentiell kund", contacts: "Josephine Ador...", amount: "", accountValue: "", priority: "Medium", industry: "", epost: "" },
];

// Define customerColumns as an array of keys of Customer
const customerColumns: (keyof Customer)[] = [
  'account',
  'type',
  'contacts',
  'amount',
  'accountValue',
  'priority',
  'industry',
  'epost',
];

export default function AccountsPage() {
  const [chartData, setChartData] = useState<{ name: string; value: number; }[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [ejKundCustomers, setEjKundCustomers] = useState<Customer[]>(initialEjKundCustomers);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Fetch data from the API
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/accounts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json() as Customer[]; // Type assertion here
      setCustomers(data.filter((c) => c.type === 'Klient') || []);
      setEjKundCustomers(data.filter((c) => c.type === 'Potentiell kund') || []);
      updateChartData(data.filter((c) => c.type === 'Klient') || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  // Save data to the API
  const saveData = useCallback(async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customers, ejKundCustomers }),
      });
      if (!response.ok) {
        const errorData = await response.json() as { error: string; details: string };
        throw new Error(`Failed to save data: ${errorData.error}, ${errorData.details}`);
      }
      setSaveMessage('Data saved successfully');
      console.log('Data saved successfully');
    } catch (error: unknown) {
      console.error('Error saving data:', error);
      if (error instanceof Error) {
        setSaveMessage(`Failed to save data: ${error.message}`);
      } else {
        setSaveMessage('Failed to save data: An unknown error occurred');
      }
    } finally {
      setIsSaving(false);
    }
  }, [customers, ejKundCustomers]);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Optional: Remove localStorage usage to prevent inconsistencies
  // If you need to use localStorage as a fallback, handle it carefully
  /*
  useEffect(() => {
    localStorage.setItem('customerData', JSON.stringify({ customers, ejKundCustomers }));
  }, [customers, ejKundCustomers]);

  // On component mount, check local storage
  useEffect(() => {
    const storedData = localStorage.getItem('customerData');
    if (storedData) {
      const { customers: storedCustomers, ejKundCustomers: storedEjKundCustomers } = JSON.parse(storedData);
      setCustomers(storedCustomers);
      setEjKundCustomers(storedEjKundCustomers);
    }
    fetchData(); // Still fetch from API to get the latest data
  }, [fetchData]);
  */

  // Save data before the window unloads
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveData();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveData]);

  const handleSaveClick = () => {
    saveData();
  };

  // Handle file upload and parse Excel data
  const handleFileUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      const [headerRow, ...dataRows] = jsonData;

      const newCustomers: Customer[] = dataRows.map((row) => ({
        account: row[0] || '',
        type: row[1] || '',
        contacts: row[2] || '',
        amount: row[3] || '',
        accountValue: row[4] || '',
        priority: row[5] || 'Medium',
        industry: row[6] || '',
        epost: row[7] || '',
      }));

      const updatedCustomers = [...customers, ...newCustomers.filter(c => c.type === 'Klient')];
      const updatedEjKundCustomers = [...ejKundCustomers, ...newCustomers.filter(c => c.type === 'Potentiell kund')];

      setCustomers(updatedCustomers);
      setEjKundCustomers(updatedEjKundCustomers);
      updateChartData(updatedCustomers);

      console.log('Updated customers:', updatedCustomers);
      console.log('Updated ejKundCustomers:', updatedEjKundCustomers);

      saveData();  // Save the data after updating
    };

    reader.readAsBinaryString(file);
  };

  // Update chart data based on customer data
  const updateChartData = (customerData: Customer[]) => {
    const newChartData = customerData.map(customer => ({
      name: customer.account,
      value: typeof customer.accountValue === 'string' 
        ? parseFloat(customer.accountValue.replace(/[^\d.-]/g, '')) || 0
        : customer.accountValue || 0,
    }));

    const total = newChartData.reduce((sum, entry) => sum + entry.value, 0);

    setChartData(newChartData);
    setTotalValue(total);
  };

  // Handle search input
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Define searchable fields
  const searchableFields: (keyof Customer)[] = ['account', 'type', 'contacts', 'industry', 'epost'];

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    searchableFields.some(field => {
      const value = customer[field];
      return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  const filteredEjKundCustomers = ejKundCustomers.filter(customer =>
    searchableFields.some(field => {
      const value = customer[field];
      return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  // Add a new customer
  const addNewCustomer = (type: 'Klient' | 'Potentiell kund') => {
    const newCustomer: Customer = {
      account: '',
      type: type,
      contacts: '',
      amount: '',
      accountValue: '',
      priority: 'Medium',
      industry: '',
      epost: ''
    };

    if (type === 'Klient') {
      setCustomers([...customers, newCustomer]);
    } else {
      setEjKundCustomers([...ejKundCustomers, newCustomer]);
    }
  };

  // Handle field changes in the table
  const handleFieldChange = (
    customersList: Customer[],
    index: number,
    key: keyof Customer,
    value: string
  ) => {
    const newCustomers = [...customersList];
    const updatedCustomer = { ...newCustomers[index], [key]: value };
    newCustomers[index] = updatedCustomer;
    return newCustomers;
  };

  // Render the customer table
  const renderCustomerTable = (customersList: Customer[], title: string, titleColor: string) => (
    <div className="mb-6">
      <h2 className={`text-sm font-semibold mb-3 ${titleColor}`}>{title}</h2>
      <div className="border border-gray-600 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-[#1e293b]">
                <TableHead className="w-[30px] text-gray-400 p-3"></TableHead>
                {customerColumns.map((key, index) => (
                  <TableHead key={index} className="text-gray-400 p-3 whitespace-nowrap">
                    {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                    {['contacts', 'amount', 'accountValue', 'epost'].includes(key) && (
                      <Info className="inline h-3 w-3 ml-1" />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {customersList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={customerColumns.length + 1} className="text-center">
                    No customers available.
                  </TableCell>
                </TableRow>
              ) : (
                customersList.map((customer, index) => (
                  <TableRow key={index} className="border-t border-gray-600 hover:bg-[#1e293b]">
                    <TableCell className="p-3">
                      <input type="checkbox" className="rounded-sm bg-transparent border-gray-600" />
                    </TableCell>
                    {customerColumns.map((key, cellIndex) => (
                      <TableCell key={cellIndex} className="p-3">
                        {key === 'priority' ? (
                          <select
                            value={customer[key]}
                            onChange={(e) => {
                              const newCustomers = handleFieldChange(customersList, index, key, e.target.value);
                              if (title === "Företagskunder") {
                                setCustomers(newCustomers);
                              } else {
                                setEjKundCustomers(newCustomers);
                              }
                            }}
                            className="w-full bg-transparent text-gray-300 focus:bg-white focus:text-gray-800 border-none focus:outline-none focus:ring-1 focus:ring-monday-purple rounded-sm py-1 px-2 text-sm"
                          >
                            <option value="Hög">Hög</option>
                            <option value="Medium">Medium</option>
                            <option value="Låg">Låg</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={customer[key]}
                            onChange={(e) => {
                              const newCustomers = handleFieldChange(customersList, index, key, e.target.value);
                              if (title === "Företagskunder") {
                                setCustomers(newCustomers);
                              } else {
                                setEjKundCustomers(newCustomers);
                              }
                            }}
                            className="w-full bg-transparent text-gray-300 focus:bg-white focus:text-gray-800 border-none focus:outline-none focus:ring-1 focus:ring-monday-purple rounded-sm py-1 px-2 text-sm"
                          />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <Button
          onClick={() => addNewCustomer(title === "Företagskunder" ? "Klient" : "Potentiell kund")}
          className="p-0 hover:bg-transparent"
        >
          <Plus className="inline h-4 w-4 mr-1" /> Lägg till account
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 bg-[#0f1729] p-6 rounded-lg text-gray-300">
      <h1 className="text-2xl font-bold mb-4 text-monday-purple">Accounts</h1>
      
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUploaded}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Button 
          className="bg-monday-purple cursor-pointer text-white px-4 py-2 text-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus className="mr-2 h-4 w-4" /> Välj fil
        </Button>
        <Button className="text-white border-gray-600 px-4 py-2 text-sm">Nytt objekt</Button>
        <Input 
          placeholder="Sök" 
          className="w-64 bg-gray-800 text-white border-gray-600 px-3 py-2 text-sm"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button className="text-white border-gray-600 px-4 py-2 text-sm">
          <Search className="mr-1 h-4 w-4" /> Sök
        </Button>
        <Button className="text-white border-gray-600 px-4 py-2 text-sm">Person</Button>
        <Button className="text-white border-gray-600 px-4 py-2 text-sm">
          <Filter className="mr-1 h-4 w-4" /> Filter
        </Button>
        <Button className="text-white border-gray-600 px-4 py-2 text-sm">
          <ArrowUpDown className="mr-1 h-4 w-4" /> Sortera
        </Button>
        <Button className="text-white border-gray-600 px-4 py-2 text-sm">
          <Eye className="mr-1 h-4 w-4" /> Dölj
        </Button>
        <Button 
          onClick={handleSaveClick}
          disabled={isSaving}
          className="bg-green-500 text-white px-4 py-2 text-sm"
        >
          {isSaving ? 'Sparar...' : 'Spara ändringar'}
        </Button>
        {saveMessage && (
          <span className={`text-sm ${saveMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
            {saveMessage}
          </span>
        )}
      </div>

      {renderCustomerTable(filteredCustomers, "Företagskunder", "text-green-500")}
      {renderCustomerTable(filteredEjKundCustomers, "Ej Kund", "text-blue-500")}

      {chartData.length > 0 && (
        <Card className="mt-6 bg-[#1e293b] p-4">
          <CardHeader>
            <CardTitle className="text-white text-center text-xl">
              Account Distribution - Total Value: {totalValue.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' })}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    fill="#8884d8"
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      index,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = 25 + innerRadius + (outerRadius - innerRadius);
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize="12"
                        >
                          {`${chartData[index].name} (${(percent * 100).toFixed(0)}%)`}
                        </text>
                      );
                    }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' })} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
