import { useState, useEffect } from "react";
import { FiSearch, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import jackfruit from '../../../assets/jackfruit_1.jpg'

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const faqs = [
    {
      question: "What are the health benefits of jackfruit?",
      answer: "Jackfruit is rich in nutrients including fiber, protein, vitamins A and C, and antioxidants. It's known to support heart health, boost immunity, and improve digestion."
    },
    {
      question: "How should I store jackfruit products?",
      answer: "Store unopened packaged jackfruit products in a cool, dry place. Once opened, refrigerate and consume within 3-5 days for optimal freshness."
    },
    {
      question: "Are your jackfruit products organic?",
      answer: "Yes, all our jackfruit products are certified organic, sourced from sustainable farms using natural farming practices."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to select international destinations. Shipping costs and delivery times vary by location."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Products must be unopened and in original packaging."
    }
  ];



  const shippingInfo = {
    methods: [
      { method: "Standard Shipping", time: "5-7 business days", cost: "$5.99" },
      { method: "Express Shipping", time: "2-3 business days", cost: "$12.99" }
    ],
    policy: "Free shipping on orders over $50. International shipping available."
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="">
        <h1 className="text-4xl font-bold text-center text-white mb-10">How Can We Help You?</h1>

        <section>
          <div className="max-w-full mx-auto mb-10">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for help..."
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border-2 border-white focus:outline-none  pl-12"
                aria-label="Search help topics"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            </div>
          </div>
        </section>

        <section className="mb-16">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-300 to-purple-400 rounded-lg shadow-lg p-8 mb-12">
            <img
              src={jackfruit}
              alt="Fresh jackfruit display"
              className="w-[100%] h-[500px] object-fill rounded-lg mb-6"
            />
            <h2 className="text-2xl font-semibold text-black mb-4">Welcome to Our Help Center</h2>
            <p className="text-gray-600">Find everything you need to know about our jackfruit products, from selection and preparation to storage and recipes.</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-300 to-purple-400 rounded-lg shadow-md overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleSection(`faq-${index}`)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                  aria-expanded={activeSection === `faq-${index}`}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <IoMdArrowDropdown
                    className={`text-2xl text-black transform transition-transform duration-300 ${
                      activeSection === `faq-${index}` ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeSection === `faq-${index}` && (
                  <div className="px-6 py-4 bg-green-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>


        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Shipping Information</h2>
          <div className="bg-gradient-to-r from-blue-300 to-purple-400 rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-black mb-4">Shipping Methods</h3>
              <div className="space-y-4">
                {shippingInfo.methods.map((method, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h4 className="font-medium text-black">{method.method}</h4>
                      <p className="text-sm text-black">{method.time}</p>
                    </div>
                    <span className="font-bold text-black">{method.cost}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-black">{shippingInfo.policy}</p>
          </div>
        </section>

        <section className="mb-16">
          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-300 to-purple-400 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-black mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">Our customer service team is here to assist you.</p>

            <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <FiPhone className="text-4xl text-black mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 text-center">1-800-JACKFRUIT</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <FiMail className="text-4xl text-black mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 text-center">help@jackfruitstore.com</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <FiClock className="text-4xl text-black mb-4" />
              <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-600 text-center">Mon-Fri: 9AM-6PM EST</p>
            </div>
          </div>
            
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default Help;