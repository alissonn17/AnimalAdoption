import ContactFormEnhanced from "../components/ContactFormEnhanced";
import { FiMapPin, FiClock, FiHeart } from "react-icons/fi";

/**
 * Contact page with enhanced form and API integration
 * Features: JWT-ready contact form, location info, business hours
 */
export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FiHeart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Vamos Conversar?
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Sua participação é fundamental para salvar vidas e conectar
            famílias. Entre em contato conosco e faça a diferença na vida de um
            animal!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form - Takes 2/3 of the space */}
            <div className="lg:col-span-2">
              <ContactFormEnhanced />
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-8">
              {/* Location Card */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FiMapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Localização
                  </h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong>Sede Principal:</strong>
                    <br />
                    Av. Paulista, 1000
                    <br />
                    Bela Vista, São Paulo - SP
                    <br />
                    CEP: 01310-100
                  </p>
                  <p>
                    <strong>Centro de Adoção:</strong>
                    <br />
                    Rua das Flores, 456
                    <br />
                    Vila Madalena, São Paulo - SP
                    <br />
                    CEP: 05435-010
                  </p>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FiClock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Horários</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta:</span>
                    <span className="font-semibold">9h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span className="font-semibold">9h às 16h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span className="font-semibold">10h às 14h</span>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>Importante:</strong> Visitas ao centro de adoção
                      devem ser agendadas previamente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">Ações Rápidas</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+551133334444"
                    className="block w-full bg-white/20 hover:bg-white/30 transition-colors duration-300 rounded-xl p-3 text-center"
                  >
                    📞 Ligar Agora
                  </a>
                  <a
                    href="https://wa.me/5511999998888"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white/20 hover:bg-white/30 transition-colors duration-300 rounded-xl p-3 text-center"
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    href="mailto:contato@adotepet.com"
                    className="block w-full bg-white/20 hover:bg-white/30 transition-colors duration-300 rounded-xl p-3 text-center"
                  >
                    ✉️ Email Direto
                  </a>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-red-800 mb-3">
                  🚨 Emergência Animal
                </h3>
                <p className="text-red-700 text-sm mb-3">
                  Para casos de emergência envolvendo animais em situação de
                  risco:
                </p>
                <a
                  href="tel:+551199999-7777"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-xl font-bold transition-colors duration-300"
                >
                  Linha de Emergência
                  <br />
                  (11) 99999-7777
                </a>
                <p className="text-xs text-red-600 mt-2 text-center">
                  Disponível 24h por dia, todos os dias
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            <details className="bg-white rounded-xl shadow-md border border-gray-200">
              <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                Como posso agendar uma visita ao centro de adoção?
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>
                  Você pode agendar uma visita através do formulário acima, por
                  telefone (11) 3333-4444, ou WhatsApp (11) 99999-8888.
                  Recomendamos agendar com pelo menos 24h de antecedência.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-md border border-gray-200">
              <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                Quais documentos preciso para adotar um animal?
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>
                  Você precisará de: RG, CPF, comprovante de endereço,
                  comprovante de renda, e autorização por escrito de todos os
                  moradores da casa (se houver).
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-md border border-gray-200">
              <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                Há taxa de adoção?
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>
                  Não cobramos taxa de adoção. Solicitamos apenas uma
                  contribuição voluntária para ajudar nos custos de castração,
                  vacinação e cuidados médicos dos animais.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-md border border-gray-200">
              <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                Como posso ser voluntário?
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>
                  Ficamos felizes com seu interesse! Entre em contato conosco
                  através do formulário selecionando &quot;Voluntariado&quot;
                  como assunto. Oferecemos diversas atividades: cuidados
                  diretos, eventos, transporte, comunicação e muito mais.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
