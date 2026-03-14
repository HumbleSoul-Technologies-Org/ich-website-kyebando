import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-muted/30 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <p className="text-muted-foreground mt-2">Last updated: March 14, 2026</p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                Welcome to Innovative Community Hub  Collective. These Terms of Service ("Terms") govern your use of our website, mobile application, and related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree to these Terms, please do not use our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
              <p className="mb-4">
                Impact Collective provides a platform for community engagement, youth development programs, talent discovery, and charitable initiatives. Our Services include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Information about community programs and initiatives</li>
                <li>Donation processing and fundraising tools</li>
                <li>Volunteer coordination and management</li>
                <li>Educational content and resources</li>
                <li>Community forums and communication tools</li>
                <li>Administrative tools for program management</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Eligibility</h2>
              <p className="mb-4">
                To use our Services, you must:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Be at least 15 years old</li>
                <li>Have the legal capacity to enter into these Terms</li>
                <li>Not be prohibited from using our Services under applicable laws</li>
                <li>Provide accurate and complete information when registering</li>
              </ul>
              <p>
                By using our Services, you represent and warrant that you meet these eligibility requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. User Accounts</h2>
              <p className="mb-4">
                Some features of our Services require you to create an account. When creating an account, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use Policy</h2>
              <p className="mb-4">You agree not to use our Services to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of our Services</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Post false or misleading information</li>
                <li>Use automated tools to access our Services without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Content and Intellectual Property</h2>

              <h3 className="text-xl font-medium mb-2">6.1 Our Content</h3>
              <p className="mb-4">
                All content on our Services, including text, graphics, logos, images, and software, is owned by ICH Collective or our licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>

              <h3 className="text-xl font-medium mb-2">6.2 User-Generated Content</h3>
              <p className="mb-4">
                By posting content on our Services, you grant us a non-exclusive, royalty-free, perpetual license to use, modify, and distribute your content in connection with our Services. You represent that you own or have the right to use any content you post.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Donations and Payments</h2>
              <p className="mb-4">
                Our Services may include donation processing. By making a donation:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>You agree to pay all amounts specified</li>
                <li>You authorize us to charge your payment method</li>
                <li>All donations are final and non-refundable unless required by law</li>
                <li>You understand that donations support our charitable activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Privacy</h2>
              <p className="mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Services, you consent to our privacy practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Disclaimers</h2>
              <p className="mb-4">
                Our Services are provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Accuracy, reliability, or completeness of information</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security of data transmission</li>
              </ul>
              <p>
                We do not guarantee that our Services will meet your requirements or be available at all times.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, Impact Collective shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify and hold harmless Impact Collective, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our Services or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your access to our Services at any time, with or without cause, and without prior notice. Upon termination, your right to use our Services ceases immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of [Jurisdiction].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of our Services after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">15. Severability</h2>
              <p className="mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">16. Entire Agreement</h2>
              <p className="mb-4">
                These Terms constitute the entire agreement between you and Impact Collective regarding your use of our Services and supersede all prior agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
              <p className="mb-4">
                If you have questions about these Terms, please contact us:
              </p>
               <div className="bg-muted p-4 rounded-lg">
                <p><strong>Impact Collective</strong></p>
                <p>Email: info@innovationhub.org</p>
                <p>Phone: +256 7xx xxx xxx</p>
                <p>Address: Thobani shopping center, along Jinja Rd</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}