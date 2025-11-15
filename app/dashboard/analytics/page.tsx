"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building,
  CheckCircle,
  XCircle,
  Trash2,
  LucideIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useDashboardStats,
  useGraphStats,
} from "@/hooks/hotels/useDashboardStats";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: graphData, isLoading: graphLoading } = useGraphStats();

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement des statistiques...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tableau de bord
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Vue ensemble de vos établissements hôteliers
        </p>
      </motion.div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Hôtels"
          value={stats?.total_hotels || 0}
          description="Nombre total d'hôtels enregistrés dans le système"
          icon={Building}
          color="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
        />
        <StatCard
          title="Hôtels Actifs"
          value={stats?.hotels_actifs || 0}
          description="Hôtels actuellement disponibles et fonctionnels"
          icon={CheckCircle}
          color="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
        />
        <StatCard
          title="Hôtels Inactifs"
          value={stats?.hotels_inactifs || 0}
          description="Hôtels temporairement désactivés ou fermés"
          icon={XCircle}
          color="bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300"
        />
        <StatCard
          title="Hôtels Supprimés"
          value={stats?.hotels_supprimes || 0}
          description="Hôtels supprimés du système"
          icon={Trash2}
          color="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
        />
      </div>

      {/* Graphique */}
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <Card className="hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 rounded-2xl">
    <CardHeader>
      <CardTitle className="text-xl font-bold">
        Évolution des créations d’hôtels
      </CardTitle>
    </CardHeader>

    <CardContent className="pt-4">

      {/* 🌀 État de chargement */}
      {graphLoading && (
        <div className="h-80 flex flex-col items-center justify-center text-gray-500 dark:text-gray-300">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
          <p className="mt-4 text-sm">Chargement du graphique...</p>
        </div>
      )}

      {/* ❗ Données vides */}
      {!graphLoading && (!graphData || graphData.length === 0) && (
        <div className="h-80 flex flex-col items-center justify-center text-gray-500 dark:text-gray-300">
          <svg
            className="w-14 h-14 text-gray-400 dark:text-gray-500 mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 13h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-medium">Aucune donnée disponible</p>
          <p className="text-sm text-gray-400 mt-1 text-center max-w-xs">
            Les statistiques apparaîtront ici dès que des hôtels seront ajoutés.
          </p>
        </div>
      )}

      {/* 📊 Graphique */}
      {!graphLoading && graphData && graphData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="4 4" opacity={0.3} />

            <XAxis
              dataKey="mois"
              tick={{ fontSize: 12 }}
              angle={-20}
              tickMargin={10}
            />

            <YAxis tick={{ fontSize: 12 }} />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                padding: "10px 14px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: "bold", color: "#374151" }}
            />

            <Bar
              dataKey="total"
              fill="#3b82f6"
              radius={[12, 12, 0, 0]}
              barSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

    </CardContent>
  </Card>
</motion.div>
    </div>
  );
}
