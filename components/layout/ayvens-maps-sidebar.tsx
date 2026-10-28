import type { ReactNode } from "react";
import AyvensMapsToggle from "@/components/layout/ayvens-maps-toggle";
import AyvensMapsSidebarHeader from "@/components/layout/ayvens-maps-sidebar-header";
import AyvensMapsSidebarFooter from "@/components/layout/ayvens-maps-sidebar-footer";

type Props = {
  open: boolean;
  onToggle: () => void;
  /** Body content (search controls, result list, …), rendered between header and footer. */
  children: ReactNode;
};

export default function AyvensMapsSidebar({ open, onToggle, children }: Props) {
  return (
    <aside className={`sidebar ${open ? "" : "closed"}`}>
      <AyvensMapsToggle open={open} onToggle={onToggle} />
      <AyvensMapsSidebarHeader />
      {children}
      <AyvensMapsSidebarFooter />
    </aside>
  );
}
