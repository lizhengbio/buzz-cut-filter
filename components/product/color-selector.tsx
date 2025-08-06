"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ColorSelectorProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  disabled?: boolean;
  isSubscribed?: boolean;
}

const COLOR_OPTIONS = [
  { id: "no-change", name: "No change", hex: "#f0f0f0", description: "Keep original color" },
  { id: "random", name: "Random", hex: "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)", description: "Surprise me!" },
  { id: "blonde", name: "Blonde", hex: "#ffd700", description: "Golden blonde hair" },
  { id: "brunette", name: "Brunette", hex: "#654321", description: "Rich brunette" },
  { id: "black", name: "Black", hex: "#1a1a1a", description: "Classic black hair" },
  { id: "dark-brown", name: "Dark Brown", hex: "#3c2414", description: "Deep dark brown" },
  { id: "medium-brown", name: "Medium Brown", hex: "#8b4513", description: "Natural brown hair" },
  { id: "light-brown", name: "Light Brown", hex: "#cd853f", description: "Light chestnut" },
  { id: "auburn", name: "Auburn", hex: "#a52a2a", description: "Reddish brown" },
  { id: "copper", name: "Copper", hex: "#b87333", description: "Copper metallic" },
  { id: "red", name: "Red", hex: "#dc143c", description: "Vibrant red" },
  { id: "strawberry-blonde", name: "Strawberry Blonde", hex: "#ff9999", description: "Light reddish blonde" },
  { id: "platinum-blonde", name: "Platinum Blonde", hex: "#f5f5dc", description: "Ultra light blonde" },
  { id: "silver", name: "Silver", hex: "#c0c0c0", description: "Metallic silver" },
  { id: "white", name: "White", hex: "#ffffff", description: "Pure white" },
  { id: "blue", name: "Blue", hex: "#0000ff", description: "Electric blue" },
  { id: "purple", name: "Purple", hex: "#800080", description: "Royal purple" },
  { id: "pink", name: "Pink", hex: "#ffc0cb", description: "Soft pink" },
  { id: "green", name: "Green", hex: "#008000", description: "Forest green" },
  { id: "blue-black", name: "Blue-Black", hex: "#191970", description: "Deep blue-black" },
  { id: "golden-blonde", name: "Golden Blonde", hex: "#ffdf00", description: "Warm golden tone" },
  { id: "honey-blonde", name: "Honey Blonde", hex: "#ffa500", description: "Sweet honey shade" },
  { id: "caramel", name: "Caramel", hex: "#d2691e", description: "Rich caramel brown" },
  { id: "chestnut", name: "Chestnut", hex: "#954535", description: "Warm chestnut" },
  { id: "mahogany", name: "Mahogany", hex: "#c04000", description: "Rich mahogany red" },
  { id: "burgundy", name: "Burgundy", hex: "#800020", description: "Deep wine red" },
  { id: "jet-black", name: "Jet Black", hex: "#343434", description: "Deepest black" },
  { id: "ash-brown", name: "Ash Brown", hex: "#a0522d", description: "Cool ash brown" },
  { id: "ash-blonde", name: "Ash Blonde", hex: "#b8860b", description: "Cool ash blonde" },
  { id: "titanium", name: "Titanium", hex: "#878681", description: "Metallic titanium" },
  { id: "rose-gold", name: "Rose Gold", hex: "#e8b4b8", description: "Trendy rose gold" },
];

// Free user limited options
const FREE_COLOR_OPTIONS = [
  { id: "no-change", name: "No change", hex: "#f0f0f0", description: "Keep original color" },
  { id: "black", name: "Black", hex: "#1a1a1a", description: "Classic black hair" },
  { id: "medium-brown", name: "Brown", hex: "#8b4513", description: "Natural brown hair" },
  { id: "golden-blonde", name: "Gold", hex: "#ffdf00", description: "Warm golden tone" },
  { id: "silver", name: "Gray", hex: "#c0c0c0", description: "Metallic silver" },
];

export function ColorSelector({
  selectedColor,
  onColorSelect,
  disabled = false,
  isSubscribed = false,
}: ColorSelectorProps) {
  const colorOptions = isSubscribed ? COLOR_OPTIONS : FREE_COLOR_OPTIONS;
  const selectedColorOption = colorOptions.find(c => c.id === selectedColor) || colorOptions[1]; // Default to black for free, or first available

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Choose Hair Color</CardTitle>
        {!isSubscribed && (
          <p className="text-sm text-muted-foreground">
            Free users get 5 basic colors. <Link href="/pricing" className="text-primary font-medium hover:underline cursor-pointer">Upgrade to Pro</Link> for 30+ hair colors including vibrant shades!
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <Select 
          value={selectedColor} 
          onValueChange={onColorSelect}
          disabled={disabled}
        >
          <SelectTrigger className="w-full h-12">
            <SelectValue>
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"
                  style={{ 
                    background: selectedColorOption.hex.includes('gradient') 
                      ? selectedColorOption.hex 
                      : selectedColorOption.hex 
                  }}
                />
                <span className="font-medium">{selectedColorOption.name}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {colorOptions.map((color) => (
              <SelectItem key={color.id} value={color.id} className="cursor-pointer">
                <div className="flex items-center gap-3 py-1">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"
                    style={{ 
                      background: color.hex.includes('gradient') 
                        ? color.hex 
                        : color.hex 
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{color.name}</span>
                    <span className="text-xs text-muted-foreground">{color.description}</span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-medium text-foreground">
              {selectedColorOption.name}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedColorOption.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}