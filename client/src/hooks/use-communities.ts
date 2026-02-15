import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type InsertCommunity, type Community } from "@/types/schema";
import { useToast } from "@/hooks/use-toast";
import { mockCommunities } from "@/lib/mockData";

// Transform mockCommunities data to Community type
const MOCK_COMMUNITIES: Community[] = mockCommunities.map((community: any) => ({
  id: community.id,
  name: community.community,
  district: community.location?.lat ? `${community.community}, ${community.country}` : community.community,
  description: community.excerpt,
  visitDate: community.date ? new Date(community.date) : undefined,
  status: community.status,
  imageUrl: community.thumbnail,
  community: community.community,
  country: community.country,
  location: community.location,
}));

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
