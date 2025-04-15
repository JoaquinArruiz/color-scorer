import { getHexString, useColorStore } from "@/store/colorStore";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export const BreadcrumComponent = () => {
  const color = useColorStore();

  return (
    <Breadcrumb
      style={{
        backgroundColor: getHexString(color.color2),
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
      }}
    >
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            style={{
              color: getHexString(color.color1),
              textDecoration: "none",
            }}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator
          style={{ color: getHexString(color.color1), opacity: 0.6 }}
        />
        <BreadcrumbItem>
          <div style={{ color: getHexString(color.color1), opacity: 0.6 }}>
            ...
          </div>
        </BreadcrumbItem>
        <BreadcrumbSeparator
          style={{ color: getHexString(color.color1), opacity: 0.6 }}
        />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            style={{
              color: getHexString(color.color1),
              textDecoration: "none",
            }}
          >
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator
          style={{ color: getHexString(color.color1), opacity: 0.6 }}
        />
        <BreadcrumbItem>
          <BreadcrumbPage
            style={{ color: getHexString(color.color1), opacity: 0.8 }}
          >
            Breadcrumb
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
