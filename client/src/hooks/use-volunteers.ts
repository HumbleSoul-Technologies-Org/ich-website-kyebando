import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type InsertVolunteer, type Volunteer } from "@/types/schema";
import { useToast } from "@/hooks/use-toast";

// Mock data
const MOCK_VOLUNTEERS: Volunteer[] = [
  {
    id: 1,
    name: "Carol Davis",
    email: "carol@example.com",
    phone: "+254700000003",
    role: "Volunteer",
    message: "Passionate about community development",
    status: "pending",
  },
  {
    id: 2,
    name: "David Wilson",
    email: "david@example.com",
    phone: "+254700000004",
    role: "Partner",
    message: "Looking to collaborate on tech initiatives",
    status: "pending",
  },
];

export function useVolunteers() {
  return useQuery<Volunteer[]>({
    queryKey: ["volunteers"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_VOLUNTEERS;
    },
  });
}

export function useCreateVolunteer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertVolunteer) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id: Math.random(), ...data, status: "pending" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
      toast({ title: "Success", description: "Application received! We'll be in touch." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateVolunteer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<InsertVolunteer> & { id: number }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
      toast({ title: "Success", description: "Volunteer updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
