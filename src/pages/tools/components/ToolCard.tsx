import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BadgeEuroIcon } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  onClick: () => void;
}

export function ToolCard({ name, description, onClick }: ToolCardProps) {
  return (
    <Card onClick={onClick} className="mx-auto   cursor-pointer">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <BadgeEuroIcon size="48" />
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
