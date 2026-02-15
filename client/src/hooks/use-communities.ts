import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type InsertCommunity, type Community } from "@/types/schema";
import { useToast } from "@/hooks/use-toast";

// Mock data
const MOCK_COMMUNITIES: Community[] = [
  {
    id: 1,
    name: "Nairobi Tech Hub",
    district: "Westlands",
    description: "A community focused on technology innovation",
    status: "visited",
    imageUrl: undefined,
  },
  {
    id: 2,
    name: "Kisumu Creative Space",
    district: "Kisumu",
    description: "Supporting creative and digital professionals",
    status: "upcoming",
    imageUrl: undefined,
  },
];

export function useCommunities() {
  return useQuery<Community[]>({
    queryKey: ["communities"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_COMMUNITIES;
    },
  });
}

export function useCreateCommunity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertCommunity) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id: Math.random(), ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      toast({ title: "Success", description: "Community added successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteCommunity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return undefined;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      toast({ title: "Success", description: "Community deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
