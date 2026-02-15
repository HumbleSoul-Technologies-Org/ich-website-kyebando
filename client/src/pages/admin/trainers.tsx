import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUsersByRole } from "@/lib/adminApi";
import { Plus, Mail, Phone } from "lucide-react";

export default function AdminTrainersPage() {
  const [trainers, setTrainers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getUsersByRole("trainer");
      setTrainers(data);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading trainers...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trainers</h1>
            <p className="text-muted-foreground mt-1">
              Manage community trainers and facilitators
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Trainer
          </Button>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{trainer.name}</CardTitle>
                <CardDescription>{trainer.specialization}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{trainer.email}</span>
                  </div>
                  {trainer.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{trainer.phone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Community</p>
                  <p className="text-sm text-muted-foreground">{trainer.community}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Badge variant="default">
                    {trainer.trainingSessions} Sessions
                  </Badge>
                  <Badge variant="outline">{trainer.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
