
import { useEffect, useState } from "react";
import TradeForm from "../components/TradeForm";
import TradeList from "../components/TradeList";
import CalendarView from "../components/CalendarView";
import { useAuth } from "../context/AuthContext";
import {
  Loader2,
  Lightbulb,
  NotebookPen,
  BarChart4
} from "lucide-react";
import { motion } from "framer-motion";
import globaltrade from "../assets/global-trade.jpg";
import axiosInstance from "../api/axiosInstance";

const Dashboard = () => {
  const { token } = useAuth();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrades = async () => {
    try {
      const res = await axiosInstance.get("/trades", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrades(res.data);
    } catch (err) {
      console.error("Erreur récupération trades :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-6 sm:mb-8 text-center">
            📊 Mon Dashboard
      </h1>

      {/* Formulaire d’ajout */}
      <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg mb-6 sm:mb-8">
        <TradeForm onTradeCreated={fetchTrades} />
      </div>

      {/* Zone 50/50 : TradeList + Conseils */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6 sm:mb-8">
        {/* Liste des trades (gauche) */}
        <div className="w-full lg:w-1/2 bg-white/5 p-4 sm:p-6 rounded-2xl shadow-inner min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-white">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-sky-400" />
              <p className="text-lg">Chargement des trades...</p>
            </div>
          ) : (
            <TradeList trades={trades} onDelete={fetchTrades} token={token} />
          )}
        </div>

        {/* Bloc conseils (droite) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 bg-white rounded-2xl p-4 sm:p-6 shadow-lg"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <NotebookPen className="w-5 h-5 mr-2 text-sky-500" />
            L’importance du journal de trading
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <Lightbulb className="w-5 h-5 text-yellow-500 mt-1 mr-3" />
              <span>
                <strong>Apprends de tes erreurs :</strong> noter tes trades permet d’éviter de les répéter.
              </span>
            </li>
            <li className="flex items-start">
              <BarChart4 className="w-5 h-5 text-green-500 mt-1 mr-3" />
              <span>
                <strong>Analyse tes performances :</strong> tu verras clairement ce qui fonctionne pour toi.
              </span>
            </li>
            <li className="flex items-start">
              <NotebookPen className="w-5 h-5 text-sky-500 mt-1 mr-3" />
              <span>
                <strong>Développe ta discipline :</strong> tenir un journal te rend plus rigoureux et plus pro.
              </span>
            </li>
          </ul>

          <div className="mt-6 text-gray-600 text-sm italic">
            ✨ *Un bon trader est avant tout un bon élève de lui-même.*
          </div>

          {/* Image */}
          <img
            src={globaltrade}
            alt="Illustration journal de trading"
            className="rounded-xl w-full h-auto mt-6 mb-4 shadow-sm transition-transform hover:scale-105"
          />
        </motion.div>
      </div>

      {/* Composant calendar */}
      <div className="bg-white/5 p-4 sm:p-6 rounded-2xl shadow-inner">
        <CalendarView trades={trades} />
      </div>
    </div>
  );
};

export default Dashboard;











































