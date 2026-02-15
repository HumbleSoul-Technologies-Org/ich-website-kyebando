import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type InsertTalent, type Talent } from "@/types/schema";
import { useToast } from "@/hooks/use-toast";

// Mock data
const MOCK_TALENTS: Talent[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+254700000001",
    category: "Software Development",
    description: "Full-stack developer with 5 years experience",
    status: "reviewed",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+254700000002",
    category: "Design",
    description: "UX/UI designer specializing in mobile apps",
    status: "pending",
  },
];

export function useTalents() {
  return useQuery<Talent[]>({
    queryKey: ["talents"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_TALENTS;
    },
  });
}

export function useCreateTalent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertTalent) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id: Math.random(), ...data, status: "pending" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talents"] });
      toast({ title: "Success", description: "Talent submission received!" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateTalent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<InsertTalent> & { id: number }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talents"] });
      toast({ title: "Success", description: "Talent updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
