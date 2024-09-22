declare module '@radix-ui/react-select' {
  import * as React from 'react';

  export interface SelectProps {
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
  }

  export const Select: React.FC<SelectProps>;
  export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const SelectItem: React.FC<React.HTMLAttributes<HTMLDivElement> & { value: string }>;
  export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLButtonElement>>;
  export const SelectValue: React.FC<React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }>;
}