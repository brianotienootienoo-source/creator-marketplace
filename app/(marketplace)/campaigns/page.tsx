import Link from "next/link";
import { mockCampaigns } from "@/app/lib/marketplace/mock/mockCampaigns";

export default function CampaignsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Brand Campaigns
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCampaigns.map((campaign) => (
          <Link
            key={campaign.id}
            href={`/campaigns/${campaign.id}`}
            className="border rounded-lg p-4 hover:shadow-md transition bg-white"
          >
            <h2 className="font-semibold">
              {campaign.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {campaign.brandId}
            </p>

            <p className="text-xs mt-2">
              Budget: {campaign.budget}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Deadline: {campaign.deadline}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}