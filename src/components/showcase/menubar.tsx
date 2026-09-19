import { usePreviewColors } from "@/hooks/usePreviewColors";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";

export const MenubarComponent = () => {
  const { text, bg } = usePreviewColors();

  return (
    <Menubar
      className="w-full"
      style={{
        backgroundColor: bg,
        borderColor: text,
      }}
    >
      <MenubarMenu>
        <MenubarTrigger style={{ color: text }}>File</MenubarTrigger>
        <MenubarContent
          style={{
            backgroundColor: bg,
            borderColor: text,
          }}
        >
          <MenubarItem style={{ color: text }}>New Tab</MenubarItem>
          <MenubarItem style={{ color: text }}>New Window</MenubarItem>
          <MenubarSeparator style={{ backgroundColor: text }} />
          <MenubarItem style={{ color: text }}>Share</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger style={{ color: text }}>Edit</MenubarTrigger>
        <MenubarContent
          style={{
            backgroundColor: bg,
            borderColor: text,
          }}
        >
          <MenubarItem style={{ color: text }}>Cut</MenubarItem>
          <MenubarItem style={{ color: text }}>Copy</MenubarItem>
          <MenubarItem style={{ color: text }}>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger style={{ color: text }}>View</MenubarTrigger>
        <MenubarContent
          style={{
            backgroundColor: bg,
            borderColor: text,
          }}
        >
          <MenubarItem style={{ color: text }}>Zoom In</MenubarItem>
          <MenubarItem style={{ color: text }}>Zoom Out</MenubarItem>
          <MenubarSeparator style={{ backgroundColor: text }} />
          <MenubarItem style={{ color: text }}>Toggle Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
