import { JSX } from "react";
import Link from "next/link";
import {
  FiHeart,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";

/**
 * Footer component with comprehensive information
 * Features: contact info, social links, navigation, and branding
 */
export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-full p-3 shadow-lg">
                <FiHeart className="text-2xl text-white animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Animal Adoption
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Conectando animais incríveis com famílias amorosas. Transformamos
              vidas através da adoção responsável.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Instagram"
              >
                <FiInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Twitter"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/alissonn17/AnimalAdoption"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="GitHub"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/deividleal"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-purple-300 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/animais"
                  className="text-gray-300 hover:text-purple-300 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Animais Disponíveis
                </Link>
              </li>
              <li>
                <Link
                  href="/abrigo"
                  className="text-gray-300 hover:text-purple-300 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Abrigos Parceiros
                </Link>
              </li>
              <li>
                <Link
                  href="/eventos"
                  className="text-gray-300 hover:text-purple-300 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Eventos de Adoção
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-300 hover:text-purple-300 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMail className="h-5 w-5 text-purple-400" />
                <a
                  href="mailto:contato@animaladoption.com"
                  className="hover:text-purple-300 transition-colors duration-300"
                >
                  contato@animaladoption.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FiPhone className="h-5 w-5 text-purple-400" />
                <a
                  href="tel:+5511999999999"
                  className="hover:text-purple-300 transition-colors duration-300"
                >
                  (11) 99999-9999
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMapPin className="h-5 w-5 text-purple-400" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Projeto</h3>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                <h4 className="font-semibold text-purple-300 mb-2">
                  Módulo M5-PDA
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Projeto desenvolvido no Programadores do Amanhã
                </p>
              </div>
              <div className="text-sm text-gray-400">
                <p className="mb-2">
                  <strong className="text-purple-300">Desenvolvedor:</strong>{" "}
                  Squad 1
                </p>
                <p className="mb-2">
                  <strong className="text-purple-300">Tecnologias:</strong>{" "}
                  Next.js 15, TypeScript, TailwindCSS
                </p>
                <p>
                  <strong className="text-purple-300">Status:</strong>
                  <span className="text-green-400 ml-1">✓ Ativo</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © {currentYear} Animal Adoption. Feito com{" "}
                <FiHeart className="inline h-4 w-4 text-red-400 animate-pulse" />{" "}
                para os animais.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-purple-300 transition-colors duration-300"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="hover:text-purple-300 transition-colors duration-300"
              >
                Termos de Uso
              </a>
              <a
                href="https://github.com/alissonn17/AnimalAdoption"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors duration-300 flex items-center space-x-1"
              >
                <FiGithub className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
