import { connectToMongoDb } from '@utils/mongodb';
import { defaultSettings, Settings, SETTINGS_COLLECTION } from '@models/settings';

export const getSettings = async (): Promise<Settings> => {
  const { db } = await connectToMongoDb();
  const settings = await db.collection<Settings>(SETTINGS_COLLECTION).find().toArray();

  if (settings.length > 0) {
    return settings[0];
  } {
    return defaultSettings;
  }
}
