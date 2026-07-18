import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Sketch, type ColorResult } from "@uiw/react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getHexString, parseHex, type Color } from "@/lib/color";
import { cn } from "@/lib/utils";
import { ColorSwatch } from "./ColorSwatch";

interface ColorFieldProps {
  label: string;
  color: Color;
  onChange: (color: Color) => void;
  className?: string;
}

export const ColorField = ({
  label,
  color,
  onChange,
  className,
}: ColorFieldProps) => {
  const inputId = useId();
  const hex = getHexString(color, true);
  const [draft, setDraft] = useState(hex);
  const [copied, setCopied] = useState(false);
  const isEditing = useRef(false);

  // keep the input in sync when the color changes from somewhere else,
  // but never rewrite what the user is typing
  useEffect(() => {
    if (!isEditing.current) setDraft(hex);
  }, [hex]);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleInput = (value: string) => {
    setDraft(value);
    const parsed = parseHex(value);
    if (parsed) onChange(parsed);
  };

  const handlePickerChange = (result: ColorResult) => {
    const { r, g, b, a } = result.rgba;
    onChange({ r, g, b, a });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
    } catch {
      // clipboard can be unavailable (insecure context or denied permission)
    }
  };

  const isInvalid = parseHex(draft) === null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger
          aria-label={`Pick ${label.toLowerCase()} color`}
          className="shrink-0 rounded-md focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 focus-visible:outline-none"
        >
          <ColorSwatch color={color} />
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="start"
          collisionPadding={12}
        >
          <Sketch
            color={hex}
            onChange={handlePickerChange}
            style={{ width: 240, boxShadow: "none", borderRadius: 0 }}
          />
        </PopoverContent>
      </Popover>

      <div className="relative min-w-0 flex-1">
        <label htmlFor={inputId} className="sr-only">
          {label} hex value
        </label>
        <input
          id={inputId}
          value={draft}
          onChange={(event) => handleInput(event.target.value)}
          onFocus={() => (isEditing.current = true)}
          onBlur={() => {
            isEditing.current = false;
            setDraft(hex);
          }}
          spellCheck={false}
          autoComplete="off"
          aria-invalid={isInvalid}
          className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 pr-9 pl-3 font-mono text-sm text-zinc-100 uppercase transition-colors outline-none focus-visible:border-zinc-400 aria-invalid:border-rose-400"
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : `Copy ${label.toLowerCase()} hex`}
          className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded p-1 text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
        >
          {copied ? (
            <Check className="size-4 text-emerald-300" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ColorField;
