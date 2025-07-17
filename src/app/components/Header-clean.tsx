"use client";

import { JSX } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { FiHeart, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Header(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FiHeart className="text-2xl text-primary" />
            <span className="text-xl font-bold text-primary">
              Animal Adoption
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Início
            </Link>
            <Link
              href="/animais"
              className="text-gray-700 hover:text-primary transition-colors font-semibold"
            >
              Animais
            </Link>
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/animais">
              <Button>
                <FiHeart className="mr-2 h-4 w-4" />
                Ver Animais
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary transition-colors p-2"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/animais"
                className="text-gray-700 hover:text-primary transition-colors px-2 py-1 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Animais
              </Link>
              <div className="pt-2">
                <Link href="/animais">
                  <Button
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FiHeart className="mr-2 h-4 w-4" />
                    Ver Animais
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
