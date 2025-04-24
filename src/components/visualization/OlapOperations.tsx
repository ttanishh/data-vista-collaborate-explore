import React, { useState, useMemo } from 'react';
import { 
  Table as TableIcon, 
  ChevronUp as ArrowUp, 
  ChevronDown as ArrowDown, 
  Slice, 
  Columns2, 
  BarChart3 as Pivot 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { OlapCube3D } from "@/components/visualization/OlapCube3D";

// Sample dataset
const initialData = [
  { date: "2024-01-05", country: "USA", state: "California", city: "Los Angeles", product: "iPhone", category: "Electronics", sales: 1000 },
  { date: "2024-01-05", country: "USA", state: "California", city: "San Diego", product: "Samsung TV", category: "Electronics", sales: 1500 },
  { date: "2024-01-06", country: "USA", state: "Texas", city: "Houston", product: "iPhone", category: "Electronics", sales: 1200 },
  { date: "2024-01-06", country: "USA", state: "Texas", city: "Dallas", product: "Dell Laptop", category: "Electronics", sales: 1800 },
  { date: "2024-01-07", country: "Canada", state: "Ontario", city: "Toronto", product: "iPhone", category: "Electronics", sales: 1100 },
  { date: "2024-01-07", country: "Canada", state: "Ontario", city: "Ottawa", product: "Samsung TV", category: "Electronics", sales: 1300 },
];

type OperationType = 'original' | 'rollup' | 'drilldown' | 'slice' | 'dice' | 'pivot';

const OlapOperations: React.FC = () => {
  const [operation, setOperation] = useState<OperationType>('original');
  const [sliceField, setSliceField] = useState<string>('product');
  const [sliceValue, setSliceValue] = useState<string>('iPhone');
  const [diceFields, setDiceFields] = useState<{field1: string, value1: string, field2: string, value2: string}>({
    field1: 'product',
    value1: 'iPhone,Samsung TV',
    field2: 'country',
    value2: 'USA'
  });
  
  // Get unique values for each field to use in dropdowns
  const uniqueValues = useMemo(() => {
    const fields: Record<string, Set<string>> = {};
    
    initialData.forEach(row => {
      Object.entries(row).forEach(([key, value]) => {
        if (!fields[key]) {
          fields[key] = new Set();
        }
        fields[key].add(String(value));
      });
    });
    
    // Convert sets to arrays
    return Object.entries(fields).reduce((acc, [key, set]) => {
      acc[key] = Array.from(set);
      return acc;
    }, {} as Record<string, string[]>);
  }, []);
  
  const columnKeys = useMemo(() => {
    if (!initialData.length) return [];
    return Object.keys(initialData[0]).filter(key => key !== 'category'); // Exclude category for simplicity
  }, []);
  
  // Process data based on the selected operation
  const processedData = useMemo(() => {
    switch (operation) {
      case 'rollup': {
        // Roll up from city to state level (remove city dimension, sum sales)
        const result = initialData.reduce((acc, row) => {
          // Create a key that uniquely identifies a group (everything except city and sales)
          const key = `${row.date}-${row.country}-${row.state}-${row.product}`;
          
          if (!acc[key]) {
            acc[key] = { ...row };
            delete acc[key].city; // Remove city dimension
          } else {
            acc[key].sales += row.sales; // Sum the sales
          }
          
          return acc;
        }, {} as Record<string, any>);
        
        return Object.values(result);
      }
      
      case 'drilldown':
        // Drill-down is already the original data (most granular)
        return initialData;
        
      case 'slice': {
        // Filter data where the specified field equals the specified value
        return initialData.filter(row => {
          return row[sliceField as keyof typeof row] === sliceValue;
        });
      }
      
      case 'dice': {
        // Filter data where multiple conditions are met
        // For dice: (Product = "iPhone" OR "Samsung TV") AND (Country = "USA")
        return initialData.filter(row => {
          const values1 = diceFields.value1.split(',').map(v => v.trim());
          const values2 = diceFields.value2.split(',').map(v => v.trim());
          
          const field1Match = values1.includes(String(row[diceFields.field1 as keyof typeof row]));
          const field2Match = values2.includes(String(row[diceFields.field2 as keyof typeof row]));
          
          return field1Match && field2Match;
        });
      }
      
      case 'pivot': {
        // Pivot the data: dates as rows, products as columns
        const pivotedData: Record<string, any> = {};
        const products = Array.from(new Set(initialData.map(row => row.product)));
        
        initialData.forEach(row => {
          if (!pivotedData[row.date]) {
            pivotedData[row.date] = { date: row.date };
            // Initialize all product columns to empty
            products.forEach(product => {
              pivotedData[row.date][product] = '';
            });
          }
          // Set the sales value in the corresponding product column
          pivotedData[row.date][row.product] = row.sales;
        });
        
        return Object.values(pivotedData);
      }
      
      case 'original':
      default:
        return initialData;
    }
  }, [operation, sliceField, sliceValue, diceFields]);
  
  // Get column headers based on data and operation
  const columns = useMemo(() => {
    if (!processedData.length) return [];
    
    if (operation === 'pivot') {
      // For pivot, use date and product names as columns
      return ['date', ...Array.from(new Set(initialData.map(row => row.product)))];
    }
    
    // For other operations, use the keys from the first data item
    return Object.keys(processedData[0]);
  }, [processedData, operation]);

  return (
    <Card className="p-4 bg-white dark:bg-gray-950 shadow-md overflow-hidden">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <TableIcon className="h-5 w-5" /> OLAP Operations Explorer
          </h3>
          <Select value={operation} onValueChange={(value) => setOperation(value as OperationType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="original">Original Data</SelectItem>
              <SelectItem value="rollup">Roll-Up <span className="ml-1 text-xs text-muted-foreground">(City → State)</span></SelectItem>
              <SelectItem value="drilldown">Drill-Down <span className="ml-1 text-xs text-muted-foreground">(State → City)</span></SelectItem>
              <SelectItem value="slice">Slice</SelectItem>
              <SelectItem value="dice">Dice</SelectItem>
              <SelectItem value="pivot">Pivot</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="border rounded-lg p-4 bg-background/50">
          <h3 className="text-lg font-medium mb-4">3D Visualization</h3>
          <OlapCube3D operation={operation} />
        </div>

        {/* Controls for specific operations */}
        {operation === 'slice' && (
          <div className="flex flex-wrap gap-4 items-center p-3 bg-muted/40 rounded-md">
            <div className="flex items-center gap-2">
              <Slice className="h-5 w-5 text-primary/70" />
              <span className="font-medium">Slice on:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={sliceField} onValueChange={setSliceField}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  {columnKeys.map(key => (
                    <SelectItem key={key} value={key}>{key}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sliceValue} onValueChange={setSliceValue}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select value" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueValues[sliceField]?.map(value => (
                    <SelectItem key={value} value={value}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {operation === 'dice' && (
          <div className="flex flex-col gap-3 p-3 bg-muted/40 rounded-md">
            <div className="flex items-center gap-2">
              <Columns2 className="h-5 w-5 text-primary/70" />
              <span className="font-medium">Dice on:</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Select 
                    value={diceFields.field1} 
                    onValueChange={(value) => setDiceFields({...diceFields, field1: value})}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Field 1" />
                    </SelectTrigger>
                    <SelectContent>
                      {columnKeys.map(key => (
                        <SelectItem key={key} value={key}>{key}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">=</span>
                  <Input 
                    placeholder="Value(s), comma separated" 
                    value={diceFields.value1}
                    onChange={(e) => setDiceFields({...diceFields, value1: e.target.value})}
                    className="flex-1"
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Available: {uniqueValues[diceFields.field1]?.join(", ")}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium">AND</span>
                  <Select 
                    value={diceFields.field2} 
                    onValueChange={(value) => setDiceFields({...diceFields, field2: value})}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Field 2" />
                    </SelectTrigger>
                    <SelectContent>
                      {columnKeys.map(key => (
                        <SelectItem key={key} value={key}>{key}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">=</span>
                  <Input 
                    placeholder="Value(s), comma separated" 
                    value={diceFields.value2}
                    onChange={(e) => setDiceFields({...diceFields, value2: e.target.value})}
                    className="flex-1"
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Available: {uniqueValues[diceFields.field2]?.join(", ")}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Operation explanations */}
        <div className="text-sm p-3 rounded-md bg-blue-50 dark:bg-blue-950/20 text-muted-foreground border border-blue-100 dark:border-blue-900/30">
          {operation === 'original' && (
            <div className="flex items-start gap-2">
              <TableIcon className="h-4 w-4 mt-0.5 text-blue-500" />
              <span>Original dataset with all dimensions: Time (Date), Location (Country, State, City), Product, and Sales measures.</span>
            </div>
          )}
          
          {operation === 'rollup' && (
            <div className="flex items-start gap-2">
              <ArrowUp className="h-4 w-4 mt-0.5 text-blue-500" />
              <span>Roll-Up aggregates data from City to State level, removing the City dimension while preserving the sales totals.</span>
            </div>
          )}
          
          {operation === 'drilldown' && (
            <div className="flex items-start gap-2">
              <ArrowDown className="h-4 w-4 mt-0.5 text-blue-500" />
              <span>Drill-Down shows data at the most granular level with all dimensions including City.</span>
            </div>
          )}
          
          {operation === 'slice' && (
            <div className="flex items-start gap-2">
              <Slice className="h-4 w-4 mt-0.5 text-blue-500" />
              <span>Slice filters data along a single dimension (e.g., Product = "iPhone") while keeping all other dimensions.</span>
            </div>
          )}
          
          {operation === 'dice' && (
            <div className="flex items-start gap-2">
              <Columns2 className="h-4 w-4 mt-0.5 text-blue-500" />
              <span>Dice filters data along multiple dimensions simultaneously (e.g., Product = "iPhone" OR "Samsung TV" AND Country = "USA").</span>
            </div>
          )}
          
          {operation === 'pivot' && (
            <div className="flex items-start gap-2">
              <Pivot className="h-4 w-4 mt-0.5 text-blue-500" />
              <span>Pivot transforms the data presentation, showing Products as columns and Dates as rows.</span>
            </div>
          )}
        </div>
        
        {/* Data table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableCaption>
              <Badge variant="outline" className="font-normal">
                {processedData.length} records
              </Badge>
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {columns.map((column) => (
                  <TableHead key={column} className="font-medium">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column}`}>
                      {row[column] !== undefined ? row[column] : ''}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default OlapOperations;
