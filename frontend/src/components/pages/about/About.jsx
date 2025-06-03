import { useState, useEffect } from "react";
import { 
  FaLinkedin, FaTwitter, FaInstagram, FaArrowUp,
  FaBuilding, FaUsers, FaBullseye, FaEnvelope 
} from "react-icons/fa";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const tabIcons = {
    company: <FaBuilding />,
    team: <FaUsers />,
    mission: <FaBullseye />,
    contact: <FaEnvelope />
  };

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
      className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
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
        className="space-y-8 "
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">Our Story</h2>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <img
            src={jackfruit}
            alt="Sustainable jackfruit products"
            className="rounded-2xl h-auto w-full object-cover max-h-[500px]"
          />
          <div className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Global Venture is revolutionizing sustainable nutrition through innovative jackfruit-based solutions. 
              Based in Mumbai, we combine traditional wisdom with modern technology to create eco-friendly, 
              nutrient-rich products that promote both personal health and environmental sustainability.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "15+", label: "Years Experience" },
                { value: "100%", label: "Natural Ingredients" },
                { value: "1M+", label: "Products Sold" }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-xl">
                  <p className="text-blue-600 font-bold text-xl md:text-2xl">{item.value}</p>
                  <p className="text-gray-600 text-sm md:text-base">{item.label}</p>
                </div>
              ))}
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
        className="space-y-8 md:space-y-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {[
          {
            icon: <IoLocationSharp className="text-blue-600 text-2xl" />,
            title: "Our Mission",
            content: (
              <p className="text-gray-700 leading-relaxed">
                To transform global food systems through sustainable innovation, creating plant-based solutions 
                that nourish people while regenerating our planet. We are committed to ethical sourcing, 
                zero-waste production, and empowering local farming communities.
              </p>
            ),
            bg: "bg-blue-100"
          },
          {
            icon: <MdEmail className="text-purple-600 text-2xl" />,
            title: "Core Values",
            content: (
              <ul className="space-y-3 text-gray-700">
                {[
                  "Sustainable & ethical sourcing",
                  "Nutritional excellence",
                  "Environmental stewardship",
                  "Community empowerment"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            ),
            bg: "bg-purple-100"
          }
        ].map((card, index) => (
          <div key={index} className="bg-white p-6 md:p-8 rounded-xl">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className={`p-3 ${card.bg} rounded-full`}>
                {card.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{card.title}</h3>
            </div>
            {card.content}
          </div>
        ))}
      </motion.div>
    ),
    contact: (
      <motion.div
        key="contact"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
      >
        <div className="bg-white p-6 md:p-8 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
          <form className="space-y-4">
            {[
              { label: "Name", type: "text" },
              { label: "Email", type: "email" },
              { label: "Message", type: "textarea" }
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-gray-700 mb-1">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="space-y-6 md:space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">Contact Information</h3>
            <div className="space-y-4">
              {[
                {
                  icon: <IoLocationSharp className="text-2xl text-blue-600 mt-1" />,
                  content: (
                    <p className="text-gray-700">
                      Building No 93 Ground Floor, Undriya Street (Chauki Mohalla)<br />
                      Nagpada, Mumbai, Maharashtra<br />
                      India 400008
                    </p>
                  )
                },
                {
                  icon: <MdEmail className="text-2xl text-blue-600" />,
                  content: (
                    <a href="mailto:adimugeera@gmail.com" className="text-gray-700 hover:text-blue-600">
                      adimugeera@gmail.com
                    </a>
                  )
                },
                {
                  icon: <MdPhone className="text-2xl text-blue-600" />,
                  content: (
                    <a href="tel:+919555891697" className="text-gray-700 hover:text-blue-600">
                      +91 95558 91697
                    </a>
                  )
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  {item.icon}
                  {item.content}
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-6 md:mt-8">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          {Object.entries(tabs).map(([tabKey]) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tabKey
                  ? 'bg-[#273F4F] text-white'
                  : 'bg-white text-[#273F4F] ring-1 ring-[#273F4F] '
              } ${isMobile ? 'text-xl p-3' : 'px-6 py-3'}`}
              aria-label={tabKey}
            >
              {isMobile ? tabIcons[tabKey] : tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
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
            className="bg-[#547792] rounded-xl p-6 md:p-8"
          >
            {tabs[activeTab]}
          </motion.div>
        </AnimatePresence>

        {/* Scroll to Top */}
        <AnimatePresence>
          {showScroll && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50"
              whileHover={{ scale: 1.1 }}
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-xl" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default About;