import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCommunities } from "@/lib/adminApi";
import { Plus, MoreHorizontal } from "lucide-react";

export default function AdminCommunitiesPage() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getCommunities();
      setCommunities(data);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading communities...</p>
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
            <h1 className="text-3xl font-bold">Communities</h1>
            <p className="text-muted-foreground mt-1">
              Manage all innovation communities
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Community
          </Button>
        </div>

        {/* Communities Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Communities</CardTitle>
            <CardDescription>
              {communities.length} active communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Location</th>
                    <th className="text-left py-3 px-4 font-semibold">Students</th>
                    <th className="text-left py-3 px-4 font-semibold">Visits</th>
                    <th className="text-left py-3 px-4 font-semibold">Graduates</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {communities.map((community) => (
                    <tr
                      key={community.id}
                      className="border-b border-border hover:bg-secondary transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{community.name}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {community.location}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {community.studentCount}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {community.visitCount}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {community.graduateCount}
                      </td>
                      <td className="py-3 px-4">
                        <button className="p-1 hover:bg-accent rounded">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
