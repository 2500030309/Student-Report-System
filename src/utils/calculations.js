// Academic calculation helper functions

export const calculateGrade = (percentage, gradingScale) => {
  if (percentage === undefined || percentage === null || isNaN(percentage)) {
    return { grade: 'N/A', point: 0, description: 'Not Available', color: 'slate' };
  }
  const score = Math.round(Number(percentage));
  for (const item of gradingScale) {
    if (score >= item.min && score <= item.max) {
      return item;
    }
  }
  return { grade: 'F', point: 0, description: 'Fail', color: 'rose' };
};

export const calculatePercentage = (obtained, maximum) => {
  if (!maximum || maximum <= 0) return 0;
  return Number(((obtained / maximum) * 100).toFixed(1));
};

export const calculateCGPA = (marksList) => {
  if (!marksList || marksList.length === 0) return 0;
  let totalCredits = 0;
  let totalPoints = 0;

  marksList.forEach(m => {
    const credits = m.credits || 3;
    const point = m.gradePoint || 0;
    totalCredits += credits;
    totalPoints += (credits * point);
  });

  if (totalCredits === 0) return 0;
  return Number((totalPoints / totalCredits).toFixed(2));
};

export const getAttendanceColor = (percentage, threshold = 75) => {
  if (percentage >= 85) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
  if (percentage >= threshold) return 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-800';
  return 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-800';
};

export const getGradeBadgeColor = (grade) => {
  switch (grade) {
    case 'O':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300';
    case 'A+':
    case 'A':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-300';
    case 'B+':
    case 'B':
      return 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border-teal-300';
    case 'C':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300';
    default:
      return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-300';
  }
};
