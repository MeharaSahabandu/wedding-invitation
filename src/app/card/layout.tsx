import type { Metadata } from "next";
import { Cinzel_Decorative, Mea_Culpa, Oranienbaum } from "next/font/google";

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const meaCulpa = Mea_Culpa({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mea",
});

const oranienbaum = Oranienbaum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oranienbaum",
});

export const metadata: Metadata = {
  title: "Prathiba & Pathum Wedding",
  description: "You are warmly invited to our wedding celebration",
};

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${cinzelDecorative.variable} ${meaCulpa.variable} ${oranienbaum.variable}`}
      style={{ background: "#0d0d0d" }}>
      {children}
    </div>
  );
}
