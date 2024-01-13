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
      band_member: {
        Row: {
          description: string | null;
          id: number;
          image_url: string | null;
          is_active: boolean;
          name: string;
          title: string;
        };
        Insert: {
          description?: string | null;
          id?: number;
          image_url?: string | null;
          is_active?: boolean;
          name: string;
          title: string;
        };
        Update: {
          description?: string | null;
          id?: number;
          image_url?: string | null;
          is_active?: boolean;
          name?: string;
          title?: string;
        };
        Relationships: [];
      };
      lead_vocal: {
        Row: {
          band_member: number | null;
          id: number;
          set: number | null;
          song: number | null;
        };
        Insert: {
          band_member?: number | null;
          id?: number;
          set?: number | null;
          song?: number | null;
        };
        Update: {
          band_member?: number | null;
          id?: number;
          set?: number | null;
          song?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "lead_vocal_band_member_fkey";
            columns: ["band_member"];
            isOneToOne: false;
            referencedRelation: "band_member";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_vocal_set_fkey";
            columns: ["set"];
            isOneToOne: false;
            referencedRelation: "set";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_vocal_song_fkey";
            columns: ["song"];
            isOneToOne: false;
            referencedRelation: "song";
            referencedColumns: ["id"];
          },
        ];
      };
      set: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      set_song: {
        Row: {
          id: number;
          set: number | null;
          song: number | null;
        };
        Insert: {
          id?: number;
          set?: number | null;
          song?: number | null;
        };
        Update: {
          id?: number;
          set?: number | null;
          song?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "set_song_set_fkey";
            columns: ["set"];
            isOneToOne: false;
            referencedRelation: "set";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "set_song_song_fkey";
            columns: ["song"];
            isOneToOne: false;
            referencedRelation: "song";
            referencedColumns: ["id"];
          },
        ];
      };
      setlist: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      show: {
        Row: {
          date: string;
          end_time: string;
          event: string | null;
          fb_url: string | null;
          id: number;
          start_time: string;
          venue: number;
        };
        Insert: {
          date: string;
          end_time: string;
          event?: string | null;
          fb_url?: string | null;
          id?: number;
          start_time: string;
          venue: number;
        };
        Update: {
          date?: string;
          end_time?: string;
          event?: string | null;
          fb_url?: string | null;
          id?: number;
          start_time?: string;
          venue?: number;
        };
        Relationships: [
          {
            foreignKeyName: "show_venue_fkey";
            columns: ["venue"];
            isOneToOne: false;
            referencedRelation: "venue";
            referencedColumns: ["id"];
          },
        ];
      };
      song: {
        Row: {
          artist: string;
          downloadUrl: string | null;
          id: number;
          linkUrl: string | null;
          status: Database["public"]["Enums"]["song_status"];
          suggested_by: number | null;
          title: string;
        };
        Insert: {
          artist: string;
          downloadUrl?: string | null;
          id?: number;
          linkUrl?: string | null;
          status?: Database["public"]["Enums"]["song_status"];
          suggested_by?: number | null;
          title: string;
        };
        Update: {
          artist?: string;
          downloadUrl?: string | null;
          id?: number;
          linkUrl?: string | null;
          status?: Database["public"]["Enums"]["song_status"];
          suggested_by?: number | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "song_suggested_by_fkey";
            columns: ["suggested_by"];
            isOneToOne: false;
            referencedRelation: "band_member";
            referencedColumns: ["id"];
          },
        ];
      };
      venue: {
        Row: {
          city: string | null;
          id: number;
          name: string;
          state: string | null;
          website_url: string | null;
        };
        Insert: {
          city?: string | null;
          id?: number;
          name: string;
          state?: string | null;
          website_url?: string | null;
        };
        Update: {
          city?: string | null;
          id?: number;
          name?: string;
          state?: string | null;
          website_url?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      song_status:
        | "suggested"
        | "next"
        | "learning"
        | "learned"
        | "burner"
        | "killed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
