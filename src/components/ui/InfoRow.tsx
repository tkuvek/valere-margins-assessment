interface InfoRowProps {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function InfoRow({ 
  label, 
  value, 
  className = '',
  labelClassName = 'text-gray-400',
  valueClassName = ''
}: InfoRowProps) {
  return (
    <div className={className}>
      <span className={labelClassName}>{label}:</span>
      <span className={`ml-2 ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
} 