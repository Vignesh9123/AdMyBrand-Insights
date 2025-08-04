"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
} from "@/components/ui/resizable-navbar";
import ThemeToggle from "../ui/theme-toggle";
import { useEffect } from "react";
export function NavbarDemo({ children }: { children: React.ReactNode }) {

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
         <ThemeToggle />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
          
            <ThemeToggle />
          </MobileNavHeader>

        
        </MobileNav>
      </Navbar>

      {children}

    </div>
  );
}


