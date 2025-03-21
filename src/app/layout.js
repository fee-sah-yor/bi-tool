import "./globals.css";
import { AuthProvider } from "./utils/authContext";

export const metadata = {
  title: "Mini Business Intelligence Tool",
  description: "created by fee-sah-yor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-Manrope antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
