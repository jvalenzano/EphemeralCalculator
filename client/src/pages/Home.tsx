// client/src/pages/Home.tsx (simplified)
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-primary shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl md:text-2xl font-medium text-white">
            Ephemeral Compute Cost Calculator
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="mb-8">The full calculator will be available shortly.</p>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">About This Project</h3>
            <p>
              This calculator helps estimate costs for ephemeral computing resources
              across different cloud providers.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center">
        <p>© 2025 EphemeralCalculator</p>
      </footer>
    </div>
  );
}
