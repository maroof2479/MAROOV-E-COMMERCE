
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

interface SearchDialogProps {
  children?: React.ReactNode;
  triggerClassName?: string;
}

export function SearchDialog({ children, triggerClassName }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (productId: string) => {
    setOpen(false);
    navigate(`/shop/product/${productId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className={triggerClassName || "hover:bg-primary/10"} aria-label="Search">
            <SearchIcon className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput placeholder="Search products..." className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none" />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setOpen(false)} 
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CommandList className="max-h-[500px] overflow-y-auto py-2">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Products">
              {products.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => handleSelect(product.id)}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-md bg-secondary flex-shrink-0">
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-xs text-muted-foreground">${product.price.toFixed(2)}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
