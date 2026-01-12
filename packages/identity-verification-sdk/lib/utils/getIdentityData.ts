import type { Address, IdentityData } from '../types';

interface GetIdentityDataParams {
  selfieUrl: string;
  phone: string;
  address: Address;
}

/**
 * Generates a verification score with weighted randomization
 * - Scores below 50 occur 30% of the time (failed verification)
 * - Scores 50 and above occur 70% of the time (successful verification)
 */
const generateVerificationScore = (): number => {
  const random = Math.random();

  if (random < 0.3) {
    // 30% chance: Failed verification (0-49)
    return Math.floor(Math.random() * 50);
  } else {
    // 70% chance: Successful verification (50-100)
    return Math.floor(Math.random() * 51) + 50;
  }
};

/**
 * Collects all captured identity data and returns structured identity object with verification result
 *
 * @param params - Object containing selfieUrl, phone, and address
 * @returns Promise resolving to IdentityData with verification score and status
 */
export const getIdentityData = async (params: GetIdentityDataParams): Promise<IdentityData> => {
  const { selfieUrl, phone, address } = params;

  // Simulate async verification process
  await new Promise(resolve => setTimeout(resolve, 1000));

  const score = generateVerificationScore();
  const status = score >= 50 ? 'verified' : 'failed';

  return {
    selfieUrl,
    phone,
    address,
    score,
    status,
  };
};
