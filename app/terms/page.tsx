import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | ORIGO',
  description: 'Terms of Service for ORIGO Market-Signal Architecture',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#febe5d] transition-colors duration-300 mb-12"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>

        {/* Content */}
        <div className="prose prose-invert prose-neutral max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Terms of Service
          </h1>

          <p className="text-neutral-400 text-lg mb-12">
            Last Updated: January 5, 2026
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              By accessing and using the ORIGO website and services, you accept
              and agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Service Description
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              ORIGO provides market-signal architecture consulting and assessment
              services designed to help businesses make better strategic decisions.
              Our services include:
            </p>
            <div className="ml-6 space-y-3">
              <p className="text-neutral-300 leading-relaxed">
                • Market Signal Assessment tool
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Strategic consulting and advisory services
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Decision architecture design
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Educational resources and insights
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. User Responsibilities
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              When using our services, you agree to:
            </p>
            <div className="ml-6 space-y-3">
              <p className="text-neutral-300 leading-relaxed">
                • Provide accurate and truthful information
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Use the services only for lawful purposes
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Not attempt to compromise the security of our systems
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Not misuse or abuse our assessment tools
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Respect intellectual property rights
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Assessment Results and Limitations
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Our Market Signal Assessment provides insights based on your
              responses. However, please note:
            </p>
            <div className="ml-6 space-y-3">
              <p className="text-neutral-300 leading-relaxed">
                • Results are for informational purposes only
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • They do not constitute professional business advice
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Accuracy depends on the quality of information provided
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Results should not be solely relied upon for major business
                decisions
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              All content, materials, and intellectual property on the ORIGO
              website, including but not limited to text, graphics, logos, and
              assessment methodologies, are owned by ORIGO or its licensors and are
              protected by copyright and trademark laws.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-4">
              You may not reproduce, distribute, modify, or create derivative works
              from our content without explicit written permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Our services are provided on an as-is and as-available basis. We make
              no warranties, express or implied, regarding:
            </p>
            <div className="ml-6 space-y-3">
              <p className="text-neutral-300 leading-relaxed">
                • The accuracy or completeness of assessment results
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • The uninterrupted or error-free operation of our website
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • The suitability of our services for your specific needs
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Any particular business outcomes or results
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              To the maximum extent permitted by law, ORIGO shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages
              arising from your use of our services, including but not limited to:
            </p>
            <div className="ml-6 space-y-3">
              <p className="text-neutral-300 leading-relaxed">
                • Loss of profits or revenue
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Business interruption
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Loss of data or information
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Decisions made based on assessment results
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Consulting Services
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If you engage ORIGO for consulting services beyond the free
              assessment, separate terms and agreements will apply. These will be
              outlined in a formal engagement letter or contract.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Termination
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We reserve the right to terminate or suspend your access to our
              services at any time, without prior notice, for conduct that we
              believe violates these Terms of Service or is harmful to other users,
              us, or third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Modifications to Terms
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We reserve the right to modify these Terms of Service at any time.
              Changes will be effective immediately upon posting to the website.
              Your continued use of our services after changes are posted
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              11. Governing Law
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              These Terms of Service shall be governed by and construed in
              accordance with applicable laws. Any disputes arising from these
              terms shall be resolved through appropriate legal channels.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              12. Contact Information
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <p className="text-neutral-300 leading-relaxed">
              Email: legal@origo.consulting
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              13. Severability
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If any provision of these Terms of Service is found to be
              unenforceable or invalid, that provision shall be limited or
              eliminated to the minimum extent necessary so that these terms shall
              otherwise remain in full force and effect.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}