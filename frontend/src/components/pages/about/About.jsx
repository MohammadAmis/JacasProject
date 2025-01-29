import { useState } from "react";
import { FaLinkedin, FaTwitter, FaInstagram, FaArrowUp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail, MdPhone } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import jackfruit from '../../../assets/jackfruit_1.jpg';
import CEO from '../../../assets/CEO.jpg';
import CTO from '../../../assets/CTO.jpg';
import Marketing from '../../../assets/Marketing.jpg';

const About = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [showScroll, setShowScroll] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  window.addEventListener('scroll', checkScroll);

  const SocialIcon = ({ icon: Icon, href }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      className="text-gray-600 hover:text-blue-600 transition-colors"
    >
      <Icon className="text-2xl" />
    </motion.a>
  );

  const TeamCard = ({ member }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-80">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{member.name}</h3>
        <p className="text-blue-600 font-medium mb-2">{member.role}</p>
        <p className="text-gray-600">{member.description}</p>
        <div className="flex justify-center gap-4 mt-4">
          <SocialIcon icon={FaLinkedin} />
          <SocialIcon icon={FaTwitter} />
          <SocialIcon icon={FaInstagram} />
        </div>
      </div>
    </motion.div>
  );

  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      description: "John is the visionary behind our company.",
      image: CEO,
    },
    {
      name: "Jane Smith",
      role: "CTO",
      description: "Jane leads our technology and innovation.",
      image: CTO,
    },
    {
      name: "Emily Johnson",
      role: "Marketing Head",
      description: "Emily drives our marketing strategies.",
      image: Marketing,
    },
  ];

  const tabs = {
    company: (
      <motion.div
        key="company"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="space-y-8"
      >
        <h2 className="text-4xl font-bold text-gray-900 text-center">Our Story</h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img
              src={jackfruit}
              alt="Sustainable jackfruit products"
              className="rounded-2xl shadow-xl h-[500px] w-full object-cover"
            />
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              Global Venture is revolutionizing sustainable nutrition through innovative jackfruit-based solutions. 
              Based in Mumbai, we combine traditional wisdom with modern technology to create eco-friendly, 
              nutrient-rich products that promote both personal health and environmental sustainability.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="text-blue-600 font-bold text-2xl">15+</p>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="text-blue-600 font-bold text-2xl">100%</p>
                <p className="text-gray-600">Natural Ingredients</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="text-blue-600 font-bold text-2xl">1M+</p>
                <p className="text-gray-600">Products Sold</p>
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
    ),
    team: (
      <motion.div
        key="team"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 text-center">Leadership Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </motion.div>
    ),
    mission: (
      <motion.div
        key="mission"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <IoLocationSharp className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            To transform global food systems through sustainable innovation, creating plant-based solutions 
            that nourish people while regenerating our planet. We are committed to ethical sourcing, 
            zero-waste production, and empowering local farming communities.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-100 rounded-full">
              <MdEmail className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Core Values</h3>
          </div>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Sustainable & ethical sourcing
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Nutritional excellence
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Environmental stewardship
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Community empowerment
            </li>
          </ul>
        </div>
      </motion.div>
    ),
    contact: (
      <motion.div
        key="contact"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-2 gap-12"
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <IoLocationSharp className="text-2xl text-blue-600 mt-1" />
                <p className="text-gray-700">
                  Building No 93 Ground Floor, Undriya Street (Chauki Mohalla)<br />
                  Nagpada, Mumbai, Maharashtra<br />
                  India 400008
                </p>
              </div>
              <div className="flex items-center gap-4">
                <MdEmail className="text-2xl text-blue-600" />
                <a href="mailto:adimugeera@gmail.com" className="text-gray-700 hover:text-blue-600">
                  adimugeera@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <MdPhone className="text-2xl text-blue-600" />
                <a href="tel:+919555891697" className="text-gray-700 hover:text-blue-600">
                  +91 95558 91697
                </a>
              </div>
            </div>
            <div className="flex gap-6 mt-8">
              <SocialIcon icon={FaLinkedin} />
              <SocialIcon icon={FaTwitter} />
              <SocialIcon icon={FaInstagram} />
            </div>
          </div>
        </div>
      </motion.div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {tabs[activeTab]}
          </motion.div>
        </AnimatePresence>

        {/* Scroll to Top */}
        {showScroll && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
            whileHover={{ scale: 1.1 }}
          >
            <FaArrowUp className="text-xl" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default About;