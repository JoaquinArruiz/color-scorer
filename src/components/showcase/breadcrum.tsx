import { usePreviewColors } from "@/hooks/usePreviewColors";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export const BreadcrumComponent = () => {
  const { text, bg } = usePreviewColors();

  return (
    <Breadcrumb
      style={{
        backgroundColor: bg,
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
      }}
    >
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            style={{
              color: text,
              textDecoration: "none",
            }}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator style={{ color: text, opacity: 0.6 }} />
        <BreadcrumbItem>
          <div style={{ color: text, opacity: 0.6 }}>...</div>
        </BreadcrumbItem>
        <BreadcrumbSeparator style={{ color: text, opacity: 0.6 }} />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            style={{
              color: text,
              textDecoration: "none",
            }}
          >
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator style={{ color: text, opacity: 0.6 }} />
        <BreadcrumbItem>
          <BreadcrumbPage style={{ color: text, opacity: 0.8 }}>
            Breadcrumb
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
