import React from 'react';

const Terms = () => {
  return (
    <div className="bg-[#f8fafc] dark:bg-[#050505] min-h-screen text-black dark:text-white pt-32 pb-20 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-light uppercase tracking-[0.3em] mb-12 border-b border-black/10 dark:border-white/10 pb-8 transition-colors duration-500">
          Terms of Service
        </h1>
        
        <div className="space-y-12 text-gray-600 dark:text-gray-400 font-light tracking-wider leading-relaxed transition-colors duration-500">
          <section>
            <h2 className="text-black dark:text-white uppercase tracking-[0.2em] mb-4 text-sm font-medium transition-colors duration-500">Agreement</h2>
            <p>
              By accessing Zero Degree, you agree to abide by our terms. Our brand represents a commitment 
              to excellence, and we expect our clients to interact with our platform responsibly.
            </p>
          </section>

          <section>
            <h2 className="text-black dark:text-white uppercase tracking-[0.2em] mb-4 text-sm font-medium transition-colors duration-500">Intellectual Property</h2>
            <p>
              All designs, imagery, and content on this platform are the property of Zero Degree. 
              Unauthorized reproduction or use is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-black dark:text-white uppercase tracking-[0.2em] mb-4 text-sm font-medium transition-colors duration-500">Liability</h2>
            <p>
              Zero Degree is not responsible for any indirect or consequential damages arising from the use of our services 
              or the wear of our products beyond their intended use.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
