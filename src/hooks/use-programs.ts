import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type InsertProgram, type Program } from "@/types/schema";
import { useToast } from "@/hooks/use-toast";

// Mock data
const MOCK_PROGRAMS: Program[] = [
  {
    id: 1,
    title: "Digital Skills Training",
    description: "Learn essential digital skills for the modern workplace",
    category: "Digital Skills",
    imageUrl: undefined,
  },
  {
    id: 2,
    title: "Entrepreneurship Workshop",
    description: "Start your own business with expert guidance",
    category: "Entrepreneurship",
    imageUrl: undefined,
  },
];

export function usePrograms() {
  return useQuery<Program[]>({
    queryKey: ["programs"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_PROGRAMS;
    },
  });
}

export function useProgram(id: number) {
  return useQuery<Program>({
    queryKey: ["program", id],
    enabled: !!id,
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      return MOCK_PROGRAMS.find(p => p.id === id) || MOCK_PROGRAMS[0];
    }
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertProgram) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id: Math.random(), ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      toast({ title: "Success", description: "Program created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateProgram() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<InsertProgram> & { id: number }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      toast({ title: "Success", description: "Program updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return undefined;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      toast({ title: "Success", description: "Program deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
