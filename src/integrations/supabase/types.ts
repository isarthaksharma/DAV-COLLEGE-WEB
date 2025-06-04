export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      academic_toppers: {
        Row: {
          achievement: string
          course: string
          created_at: string | null
          id: number
          image: string | null
          name: string
          percentage: number | null
          year: string
        }
        Insert: {
          achievement: string
          course: string
          created_at?: string | null
          id?: number
          image?: string | null
          name: string
          percentage?: number | null
          year: string
        }
        Update: {
          achievement?: string
          course?: string
          created_at?: string | null
          id?: number
          image?: string | null
          name?: string
          percentage?: number | null
          year?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          achieved_at: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_highlighted: boolean | null
          student_name: string | null
          title: string
          year: number | null
        }
        Insert: {
          achieved_at?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_highlighted?: boolean | null
          student_name?: string | null
          title: string
          year?: number | null
        }
        Update: {
          achieved_at?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_highlighted?: boolean | null
          student_name?: string | null
          title?: string
          year?: number | null
        }
        Relationships: []
      }
      admin_credentials: {
        Row: {
          created_at: string | null
          email: string
          id: number
          password: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          password: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          password?: string
        }
        Relationships: []
      }
      admins: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
          password: string
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          name: string
          password: string
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          name?: string
          password?: string
          username?: string
        }
        Relationships: []
      }
      admission_applications: {
        Row: {
          address: string | null
          course_id: number | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          guardian_name: string | null
          guardian_phone: string | null
          id: string
          name: string
          phone: string | null
          roll_number: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          course_id?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          name: string
          phone?: string | null
          roll_number?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          course_id?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          name?: string
          phone?: string | null
          roll_number?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admission_applications_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          address: string
          created_at: string | null
          date_of_birth: string
          email: string
          full_name: string
          id: number
          phone: string
          previous_education: string | null
          program_id: number | null
          sports_details: string | null
          sports_player: boolean | null
          status: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          date_of_birth: string
          email: string
          full_name: string
          id?: number
          phone: string
          previous_education?: string | null
          program_id?: number | null
          sports_details?: string | null
          sports_player?: boolean | null
          status?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          date_of_birth?: string
          email?: string
          full_name?: string
          id?: number
          phone?: string
          previous_education?: string | null
          program_id?: number | null
          sports_details?: string | null
          sports_player?: boolean | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      campus_visit_requests: {
        Row: {
          address: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          purpose: string
          visit_date: string
          visit_time: string
        }
        Insert: {
          address: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          purpose: string
          visit_date: string
          visit_time: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          purpose?: string
          visit_date?: string
          visit_time?: string
        }
        Relationships: []
      }
      campus_visits: {
        Row: {
          created_at: string | null
          email: string
          id: number
          phone: string
          purpose: string | null
          status: string | null
          visit_date: string
          visitor_name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          phone: string
          purpose?: string | null
          status?: string | null
          visit_date: string
          visitor_name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          phone?: string
          purpose?: string | null
          status?: string | null
          visit_date?: string
          visitor_name?: string
        }
        Relationships: []
      }
      chatbot_messages: {
        Row: {
          created_at: string | null
          id: string
          is_bot: boolean
          message: string
          session_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_bot?: boolean
          message: string
          session_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_bot?: boolean
          message?: string
          session_id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          reason?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string | null
          email: string
          id: number
          message: string
          name: string
          status: string | null
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          message: string
          name: string
          status?: string | null
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          message?: string
          name?: string
          status?: string | null
          subject?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          code: string
          created_at: string | null
          department: Database["public"]["Enums"]["department"]
          description: string | null
          duration: string
          eligibility: string | null
          id: number
          title: string
          type: Database["public"]["Enums"]["course_type"]
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          department: Database["public"]["Enums"]["department"]
          description?: string | null
          duration: string
          eligibility?: string | null
          id?: number
          title: string
          type: Database["public"]["Enums"]["course_type"]
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          department?: Database["public"]["Enums"]["department"]
          description?: string | null
          duration?: string
          eligibility?: string | null
          id?: number
          title?: string
          type?: Database["public"]["Enums"]["course_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      educational_tours: {
        Row: {
          created_at: string | null
          date: string
          description: string | null
          id: number
          image: string | null
          location: string
          title: string
        }
        Insert: {
          created_at?: string | null
          date: string
          description?: string | null
          id?: number
          image?: string | null
          location: string
          title: string
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string | null
          id?: number
          image?: string | null
          location?: string
          title?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          category: Database["public"]["Enums"]["event_category"]
          created_at: string | null
          date: string
          description: string | null
          end_date: string | null
          featured: boolean | null
          id: number
          image: string | null
          location: string | null
          registration_open: boolean | null
          time: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["event_category"]
          created_at?: string | null
          date: string
          description?: string | null
          end_date?: string | null
          featured?: boolean | null
          id?: number
          image?: string | null
          location?: string | null
          registration_open?: boolean | null
          time?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["event_category"]
          created_at?: string | null
          date?: string
          description?: string | null
          end_date?: string | null
          featured?: boolean | null
          id?: number
          image?: string | null
          location?: string | null
          registration_open?: boolean | null
          time?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      faculty: {
        Row: {
          bio: string | null
          created_at: string | null
          department: Database["public"]["Enums"]["department"]
          designation: string
          email: string | null
          experience: string
          id: number
          image: string | null
          image_url: string | null
          is_active: boolean | null
          name: string
          phone: string | null
          position: string | null
          qualification: string
          research_interests: string | null
          specialization: string | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          department: Database["public"]["Enums"]["department"]
          designation: string
          email?: string | null
          experience: string
          id?: number
          image?: string | null
          image_url?: string | null
          is_active?: boolean | null
          name: string
          phone?: string | null
          position?: string | null
          qualification: string
          research_interests?: string | null
          specialization?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          department?: Database["public"]["Enums"]["department"]
          designation?: string
          email?: string | null
          experience?: string
          id?: number
          image?: string | null
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          phone?: string | null
          position?: string | null
          qualification?: string
          research_interests?: string | null
          specialization?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "faculty_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_submissions: {
        Row: {
          created_at: string
          email: string
          feedback: string
          id: string
          name: string
          phone: string
          rating: number
        }
        Insert: {
          created_at?: string
          email: string
          feedback: string
          id?: string
          name: string
          phone: string
          rating: number
        }
        Update: {
          created_at?: string
          email?: string
          feedback?: string
          id?: string
          name?: string
          phone?: string
          rating?: number
        }
        Relationships: []
      }
      internships: {
        Row: {
          company: string
          created_at: string | null
          department: string
          duration: string
          id: number
          image: string | null
          role: string
          student_count: number | null
          year: string
        }
        Insert: {
          company: string
          created_at?: string | null
          department: string
          duration: string
          id?: number
          image?: string | null
          role: string
          student_count?: number | null
          year: string
        }
        Update: {
          company?: string
          created_at?: string | null
          department?: string
          duration?: string
          id?: number
          image?: string | null
          role?: string
          student_count?: number | null
          year?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          id: number
          image: string | null
          image_url: string | null
          is_published: boolean | null
          publish_date: string | null
          published_at: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: number
          image?: string | null
          image_url?: string | null
          is_published?: boolean | null
          publish_date?: string | null
          published_at?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: number
          image?: string | null
          image_url?: string | null
          is_published?: boolean | null
          publish_date?: string | null
          published_at?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter: {
        Row: {
          email: string
          id: number
        }
        Insert: {
          email: string
          id?: number
        }
        Update: {
          email?: string
          id?: number
        }
        Relationships: []
      }
      notices: {
        Row: {
          content: string
          created_at: string | null
          expiry_date: string | null
          id: number
          important: boolean | null
          publish_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          expiry_date?: string | null
          id?: number
          important?: boolean | null
          publish_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          expiry_date?: string | null
          id?: number
          important?: boolean | null
          publish_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      placement_stats: {
        Row: {
          average_package: string | null
          company: string
          created_at: string | null
          department: string
          highest_package: string | null
          id: number
          image: string | null
          students_placed: number
          year: string
        }
        Insert: {
          average_package?: string | null
          company: string
          created_at?: string | null
          department: string
          highest_package?: string | null
          id?: number
          image?: string | null
          students_placed: number
          year: string
        }
        Update: {
          average_package?: string | null
          company?: string
          created_at?: string | null
          department?: string
          highest_package?: string | null
          id?: number
          image?: string | null
          students_placed?: number
          year?: string
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string | null
          degree_type: string | null
          department: string | null
          description: string | null
          duration: string
          eligibility: string | null
          fees: number | null
          id: number
          is_active: boolean | null
          name: string
          type: string
        }
        Insert: {
          created_at?: string | null
          degree_type?: string | null
          department?: string | null
          description?: string | null
          duration: string
          eligibility?: string | null
          fees?: number | null
          id?: number
          is_active?: boolean | null
          name: string
          type: string
        }
        Update: {
          created_at?: string | null
          degree_type?: string | null
          department?: string | null
          description?: string | null
          duration?: string
          eligibility?: string | null
          fees?: number | null
          id?: number
          is_active?: boolean | null
          name?: string
          type?: string
        }
        Relationships: []
      }
      scholarship_applications: {
        Row: {
          course_id: number | null
          created_at: string
          current_education: string
          email: string
          family_income: string
          id: string
          is_sports_player: boolean | null
          name: string
          phone: string
          reason_for_scholarship: string
          sports_level: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          current_education: string
          email: string
          family_income: string
          id?: string
          is_sports_player?: boolean | null
          name: string
          phone: string
          reason_for_scholarship: string
          sports_level?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          current_education?: string
          email?: string
          family_income?: string
          id?: string
          is_sports_player?: boolean | null
          name?: string
          phone?: string
          reason_for_scholarship?: string
          sports_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scholarship_applications_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarships: {
        Row: {
          amount: number | null
          created_at: string | null
          deadline: string | null
          description: string | null
          eligibility: string | null
          id: number
          is_active: boolean | null
          name: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          id?: number
          is_active?: boolean | null
          name: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          admission_year: number | null
          course_id: number | null
          created_at: string | null
          date_of_birth: string | null
          guardian_name: string | null
          guardian_phone: string | null
          id: number
          phone: string | null
          roll_number: string | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          address?: string | null
          admission_year?: number | null
          course_id?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: number
          phone?: string | null
          roll_number?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          address?: string | null
          admission_year?: number | null
          course_id?: number | null
          created_at?: string | null
          date_of_birth?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: number
          phone?: string | null
          roll_number?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "students_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_achievers: {
        Row: {
          created_at: string | null
          id: number
          image: string | null
          name: string
          position: string
          sport: string
          tournament: string
          year: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          image?: string | null
          name: string
          position: string
          sport: string
          tournament: string
          year: string
        }
        Update: {
          created_at?: string | null
          id?: number
          image?: string | null
          name?: string
          position?: string
          sport?: string
          tournament?: string
          year?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string | null
          email: string
          id: number
          name: string
          password: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          email: string
          id?: number
          name: string
          password: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          email?: string
          id?: number
          name?: string
          password?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_credentials: {
        Args: { p_email: string; p_password: string }
        Returns: Json
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      course_type: "undergraduate" | "postgraduate" | "diploma" | "certificate"
      department:
        | "Science"
        | "Arts & Humanities"
        | "Commerce"
        | "Computer Science"
      event_category: "cultural" | "academic" | "sports" | "career" | "alumni"
      user_role: "admin" | "faculty" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      course_type: ["undergraduate", "postgraduate", "diploma", "certificate"],
      department: [
        "Science",
        "Arts & Humanities",
        "Commerce",
        "Computer Science",
      ],
      event_category: ["cultural", "academic", "sports", "career", "alumni"],
      user_role: ["admin", "faculty", "student"],
    },
  },
} as const
