"use client";

import { AuthProvider } from "@/context/authContext";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}