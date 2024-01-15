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
          description: string | null
          firstName: string
          id: number
          imageUrl: string | null
          isActive: boolean
          lastName: string | null
          title: string
        }
        Insert: {
          description?: string | null
          firstName: string
          id?: number
          imageUrl?: string | null
          isActive?: boolean
          lastName?: string | null
          title: string
        }
        Update: {
          description?: string | null
          firstName?: string
          id?: number
          imageUrl?: string | null
          isActive?: boolean
          lastName?: string | null
          title?: string
        }
        Relationships: []
      }
      set: {
        Row: {
          id: number
          name: string
          notes: string | null
          sortOrder: number
        }
        Insert: {
          id?: number
          name: string
          notes?: string | null
          sortOrder?: number
        }
        Update: {
          id?: number
          name?: string
          notes?: string | null
          sortOrder?: number
        }
        Relationships: []
      }
      set_song: {
        Row: {
          setId: number
          songId: number
          sortOrder: number
        }
        Insert: {
          setId: number
          songId: number
          sortOrder?: number
        }
        Update: {
          setId?: number
          songId?: number
          sortOrder?: number
        }
        Relationships: [
          {
            foreignKeyName: "set_song_setId_fkey"
            columns: ["setId"]
            isOneToOne: false
            referencedRelation: "set"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "set_song_songId_fkey"
            columns: ["songId"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          }
        ]
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
      setlist_set: {
        Row: {
          id: number
          setId: number
          setlistId: number
        }
        Insert: {
          id?: number
          setId: number
          setlistId: number
        }
        Update: {
          id?: number
          setId?: number
          setlistId?: number
        }
        Relationships: [
          {
            foreignKeyName: "setlist_set_setId_fkey"
            columns: ["setId"]
            isOneToOne: false
            referencedRelation: "set"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "setlist_set_setlistId_fkey"
            columns: ["setlistId"]
            isOneToOne: false
            referencedRelation: "setlist"
            referencedColumns: ["id"]
          }
        ]
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
          downloadUrl: string | null
          id: number
          linkUrl: string | null
          status: Database["public"]["Enums"]["song_status"]
          suggestedBy: string | null
          title: string
          vocalLead: number | null
        }
        Insert: {
          artist: string
          downloadUrl?: string | null
          id?: number
          linkUrl?: string | null
          status: Database["public"]["Enums"]["song_status"]
          suggestedBy?: string | null
          title: string
          vocalLead?: number | null
        }
        Update: {
          artist?: string
          downloadUrl?: string | null
          id?: number
          linkUrl?: string | null
          status?: Database["public"]["Enums"]["song_status"]
          suggestedBy?: string | null
          title?: string
          vocalLead?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "song_vocalLead_fkey"
            columns: ["vocalLead"]
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
