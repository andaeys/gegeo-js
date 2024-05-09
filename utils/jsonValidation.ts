export function validateGeoJSONFile(fileContent: string): boolean {
    try {
        var json = JSON.parse(fileContent);
        return json && json.type === 'FeatureCollection'; 
    } catch (error) {
        return false; 
    }
}
