import { Link } from 'react-router-dom';

const PublicPage = () => {
  return (
    <div className="public-page">
      <div className="container">
        <section className="about-section">
          <h1>About Our Apartment Platform</h1>
          <p>
            Welcome to the premier apartment rental platform! We connect tenants with 
            landlords to make finding your next home or renting out your property 
            as simple as possible.
          </p>
          <div className="cta-buttons">
            <Link to="/listings" className="btn btn-primary">
              Browse Listings
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
        </section>

        <section className="features-section">
          <h2>Our Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Easy Search</h3>
              <p>Find the perfect apartment with our advanced search filters.</p>
            </div>
            <div className="feature-card">
              <h3>Verified Listings</h3>
              <p>All listings are verified to ensure quality and accuracy.</p>
            </div>
            <div className="feature-card">
              <h3>Direct Contact</h3>
              <p>Connect directly with landlords or tenants.</p>
            </div>
            <div className="feature-card">
              <h3>Trusted Reviews</h3>
              <p>Read authentic reviews from verified tenants.</p>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create an Account</h3>
              <p>Sign up as a tenant looking for an apartment or as a landlord with properties to rent.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Browse or List</h3>
              <p>Search for available apartments or create listings for your properties.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Connect</h3>
              <p>Contact landlords about listings or respond to inquiries about your properties.</p>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>Is it free to list my property?</h3>
              <p>Yes, creating a listing on our platform is completely free for landlords.</p>
            </div>
            <div className="faq-item">
              <h3>How do I contact a landlord?</h3>
              <p>Once you find a listing you're interested in, you can contact the landlord directly through our messaging system.</p>
            </div>
            <div className="faq-item">
              <h3>Are the listings verified?</h3>
              <p>We have a verification process in place to ensure the quality and accuracy of all listings on our platform.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicPage;