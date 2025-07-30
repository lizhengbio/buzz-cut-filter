import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use - Buzz Cut AI",
  description: "Read our terms of service to understand your rights and responsibilities when using Buzz Cut AI's buzz cut preview platform.",
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg prose-gray mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            Terms of Use
          </h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> December 2024<br />
            <strong>Last Updated:</strong> December 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Use ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and Buzz Cut AI ("Company," "we," "us," or "our") concerning your use of the Buzz Cut AI website at buzzcut.ai and our AI-powered buzz cut preview services (collectively, the "Service").
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of these Terms, you may not access or use our Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to update these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Buzz Cut AI is an artificial intelligence-powered platform that provides buzz cut preview services. Our Service allows users to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Upload personal photos for AI processing</li>
              <li>Generate realistic buzz cut previews using advanced AI technology</li>
              <li>Choose from multiple hair color options</li>
              <li>Download generated preview images</li>
              <li>Access subscription-based enhanced features</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Our Service utilizes Flux Kontext Pro AI models combined with face protection technology to ensure secure and accurate results.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Creation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may create an account to access enhanced features. When creating an account, you must provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Responsibility</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You are solely responsible for all activities under your account. You must immediately notify us of any unauthorized use of your account or any other security breaches.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Account Termination</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account at our discretion, particularly if you violate these Terms or engage in prohibited activities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Subscription Plans and Billing</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Tiers</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer multiple service tiers:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Free Tier:</strong> 3 generations per day, 720p output with watermark</li>
              <li><strong>Pro Tier ($4.99/month):</strong> Unlimited generations, 4K output, watermark-free</li>
              <li><strong>Studio Tier ($9.99/month):</strong> Everything in Pro plus API access and commercial licensing</li>
              <li><strong>Credit Packages:</strong> One-time purchases for occasional users</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Billing and Payment</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payment processing is handled by our trusted partner Creem. Subscription fees are billed monthly in advance. All fees are non-refundable except as required by law.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Cancellation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may cancel your subscription at any time through your account settings or customer portal. Cancellation will take effect at the end of your current billing period.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.4 Price Changes</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify subscription prices with 30 days' advance notice to existing subscribers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Acceptable Use Policy</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Permitted Uses</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may use our Service for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Personal hairstyle previewing and decision-making</li>
              <li>Social media content creation (with proper attribution)</li>
              <li>Commercial use (with appropriate subscription tier)</li>
              <li>Educational and research purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Prohibited Uses</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may NOT use our Service to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Upload images of minors without proper consent</li>
              <li>Upload images you do not own or have permission to use</li>
              <li>Create deepfakes or misleading content for deceptive purposes</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on others' intellectual property rights</li>
              <li>Upload inappropriate, offensive, or illegal content</li>
              <li>Attempt to reverse engineer or circumvent our AI models</li>
              <li>Use the Service for bulk processing without appropriate licensing</li>
              <li>Share account credentials with multiple users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Content and Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Your Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain ownership of all images you upload ("Your Content"). By uploading content, you grant us a limited, non-exclusive license to process your images solely for providing our Service.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Generated Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You own the buzz cut preview images generated from your uploads. We do not claim ownership of generated content, though we reserve the right to use anonymized, aggregated data for service improvement.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Our Intellectual Property</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Service, including our AI models, algorithms, software, and website content, is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute our proprietary technology.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.4 Commercial Usage Rights</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pro and Studio subscribers receive commercial usage rights for generated content. Free users may use generated content for personal, non-commercial purposes only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. Our data practices are governed by our Privacy Policy, which is incorporated into these Terms by reference. Key privacy features include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Automatic deletion of uploaded images after 24 hours</li>
              <li>Advanced face protection technology</li>
              <li>GDPR compliance for EU users</li>
              <li>Secure, encrypted data transmission</li>
              <li>No sharing of personal images with third parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. AI Technology and Limitations</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Technology Disclaimer</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI technology is designed to provide realistic buzz cut previews, but results may vary based on image quality, lighting, and other factors. We do not guarantee that generated images will perfectly represent how you would look with an actual buzz cut.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">8.2 Face Protection</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use IP-Adapter FaceID technology to protect facial identity, but no technology is 100% perfect. While we implement multiple safeguards, we cannot guarantee absolute protection against all forms of manipulation.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">8.3 Service Availability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive for high service availability but cannot guarantee uninterrupted service. Maintenance, updates, or technical issues may temporarily affect service availability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimers and Limitations of Liability</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">9.1 Service Disclaimer</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">9.2 Limitation of Liability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by law, Buzz Cut AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or business interruption.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">9.3 Maximum Liability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our total liability to you for any claims related to the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless Buzz Cut AI and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any law or third-party rights</li>
              <li>Your uploaded content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">11.1 Termination by You</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may terminate your account at any time by contacting customer support or using account deletion features.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">11.2 Termination by Us</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may terminate or suspend your access immediately, without prior notice, for violations of these Terms or other reasonable grounds.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">11.3 Effect of Termination</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Upon termination, your right to use the Service ceases immediately. Provisions regarding intellectual property, disclaimers, and limitations of liability survive termination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">12.1 Governing Law</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">12.2 Dispute Resolution</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We encourage resolving disputes through direct communication. If a dispute cannot be resolved informally, you agree to first attempt resolution through mediation before pursuing litigation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Miscellaneous</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">13.1 Severability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">13.2 Entire Agreement</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Buzz Cut AI regarding the Service.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">13.3 Assignment</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may not assign or transfer these Terms without our written consent. We may assign these Terms at any time.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">13.4 Force Majeure</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We shall not be liable for any failure to perform due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, or government actions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Use, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> legal@buzzcut.ai
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Support:</strong> support@buzzcut.ai
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Website:</strong> <a href="https://buzzcut.ai" className="text-blue-600 hover:text-blue-800 underline">buzzcut.ai</a>
              </p>
              <p className="text-gray-700">
                <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours.
              </p>
            </div>
          </section>

          <hr className="my-8 border-gray-200" />
          
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              These Terms of Use are effective as of December 2024 and will remain in effect except with respect to any changes in their provisions in the future, which will be in effect immediately after being posted on this page.
            </p>
            <p>
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the updated Terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 