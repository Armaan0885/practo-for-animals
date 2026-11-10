import { useEffect, useRef, useState } from "react";
import {
  Search, MapPin, ArrowRight, Heart, Menu, X,
  ShieldCheck, Clock, Star, Stethoscope, PawPrint,
  Phone, ChevronRight, ChevronDown, Clock3, CheckCircle2,
  Building2, ClipboardEdit, Mail, Send
} from "lucide-react";
import "./App.css";

const services = [
  { icon: Stethoscope, name: "Veterinary clinics", value: "Veterinary clinic", desc: "Everyday health & checkups", count: "Find a vet" },
  { icon: Heart, name: "Pet hospitals", value: "Pet hospital", desc: "Advanced & emergency care", count: "Explore hospitals" },
  { icon: Clock, name: "Pet boarding", value: "Pet boarding", desc: "A safe home away from home", count: "Find boarding" },
  { icon: Search, name: "Diagnostics", value: "Diagnostics", desc: "Tests, scans & health checks", count: "Explore labs" },
  { icon: Phone, name: "Animal ambulance", value: "Animal ambulance", desc: "Help when every second counts", count: "Get assistance" },
  { icon: PawPrint, name: "Animal NGOs", value: "Animal NGO", desc: "Support and rescue services", count: "Meet NGOs" }
];

// All provider records below are fictional demonstration data.
const clinics = [
  {
    name: "The Happy Tails Clinic",
    type: "Veterinary Clinic",
    service: "Veterinary clinic",
    location: "Sample listing · Jaipur",
    city: "Jaipur",
    rating: "4.9",
    reviews: "128 reviews",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=700",
    tag: "Demo listing",
    address: "Jaipur, Rajasthan, India",
    phone: "+91 98765 43210",
    hours: "Mon – Sat, 9 AM – 7 PM",
    description: "A sample veterinary clinic profile dedicated to everyday pet wellness, preventive care and compassionate treatment.",
    services: ["General consultation", "Vaccination", "Pet wellness checkups", "Basic diagnostics"]
  },
  {
    name: "Paws & Care Hospital",
    type: "Pet Hospital",
    service: "Pet hospital",
    location: "Sample listing · Jaipur",
    city: "Jaipur",
    rating: "4.8",
    reviews: "96 reviews",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=700",
    tag: "Demo listing",
    address: "Jaipur, Rajasthan, India",
    phone: "+91 98765 43211",
    hours: "Mon – Sun, 24 hours",
    description: "A sample animal hospital profile for advanced pet care, emergency support and medical consultations.",
    services: ["Emergency care", "Surgical consultation", "Pet hospitalization", "Diagnostics"]
  },
  {
    name: "Little Paws Veterinary",
    type: "Veterinary Clinic",
    service: "Veterinary clinic",
    location: "Sample listing · Jaipur",
    city: "Jaipur",
    rating: "4.7",
    reviews: "84 reviews",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700",
    tag: "Demo listing",
    address: "Jaipur, Rajasthan, India",
    phone: "+91 98765 43212",
    hours: "Mon – Sat, 10 AM – 6 PM",
    description: "A sample neighbourhood veterinary clinic focused on preventive healthcare and routine pet consultations.",
    services: ["Routine checkups", "Vaccination", "Nutrition guidance", "Pet health advice"]
  },
  {
    name: "Happy Paws Boarding House",
    type: "Pet Boarding",
    service: "Pet boarding",
    location: "Sample listing · Jaipur",
    city: "Jaipur",
    rating: "4.8",
    reviews: "52 reviews",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700",
    tag: "Demo listing",
    address: "Jaipur, Rajasthan, India",
    phone: "+91 98765 43213",
    hours: "Mon – Sun, 8 AM – 8 PM",
    description: "A fictional boarding facility profile demonstrating how pet parents could discover temporary pet care.",
    services: ["Pet boarding", "Daily feeding", "Supervised play", "Basic grooming"]
  },
  {
    name: "PetScan Diagnostics",
    type: "Diagnostics",
    service: "Diagnostics",
    location: "Sample listing · Jaipur",
    city: "Jaipur",
    rating: "4.6",
    reviews: "41 reviews",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    tag: "Demo listing",
    address: "Jaipur, Rajasthan, India",
    phone: "+91 98765 43214",
    hours: "Mon – Sat, 8 AM – 6 PM",
    description: "A fictional diagnostic centre profile for demonstrating discovery of animal testing and diagnostic services.",
    services: ["Blood tests", "Digital X-ray", "Health screening", "Diagnostic consultation"]
  },
  {
    name: "Paw Rescue Ambulance",
    type: "Animal Ambulance",
    service: "Animal ambulance",
    location: "Sample listing · Jaipur",
    city: "Jaipur",
    rating: "4.9",
    reviews: "37 reviews",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700",
    tag: "Demo listing",
    address: "Jaipur, Rajasthan, India",
    phone: "+91 98765 43215",
    hours: "Emergency service · Demo hours",
    description: "A fictional animal ambulance profile demonstrating emergency-service discovery. This is not a real emergency contact.",
    services: ["Animal transport", "Emergency assistance", "Rescue coordination", "Pet transfers"]
  },
  {
    name: "Kind Hearts Animal Foundation",
    type: "Animal NGO",
    service: "Animal NGO",
    location: "Sample listing · Jaipur",
    city: "Jaipur",
    rating: "4.8",
    reviews: "63 reviews",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=700",
    tag: "Demo listing",
    address: "Jaipur, Rajasthan, India",
    phone: "+91 98765 43216",
    hours: "Mon – Sat, 10 AM – 5 PM",
    description: "A fictional animal welfare organisation profile demonstrating how users could discover rescue and adoption support.",
    services: ["Animal rescue", "Adoption support", "Community awareness", "Volunteer opportunities"]
  }
];

