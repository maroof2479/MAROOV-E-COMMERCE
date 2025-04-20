
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { debounce } from '@/lib/utils';

interface SearchDialogProps {
  children?: React.ReactNode;
  triggerClassName?: string;
}

export function SearchDialog({ children, triggerClassName }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigate = useNavigate();

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (!query.trim()) {
        setFilteredProducts(products);
        return;
      }
      
      const lowercaseQuery = query.toLowerCase();
      const results = products.filter(
        product => 
          product.name.toLowerCase().includes(lowercaseQuery) || 
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.category.toLowerCase().includes(lowercaseQuery)
      );
      
      setFilteredProducts(results);
    }, 300),
    []
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSelect = (productId: string) => {
    // Save recent searches in localStorage
    try {
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const selectedProduct = products.find(p => p.id === productId);
      
      if (selectedProduct) {
        const newSearches = [
          { id: selectedProduct.id, name: selectedProduct.name },
          ...recentSearches.filter((item: {id: string}) => item.id !== selectedProduct.id)
        ].slice(0, 5); // Keep only 5 most recent
        
        localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      }
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
    
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
            <CommandInput 
              placeholder="Search products..." 
              value={searchQuery}
              onValueChange={handleSearchChange}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none" 
            />
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
              {filteredProducts.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => handleSelect(product.id)}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-md bg-secondary flex-shrink-0">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="h-full w-full object-cover" 
                      loading="lazy" 
                    />
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
