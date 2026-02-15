import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getUsersByRole } from "@/lib/adminApi";
import { Search } from "lucide-react";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getUsersByRole("student");
      setStudents(data);
      setFilteredStudents(data);
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.community.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading students...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground mt-1">
            Manage student enrollments and progress
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name, email, or community..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle>All Students</CardTitle>
            <CardDescription>
              {filteredStudents.length} of {students.length} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {student.community}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{student.program}</Badge>
                    <Badge
                      variant={student.status === "active" ? "default" : "secondary"}
                    >
                      {student.status}
                    </Badge>
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
