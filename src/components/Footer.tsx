
import React from 'react';
import { Mail, Phone, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Platform Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">BrasilCodeGap</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A plataforma brasileira que conecta desenvolvedores ao futuro da tecnologia. 
              Aprenda, evolua e transforme sua carreira com os melhores cursos de programação.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cursos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Suporte</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

          {/* Creator Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Criador da Plataforma</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <User className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">Leandresson Cleiton Moreira Fulco</span>
              </div>
              <div className="flex items-center text-gray-400">
                <span className="text-sm">Engenheiro de Software Senior</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <a href="mailto:devleofulco@gmail.com" className="text-sm hover:text-white transition-colors">
                  devleofulco@gmail.com
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <a href="tel:+5581996702190" className="text-sm hover:text-white transition-colors">
                  (81) 9 9670-2190
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 BrasilCodeGap. Todos os direitos reservados. Feito com ❤️ para desenvolvedores brasileiros.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
