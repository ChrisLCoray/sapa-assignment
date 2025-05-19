import { Ubuntu_Condensed, Montserrat } from "next/font/google";
import "./globals.css";

// Closest approximation for Interstate Condensed
const ubuntuCondensed = Ubuntu_Condensed({
    variable: "--font-ubuntu-condensed",
    weight: "400",
    subsets: ["latin"],
});

// Closest Approximation for Proxima Nova
const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});

export const metadata = {
    title: "SAPA Takehome Assignment - Chris Coray",
    description: "Chris Coray's takehome assignment for SAPA Investments",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${ubuntuCondensed.variable} ${montserrat.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
