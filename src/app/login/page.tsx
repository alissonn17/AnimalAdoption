"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";

/**
 * Login page - Autenticação de usuários
 * Nota: Autenticação foi pulada conforme solicitação do usuário
 */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementação de login seria aqui
    console.log("Login attempt:", { email, password });
  };

  return (
    <>
      <Header />
      <Main>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Entre em sua conta
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Ou{" "}
                <Link
                  href="/registro"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  crie uma nova conta
                </Link>
              </p>
            </div>

            {/* Aviso sobre autenticação */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Modo Demo
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      A autenticação foi desabilitada conforme solicitado. Este
                      é um formulário demonstrativo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="pl-10"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pl-10 pr-10"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Lembrar de mim
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-purple-600 hover:text-purple-500"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Entrar
                </Button>
              </div>
            </form>

            {/* Links adicionais */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link
                  href="/registro"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Registre-se aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
