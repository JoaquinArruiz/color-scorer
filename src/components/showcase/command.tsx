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
import { getHexString, useColorStore } from "@/store/colorStore";
import {
  Calendar,
  CreditCard,
  Gear,
  MagnifyingGlass,
  User,
} from "@phosphor-icons/react";
import { Settings } from "lucide-react";

export const CommandComponent = () => {
  const color = useColorStore();

  return (
    <div
      className="flex items-center justify-center w-full "
      style={{
        backgroundColor: getHexString(color.color2),
        padding: "0.75rem",
        borderRadius: "0.5rem",
        color: getHexString(color.color1),
      }}
    >
      <Command
        className="rounded-lg border"
        style={{
          backgroundColor: getHexString(color.color2),
        }}
      >
        <CommandInput
          style={{
            color: getHexString(color.color1),
          }}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty
            style={{
              color: getHexString(color.color1),
            }}
          >
            No results found.
          </CommandEmpty>
          <CommandGroup
            heading="Suggestions"
            style={{
              color: getHexString(color.color1),
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
          <hr className="text-gray-500 mx-2" />
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
