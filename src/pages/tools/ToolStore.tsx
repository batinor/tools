import { useState } from 'react';
import { tools } from '@/tools';
import { ToolCard } from './components/ToolCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ToolStorePage() {
  const [selectedTool, setSelectedTool] = useState<null | (typeof tools)[0]>(
    null,
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Store</h1>

      {/* Grille style store */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
            onClick={() => setSelectedTool(tool)}
          />
        ))}
      </div>

      {/* Modal */}
      <Dialog open={!!selectedTool} onOpenChange={() => setSelectedTool(null)}>
        <DialogContent className="max-w-XS sm:max-w-lg">
          {selectedTool && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTool.name}</DialogTitle>
                <DialogDescription>
                  {selectedTool.description}
                </DialogDescription>
              </DialogHeader>

              <selectedTool.component />
            </>
          )}
          <DialogDescription />
        </DialogContent>
      </Dialog>
    </div>
  );
}
