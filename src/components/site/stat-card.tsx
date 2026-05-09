import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center rounded-b-sm  bg-[#1e293b] p-8 sm:p-10",
        className
      )}
    >
      <p className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
