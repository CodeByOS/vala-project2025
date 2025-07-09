import { motion } from 'framer-motion'
import { FaChartLine, FaLightbulb, FaUserShield } from 'react-icons/fa'
import { MdGroups } from 'react-icons/md'
import { Link } from 'react-router-dom'
import statsImage from '../assets/about-stats.jpg'
import notesImage from '../assets/about-notes.jpg'

export default function About() {
  return (
    <div className="px-6 md:px-20 py-16 bg-white text-gray-800">
      {/* Section Héros */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">À propos de notre plateforme</h1>
        <p className="text-lg md:text-xl text-gray-600">
          Un journal de trading moderne, conçu pour les traders sérieux qui veulent évoluer.
        </p>
      </motion.div>

      {/* Section Images */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 mb-20"
      >
        <img src={statsImage} alt="Tableau des statistiques" className="rounded-xl shadow-lg w-full object-cover h-[300px]" />
        <img src={notesImage} alt="Notes de trading" className="rounded-xl shadow-lg w-full object-cover h-[300px]" />
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">Notre mission</h2>
        <p className="text-gray-600 leading-relaxed">
          Vous aider à transformer chaque trade en opportunité d’apprentissage. Grâce à des statistiques détaillées,
          des notes structurées et un suivi intelligent — notre plateforme est pensée pour soutenir votre progression, jour après jour.
        </p>
      </motion.div>

      {/* Fonctionnalités principales */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 mb-16"
      >
        <Feature
          icon={<FaChartLine className="text-blue-600 text-3xl" />}
          title="Statistiques avancées"
          text="Analysez vos performances par stratégie, session ou plage horaire. Prenez de meilleures décisions grâce à des insights clairs."
        />
        <Feature
          icon={<FaLightbulb className="text-yellow-500 text-3xl" />}
          title="Notes & Objectifs"
          text="Notez vos réflexions, leçons et objectifs. Écrire permet d’améliorer et de mieux se préparer."
        />
        <Feature
          icon={<FaUserShield className="text-green-600 text-3xl" />}
          title="Sécurisé & Privé"
          text="Vos données vous appartiennent. Elles sont chiffrées et protégées selon les normes de sécurité les plus modernes."
        />
        <Feature
          icon={<MdGroups className="text-purple-600 text-3xl" />}
          title="Communauté & Support"
          text="Un espace pour échanger, apprendre et évoluer avec d'autres traders qui partagent votre mentalité."
        />
      </motion.div>

      {/* Valeurs */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-20 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">Nos valeurs fondamentales</h2>
        <ul className="list-disc text-left inline-block text-gray-600 space-y-2 pl-6">
          <li>Transparence et honnêteté dans les performances</li>
          <li>Discipline et régularité dans le journaling</li>
          <li>Amélioration continue, trade après trade</li>
          <li>Communauté solidaire et ambitieuse</li>
        </ul>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-lg mb-4">Prêt à passer au niveau supérieur ?</p>
        <Link
          to="/signup"
          className="relative inline-block px-8 py-3 font-semibold rounded-full 
          bg-gradient-to-r from-pink-500 to-sky-500 shadow-lg transform transition-all duration-300
          hover:scale-105 hover:shadow-xl hover:text-black
          before:absolute before:inset-0 before:rounded-full
          before:bg-gradient-to-r before:from-pink-400 before:to-sky-400 before:opacity-0 
          hover:before:opacity-30 before:transition before:duration-300"
        >
          Créer un compte gratuitement 🚀
        </Link>
      </motion.div>
    </div>
  )
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start space-x-4">
      <div>{icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  )
}
