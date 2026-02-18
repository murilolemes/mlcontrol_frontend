"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/services/api";
import { toast } from "react-toastify";
import { Form, LoginContainer, LoginContent, Logo } from "./styles";

const loginFormSchema = z.object({
  login: z.string().min(3, "O login deve ter no mínimo 3 caracteres"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    control
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {}
  })

  async function onSubmit(data: LoginFormSchema) {
    try {
      await api.post("/auth/login", data);

      toast.success("Login realizado com sucesso!");
      reset();

      router.push("/dashboard");
    } catch (err) {
      toast.error("Login ou senha inválido!");
    }
  }

  return (
    <LoginContainer>
      <LoginContent>
        <Logo>
          <img
            src="/assets/logo-mlControl.svg"
            alt="Logo mlControl"
            width={160}
            height={120}
          />
        </Logo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="login">Login</label>
            <input
              type="text"
              id="login"
              placeholder="Digite seu login"
              {...register("login")}
            />
            {errors.login && <small>{errors.login.message}</small>}
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {errors.password && <small>{errors.password.message}</small>}
          </div>
          <div>
            <button type="submit">Entrar</button>
          </div>
        </Form>
      </LoginContent>
    </LoginContainer>
  )
}