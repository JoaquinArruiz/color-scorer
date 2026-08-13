import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { usePreviewColors } from "@/hooks/usePreviewColors";
import {
  Calendar,
  CreditCard,
  Gear,
  MagnifyingGlass,
  User,
} from "@phosphor-icons/react";
import { Settings } from "lucide-react";

export const CommandComponent = () => {
  const { text, bg } = usePreviewColors();

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{
        backgroundColor: bg,
        borderRadius: "0.5rem",
        color: text,
      }}
    >
      {/* a value that matches no item stops cmdk from auto selecting the first
          one and scrolling the page down to it on load */}
      <Command
        defaultValue="none"
        className="rounded-lg border"
        style={{
          backgroundColor: bg,
        }}
      >
        <CommandInput
          style={{
            color: text,
          }}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty
            style={{
              color: text,
            }}
          >
            No results found.
          </CommandEmpty>
          <CommandGroup
            heading="Suggestions"
            style={{
              color: text,
            }}
          >
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <MagnifyingGlass />
              <span>Search</span>
            </CommandItem>
            <CommandItem>
              <Gear />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator
            className="mx-2"
            style={{
              backgroundColor: text,
            }}
          />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};
