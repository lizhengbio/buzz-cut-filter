"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ColorSelectorProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  disabled?: boolean;
}

// Hair color options
const COLOR_OPTIONS = [
  {
    id: "black",
    name: "Black",
    hex: "#1a1a1a",
  },
  {
    id: "brown", 
    name: "Brown",
    hex: "#8b4513",
  },
  {
    id: "blonde",
    name: "Blonde",
    hex: "#ffd700",
  },
  {
    id: "gray",
    name: "Gray", 
    hex: "#808080",
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
                <div className="font-medium">{color.name}</div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}