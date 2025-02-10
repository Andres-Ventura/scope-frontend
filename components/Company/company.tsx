import React from "react";
import { motion } from "framer-motion";

export const Card = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
        textAlign: "center",
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ textAlign: "center", padding: "12px" }}>{children}</div>;
};

export const Button = ({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: string;
  onClick: () => void;
}) => {
  const buttonStyles: Record<string, React.CSSProperties> = {
    base: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 20px",
      borderRadius: "8px",
      fontWeight: "bold",
      transition: "background 0.2s ease-in-out",
      cursor: "pointer",
    },
    primary: {
      background: "#4f46e5",
      color: "white",
    },
    destructive: {
      background: "#e11d48",
      color: "white",
    },
  };

  return (
    <button
      style={{
        ...buttonStyles.base,
        ...(variant === "destructive"
          ? buttonStyles.destructive
          : buttonStyles.primary),
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const StyledImage = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        borderRadius: "20px",
        objectFit: "cover",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
};
