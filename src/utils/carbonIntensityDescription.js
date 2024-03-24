function carbonIntensityDescription(intensity) {
    console.log("Intensity: ", intensity);
    if (intensity < 100) {
      return { level: 'Very Low', description: 'Perfect time to use energy' };
    } else if (intensity >= 100 && intensity < 200) {
      return { level: 'Low', description: 'Good time to use energy' };
    } else if (intensity >= 200 && intensity < 300) {
      return { level: 'Moderate', description: 'Fair time to use energy' };
    } else if (intensity >= 300 && intensity < 400) {
      return { level: 'High', description: 'Consider reducing energy use' };
    } else {
      return { level: 'Very High', description: 'Use energy sparingly' };
    }
  }

export default carbonIntensityDescription; 