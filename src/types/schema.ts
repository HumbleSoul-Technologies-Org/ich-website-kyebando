import { z } from "zod";

// === USER TYPES ===
export const insertUserSchema = z.object({
  id: z.number().optional(),
  username: z.string(),
  password: z.string(),
  role: z.string().default("admin"),
});

export type User = z.infer<typeof insertUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// === PROGRAM TYPES ===
export const insertProgramSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  imageUrl: z.string().optional(),
});

export type Program = z.infer<typeof insertProgramSchema> & { id: number };
export type InsertProgram = z.infer<typeof insertProgramSchema>;

// === COMMUNITY TYPES ===
export const insertCommunitySchema = z.object({
  name: z.string(),
  district: z.string(),
  description: z.string(),
  visitDate: z.date().optional(),
  status: z.string().default("upcoming"),
  imageUrl: z.string().optional(),
  community: z.string().optional(),
  country: z.string().optional(),
  location: z.object({
    lat: z.number(),
    long: z.number(),
  }).optional(),
});

export type Community = z.infer<typeof insertCommunitySchema> & { id: number };
export type InsertCommunity = z.infer<typeof insertCommunitySchema>;

// === TALENT TYPES ===
export const insertTalentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  category: z.string(),
  description: z.string(),
  status: z.string().default("pending"),
});

export type Talent = z.infer<typeof insertTalentSchema> & { id: number; createdAt?: Date };
export type InsertTalent = z.infer<typeof insertTalentSchema>;

// === VOLUNTEER TYPES ===
export const insertVolunteerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional(),
  status: z.string().default("pending"),
});

export type Volunteer = z.infer<typeof insertVolunteerSchema> & { id: number; createdAt?: Date };
export type InsertVolunteer = z.infer<typeof insertVolunteerSchema>;

// === BLOG POST TYPES ===
export const insertBlogPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  imageUrl: z.string().optional(),
  authorId: z.number().optional(),
  published: z.boolean().default(true),
});

export type BlogPost = z.infer<typeof insertBlogPostSchema> & { id: number; createdAt?: Date };
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

// === CONTACT TYPES ===
export const insertContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export type Contact = z.infer<typeof insertContactSchema> & { id: number; createdAt?: Date };
export type InsertContact = z.infer<typeof insertContactSchema>;
