import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";

interface ColorPickerProps {
  color: string | undefined;
  onChange: (color: string) => void;
}

export function TextColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <PaletteIcon size={5} />
          Boja naslova
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <ColorPicker
          hideInputs
          hideEyeDrop
          hideAdvancedSliders
          hideColorGuide
          hideInputType
          hidePresets
          value={color}
          hideGradientType
          hideGradientAngle
          hideGradientStop
          onChange={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}

export function ButtonColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <PaletteIcon size={5} />
          Boja dugmeta
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <ColorPicker
          hideInputs
          hideEyeDrop
          hideAdvancedSliders
          hideColorGuide
          hideInputType
          hidePresets
          value={color}
          hideGradientType
          hideGradientAngle
          hideGradientStop
          onChange={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}

export function BackgroundColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <PaletteIcon size={5} />
          Boja pozadine
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <ColorPicker
          hideInputs
          hideEyeDrop
          hideAdvancedSliders
          hideColorGuide
          hideInputType
          hidePresets
          value={color}
          hideGradientType
          hideGradientAngle
          hideGradientStop
          onChange={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
