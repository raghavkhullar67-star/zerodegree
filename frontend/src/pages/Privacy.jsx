import React from 'react';

const Privacy = () => {
  return (
    <div className="bg-[#f8fafc] dark:bg-[#050505] min-h-screen text-black dark:text-white pt-32 pb-20 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-light uppercase tracking-[0.3em] mb-12 border-b border-black/10 dark:border-white/10 pb-8 transition-colors duration-500">
          Privacy Policy
        </h1>
        
        <div className="space-y-12 text-gray-600 dark:text-gray-400 font-light tracking-wider leading-relaxed transition-colors duration-500">
          <section>
            <h2 className="text-black dark:text-white uppercase tracking-[0.2em] mb-4 text-sm font-medium transition-colors duration-500">Data Collection</h2>
            <p>
              Zero Degree respects your digital footprint. We only collect information necessary to provide you with a 
              premium shopping experience, including your contact details and order history.
            </p>
          </section>

          <section>
            <h2 className="text-black dark:text-white uppercase tracking-[0.2em] mb-4 text-sm font-medium transition-colors duration-500">Information Usage</h2>
            <p>
              Your data is used exclusively for order fulfillment, personalized service, and relevant brand updates. 
              We never share your information with third-party marketers.
            </p>
          </section>

          <section>
            <h2 className="text-black dark:text-white uppercase tracking-[0.2em] mb-4 text-sm font-medium transition-colors duration-500">Security</h2>
            <p>
              Our infrastructure utilizes industry-standard encryption to ensure your personal and payment 
              information remains secure at all times.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
