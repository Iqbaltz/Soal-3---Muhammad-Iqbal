"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = {
  isLoggedIn?: boolean;
};

export default function BasicNavbar({ isLoggedIn = false }: Props) {
  const handleSignout = async () => {
    await signOut({ callbackUrl: "/login", redirect: true });
  };
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          MINI INVENTORY
        </Link>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem className="text-warning">
          <Link href="/dashboard">Manage Inventory</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!isLoggedIn ? (
          <>
            <NavbarItem>
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button onClick={handleSignout} color="danger" variant="flat">
              Logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
