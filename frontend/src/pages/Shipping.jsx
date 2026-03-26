import React from 'react';

const Shipping = () => {
  return (
    <div className="bg-[#f8fafc] dark:bg-[#050505] min-h-screen text-black dark:text-white pt-32 pb-20 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-light uppercase tracking-[0.3em] mb-12 border-b border-black/10 dark:border-white/10 pb-8 transition-colors duration-500">
          Shipping & Returns
        </h1>

        <div className="space-y-12 text-gray-600 dark:text-gray-400 font-light tracking-wider leading-relaxed transition-colors duration-500">
          <section>
            <h2 className="text-black dark:text-white uppercase tracking-[0.2em] mb-4 text-sm font-medium transition-colors duration-500">Global Delivery</h2>
            <p>
              Zero Degree offers worldwide shipping. Each piece is meticulously inspected and packaged before dispatch.
              Orders are typically processed within 2-4 business days.
            </p>
          </section>

          <section>
            <h2 className="text-black dark:text-white uppercase tracking-[0.2em] mb-4 text-sm font-medium transition-colors duration-500">Return Policy</h2>
            <p>
              We maintain a strict quality control process. However, if you are not satisfied with your purchase,
              we accept returns within 7 days of delivery. Items must be in their original, unworn condition with all tags attached.
            </p>
          </section>

          <section>
            <h2 className="text-black dark:text-white uppercase tracking-[0.2em] mb-4 text-sm font-medium transition-colors duration-500">Exchanges</h2>
            <p>
              Due to the limited nature of our collections, exchanges are subject to stock availability.
              Please contact our client care team to initiate an exchange request.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
