export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      programs: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          accent_color: string;
          sort: number;
          category: string;
          price: string;
          duration: string;
          next_cohort: string;
          seats_left: number;
          age_min: number | null;
          age_max: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          accent_color?: string;
          sort?: number;
          category?: string;
          price?: string;
          duration?: string;
          next_cohort?: string;
          seats_left?: number;
          age_min?: number | null;
          age_max?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          accent_color?: string;
          sort?: number;
          category?: string;
          price?: string;
          duration?: string;
          next_cohort?: string;
          seats_left?: number;
          age_min?: number | null;
          age_max?: number | null;
          created_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          email: string;
          name: string;
          recommended_program: string;
          answers: Record<string, string>;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string;
          recommended_program: string;
          answers?: Record<string, string>;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          recommended_program?: string;
          answers?: Record<string, string>;
          created_at?: string;
        };
      };
      audiences: {
        Row: {
          id: string;
          title: string;
          tagline: string;
          description: string;
          badge: string;
          bg_color: string;
          cta_label: string;
          sort: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          tagline?: string;
          description: string;
          badge?: string;
          bg_color?: string;
          cta_label?: string;
          sort?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          tagline?: string;
          description?: string;
          badge?: string;
          bg_color?: string;
          cta_label?: string;
          sort?: number;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          name: string;
          initials: string;
          program: string;
          cohort: string;
          sort: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote: string;
          name: string;
          initials?: string;
          program?: string;
          cohort?: string;
          sort?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote?: string;
          name?: string;
          initials?: string;
          program?: string;
          cohort?: string;
          sort?: number;
          created_at?: string;
        };
      };
      companies: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          sort: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          sort?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          sort?: number;
          created_at?: string;
        };
      };
      stats: {
        Row: {
          id: string;
          label: string;
          value: number;
          suffix: string;
          sort: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          value: number;
          suffix?: string;
          sort?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          value?: number;
          suffix?: string;
          sort?: number;
          created_at?: string;
        };
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          sort: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          sort?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          sort?: number;
          created_at?: string;
        };
      };
      steps: {
        Row: {
          id: string;
          num: string;
          title: string;
          description: string;
          sort: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          num: string;
          title: string;
          description: string;
          sort?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          num?: string;
          title?: string;
          description?: string;
          sort?: number;
          created_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          program_slug: string | null;
          full_name: string;
          email: string;
          phone: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          program_slug?: string | null;
          full_name: string;
          email: string;
          phone?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          program_slug?: string | null;
          full_name?: string;
          email?: string;
          phone?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
