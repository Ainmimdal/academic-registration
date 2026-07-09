import { motion } from 'framer-motion';
import UiTMLogo from '../components/common/UiTMLogo';

function AuthLayout({ children, showLogo = true }) {
  return (
    <div className="min-h-screen uitm-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
      >
        {showLogo && (
          <div className="flex justify-center mb-6">
            <UiTMLogo size="lg" />
          </div>
        )}
        {children}
      </motion.div>
    </div>
  );
}

export default AuthLayout;
