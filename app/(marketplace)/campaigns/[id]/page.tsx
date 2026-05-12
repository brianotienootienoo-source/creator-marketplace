import { mockCampaigns } from "@/app/lib/marketplace/mock/mockCampaigns";

export default function CampaignPage({
  params,
}: {
  params: { id: string };
}) {
  const campaign = mockCampaigns.find(
    (c) => c.id === params.id
  );

  if (!campaign) {
    return <div className="p-6">Campaign not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">
        {campaign.title}
      </h1>

      <p className="text-gray-500 mt-1">
        Brand: {campaign.brandId}
      </p>

      <div className="mt-6">
        <h2 className="font-semibold">Brief</h2>
        <p className="text-sm mt-2">
          {campaign.deliverables}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Budget</h2>
        <p>{campaign.budget}</p>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Deadline</h2>
        <p>{campaign.deadline}</p>
      </div>
    </div>
  );
}