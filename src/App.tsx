import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Toast } from './components/common/Toast';
import { LandingPage } from './views/LandingPage';
import { CustomerPortal } from './views/CustomerPortal';
import { AdminDashboard } from './views/AdminDashboard';
import { BioLink } from './views/BioLink';
import { SystemInfo } from './views/SystemInfo';
import { MOCK_CLIENTS, MOCK_PAYMENTS, INITIAL_STATS } from './data/mockData';
import { Client, LandingContent, LoyaltyConfig } from './types';

import { LoginModal } from './components/common/LoginModal';

const App: React.FC = () => {
  // Navigation State
  const [view, setView] = useState<'landing' | 'portal' | 'admin' | 'biolink' | 'info'>('landing');
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // App State
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [currentUser, setCurrentUser] = useState<Client | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  
  // Configurations
  const [landingContent, setLandingContent] = useState<LandingContent>({
    heroTitle: "Entrena",
    heroAccent: "Smart",
    heroSubtitle: "La Red de Gimnasios más Premium de Perú.",
    heroImg: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80",
    statsSectionTitle: "Nuestra Comunidad en Números",
    featuredPlanName: "Smart Plus",
    gymName: "Gym Smart",
    referralTitle: "Trae a un Amigo y Gana",
    referralSubtitle: "Obtén un mes gratis por cada amigo que se inscriba. Sin límites.",
    testimonialText: "La mejor experiencia fitness que he tenido. Las máquinas son de otro nivel.",
    testimonialAuthor: "Mónica Rivas, Socia desde 2022",
  });

  const [loyaltyConfig, setLoyaltyConfig] = useState<LoyaltyConfig>({
    isLoyaltyCardEnabled: true,
    stampsPerVisit: 1,
    totalStampsToReward: 10,
    rewardDescription: "1 Mes Gratis de Suscripción",
    referralBonusEnabled: true,
    achievementSystemEnabled: true,
  });

  // Simple route handling for demo
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/biolink') setView('biolink');
      else if (path === '/info') setView('info');
      else if (path === '/admin') setView('admin');
      else if (path === '/portal') setView('portal');
      else setView('landing');
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newView: typeof view) => {
    setView(newView);
    const path = newView === 'biolink' ? '/biolink' : newView === 'landing' ? '/' : `/${newView}`;
    window.history.pushState({}, '', path);
  };

  const handleLogin = (type: 'client' | 'admin', user: string, pass: string) => {
    // Password universal para el demo
    if (pass !== '123456') {
      setToast("Contraseña incorrecta (Usa 123456 para el demo)");
      return;
    }

    if (type === 'admin') {
      if (user.toLowerCase() === 'admin') {
        setShowLoginModal(false);
        navigate('admin');
      } else {
        setToast("Usuario Staff no válido");
      }
    } else {
      const foundClient = clients.find(c => c.membershipId.toLowerCase() === user.toLowerCase());
      if (foundClient) {
        setCurrentUser(foundClient);
        setShowLoginModal(false);
        navigate('portal');
      } else {
        setToast("Socio no encontrado (Usa cliente1 o cliente2)");
      }
    }
  };

  return (
    <div className="antialiased text-zinc-900 selection:bg-brand selection:text-black">
      <AnimatePresence mode="wait">
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        
        {showLoginModal && (
          <LoginModal 
            onLogin={handleLogin}
            onClose={() => setShowLoginModal(false)}
          />
        )}

        {view === 'biolink' && (
          <BioLink 
            gymName={landingContent.gymName}
            onFreePass={() => navigate('landing')}
            onViewSedes={() => navigate('landing')}
            onViewPlanes={() => navigate('landing')}
            onLogin={() => setShowLoginModal(true)}
          />
        )}

        {view === 'landing' && (
          <LandingPage 
            content={landingContent} 
            onLogin={() => setShowLoginModal(true)}
            onViewInfo={() => navigate('info')}
          />
        )}

        {view === 'info' && (
          <SystemInfo
            onBack={() => navigate('landing')}
            onLogin={() => setShowLoginModal(true)}
          />
        )}

        {view === 'portal' && currentUser && (
          <CustomerPortal 
            client={currentUser}
            loyaltyConfig={loyaltyConfig}
            onLogout={() => navigate('landing')}
            setToast={setToast}
          />
        )}

        {view === 'admin' && (
          <AdminDashboard 
            clients={clients}
            payments={MOCK_PAYMENTS}
            stats={INITIAL_STATS}
            loyaltyConfig={loyaltyConfig}
            onLogout={() => navigate('landing')}
            onUpdateLoyalty={setLoyaltyConfig}
            onAction={msg => setToast(msg)}
            onAddClient={() => setToast("Función de nuevo socio")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
