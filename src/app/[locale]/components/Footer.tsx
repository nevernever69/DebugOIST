import { Mail, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Club Name */}
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Debug Programming Club
        </h2>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="w-6 h-6 text-gray-600 hover:text-pink-500 transition" />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <MessageCircle className="w-6 h-6 text-gray-600 hover:text-purple-500 transition" />
          </a>
          <a href="mailto:debug@oist.edu" aria-label="Mail">
            <Mail className="w-6 h-6 text-gray-600 hover:text-blue-500 transition" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6 text-gray-600 hover:text-blue-600 transition" />
          </a>
          <a href="https://github.com/devashish2006" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="w-6 h-6 text-gray-600 hover:text-black transition" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2025 Debug Programming Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
