"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateLead from "@/components/Leads/CreateLeads";
import readOneSeller from "@/services/requests/readOneSeller";

export const dynamic = 'force-dynamic';

interface Seller {
  id: string;
  name: string;
  last_name: string;
}

function SellerComponent({ sellerId }: { sellerId: string | null }) {
  const [seller, setSeller] = useState<Seller | null | undefined>(null);

  useEffect(() => {
    const fetchSeller = async () => {
      if (sellerId) {
        try {
          const sellerData = await readOneSeller(sellerId);
          setSeller(sellerData);
        } catch (error) {
          console.error("Error fetching seller:", error);
        }
      }
    };
    fetchSeller();
  }, [sellerId]);

  return (
    <CreateLead
      seller_id={sellerId || undefined}
      seller_name={`${seller?.name || ''} ${seller?.last_name || ''}`}
    />
  );
}

export default function Home() {
  const searchParams = useSearchParams();
  const sellerId = searchParams.get("sellerId");

  return (
    <div className="pt-24">
      <SellerComponent sellerId={sellerId} />
    </div>
  );
}
