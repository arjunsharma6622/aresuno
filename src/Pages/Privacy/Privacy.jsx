const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8">Privacy Policy</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Aresuno&apos;s Privacy Policy. We prioritize the
            protection of your privacy and are committed to handling your
            personal information responsibly. This Privacy Policy details the
            types of data we collect, how we use it, and the measures we take to
            safeguard it.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <p className="mb-4">
            We may collect various types of personal information to provide and
            improve our services. This includes:
            <ul className="list-disc pl-8">
              <li>Your name, email address, and contact details.</li>
              <li>
                Business-related information such as business name, address,
                industry type, and more.
              </li>
            </ul>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="mb-4">
            We utilize the collected information for various purposes, including
            but not limited to:
            <ul className="list-disc pl-8">
              <li>Personalizing user experience and improving our platform.</li>
              <li>Facilitating business transactions and operations.</li>
              <li>
                Communicating with you regarding updates, promotions, or
                service-related announcements.
              </li>
            </ul>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Security Measures</h2>
          <p className="mb-4">
            At Aresuno, we prioritize the security of your data. Our security
            protocols include:
            <ul className="list-disc pl-8">
              <li>Implementation of SSL encryption for data transmission.</li>
              <li>Regular security audits and vulnerability assessments.</li>
              <li>
                Restricted access to personal information only to authorized
                personnel.
              </li>
              <li>
                Continuous monitoring and updating of our security practices.
              </li>
            </ul>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            5. Third-party Integrations and Links
          </h2>
          <p className="mb-4">
            Our platform may contain links to third-party websites or services.
            We are not responsible for the privacy practices or content of such
            entities. We recommend reviewing the privacy policies of any
            third-party services before providing personal information.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            6. Updates to This Privacy Policy
          </h2>
          <p className="mb-4">
            We may periodically update this Privacy Policy to reflect changes in
            our practices or applicable laws. Any revisions will be posted on
            this page, and we encourage you to review this policy regularly. By
            continuing to use our services after changes are made, you consent
            to the updated Privacy Policy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            7. Contact Information
          </h2>
          <p className="mb-4">
            For questions, concerns, or requests regarding this Privacy Policy,
            please contact us at{" "}
            <a href="mailto:aresunoinfo@gmail.com">aresunoinfo@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
