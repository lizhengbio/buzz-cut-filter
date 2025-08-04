import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Buzz Cut AI",
  description: "Learn how Buzz Cut AI protects your privacy and handles your personal data. Our comprehensive privacy policy explains our data practices and your rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg prose-gray mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> December 2024<br />
            <strong>Last Updated:</strong> December 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Buzz Cut AI ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, process, and safeguard your information when you use our AI-powered buzz cut preview platform at buzzcut.ai (the "Service").
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our Service, you agree to the collection and use of information in accordance with this Privacy Policy. We take your privacy seriously and have implemented industry-standard security measures to protect your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information You Provide</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Email address (when creating an account)</li>
              <li>Name (optional)</li>
              <li>Profile information (optional)</li>
              <li>Payment information (processed securely by our payment processor Creem)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Images and Content</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Photos you upload for buzz cut preview generation</li>
              <li>Generated buzz cut preview images</li>
              <li>Image metadata (file size, format, dimensions)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Technical Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on our Service</li>
              <li>Referrer URLs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Primary Purposes</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>AI Image Processing:</strong> To generate buzz cut previews using our advanced AI technology</li>
              <li><strong>Face Protection:</strong> To apply our IP-Adapter FaceID technology ensuring your facial identity remains secure</li>
              <li><strong>Service Delivery:</strong> To provide and maintain our buzz cut simulation service</li>
              <li><strong>Account Management:</strong> To create and manage your user account</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Secondary Purposes</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>To process payments and manage subscriptions</li>
              <li>To provide customer support</li>
              <li>To improve our AI models and service quality</li>
              <li>To send important service updates and security notifications</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Our Face Protection Technology</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use advanced face protection technology to ensure your privacy and security:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>IP-Adapter FaceID Locking:</strong> Ensures generated results maintain your original facial features</li>
              <li><strong>MediaPipe Hair Segmentation:</strong> Precisely identifies hair regions, editing only the hairstyle</li>
              <li><strong>Anti-Face-Swap Protection:</strong> Multiple technical safeguards prevent any alteration of facial identity</li>
              <li><strong>Secure Processing Pipeline:</strong> All processing occurs in secure, isolated environments</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Storage and Retention</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Image Storage</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Zero Long-term Storage Policy:</strong> All uploaded photos and generated images are automatically deleted after 24 hours. We do not permanently store your personal photos on our servers.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Account Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Account information is retained until you delete your account or request data deletion. You can request account deletion at any time through our customer support.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Technical Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Usage logs and technical data are retained for up to 12 months for security and service improvement purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Third-Party Services</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We work with trusted third-party services:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Creem:</strong> Payment processing and subscription management</li>
              <li><strong>Supabase:</strong> User authentication and account management</li>
              <li><strong>AI Processing Partners:</strong> Secure image processing using Flux Kontext Pro model</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Data Protection</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We never sell, rent, or share your personal photos with third parties for marketing purposes. Your images are only processed for the specific purpose of generating buzz cut previews.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Legal Requirements</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may disclose your information if required by law or to protect our rights, users, or the public.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 GDPR Rights (for EU users)</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
              <li><strong>Right to Restriction:</strong> Limit how we use your personal data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Account Controls</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Update your account information anytime</li>
              <li>Delete your account and associated data</li>
              <li>Manage subscription preferences</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Security Measures</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Encryption:</strong> All data transmitted using HTTPS encryption</li>
              <li><strong>Secure Storage:</strong> Data stored in secure, compliant cloud infrastructure</li>
              <li><strong>Access Controls:</strong> Strict access controls and authentication requirements</li>
              <li><strong>Regular Audits:</strong> Regular security assessments and vulnerability testing</li>
              <li><strong>Data Minimization:</strong> We collect only necessary data and delete it promptly</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Maintain your login session</li>
              <li>Remember your preferences</li>
              <li>Analyze website usage and performance</li>
              <li>Improve our services</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure adequate protection for such transfers through:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Standard contractual clauses</li>
              <li>Adequacy decisions</li>
              <li>Other lawful transfer mechanisms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Posting the updated policy on our website</li>
              <li>Sending email notifications for significant changes</li>
              <li>Displaying prominent notices on our Service</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your continued use of the Service after any changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Support:</strong> support@buzzcut.ai
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Website:</strong> <a href="https://buzzcut.ai" className="text-blue-600 hover:text-blue-800 underline">buzzcut.ai</a>
              </p>
              <p className="text-gray-700">
                <strong>Response Time:</strong> We aim to respond to all privacy inquiries within 48 hours.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Data Protection Officer</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For EU users, you can contact our Data Protection Officer for any privacy-related concerns:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> dpo@buzzcut.ai
              </p>
            </div>
          </section>

          <hr className="my-8 border-gray-200" />
          
          <div className="text-center text-sm text-gray-500">
            <p>
              This Privacy Policy is effective as of December 2024 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 