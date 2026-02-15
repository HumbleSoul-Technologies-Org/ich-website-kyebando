import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getVisits } from "@/lib/adminApi";

export default function AdminVisitsPage() {
  const [visits, setVisits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getVisits();
      setVisits(data);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading visits...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Visits</h1>
          <p className="text-muted-foreground mt-1">
            Track community visits and engagements
          </p>
        </div>

        {/* Visits Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Visit History</CardTitle>
            <CardDescription>
              {visits.length} visits in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {visits.map((visit, index) => (
                <div key={index} className="flex gap-4 pb-6 border-b last:border-0 last:pb-0">
                  <div className="w-2 h-12 bg-primary rounded-full flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{visit.community}</p>
                        <p className="text-sm text-muted-foreground">
                          {visit.date}
                        </p>
                      </div>
                      <Badge variant={visit.type === "community-visit" ? "default" : "secondary"}>
                        {visit.type === "community-visit" ? "Community Visit" : "Training"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Attendees: {visit.attendees} | Duration: {visit.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
