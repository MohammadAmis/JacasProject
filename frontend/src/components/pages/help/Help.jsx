import { useState, useEffect } from "react";
import { FiSearch, FiPhone, FiMail, FiClock,FiTruck } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";
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
  
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#94B4C1]">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-black mb-6">
            How Can We Help You?
          </h1>
          <div className="max-w-full mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles..."
              className="w-full px-14 py-3 rounded-xl   focus:ring-2   bg-white "
              aria-label="Search help center"
            />
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600 text-xl" />
          </div>
        </header>

        <section className="mb-10">
          <div className="relative  overflow-hidden shadow-xl">
            <img
              src={jackfruit}
              alt="Fresh jackfruit"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/40">
              <div className="absolute bottom-8 left-8 text-white max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Jackfruit Knowledge Hub</h2>
                <p className="text-lg opacity-90">
                  Discover recipes, storage tips, and nutritional benefits of nature s
                  wonder fruit
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-8">
            Popular Questions
          </h2>
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#547792] rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleSection(`faq-${index}`)}
                  className="w-full px-6 py-5 flex items-center justify-between group"
                  aria-expanded={activeSection === `faq-${index}`}
                >
                  <div className="flex items-start">
                    <IoMdArrowDropright
                      className={`mt-1 mr-4 text-black transform transition-transform ${
                        activeSection === `faq-${index}` ? "rotate-90" : ""
                      }`}
                    />
                    <span className="text-lg text-left font-medium text-black">
                      {faq.question}
                    </span>
                  </div>
                </button>
                {activeSection === `faq-${index}` && (
                  <div className="px-14 pb-6 pt-2 border-t border-black">
                    <p className="text-white leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-8">
            Shipping & Delivery
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {shippingInfo.methods.map((method, index) => (
              <div
                key={index}
                className="bg-[#547792] p-6 rounded-xl shadow-sm b"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#273F4F] p-3 rounded-lg mr-4">
                    <FiTruck className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-black">
                    {method.method}
                  </h3>
                </div>
                <div className="flex justify-between text-black">
                  <span>{method.time}</span>
                  <span className="font-medium">{method.cost}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#547792] p-2 mt-4 rounded-xl shadow-sm ">
            <p className=" text-black text-center">
              {shippingInfo.policy}
            </p>
          </div>
        </section>

        <section className="mb-10">
          <div className="bg-[#547792] text-black rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Direct Support</h2>
            <p className="mb-12 text-black max-w-2xl mx-auto">
              Our jackfruit experts are available 6 days a week to assist with any
              inquiries
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-white">
              <div className="p-6 bg-[#273F4F]  rounded-xl backdrop-blur-sm">
                <FiPhone className="mx-auto text-3xl mb-4 " />
                <h3 className="font-semibold mb-2 ">Phone</h3>
                <p className="">1-800-JACKFRT</p>
                <p className="text-sm  mt-2">Mon-Fri: 9AM-6PM IST</p>
              </div>
              <div className="p-6 bg-[#273F4F] rounded-xl backdrop-blur-sm">
                <FiMail className="mx-auto text-3xl mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p>help@jackfruitstore.com</p>
              </div>
              <div className="p-6 bg-[#273F4F] rounded-xl backdrop-blur-sm">
                <FiClock className="mx-auto text-3xl mb-4" />
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p>Mon-Fri: 9AM-6PM IST</p>
              </div>
              
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Help;