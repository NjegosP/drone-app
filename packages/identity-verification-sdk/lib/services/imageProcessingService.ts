export interface ImageQualityResult {
    isGoodQuality: boolean;
    image: string;
}

/**
 * Mock service that simulates backend image quality analysis
 * @param imageSrc - Base64 image string
 * @param delay - Simulated processing delay in milliseconds (default: 1500ms)
 * @returns Promise with quality analysis result
 */
export const analyzeImageQuality = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    imageSrc: string
): Promise<ImageQualityResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isGoodQuality = Math.random() * 100 > 10;

            resolve({
                isGoodQuality,
                image: imageSrc,
            });
        }, 500);
    });
};
