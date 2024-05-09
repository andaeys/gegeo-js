import { validateGeoJSONFile } from '../utils/jsonValidation';

describe('GeoJSON Validation', () => {
    test('should validate a valid GeoJSON', () => {
        var jsonString = readFormFile("utils/testData/validgeo.json");
        const isValid = validateGeoJSONFile(jsonString);
        expect(isValid).toBe(true);
    });

    test('should invalidate an simple json file', () => {
        var jsonString = readFormFile("utils/testData/simple.json");
        const isValid = validateGeoJSONFile(jsonString);
        expect(isValid).toBe(false);
    });

    test('invalidate an invalid JSON file', async () => {
        var jsonString = readFormFile("utils/testData/invalid.json");
        const isValid = validateGeoJSONFile(jsonString);
        expect(isValid).toBe(false);
    });
});

function readFormFile(jsonFilePath: string): string{
    try {
        var fs = require('fs');
        var jsonlint = require('jsonlint');
        return fs.readFileSync(jsonFilePath, 'utf-8');
    }catch (error) {
        console.log(error);
        return "";
    }
    
}