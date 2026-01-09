import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ORIGO',
  description: 'Privacy Policy for ORIGO Market-Signal Architecture',
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p className="text-neutral-400 text-lg mb-12">
            Last Updated: January 5, 2026
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Welcome to ORIGO. We respect your privacy and are committed to
              protecting your personal data. This privacy policy will inform you
              about how we handle your personal data when you visit our website
              and use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Information We Collect
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We collect the following types of information:
            </p>
            <div className="ml-6 space-y-3">
              <p className="text-neutral-300 leading-relaxed">
                <strong className="text-white">Contact Information:</strong> Name,
                email address, role, and company industry provided through our
                assessment form.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                <strong className="text-white">Assessment Data:</strong> Your
                responses to our Market Signal Assessment questions.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                <strong className="text-white">Technical Data:</strong> Browser
                type, IP address, referral source, and timestamps.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We use your information to:
            </p>
            <div className="ml-6 space-y-3">
              <p className="text-neutral-300 leading-relaxed">
                • Provide you with personalized assessment results and insights
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Contact you regarding potential advisory services
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Improve our services and website functionality
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Analyze aggregate data to understand market trends
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Data Security
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access, alteration,
              disclosure, or destruction. Your data is stored securely using
              industry-standard encryption protocols.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Data Retention
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We retain your personal data for as long as necessary to fulfill the
              purposes outlined in this privacy policy, unless a longer retention
              period is required by law. Assessment data is typically retained for
              analytical purposes and service improvement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Your Rights
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <div className="ml-6 space-y-3">
              <p className="text-neutral-300 leading-relaxed">
                • Access your personal data
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Request correction of inaccurate data
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Request deletion of your data
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Object to processing of your data
              </p>
              <p className="text-neutral-300 leading-relaxed">
                • Request restriction of processing
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Third-Party Services
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We use Supabase as our database provider. Your data is processed in
              accordance with their privacy policies and industry-standard security
              practices. We do not sell or share your personal data with third
              parties for marketing purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Cookies and Tracking
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Our website uses essential cookies to ensure proper functionality. We
              do not use third-party advertising or tracking cookies. Technical
              cookies are necessary for the assessment tool to function correctly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We may update this privacy policy from time to time. The latest
              version will always be available on this page with the updated date
              clearly displayed. We encourage you to review this policy
              periodically.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Contact Us
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If you have any questions about this privacy policy or wish to
              exercise your rights, please contact us at:
            </p>
            <p className="text-neutral-300 leading-relaxed">
              Email: privacy@origo.consulting
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}