import React from 'react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
                <p className="text-gray-400">Last updated at: 03/15/2026</p>
            </header>

            <div className="space-y-8 glass-card p-6 md:p-8">
                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">1. GENERAL</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>1.1 This Site (as defined herein) is managed by TreasureEarn, a company operating in California, United States (hereinafter the “Company”, “we”, “TreasureEarn” or “us”).</p>
                        <p>1.2 We ask you to carefully read these terms and conditions of use (hereinafter the “Terms and Conditions” or the “T&C’s”) before using this Site and any of the Services (as defined herein) provided by the Company.</p>
                        <p>1.3 In these Terms and Conditions, “user”, “customer” or “you” means the person using the Site, and/or any of the Services provided by the Company, whether directly via the Site or otherwise.</p>
                        <p>1.4 By using this Site and/or by using any of the Services provided by us, you are agreeing to abide by:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>(i) these Terms and Conditions;</li>
                            <li>(ii) the Company’s <Link to="/privacy" className="text-gold-400 hover:text-gold-300 underline underline-offset-4">Privacy Policy</Link> which may be accessed here;</li>
                            <li>(iii) any specific terms and conditions in relation to any online applications, any reward programmes, any online surveys and/or any other Services provided by the Company, whether via the Site, or otherwise.</li>
                        </ul>
                        <p>1.5 If you do not fully understand these Terms and Conditions, you are advised not to register on the Site and not to participate in any online applications, any reward programmes, any online surveys and/or any other Services provided by the Company, whether via the Site, or otherwise. You may also contact us for further clarification.</p>
                        <p>1.6 If you do not wish to be bound by these Terms and Conditions and any other applicable Company policies, kindly refrain from accessing or using this Site, and/or any of the Services provided by us.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">2. DEFINITIONS</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>For the purposes of these Terms and Conditions, the term:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li><strong>“Personal Data”</strong> as defined in our <Link to="/privacy" className="text-gold-400 hover:text-gold-300 underline underline-offset-4">Privacy Policy</Link>, means any information that can be associated with a specific individual and can therefore be used to identify that person;</li>
                            <li><strong>“Site” or “Platform”</strong> means TreasureEarn.com and includes any sub-links as well as mobile or mobile application versions thereof;</li>
                            <li><strong>“Rewards”</strong> means the digital rewards, points, credits, gift card redemptions, cryptocurrency redemptions, PayPal redemptions, promotional bonuses, or other incentives that may be made available by the Company from time to time, subject to eligibility, verification, availability, and these Terms and Conditions; and</li>
                            <li><strong>“Your account”</strong> means your personal account, duly registered on the Site.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">3. SERVICES AVAILABLE ON THE PLATFORM</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>3.1 Services, as used throughout these Terms and Conditions, shall include any features, options, functionality or facilities made available by the Company, whether on the Site or otherwise, and including but not limited to the option to participate in any online applications, any reward programmes, any online surveys and/or any other Services provided by the Company, whether via the Site or otherwise (hereinafter referred to as the “Services”).</p>
                        <p>3.2 It is hereby agreed that all customers of TreasureEarn shall be bound by these Terms and Conditions, whether accessing the Site or otherwise.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">4. CREATING AN ACCOUNT</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>4.1 In order to make use of the Services provided by us, you must register online.</p>
                        <p>4.2 Upon registration, you will be required to: (i) choose a display name; (ii) provide us with your email address; and (iii) set a password. The password shall contain at least eight (8) characters.</p>
                        <p>4.3 In the event that you realize that the information provided at the registration stage is inaccurate or incorrect, you must inform us immediately so that we can amend it accordingly.</p>
                        <p>4.4 By registering online, you warrant and represent that:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>(a) you have read, understood, and fully agree with these Terms and Conditions;</li>
                            <li>(b) you are of the approved legal age to register in the jurisdiction in which you reside and/or in the jurisdiction from where you are accessing the Site;</li>
                            <li>(c) you are legally able to enter into binding contracts;</li>
                            <li>(d) you are not prohibited from registering online by any law or regulation in force in your country, state, or jurisdiction of residence;</li>
                            <li>(e) you have not already had a TreasureEarn account registered in your name which was permanently closed from our end;</li>
                            <li>(f) you have provided complete, accurate, and up-to-date information when opening your account;</li>
                            <li>(g) you have not been instructed by any authority or any other regulatory body to refrain from participating in any online applications, any reward programmes, any online surveys and/or any other Services provided by the Company; and</li>
                            <li>(h) you are opening your account solely for personal use.</li>
                        </ul>
                        <p>4.5 TreasureEarn is intended only for users who are at least thirteen (13) years of age. By registering for an account or using the Site, you represent and warrant that you are at least thirteen (13) years old.</p>
                        <p>4.6 If you are under eighteen (18) years of age, you may only use the Site and Services with the permission and supervision of a parent or legal guardian who agrees to these Terms and Conditions on your behalf and accepts responsibility for your use of the Site.</p>
                        <p>4.7 We reserve the right to suspend, restrict, or terminate any account where we believe the user is under the minimum permitted age or is using the Site without the required parental or legal guardian consent.</p>
                        <p>4.8 We reserve the right to refuse your registration without prior notice and without giving any reason in certain instances including where false information is given or where you fail to adhere to these Terms.</p>
                        <p>4.9 Users are limited to one account per household unless expressly permitted otherwise by the Company in writing.</p>
                        <p>4.10 Creating multiple accounts which breach the terms of these Terms and Conditions will result in a loss of Rewards and/or suspension/deletion of all associated accounts.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">5. VERIFICATION CHECKS AND PLAYER INFORMATION</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>5.1 By signing up and using the Site, you agree to promptly provide us with any and all information that we might require for registration, verification, compliance, fraud prevention, redemption review, or account security purposes.</p>
                        <p>5.2 We also reserve the right to conduct verification checks, request proof of age and identity, and suspend or close your account if checks are not satisfied.</p>
                        <p>5.3 We reserve the right to verify your identity before granting or allowing the redemption of any Rewards.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">6. COINS, POINTS, AND REWARD BALANCES</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>6.1 Users may earn Coins, Points, or other reward balances by participating in online applications, reward programmes, and surveys.</p>
                        <p>6.2 Coins, Points, and reward balances are used solely within the Platform for tracking user activity and redemptions.</p>
                        <p>6.5 Coins and Points have no real-world value unless and until they are redeemed through an approved redemption method.</p>
                        <p>6.7 Except where expressly permitted, Coins and Points may not be sold, transferred, or exchanged between users.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">7. PLATFORM FEATURES</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>7.1 The Platform may include dashboards, referral features, campaigns, and other tools made available from time to time.</p>
                        <p>7.2 The Company reserves the right to modify or discontinue any feature at any time without notice.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">8. REWARDS</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>8.1 Rewards are granted for interaction with or participation in approved activities such as games or surveys.</p>
                        <p>8.3 Rewards can never be exchanged for monetary cash except through approved redemption methods such as gift cards or PayPal.</p>
                        <p>8.6 We reserve the right to change or limit the amount or type of Rewards granted at any time without prior notice.</p>
                        <p>8.11 Rewards may fail to track or may be rejected for various reasons including use of VPNs, ad blockers, or suspected fraud.</p>
                        <p>8.13 TreasureEarn is a promotional rewards platform only. Your use of the Site does not create any employment or contractor relationship.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">9. REDEEMING YOUR REWARDS</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>9.1 You may view all Rewards earned on the cashout page.</p>
                        <p>9.2 All Rewards must be redeemed within a period of ninety (90) days from the reward date unless otherwise stated.</p>
                        <p>9.4 If a Reward is out of stock, we may provide a similar reward, delay fulfillment, or deny the request at our discretion.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">10. PROMOTIONAL ITEMS OR BONUSES</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>10.1 From time to time, we may offer promotional items or bonuses on the Site subject to specific terms of use.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">11. LEADERBOARD</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>11.1 The Site may contain a Leaderboard to track user progress. The Company reserves the right to determine leaderboard rules and reward eligibility.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">12. TAXATION OF EARNINGS</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>12.1 It is your sole responsibility to determine whether Rewards received are taxable in your jurisdiction. TreasureEarn bears no responsibility for tax payments.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">13. ADDITIONAL WARRANTIES AND DISCLAIMERS</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>13.1 Use of the Site is at your own risk. You are solely responsible for your conduct and account security.</p>
                        <p>13.7 The Company does not warrant that the Services will be uninterrupted, error-free, or free from viruses.</p>
                        <p>13.9 You are strictly prohibited from using VPNs, emulators, or automated tools to manipulate tracking or rewards.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">14. LINKS AND THIRD-PARTY SERVICES</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>14.1 The Site may contain links to third-party websites. We are not responsible for their contents or policies.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">15. ACCOUNT CLOSURE AND USER RESTRICTIONS</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>15.1 You may request account closure at any time by contacting support@treasureearn.com.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">16. DE-REGISTRATION, TERMINATION AND SUSPENSION</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>16.3 We reserve the right to restrict, suspend, or terminate your account if you cheat, defraud, or violate these Terms.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">17. CLOSURE OF INACTIVE ACCOUNTS</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>17.1 Accounts inactive for two (2) years may be closed with immediate effect, and all progress lost.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">18. LIMITATION OF LIABILITY</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>18.4 The liability of the Company shall in no event exceed the amount of one thousand United States dollars (US$1,000.00).</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">19. INDEMNITY</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>19.1 You agree to indemnify and hold harmless the Company from any claims arising out of your use of the Site or violation of these Terms.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">20. INTELLECTUAL PROPERTY RIGHTS</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>20.1 All content on the Site is owned or licensed by the Company. You are prohibited from copying or using materials without permission.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">21. PRIVACY AND CONFIDENTIALITY</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>21.2 All Personal Data is processed in accordance with our Privacy Policy.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">22. AMENDMENTS</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>22.2 We reserve the right to amend these Terms without prior notice, though we will inform you of material changes.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gold-400 mb-3">31. GOVERNING LAW</h2>
                    <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>31.1 These Terms shall be governed by the laws of California, United States.</p>
                        <p>31.2 Any disputes shall be settled in the courts of California, United States.</p>
                    </div>
                </section>

                <section className="pt-8 border-t border-white/10">
                    <p className="text-gray-400 text-sm">
                        For any questions or support, reach out to us at <a href="mailto:support@treasureearn.com" className="text-primary-400 hover:gold-text">support@treasureearn.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
};
