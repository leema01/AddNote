export interface Notes {
  id: number;
  title: string;
  content: string;
  reminderDate?: Date | null;
  category?: string;
  priority?: string;
  editing?: boolean; // added property

}
