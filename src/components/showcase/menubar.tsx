import { getHexString, useColorStore } from "@/store/colorStore";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";

export const MenubarComponent = () => {
  const color = useColorStore();

  return (
    <Menubar
      className="w-full"
      style={{
        backgroundColor: getHexString(color.color2),
        borderColor: getHexString(color.color1),
      }}
    >
      <MenubarMenu>
        <MenubarTrigger style={{ color: getHexString(color.color1) }}>
          File
        </MenubarTrigger>
        <MenubarContent
          style={{
            backgroundColor: getHexString(color.color2),
            borderColor: getHexString(color.color1),
          }}
        >
          <MenubarItem style={{ color: getHexString(color.color1) }}>
            New Tab
          </MenubarItem>
          <MenubarItem style={{ color: getHexString(color.color1) }}>
            New Window
          </MenubarItem>
          <MenubarSeparator
            style={{ backgroundColor: getHexString(color.color1) }}
          />
          <MenubarItem style={{ color: getHexString(color.color1) }}>
            Share
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger style={{ color: getHexString(color.color1) }}>
          Edit
        </MenubarTrigger>
        <MenubarContent
          style={{
            backgroundColor: getHexString(color.color2),
            borderColor: getHexString(color.color1),
          }}
        >
          <MenubarItem style={{ color: getHexString(color.color1) }}>
            Cut
          </MenubarItem>
          <MenubarItem style={{ color: getHexString(color.color1) }}>
            Copy
          </MenubarItem>
          <MenubarItem style={{ color: getHexString(color.color1) }}>
            Paste
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger style={{ color: getHexString(color.color1) }}>
          View
        </MenubarTrigger>
        <MenubarContent
          style={{
            backgroundColor: getHexString(color.color2),
            borderColor: getHexString(color.color1),
          }}
        >
          <MenubarItem style={{ color: getHexString(color.color1) }}>
            Zoom In
          </MenubarItem>
          <MenubarItem style={{ color: getHexString(color.color1) }}>
            Zoom Out
          </MenubarItem>
          <MenubarSeparator
            style={{ backgroundColor: getHexString(color.color1) }}
          />
          <MenubarItem style={{ color: getHexString(color.color1) }}>
            Toggle Sidebar
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
