import fs from 'fs'

export function validateGeoJSONFile(jsonFilePath: string): boolean {
    var jsonlint = require('jsonlint');
    const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
    try {
        var json = jsonlint.parse(fileContent);
        return json && json.type === 'FeatureCollection'; 
    } catch (error) {
        return false; 
    }
}
