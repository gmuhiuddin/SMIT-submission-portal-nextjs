import React from 'react';
import { cn } from '@/lib/utils';

export interface SelectTagProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
    optValues: string[];
  }

const SelectTag = React.forwardRef<HTMLSelectElement, SelectTagProps>(
  ({ className, role, optValues, ...props }, ref) => {
    // const optValues = ['student', 'teacher'];

    if(role!= "undefined"){
      props.disabled = true;
    };

    return (
      <select
      {...props}
        ref={ref}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      >
        <option value="undefined" selected disabled>Please select Student / Teacher</option>
        {optValues.map((element, index) => (
          <option key={index} value={element}>
            {element}
          </option>
        ))}
      </select>
    );
  }
);

SelectTag.displayName = 'SelectTag';

export { SelectTag };
