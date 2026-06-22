import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Sidebar from "./Sidebar";

import MobileSidebar from "./MobileSidebar";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>

      <SheetContent side="left">
        <Sidebar />
      </SheetContent>
      <div className="md:hidden">
  <MobileSidebar />
</div>
    </Sheet>
  );
}