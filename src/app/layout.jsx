import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Migrate from a DevExpress DevExtreme React Data Grid to a Bryntum React Grid",
  description: "Guide starter code",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dx-viewport`}>{children}</body>
    </html>
  );
}
