export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      member: {
        Row: {
          first_name: string
          id: number
          image_url: string | null
          last_name: string | null
          profile_color: string | null
          title: string
        }
        Insert: {
          first_name: string
          id?: number
          image_url?: string | null
          last_name?: string | null
          profile_color?: string | null
          title: string
        }
        Update: {
          first_name?: string
          id?: number
          image_url?: string | null
          last_name?: string | null
          profile_color?: string | null
          title?: string
        }
        Relationships: []
      }
      set: {
        Row: {
          id: number
          name: string
          notes: string | null
          songs: number[] | null
          sort_order: number
          type: Database["public"]["Enums"]["set_type"] | null
        }
        Insert: {
          id?: number
          name: string
          notes?: string | null
          songs?: number[] | null
          sort_order?: number
          type?: Database["public"]["Enums"]["set_type"] | null
        }
        Update: {
          id?: number
          name?: string
          notes?: string | null
          songs?: number[] | null
          sort_order?: number
          type?: Database["public"]["Enums"]["set_type"] | null
        }
        Relationships: []
      }
      setlist: {
        Row: {
          id: number
          name: string
          url: string | null
        }
        Insert: {
          id?: number
          name: string
          url?: string | null
        }
        Update: {
          id?: number
          name?: string
          url?: string | null
        }
        Relationships: []
      }
      show: {
        Row: {
          date: string
          end_time: string
          event: string | null
          fb_url: string | null
          id: number
          start_time: string
          venue: number
        }
        Insert: {
          date: string
          end_time: string
          event?: string | null
          fb_url?: string | null
          id?: number
          start_time: string
          venue: number
        }
        Update: {
          date?: string
          end_time?: string
          event?: string | null
          fb_url?: string | null
          id?: number
          start_time?: string
          venue?: number
        }
        Relationships: [
          {
            foreignKeyName: "show_venue_fkey"
            columns: ["venue"]
            isOneToOne: false
            referencedRelation: "venue"
            referencedColumns: ["id"]
          }
        ]
      }
      song: {
        Row: {
          artist: string
          download_url: string | null
          id: number
          link_url: string | null
          mood: Database["public"]["Enums"]["song_mood"] | null
          specials: string[] | null
          status: Database["public"]["Enums"]["song_status"]
          title: string
          vocal_lead: number | null
        }
        Insert: {
          artist: string
          download_url?: string | null
          id?: number
          link_url?: string | null
          mood?: Database["public"]["Enums"]["song_mood"] | null
          specials?: string[] | null
          status: Database["public"]["Enums"]["song_status"]
          title: string
          vocal_lead?: number | null
        }
        Update: {
          artist?: string
          download_url?: string | null
          id?: number
          link_url?: string | null
          mood?: Database["public"]["Enums"]["song_mood"] | null
          specials?: string[] | null
          status?: Database["public"]["Enums"]["song_status"]
          title?: string
          vocal_lead?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "song_vocal_lead_fkey"
            columns: ["vocal_lead"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["id"]
          }
        ]
      }
      venue: {
        Row: {
          city: string | null
          id: number
          name: string
          state: string | null
          website_url: string | null
        }
        Insert: {
          city?: string | null
          id?: number
          name: string
          state?: string | null
          website_url?: string | null
        }
        Update: {
          city?: string | null
          id?: number
          name?: string
          state?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      set_type: "3h" | "4h" | "Country"
      song_mood: "fast dance" | "slow dance" | "drink" | "singalong"
      song_status:
        | "suggested"
        | "next"
        | "learning"
        | "active"
        | "burner"
        | "killed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
