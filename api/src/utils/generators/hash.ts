import * as bcrypt from 'bcrypt';

export const generateHash = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
};
