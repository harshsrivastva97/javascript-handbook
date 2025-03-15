export interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
}

export interface ProfileSection {
    id: string;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    accentColor?: string;
    description?: string;
  }