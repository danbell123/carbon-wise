// scoreColour.js
const getScoreColor = (score) => {
    if (typeof score !== 'number') {
        return 'text-text-colour-tertiary font-normal'; // Handle non-numeric scores
    }
    if (score > 90) {
        return 'veryhigh-score-text';
    } else if (score > 70) {
        return 'high-score-text';
    } else if (score > 50) {
        return 'mid-score-text';
    } else if (score > 30) {
        return 'low-score-text';
    } else {
        return 'verylow-score-text';
    }
};

export default getScoreColor;
