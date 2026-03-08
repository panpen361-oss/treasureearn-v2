import React from 'react';

export const PrivacyPage: React.FC = () => {
    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
                <p className="text-gray-400">Your privacy is important to us. Here is how we handle your data.</p>
            </header>

            <div className="space-y-8 glass-card">
                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">1. Information We Collect</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We collect information you provide directly to us when you create an account, complete offers,
                        or contact support. This may include your username, email address, password, and payment information.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">2. How We Use Your Information</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-300 space-y-2">
                        <li>Provide, maintain, and improve our services.</li>
                        <li>Track offer completions and credit your balance.</li>
                        <li>Process withdrawals and prevent fraud.</li>
                        <li>Send you security alerts and support messages.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">3. Data Security</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We take reasonable measures to help protect information about you from loss, theft, misuse,
                        and unauthorized access. All passwords are encrypted using industry-standard hashing algorithms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">4. Cookies</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We use cookies and similar technologies to remember your preferences and keep you logged in.
                        You can disable cookies in your browser settings, but some features of the site may not work correctly.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">5. Third-Party Offerwalls</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Our service includes third-party offerwalls. When you interact with an offer, you may be sharing data
                        directly with those providers. We encourage you to read their privacy policies.
                    </p>
                </section>

                <section className="pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-500">
                        Last updated: March 2026. If you have any questions, please contact our support team.
                    </p>
                </section>
            </div>
        </div>
    );
};
