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
      bullet_techs: {
        Row: {
          bullet_id: string | null
          id: string
          tech_id: string | null
        }
        Insert: {
          bullet_id?: string | null
          id?: string
          tech_id?: string | null
        }
        Update: {
          bullet_id?: string | null
          id?: string
          tech_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bullet_techs_bullet_id_fkey"
            columns: ["bullet_id"]
            isOneToOne: false
            referencedRelation: "project_bullets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bullet_techs_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "technologies"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          email: string | null
          id: string
          username: string | null
        }
        Insert: {
          avatar?: string | null
          email?: string | null
          id: string
          username?: string | null
        }
        Update: {
          avatar?: string | null
          email?: string | null
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      project_bullets: {
        Row: {
          action_verb: string
          benefit: string
          challenge: string | null
          content: string
          feature: string
          id: string
          learned: string | null
          next: string | null
          project_id: string | null
          result: string | null
          solution: string | null
        }
        Insert: {
          action_verb: string
          benefit: string
          challenge?: string | null
          content: string
          feature: string
          id?: string
          learned?: string | null
          next?: string | null
          project_id?: string | null
          result?: string | null
          solution?: string | null
        }
        Update: {
          action_verb?: string
          benefit?: string
          challenge?: string | null
          content?: string
          feature?: string
          id?: string
          learned?: string | null
          next?: string | null
          project_id?: string | null
          result?: string | null
          solution?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_bullets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      project_images: {
        Row: {
          id: string
          project_id: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          id?: string
          project_id?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      project_urls: {
        Row: {
          github: string | null
          id: string
          live: string | null
          project_id: string | null
        }
        Insert: {
          github?: string | null
          id?: string
          live?: string | null
          project_id?: string | null
        }
        Update: {
          github?: string | null
          id?: string
          live?: string | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_urls_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          description: string | null
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      tech_references: {
        Row: {
          id: string
          technology_id: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          id?: string
          technology_id?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          technology_id?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tech_references_technology_id_fkey"
            columns: ["technology_id"]
            isOneToOne: false
            referencedRelation: "technologies"
            referencedColumns: ["id"]
          }
        ]
      }
      technologies: {
        Row: {
          category: string | null
          description: string | null
          icon: string | null
          id: string
          name: string | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          category?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string | null
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
      [_ in never]: never
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
