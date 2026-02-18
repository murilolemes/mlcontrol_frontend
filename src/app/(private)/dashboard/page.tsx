"use client";

import { useAuth } from "@/context/authContext";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null; // 🔥 evita renderizar conteúdo protegido
  async function handleLogout() {
    await api.post("/auth/logout");
    router.replace("/");

    toast.success("Logout realizado com sucesso!");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user.name}</p>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}