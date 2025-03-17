"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ToastProps = {
  id: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning";
  duration?: number;
  onClose: () => void;
};

type ToastContextType = {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id" | "onClose">) => void;
  removeToast: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback(
    (toast: Omit<ToastProps, "id" | "onClose">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const duration = toast.duration || 4000;

      setToasts((prev) => [...prev, { ...toast, id, onClose: () => removeToast(id) }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <AnimatePresence>
        <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end gap-2 p-4 md:bottom-8 md:right-8">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function Toast({
  id,
  title,
  description,
  action,
  variant = "default",
  onClose,
}: ToastProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
      className={cn(
        "group pointer-events-auto relative flex w-full max-w-md items-center justify-between gap-2 overflow-hidden rounded-lg border p-4 pr-6 shadow-lg",
        "border-gray-100 bg-white dark:border-neutral-800 dark:bg-neutral-900",
        variant === "success" && "border-green-500/30 bg-green-50 dark:border-green-500/30 dark:bg-green-500/10",
        variant === "error" && "border-red-500/30 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10",
        variant === "warning" && "border-yellow-500/30 bg-yellow-50 dark:border-yellow-500/30 dark:bg-yellow-500/10"
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          {variant === "success" && (
            <div className="rounded-full bg-green-500 p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          {variant === "error" && (
            <div className="rounded-full bg-red-500 p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          {variant === "warning" && (
            <div className="rounded-full bg-yellow-500 p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          <div className={cn(
            "text-sm font-medium text-neutral-900 dark:text-neutral-100",
            variant === "success" && "text-green-800 dark:text-green-300",
            variant === "error" && "text-red-800 dark:text-red-300",
            variant === "warning" && "text-yellow-800 dark:text-yellow-300",
          )}>
            {title}
          </div>
        </div>
        {description && (
          <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </div>
        )}
        {action}
      </div>
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded-full p-1 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-900 group-hover:opacity-100 dark:text-neutral-500 dark:hover:text-neutral-300"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </motion.div>
  );
} 