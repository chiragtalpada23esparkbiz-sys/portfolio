"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-base-dark-secondary group-[.toaster]:text-base-text-color group-[.toaster]:border group-[.toaster]:border-[#3a3a3a] group-[.toaster]:shadow-lg group-[.toaster]:backdrop-blur-sm",
          description: "group-[.toast]:text-base-text-light",
          icon: "group-[.toast]:w-[52px] group-[.toast]:h-[52px] group-[.toast]:mr-2",
          actionButton:
            "group-[.toast]:bg-base-text-active group-[.toast]:text-base-bg-black group-[.toast]:font-medium group-[.toast]:hover:bg-[#80d4ff] group-[.toast]:transition-colors",
          cancelButton:
            "group-[.toast]:bg-base-hover group-[.toast]:text-base-text-color group-[.toast]:hover:bg-[#ffffff30] group-[.toast]:transition-colors",
          success:
            "group-[.toast]:border-green-500/20 group-[.toast]:bg-base-dark-secondary",
          error:
            "group-[.toast]:border-red-500/20 group-[.toast]:bg-base-dark-secondary",
          warning:
            "group-[.toast]:border-yellow-500/20 group-[.toast]:bg-base-dark-secondary",
          info: "group-[.toast]:border-base-text-active/20 group-[.toast]:bg-base-dark-secondary",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
