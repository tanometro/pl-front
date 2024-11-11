"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { FaDollarSign, FaUserTie } from "react-icons/fa";
import { LoansInterface, QuotaInterface } from "@/types/LoansTypes";
import readAllLoans from "@/services/requests/readAllLoans";
import readAllSellers from "@/services/requests/readAllSellers";
import { SellersInterface } from "@/types/SellersTypes";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const DashboardSummary: React.FC = () => {
  const [loans, setLoans] = useState<LoansInterface[]>();
  const [sellers, setSellers] = useState<SellersInterface[]>();

  useEffect(() => {
    const fetchData = async () => {
      setLoans(await readAllLoans());
      setSellers(await readAllSellers());
    };
    fetchData();
  }, []);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  // Verificación de si una cuota está vencida
  const isQuotaOverdue = (quota: QuotaInterface) => {
    const quotaYear = Math.floor(quota.period / 100);
    const quotaMonth = quota.period % 100

    return (
      quotaYear < currentYear ||
      (quotaYear === currentYear && quotaMonth < currentMonth) ||
      (quotaYear === currentYear && quotaMonth === currentMonth && currentDay > 10)
    );
  };

  // Clasificación de préstamos y cálculo de deuda
  const { ownLoans, thirdPartyLoans, overdueLoansAmount } = useMemo(() => {
    let ownLoans = 0;
    let thirdPartyLoans = 0;
    let overdueLoansAmount = 0;
  
    loans?.forEach((loan) => {
      let loanDebt = 0;
      loan.quotas.forEach((quota) => {
        if (isQuotaOverdue(quota) && quota.state === "PENDING") {
          loanDebt += quota.amount; // Solo suma el monto de la cuota si está vencida y pendiente
        }
      });
  
      overdueLoansAmount += loanDebt;
  
      // Clasificación del préstamo (Propio o Tercero)
      if (loan.type === "OWN") {
        ownLoans += loan.amount;
      } else if (loan.type === "THIRD") {
        thirdPartyLoans += loan.amount;
      }
    });
  
    return { ownLoans, thirdPartyLoans, overdueLoansAmount };
  }, [loans]);

  // Cálculo del monto total de préstamos por vendedor
  const sellersRanking = useMemo(() => {
    const ranking: { [key: string]: number } = {};

    loans?.forEach((loan) => {
      const sellerId = loan.client.seller_id;
      if (sellerId) {
        ranking[sellerId] = (ranking[sellerId] || 0) + loan.amount;
      }
    });

    return ranking;
  }, [loans]);

  // Datos para el gráfico de ranking de vendedores
  const rankingData = {
    labels: sellers
      ?.filter((seller) => seller.id in sellersRanking)
      .map((seller) => seller.name),
    datasets: [
      {
        label: "Total Loan Amount",
        data: sellers
          ?.filter((seller) => seller.id in sellersRanking)
          .map((seller) => sellersRanking[seller.id]),
        backgroundColor: "#10B981",
      },
    ],
  };

  // Datos para el gráfico de préstamos (propios vs. de terceros)
  const loansData = {
    labels: ["Own", "Third Party"],
    datasets: [
      {
        data: [ownLoans, thirdPartyLoans],
        backgroundColor: ["#4F46E5", "#F59E0B"],
        hoverBackgroundColor: ["#4338CA", "#D97706"],
      },
    ],
  };

  // Datos para el gráfico de deuda
  const debtData = {
    labels: ["Debt"],
    datasets: [
      {
        label: "Debt Amount",
        data: [overdueLoansAmount],
        backgroundColor: "#EF4444",
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Loan Summary</h2>

      {/* Gráficos de resumen de préstamos y deuda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gráfico de Préstamos (Propios vs. De Terceros) */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Loans</h3>
          <Doughnut data={loansData} />
          <p className="mt-4 text-sm text-gray-500">Own vs. Third Party</p>
        </div>

        {/* Gráfico de Deuda Acumulada */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Debt Amount</h3>
          <FaDollarSign className="text-4xl text-red-500 mb-2" />
          <Bar
            data={debtData}
            options={{ indexAxis: "y", scales: { x: { beginAtZero: true } } }}
          />
          <p className="mt-4 text-sm text-gray-500">Total accumulated debt</p>
        </div>

        {/* Gráfico de Ranking de Vendedores */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Top Sellers</h3>
          <FaUserTie className="text-4xl text-green-500 mb-2" />
          <Bar
            data={rankingData}
            options={{ indexAxis: "x", scales: { y: { beginAtZero: true } } }}
          />
          <p className="mt-4 text-sm text-gray-500">
            Sellers with highest loan amounts
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
