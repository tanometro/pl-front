"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateLead from "@/components/Leads/CreateLeads";
import readOneSeller from "@/services/requests/readOneSeller";

interface Seller {
  id: string;
  name: string;
  last_name: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const sellerId = searchParams.get("sellerId");
  const [seller, setSeller] = useState<Seller | null | undefined>(null);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const sellerData = await readOneSeller(sellerId);
        setSeller(sellerData);
      } catch (error) {
        console.error("Error al obtener el vendedor:", error);
      }
    };
    fetchSeller();
  }, [sellerId]);
  
  return (
    <div className="pt-24">
      <CreateLead seller_id={sellerId || null || undefined} seller_name={`${seller?.name || ''} ${seller?.last_name || ''}`}/>
    </div>
  );
}
