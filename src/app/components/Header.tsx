"use client";

import Link from "next/link";
import { JSX, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  FiHeart,
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiShield,
  FiMessageSquare,
  FiCalendar,
} from "react-icons/fi";

/**
 * Header component with responsive navigation
 * Features: mobile menu, hover effects, modern design, active page indication
 */
export default function Header(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (path: string) => {
    return pathname === path;
  };

  const getLinkClassName = (path: string) => {
    const baseClass =
      "header-link flex items-center space-x-2 transition-all duration-300 font-semibold group px-4 py-2 rounded-lg";
    const activeClass = isActivePage(path)
      ? "nav-link-active"
      : "nav-link-default";
    return `${baseClass} ${activeClass}`;
  };

  return (
    <header
      className={`header-shadow border-b-2 border-purple-200 sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "header-shadow-scrolled bg-white/98" : "bg-white/95"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-full p-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FiHeart className="text-xl text-white" />
            </div>
            <span className="logo-text text-2xl">Animal Adoption</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link href="/" className={getLinkClassName("/")}>
              <FiHome className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Início</span>
            </Link>
            <Link href="/animais" className={getLinkClassName("/animais")}>
              <FiHeart className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Animais</span>
            </Link>
            <Link href="/abrigo" className={getLinkClassName("/abrigo")}>
              <FiShield className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Abrigos</span>
            </Link>
            <Link href="/eventos" className={getLinkClassName("/eventos")}>
              <FiCalendar className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Eventos</span>
            </Link>
            <Link href="/sobre" className={getLinkClassName("/sobre")}>
              <FiUsers className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Sobre</span>
            </Link>
            <Link href="/contato" className={getLinkClassName("/contato")}>
              <FiMessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Contato</span>
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/animais">
              <Button className="cta-button px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                <FiHeart className="mr-2 h-5 w-5" />
                Adotar Agora
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="nav-link-default hover:nav-link-active transition-colors p-3 rounded-xl shadow-sm hover:shadow-md"
              aria-label="Menu mobile"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6 font-bold" />
              ) : (
                <FiMenu className="h-6 w-6 font-bold" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t-2 border-purple-200 bg-white/98 backdrop-blur-md shadow-lg">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className={`flex items-center space-x-4 px-6 py-4 rounded-xl mx-2 font-semibold transition-all duration-300 ${
                  isActivePage("/")
                    ? "nav-link-active text-white shadow-lg"
                    : "nav-link-default hover:nav-link-active hover:shadow-md"
                }`}
                onClick={closeMobileMenu}
              >
                <FiHome className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>Início</span>
              </Link>
              <Link
                href="/animais"
                className={`flex items-center space-x-4 px-6 py-4 rounded-xl mx-2 font-semibold transition-all duration-300 ${
                  isActivePage("/animais")
                    ? "nav-link-active text-white shadow-lg"
                    : "nav-link-default hover:nav-link-active hover:shadow-md"
                }`}
                onClick={closeMobileMenu}
              >
                <FiHeart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>Animais</span>
              </Link>
              <Link
                href="/abrigo"
                className={`flex items-center space-x-4 px-6 py-4 rounded-xl mx-2 font-semibold transition-all duration-300 ${
                  isActivePage("/abrigo")
                    ? "nav-link-active text-white shadow-lg"
                    : "nav-link-default hover:nav-link-active hover:shadow-md"
                }`}
                onClick={closeMobileMenu}
              >
                <FiShield className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>Abrigos</span>
              </Link>
              <Link
                href="/eventos"
                className={`flex items-center space-x-4 px-6 py-4 rounded-xl mx-2 font-semibold transition-all duration-300 ${
                  isActivePage("/eventos")
                    ? "nav-link-active text-white shadow-lg"
                    : "nav-link-default hover:nav-link-active hover:shadow-md"
                }`}
                onClick={closeMobileMenu}
              >
                <FiCalendar className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>Eventos</span>
              </Link>
              <Link
                href="/sobre"
                className={`flex items-center space-x-4 px-6 py-4 rounded-xl mx-2 font-semibold transition-all duration-300 ${
                  isActivePage("/sobre")
                    ? "nav-link-active text-white shadow-lg"
                    : "nav-link-default hover:nav-link-active hover:shadow-md"
                }`}
                onClick={closeMobileMenu}
              >
                <FiUsers className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>Sobre</span>
              </Link>
              <Link
                href="/contato"
                className={`flex items-center space-x-4 px-6 py-4 rounded-xl mx-2 font-semibold transition-all duration-300 ${
                  isActivePage("/contato")
                    ? "nav-link-active text-white shadow-lg"
                    : "nav-link-default hover:nav-link-active hover:shadow-md"
                }`}
                onClick={closeMobileMenu}
              >
                <FiMessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>Contato</span>
              </Link>
              <div className="pt-6 px-4">
                <Link href="/animais" onClick={closeMobileMenu}>
                  <Button className="w-full cta-button py-4 rounded-full transition-all duration-300 hover:scale-105">
                    <FiHeart className="mr-3 h-5 w-5" />
                    Adotar Agora
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