function App() {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("Veterinary clinic");
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const servicePickerRef = useRef(null);

  // Close the service dropdown when clicking anywhere outside it.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        servicePickerRef.current &&
        !servicePickerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const [activeForm, setActiveForm] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: ""
  });

  const normalize = (value) => value.trim().toLowerCase();

  const handleSearch = () => {
    if (!location.trim()) {
      setError("Please enter your city or pincode to continue.");
      setSearched(false);
      return;
    }

    setError("");
    setSearched(true);
    document.getElementById("clinics")?.scrollIntoView({ behavior: "smooth" });
  };

  const selectService = (value) => {
    setService(value);
    setSearched(true);
    setError("");
    document.getElementById("clinics")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFavorite = (name) => {
    setFavorites((previous) =>
      previous.includes(name)
        ? previous.filter((item) => item !== name)
        : [...previous, name]
    );
  };

  const locationMatches = (clinic) => {
    if (!searched || !location.trim()) return true;

    const query = normalize(location);
    return (
      clinic.city.toLowerCase().includes(query) ||
      query.includes(clinic.city.toLowerCase()) ||
      "jaipur".includes(query) ||
      query === "302001" ||
      query === "302"
    );
  };

  const filteredClinics = clinics.filter((clinic) => {
    const matchesService = clinic.service === service;
    return matchesService && locationMatches(clinic);
  });

  const openForm = (formType) => {
    setActiveForm(formType);
    setFormSubmitted(false);
    setFormData({ name: "", email: "", business: "", message: "" });
    setMobileMenuOpen(false);
  };

  const closeForm = () => {
    setActiveForm("");
    setFormSubmitted(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="app">
      <nav className="navbar">
        <a className="brand" href="#" onClick={closeMobileMenu}>
          <span className="brand-icon"><PawPrint size={23} /></span>
          <span>paw<span className="brand-light">care</span></span>
        </a>

        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#clinics">Find a clinic</a>
          <a href="#about">About us</a>
        </div>

        <div className="nav-actions">
          <button className="login-btn" onClick={() => openForm("login")}>
            Log in
          </button>
          <button className="list-btn" onClick={() => openForm("business")}>
            List your business <ArrowRight size={15} />
          </button>
        </div>

        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-nav-panel">
          <a href="#services" onClick={closeMobileMenu}>Services</a>
          <a href="#clinics" onClick={closeMobileMenu}>Find a clinic</a>
          <a href="#about" onClick={closeMobileMenu}>About us</a>
          <button onClick={() => openForm("business")}>List your business</button>
        </div>
      )}

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              BETTER CARE. HAPPIER PAWS.
            </div>

            <h1>
              Because they<br />
              deserve <span>the best</span><br />
              care.
            </h1>

            <p className="hero-description">
              Discover trusted vets, pet hospitals and animal
              care services near you. Everything your best
              friend needs, all in one place.
            </p>

            <div className="search-box">
              <div className="search-field">
                <MapPin size={19} />
                <div>
                  <small>YOUR LOCATION</small>
                  <input
                    placeholder="Enter city or pincode"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setSearched(false);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                  />
                </div>
              </div>

              <div className="search-divider"></div>

              <div className="search-field service-field">
                <Stethoscope size={19} />
                <div className="service-picker-wrap" ref={servicePickerRef}>
                  <small>LOOKING FOR</small>

                  <button
                    type="button"
                    className="service-picker-trigger"
                    aria-haspopup="listbox"
                    aria-expanded={dropdownOpen}
                    onClick={() => setDropdownOpen((open) => !open)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setDropdownOpen(false);
                    }}
                  >
                    <span>
                      {services.find((item) => item.value === service)?.name || service}
                    </span>
                    <ChevronDown
                      size={16}
                      className={dropdownOpen ? "picker-chevron open" : "picker-chevron"}
                    />
                  </button>

                  {dropdownOpen && (
                    <div
                      className="service-picker-menu"
                      role="listbox"
                      aria-label="Choose a service"
                    >
                      {services.map((item) => {
                        const Icon = item.icon;
                        const selected = service === item.value;

                        return (
                          <button
                            type="button"
                            role="option"
                            aria-selected={selected}
                            className={`service-picker-option ${selected ? "active" : ""}`}
                            key={item.value}
                            onClick={() => {
                              setService(item.value);
                              setSearched(false);
                              setDropdownOpen(false);
                              setError("");
                            }}
                          >
                            <span className="picker-option-icon">
                              <Icon size={17} />
                            </span>

                            <span className="picker-option-copy">
                              <strong>{item.name}</strong>
                              <small>{item.desc}</small>
                            </span>

                            {selected && (
                              <CheckCircle2 size={17} className="picker-option-check" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <button className="search-btn" onClick={handleSearch}>
                <Search size={19} /> Search
              </button>
            </div>

            {error && <p className="search-feedback error-message">{error}</p>}

            {searched && !error && (
              <p className="search-feedback">
                Searching demo listings for {service} in {location}.
              </p>
            )}

            <div className="hero-trust">
              <span><ShieldCheck size={17} /> Trusted providers</span>
              <span><Heart size={17} /> Made for every pet</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-photo">
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=1000"
                alt="Happy golden retriever"
              />
              <div className="photo-tag">
                <span className="tag-icon">
                  <Heart size={18} fill="currentColor" />
                </span>
                <div>
                  <strong>Care that feels like home</strong>
                  <small>For every little companion</small>
                </div>
              </div>
            </div>

            <div className="floating-card">
              <div className="floating-icon">
                <Star fill="currentColor" size={17} />
              </div>
              <div>
                <strong>Quality care</strong>
                <small>Starts right here.</small>
              </div>
            </div>

            <div className="hero-decoration">✳</div>
          </div>
        </section>

        <section className="services-section" id="services">
  <div className="section-heading">
    <div>
      <span className="section-kicker">HERE FOR EVERY NEED</span>
      <h2>Care for every <span>kind.</span></h2>
      <p>Whatever they need, find the right care nearby.</p>
    </div>
  </div>

          <div className="service-grid">
            {services.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  type="button"
                  className={`service-card ${service === item.value && searched ? "selected" : ""}`}
                  key={item.value}
                  onClick={() => selectService(item.value)}
                >
                  <div className="service-icon"><Icon size={24} /></div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <span>{item.count} <ArrowRight size={14} /></span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="clinics-section" id="clinics">
          <div className="section-heading">
            <div>
              <span className="section-kicker">DISCOVER QUALITY CARE</span>
              <h2>
                {searched ? `Care near ${location}` : "Find their next "}
                {!searched && <span>best friend.</span>}
              </h2>
              <p>
                {searched
                  ? `Demo provider listings for ${service}.`
                  : "Meet some of the providers dedicated to happy, healthy pets."}
              </p>
            </div>
            <a href="#services" className="view-all">
              Explore services <ArrowRight size={17} />
            </a>
          </div>

          {filteredClinics.length > 0 ? (
            <div className="clinic-grid">
              {filteredClinics.map((clinic) => {
                const isFavorite = favorites.includes(clinic.name);

                return (
                  <article className="clinic-card" key={clinic.name}>
                    <div className="clinic-image">
                      <img src={clinic.image} alt={clinic.name} />
                      <span className="clinic-tag">{clinic.tag}</span>

                      <button
                        className={`clinic-favorite ${isFavorite ? "active" : ""}`}
                        aria-label={isFavorite ? "Remove favourite" : "Add favourite"}
                        aria-pressed={isFavorite}
                        onClick={() => toggleFavorite(clinic.name)}
                      >
                        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className="clinic-details">
                      <span className="clinic-type">{clinic.type}</span>
                      <h3>{clinic.name}</h3>

                      <div className="clinic-rating">
                        <Star size={15} fill="currentColor" />
                        <strong>{clinic.rating}</strong>
                        <span>({clinic.reviews})</span>
                      </div>

                      <div className="clinic-location">
                        <MapPin size={15} />
                        {clinic.location}
                      </div>

                      <div className="clinic-actions">
                        <button
                          className="profile-btn"
                          onClick={() => setSelectedClinic(clinic)}
                        >
                          View profile <ChevronRight size={15} />
                        </button>

                        <a
                          className="contact-btn"
                          href={`tel:${clinic.phone.replaceAll(" ", "")}`}
                          aria-label="Call sample provider"
                        >
                          <Phone size={17} />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-results">
              <Search size={30} />
              <h3>No demo listings found</h3>
              <p>
                This prototype currently contains sample listings for Jaipur only.
                Try searching for Jaipur or explore another service category.
              </p>
              <button
                className="profile-btn"
                onClick={() => {
                  setLocation("Jaipur");
                  setSearched(true);
                }}
              >
                Show Jaipur demo listings
              </button>
            </div>
          )}

          <p className="sample-note">
            Demo content: Provider names, ratings, phone numbers and details are illustrative, not verified listings.
          </p>
        </section>

        <section className="bottom-cta" id="about">
          <div>
            <span>ARE YOU A PET CARE PROVIDER?</span>
            <h2>Help more pets find the care they deserve.</h2>
            <p>Bring your clinic, hospital or animal-care service to Pawcare.</p>
          </div>
          <button onClick={() => openForm("business")}>
            List your business <ArrowRight size={17} />
          </button>
        </section>

        <section className="correction-cta">
          <div>
            <span className="section-kicker">HELP US KEEP INFORMATION ACCURATE</span>
            <h3>Spotted something that needs updating?</h3>
            <p>Help pet parents by suggesting a correction to a provider listing.</p>
          </div>
          <button className="profile-btn" onClick={() => openForm("correction")}>
            Submit a correction <ClipboardEdit size={16} />
          </button>
        </section>
      </main>

      <footer>
        <a className="brand" href="#">
          <span className="brand-icon"><PawPrint size={20} /></span>
          paw<span className="brand-light">care</span>
        </a>
        <span>Made with care for every paw. © 2026 Pawcare.</span>
      </footer>

      {selectedClinic && (
        <div className="modal-overlay" onClick={() => setSelectedClinic(null)}>
          <div
            className="clinic-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedClinic.name} profile`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedClinic(null)}
              aria-label="Close profile"
            >
              <X size={20} />
            </button>

            <div className="modal-image">
              <img src={selectedClinic.image} alt={selectedClinic.name} />
            </div>

            <div className="modal-content">
              <span className="clinic-type">{selectedClinic.type}</span>
              <h2>{selectedClinic.name}</h2>

              <div className="modal-rating">
                <Star size={16} fill="currentColor" />
                <strong>{selectedClinic.rating}</strong>
                <span>{selectedClinic.reviews}</span>
              </div>

              <p className="modal-description">{selectedClinic.description}</p>

              <div className="modal-info">
                <div><MapPin size={18} /><span>{selectedClinic.address}</span></div>
                <div><Clock3 size={18} /><span>{selectedClinic.hours}</span></div>
                <div><Phone size={18} /><span>{selectedClinic.phone}</span></div>
              </div>

              <h3 className="modal-subtitle">Services offered</h3>

              <div className="modal-services">
                {selectedClinic.services.map((item) => (
                  <span key={item}><CheckCircle2 size={15} /> {item}</span>
                ))}
              </div>

              <div className="modal-buttons">
                <a
                  href={`tel:${selectedClinic.phone.replaceAll(" ", "")}`}
                  className="modal-call"
                >
                  <Phone size={17} /> Call sample provider
                </a>
                <button className="modal-done" onClick={() => setSelectedClinic(null)}>
                  Close profile
                </button>
              </div>

              <p className="modal-disclaimer">
                Illustrative demo profile. Contact details and services are sample data.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div
            className="action-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Pawcare form"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeForm} aria-label="Close form">
              <X size={20} />
            </button>

            {formSubmitted ? (
              <div className="form-success">
                <CheckCircle2 size={42} />
                <h2>
                  {activeForm === "login"
                    ? "Demo sign-in complete"
                    : "Thank you for helping Pawcare!"}
                </h2>
                <p>
                  {activeForm === "login"
                    ? "This prototype does not have account authentication connected."
                    : "Your form has been completed in this demo. No information has been sent or stored."}
                </p>
                <button className="profile-btn" onClick={closeForm}>Done</button>
              </div>
            ) : (
              <form className="action-form" onSubmit={handleFormSubmit}>
                <span className="section-kicker">
                  {activeForm === "business"
                    ? "JOIN THE PAWCARE DIRECTORY"
                    : activeForm === "correction"
                      ? "IMPROVE A LISTING"
                      : "WELCOME BACK"}
                </span>

                <h2>
                  {activeForm === "business"
                    ? "List your business"
                    : activeForm === "correction"
                      ? "Submit a correction"
                      : "Log in to Pawcare"}
                </h2>

                <p>
                  {activeForm === "business"
                    ? "Share your pet-care service with the Pawcare community."
                    : activeForm === "correction"
                      ? "Tell us which listing needs an update and what should change."
                      : "This is a demonstration sign-in form."}
                </p>

                {activeForm !== "correction" && (
                  <label>
                    Your name
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                    />
                  </label>
                )}

                <label>
                  Email address
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </label>

                {activeForm === "business" && (
                  <label>
                    Business name and service
                    <input
                      required
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      placeholder="Clinic, hospital, NGO..."
                    />
                  </label>
                )}

                {activeForm === "correction" && (
                  <label>
                    Listing name and suggested correction
                    <textarea
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the listing and the correction needed..."
                    />
                  </label>
                )}

                <button type="submit" className="profile-btn">
                  <Send size={16} />
                  {activeForm === "business"
                    ? "Submit business details"
                    : activeForm === "correction"
                      ? "Submit correction"
                      : "Continue"}
                </button>

                <small className="form-disclaimer">
                  Prototype only: this form does not transmit or store personal information.
                </small>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;