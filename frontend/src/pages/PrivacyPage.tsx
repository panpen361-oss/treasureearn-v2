import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
                <p className="text-gray-400">Last Updated: March 15, 2026</p>
            </header>

            <div className="space-y-8 glass-card p-6 md:p-8">
                <section>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        This Privacy Policy describes how TreasureEarn (“TreasureEarn”, “Company”, “we”, “us”, or “our”) collects, uses, processes, stores, and shares personal information when you access or use our website, services, and related features (collectively, the “Site” or “Services”).
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        TreasureEarn operates a promotional rewards platform that allows users to participate in offers, surveys, promotional tasks, and other activities in exchange for reward points or credits.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        TreasureEarn operates from the United States, State of California.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        By accessing or using the Site, creating an account, or interacting with our Services, you acknowledge that you have read and understood this Privacy Policy and agree to the practices described herein.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        This Privacy Policy should be read together with our <Link to="/terms" className="text-gold-400 hover:text-gold-300 underline underline-offset-4">Terms of Service</Link>, which governs your use of the platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">1. PURPOSE OF THIS PRIVACY POLICY</h2>
                    <p className="text-gray-300 leading-relaxed">
                        The purpose of this Privacy Policy is to explain:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                        <li>what personal information we collect</li>
                        <li>how and why we collect that information</li>
                        <li>how we store and protect your data</li>
                        <li>how we share data with third parties</li>
                        <li>the legal basis for processing information</li>
                        <li>your rights regarding your personal data</li>
                    </ul>
                    <p className="text-gray-300 mt-3">
                        We are committed to protecting user privacy and maintaining transparency regarding our data practices.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">2. DEFINITIONS</h2>
                    <p className="text-gray-300 leading-relaxed">
                        For the purposes of this Privacy Policy:
                    </p>
                    <p className="text-gray-300 mt-2">
                        <strong>“Personal Data” or “Personal Information”</strong> means any information that identifies, relates to, describes, or can reasonably be linked to an identifiable individual. Examples include: name, email address, IP address, device identifiers, account credentials, payment or redemption information.
                    </p>
                    <p className="text-gray-300 mt-2">
                        <strong>“Services”</strong> refers to any features, rewards programs, promotional tasks, surveys, offers, or functionality available through the Site.
                    </p>
                    <p className="text-gray-300 mt-2">
                        <strong>“Site”</strong> means the TreasureEarn website and any related services, interfaces, or applications.
                    </p>
                    <p className="text-gray-300 mt-2">
                        <strong>“User”, “you”, or “your”</strong> refers to any individual accessing or using the Site.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">3. CATEGORIES OF PERSONAL INFORMATION WE COLLECT</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">3.1 Identity and Account Information</h3>
                            <p className="text-gray-300">When registering for an account or using the platform, we may collect: username, name (where applicable), email address, date of birth, country of residence, account credentials, profile information.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">3.2 Contact Information</h3>
                            <p className="text-gray-300">We may collect contact information including: email address, support communication records, customer support tickets, feedback or survey responses submitted to us directly.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">3.3 Device and Technical Information</h3>
                            <p className="text-gray-300">When you access the Site, we automatically collect technical data such as: IP address, device identifier, browser type and version, operating system, device type, language preferences, login timestamps, session information, time zone settings.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">3.4 Usage Data</h3>
                            <p className="text-gray-300">We collect information regarding how users interact with our platform, including: pages visited, features used, referral source, clicks and interactions, offer participation history, reward activity.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">3.5 Reward and Transaction Information</h3>
                            <p className="text-gray-300">To operate our rewards platform, we may collect information regarding: rewards earned, offer completion records, redemption activity, withdrawal requests, payment method selections (such as PayPal or crypto wallets).</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">3.6 Fraud Prevention Data</h3>
                            <p className="text-gray-300">To maintain platform integrity, we may collect information used for fraud detection including: IP address history, device fingerprinting data, suspicious activity indicators, duplicate account signals, offer abuse indicators.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">4. HOW WE COLLECT YOUR DATA</h2>
                    <p className="text-gray-300 mb-2"><strong>4.1 Direct Interactions:</strong> You may provide personal data directly when you create an account, complete surveys or offers, contact support, participate in promotions, or submit feedback.</p>
                    <p className="text-gray-300 mb-2"><strong>4.2 Automated Technologies:</strong> We automatically collect technical information using technologies such as cookies, server logs, tracking pixels, and analytics tools.</p>
                    <p className="text-gray-300"><strong>4.3 Third-Party Partners:</strong> TreasureEarn works with third-party partners including offerwall providers, survey providers, advertising networks, analytics providers, and payment processors who may share data with us necessary to verify activity and provide rewards.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">5. HOW WE USE YOUR PERSONAL DATA</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li><strong>Providing and Operating Our Services:</strong> Create and maintain user accounts, track and verify reward activities, provide customer support, process reward redemptions, manage user participation in promotions.</li>
                        <li><strong>Platform Security and Fraud Prevention:</strong> Detect fraud or abuse, prevent duplicate accounts, protect advertisers and partners, enforce our Terms of Service, investigate suspicious activity.</li>
                        <li><strong>Platform Improvement:</strong> Analyze data to improve user experience, optimize site performance, troubleshoot technical issues, develop new features.</li>
                        <li><strong>Communications:</strong> Respond to support inquiries, send important service notices, inform users of policy changes, provide updates about new features or promotions.</li>
                        <li><strong>Legal Compliance:</strong> Comply with applicable laws, respond to legal requests, prevent fraud or illegal activities, protect our rights and property.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">6. COOKIES AND TRACKING TECHNOLOGIES</h2>
                    <p className="text-gray-300">
                        TreasureEarn uses cookies and similar tracking technologies to operate the platform. Cookies may be used to authenticate login sessions, remember user preferences, analyze traffic and usage patterns, improve advertising relevance, and detect fraud. Users may manage cookie preferences through their browser settings. Disabling cookies may impact the functionality of certain features.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">7. THIRD-PARTY SERVICES AND PARTNERS</h2>
                    <p className="text-gray-300">
                        TreasureEarn works with various third-party service providers including offerwall networks, survey providers, hosting services, analytics providers, fraud prevention systems, and payment processors. These providers may receive limited personal information necessary to perform their services. TreasureEarn does not control the privacy practices of third-party providers, and users are encouraged to review their privacy policies.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">8. DISCLOSURE OF PERSONAL INFORMATION</h2>
                    <p className="text-gray-300 mb-2"><strong>8.1 Service Providers:</strong> We may share data with service providers who assist us in operating the platform. These providers process data on our behalf and are required to protect it.</p>
                    <p className="text-gray-300 mb-2"><strong>8.2 Advertising and Offer Partners:</strong> Certain information may be shared with offer providers or survey partners to verify offer completion, confirm reward eligibility, or prevent fraud.</p>
                    <p className="text-gray-300 mb-2"><strong>8.3 Legal Requirements:</strong> We may disclose personal information when required by law or when necessary to comply with legal obligations, respond to court orders, cooperate with law enforcement, or protect the rights or safety of users.</p>
                    <p className="text-gray-300"><strong>8.4 Business Transfers:</strong> If TreasureEarn undergoes a merger, acquisition, or sale of assets, personal information may be transferred to the acquiring entity.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">9. DATA SECURITY</h2>
                    <p className="text-gray-300">
                        We implement industry-standard security measures designed to protect personal information, including encrypted connections (HTTPS), secure data storage systems, restricted internal access, and monitoring for suspicious activity. Despite our efforts, no system can guarantee complete security.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">10. DATA RETENTION</h2>
                    <p className="text-gray-300">
                        We retain personal data only for as long as necessary to operate our services, comply with legal obligations, resolve disputes, and enforce our agreements. Some information may be retained longer for fraud prevention or regulatory compliance.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">11. CHILDREN'S PRIVACY</h2>
                    <p className="text-gray-300">
                        TreasureEarn does not knowingly collect personal information from individuals under 13 years of age. If we learn that we have collected personal information from a child under 13 without parental consent, we will take steps to delete such information.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">12. YOUR PRIVACY RIGHTS</h2>
                    <p className="text-gray-300">
                        Depending on your jurisdiction, you may have rights regarding your personal data, including accessing your personal data, correcting inaccurate information, requesting deletion of your data, restricting processing, or requesting a copy of your data. Requests can be made by contacting us.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">13. CALIFORNIA PRIVACY RIGHTS (CCPA / CPRA)</h2>
                    <p className="text-gray-300">
                        If you are a California resident, you may have additional rights under the CCPA and CPRA, including requesting disclosure of collected personal information, requesting deletion of personal data, correcting inaccurate personal information, opting out of the sale or sharing of personal data, and limiting the use of sensitive personal information. To exercise these rights, contact: support@treasureearn.com
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">14. INTERNATIONAL DATA TRANSFERS</h2>
                    <p className="text-gray-300">
                        TreasureEarn operates from the United States. Users accessing the Site from outside the United States acknowledge that their information may be transferred to and processed in the United States.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">15. CHANGES TO THIS PRIVACY POLICY</h2>
                    <p className="text-gray-300">
                        We may update this Privacy Policy periodically. Changes will be posted on this page and the Last Updated date will be revised accordingly. Continued use of the Site after changes indicates acceptance of the updated Privacy Policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">16. CONTACT INFORMATION</h2>
                    <p className="text-gray-300">
                        If you have questions about this Privacy Policy or how your personal data is handled, you may contact us at:<br /><br />
                        TreasureEarn Support<br />
                        Email: support@treasureearn.com
                    </p>
                </section>
            </div>
        </div>
    );
};
