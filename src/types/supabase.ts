Need to install the following packages:
supabase@2.12.1
Ok to proceed? (y) 

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      contact: {
        Row: {
          email: string | null
          fb_url: string | null
          id: number
          name: string
          phone: string | null
        }
        Insert: {
          email?: string | null
          fb_url?: string | null
          id?: number
          name: string
          phone?: string | null
        }
        Update: {
          email?: string | null
          fb_url?: string | null
          id?: number
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      member: {
        Row: {
          first_name: string
          id: number
          image_url: string | null
          last_name: string | null
          permission_level: string | null
          phone: string | null
          profile_color: string | null
          sort_order: number | null
          title: string
          user_id: string | null
        }
        Insert: {
          first_name: string
          id?: number
          image_url?: string | null
          last_name?: string | null
          permission_level?: string | null
          phone?: string | null
          profile_color?: string | null
          sort_order?: number | null
          title: string
          user_id?: string | null
        }
        Update: {
          first_name?: string
          id?: number
          image_url?: string | null
          last_name?: string | null
          permission_level?: string | null
          phone?: string | null
          profile_color?: string | null
          sort_order?: number | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      rehearsal: {
        Row: {
          date: string
          id: number
          new_songs: number[] | null
          notes: string | null
          review_songs: number[] | null
          start_time: string | null
        }
        Insert: {
          date: string
          id?: number
          new_songs?: number[] | null
          notes?: string | null
          review_songs?: number[] | null
          start_time?: string | null
        }
        Update: {
          date?: string
          id?: number
          new_songs?: number[] | null
          notes?: string | null
          review_songs?: number[] | null
          start_time?: string | null
        }
        Relationships: []
      }
      set: {
        Row: {
          id: number
          songs: number[] | null
        }
        Insert: {
          id?: number
          songs?: number[] | null
        }
        Update: {
          id?: number
          songs?: number[] | null
        }
        Relationships: []
      }
      setlist: {
        Row: {
          id: number
          name: string
          sets: number[] | null
          url: string | null
        }
        Insert: {
          id?: number
          name: string
          sets?: number[] | null
          url?: string | null
        }
        Update: {
          id?: number
          name?: string
          sets?: number[] | null
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
          },
        ]
      }
      show_images: {
        Row: {
          caption: string | null
          created_at: string
          id: number
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: number
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: number
          url?: string
        }
        Relationships: []
      }
      show_videos: {
        Row: {
          created_at: string
          id: number
          sort_order: number | null
          title: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          sort_order?: number | null
          title: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          sort_order?: number | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          about_main_text: string
          contact_main_text: string
          id: number
          show_next_year: boolean
        }
        Insert: {
          about_main_text?: string
          contact_main_text?: string
          id?: number
          show_next_year?: boolean
        }
        Update: {
          about_main_text?: string
          contact_main_text?: string
          id?: number
          show_next_year?: boolean
        }
        Relationships: []
      }
      song: {
        Row: {
          artist: string
          download_url: string | null
          id: number
          is_highlighted: boolean
          length: number | null
          link_url: string | null
          specials: string[] | null
          status: Database["public"]["Enums"]["song_status"]
          title: string
          vocal_lead: number | null
          vocal_second: number | null
          vocal_third: number | null
        }
        Insert: {
          artist: string
          download_url?: string | null
          id?: number
          is_highlighted?: boolean
          length?: number | null
          link_url?: string | null
          specials?: string[] | null
          status: Database["public"]["Enums"]["song_status"]
          title: string
          vocal_lead?: number | null
          vocal_second?: number | null
          vocal_third?: number | null
        }
        Update: {
          artist?: string
          download_url?: string | null
          id?: number
          is_highlighted?: boolean
          length?: number | null
          link_url?: string | null
          specials?: string[] | null
          status?: Database["public"]["Enums"]["song_status"]
          title?: string
          vocal_lead?: number | null
          vocal_second?: number | null
          vocal_third?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "song_vocal_lead_fkey"
            columns: ["vocal_lead"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_vocal_second_fkey"
            columns: ["vocal_second"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_vocal_third_fkey"
            columns: ["vocal_third"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["id"]
          },
        ]
      }
      venue: {
        Row: {
          address: string | null
          city: string | null
          contact: number | null
          id: number
          is_private: boolean
          name: string
          phone: string | null
          serves_food: boolean
          state: string | null
          website_url: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          contact?: number | null
          id?: number
          is_private?: boolean
          name: string
          phone?: string | null
          serves_food?: boolean
          state?: string | null
          website_url?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          contact?: number | null
          id?: number
          is_private?: boolean
          name?: string
          phone?: string | null
          serves_food?: boolean
          state?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venue_contact_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      song_status: "suggested" | "learning" | "burner" | "active" | "killed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
