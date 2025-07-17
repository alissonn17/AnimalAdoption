"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";

/**
 * Authentication Demo Component
 * Demonstrates JWT authentication integration with M4 API
 */
export default function AuthDemo() {
  const { user, isLoading, isAuthenticated, login, logout } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(credentials.email, credentials.password);
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FiUser className="mr-2" />
        Status de Autenticação
      </h3>

      {isAuthenticated ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              <strong>Logado como:</strong> {user?.name}
            </p>
            <p className="text-green-600 text-sm">{user?.email}</p>
          </div>

          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <FiLogOut className="mr-2 h-4 w-4" />
            Fazer Logout
          </Button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Demonstração de Autenticação JWT</strong>
            </p>
            <p className="text-blue-600 text-xs mt-1">
              Integração com API M4 melhorada
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <Input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="Sua senha"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            <FiLogIn className="mr-2 h-4 w-4" />
            Fazer Login
          </Button>
        </form>
      )}

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Este componente demonstra a integração JWT</p>
        <p>com a API melhorada do projeto M4</p>
      </div>
    </div>
  );
}
