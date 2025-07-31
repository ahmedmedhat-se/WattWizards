import "../styles/partners-policies.css";

function Partners() {
  return (
    <div className="partners-policies">
      <div className="policies-container">
        <div className="policies-title">Partnership Policies</div>
        <div className="policies-description">
          <p>
            At WattWizards, we value transparent and mutually beneficial partnerships. Our partner policies are designed to ensure a professional, ethical, and growth-focused collaboration between our company and all stakeholders.
          </p>

          <ul className="policy-list">
            <li>
              <strong>Eligibility:</strong> We collaborate with organizations and individuals who share our values in innovation, sustainability, and technical excellence.
            </li>
            <li>
              <strong>Commitment to Quality:</strong> Partners are expected to adhere to high standards of service and product integrity, including accurate documentation and safety compliance.
            </li>
            <li>
              <strong>Confidentiality:</strong> All shared assets, APIs, designs, or internal communication must be treated as confidential unless explicitly approved for public use.
            </li>
            <li>
              <strong>Co-Branding & Representation:</strong> Use of WattWizards branding must be approved. Partners must not misrepresent the relationship or offer unauthorized commitments.
            </li>
            <li>
              <strong>Termination:</strong> We reserve the right to terminate partnerships in cases of non-compliance, unethical behavior, or breach of agreement.
            </li>
            <li>
              <strong>Support:</strong> Our support team is available to guide partners through integration processes, promotional collaborations, and technical assistance.
            </li>
          </ul>

          <p>
            For any partnership inquiries or questions regarding our policies, please contact our team at <a href="mailto:xoperations.contact@gmail.com" className="policy-link">xoperations.contact@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Partners;