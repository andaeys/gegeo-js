import { validateGeoJSONFile } from '../utils/jsonValidation';

describe('GeoJSON Validation', () => {
    test('should validate a valid GeoJSON', () => {
         const isValid = validateGeoJSONFile("utils/testData/validgeo.json");
        expect(isValid).toBe(true);
    });

    test('should invalidate an invalid GeoJSON', () => {
        const isValid = validateGeoJSONFile("utils/testData/simple.json");
        expect(isValid).toBe(false);
    });

    test('should reject an invalid JSON file', async () => {
        const isValid = validateGeoJSONFile("utils/testData/invalid.json");
        expect(isValid).toBe(false);
    });
});
