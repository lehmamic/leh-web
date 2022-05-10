export const SETTINGS_COLLECTION = "settings";

export interface Settings {
  title: string;
  description: string;
  coverImageUrl: string;
  baseUrl: string;
  socialMedia: {
    twitter?: string;
    facebook?: string;
  }
}

export const defaultSettings: Settings = {
  title: 'lehmamic blog',
  description: '',
  coverImageUrl: '',
  baseUrl: 'https://blog.lehmamic.ch/',
  socialMedia: {},
};
