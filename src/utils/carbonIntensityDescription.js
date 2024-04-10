function carbonIntensityDescription(intensity) {
    if (intensity < 50) {
      return { level: 'Very Low', description: 'Perfect time to use energy' };
    } else if (intensity >= 50 && intensity < 120) {
      return { level: 'Low', description: 'Good time to use energy' };
    } else if (intensity >= 120 && intensity < 220) {
      return { level: 'Moderate', description: 'Fair time to use energy' };
    } else if (intensity >= 220 && intensity < 320) {
      return { level: 'High', description: 'Consider reducing energy use' };
    } else {
      return { level: 'Very High', description: 'Use energy sparingly' };
    }
  }

export default carbonIntensityDescription; 