import { useState, useEffect } from "react";
import { FiSearch, FiPhone, FiMail, FiClock,FiTruck } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold  text-black mb-6">
            How Can We Help You?
          </h1>
          <div className="max-w-full mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles..."
              className="w-full px-14 py-3 rounded-xl   ring-2 ring-[#273F4F]  bg-white "
              aria-label="Search help center"
            />
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600 text-xl" />
          </div>
        </header>

        <section className="mb-10 border rounded-xl overflow-hidden shadow-lg">
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

        
        <section className="mb-16 px-4">
  <div className="bg-gradient-to-br from-[#3a6a8a] to-[#547792] text-white rounded-3xl p-8 md:p-12 text-center shadow-xl overflow-hidden max-w-[90rem] mx-auto">
    {/* Decorative elements */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full filter blur-3xl"></div>
    </div>
    
    <div className="relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 px-4">Direct Support</h2>
      <p className="mb-8 md:mb-12 text-white/90 max-w-2xl mx-auto text-lg px-4">
        Our jackfruit experts are available 6 days a week to assist with any inquiries
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {/* Phone Support Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all overflow-hidden"
        >
          <div className="bg-[#273F4F] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPhone className="text-2xl text-white" />
          </div>
          <h3 className="font-semibold text-xl mb-3 truncate">Phone Support</h3>
          <p className="text-lg font-medium mb-1 break-words">1-800-JACKFRT</p>
          <p className="text-sm text-white/80 truncate">Mon-Fri: 9AM-6PM IST</p>
        </motion.div>
        
        {/* Email Support Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all overflow-hidden"
        >
          <div className="bg-[#273F4F] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMail className="text-2xl text-white" />
          </div>
          <h3 className="font-semibold text-xl mb-3 truncate">Email Support</h3>
          <p className="text-lg font-medium break-all">help@jackfruitstore.com</p>
          <p className="text-sm text-white/80 mt-2 truncate">24/7 Response</p>
        </motion.div>
        
        {/* Business Hours Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all overflow-hidden"
        >
          <div className="bg-[#273F4F] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiClock className="text-2xl text-white" />
          </div>
          <h3 className="font-semibold text-xl mb-3 truncate">Business Hours</h3>
          <p className="text-lg font-medium mb-1 break-words">Mon-Sat: 9AM-6PM IST</p>
          <p className="text-sm text-white/80 truncate">Closed on Sundays</p>
        </motion.div>
      </div>
    </div>
  </div>
</section>

      </main>
    </div>
  );
};

export default Help;