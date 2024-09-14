import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "EMOM Path",
  description:
    "EMOM Path is your ultimate training companion, guiding you through personalized EMOM workouts. Track your progress with detailed graphs and stay motivated as the app helps you plan the next steps on your fitness journey. Whether you're aiming to improve endurance, strength, or overall fitness, EMOM Path charts your path forward.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-en antialiased">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/emompath.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gray-600 bg-opacity-30"></div>

        {/* コンテンツ */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
