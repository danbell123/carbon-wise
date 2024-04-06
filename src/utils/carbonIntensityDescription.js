function carbonIntensityDescription(intensity) {
    if (intensity < 80) {
      return { level: 'Very Low', description: 'Perfect time to use energy' };
    } else if (intensity >= 80 && intensity < 160) {
      return { level: 'Low', description: 'Good time to use energy' };
    } else if (intensity >= 240 && intensity < 280) {
      return { level: 'Moderate', description: 'Fair time to use energy' };
    } else if (intensity >= 320 && intensity < 380) {
      return { level: 'High', description: 'Consider reducing energy use' };
    } else {
      return { level: 'Very High', description: 'Use energy sparingly' };
    }
  }

export default carbonIntensityDescription; 