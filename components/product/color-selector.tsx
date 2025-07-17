"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ColorSelectorProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  disabled?: boolean;
}

const COLOR_OPTIONS = [
  {
    id: "black",
    name: "Black",
    hex: "#1a1a1a",
    description: "Classic black hair",
  },
  {
    id: "brown",
    name: "Brown",
    hex: "#8b4513",
    description: "Natural brown hair",
  },
  {
    id: "blonde",
    name: "Blonde",
    hex: "#ffd700",
    description: "Golden blonde hair",
  },
  {
    id: "gray",
    name: "Gray",
    hex: "#808080",
    description: "Silver gray hair",
  },
];

export function ColorSelector({
  selectedColor,
  onColorSelect,
  disabled = false,
}: ColorSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Choose Hair Color</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color.id}
              onClick={() => onColorSelect(color.id)}
              disabled={disabled}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedColor === color.id
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-left">
                  <div className="font-medium">{color.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {color.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-medium text-foreground">
              {COLOR_OPTIONS.find(c => c.id === selectedColor)?.name}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}