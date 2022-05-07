export const SETTINGS_COLLECTION = "settings";

export interface Settings {
  title: string;
  description: string;
  coverImageUrl: string;
}

export const defaultSettings: Settings = {
  title: 'nextjs blog',
  description: '',
  coverImageUrl: '',
};
