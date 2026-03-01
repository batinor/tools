import type { LucideIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ToolCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export function ToolCard({
  name,
  description,
  icon: Icon,
  onClick,
}: ToolCardProps) {
  return (
    <Card onClick={onClick} className="mx-auto   cursor-pointer">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <Icon size={48} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">{name}</h3>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
