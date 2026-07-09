/**
 * Calculate total credits from an array of course objects
 */
export function calculateTotalCredits(courses) {
  return courses.reduce((sum, course) => sum + course.credits, 0);
}

/**
 * Check if all prerequisites for a course are met
 * @returns {{ passed: boolean, missing: string[] }}
 */
export function checkPrerequisites(course, completedCourses) {
  if (!course.prerequisites || course.prerequisites.length === 0) {
    return { passed: true, missing: [] };
  }
  const missing = course.prerequisites.filter(
    (prereq) => !completedCourses.includes(prereq)
  );
  return { passed: missing.length === 0, missing };
}

/**
 * Check if a course has available seats
 */
export function checkSeatAvailability(course) {
  return course.availableSeats > 0;
}

/**
 * Format 24h time string to 12h format
 */
export function formatTime(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Generate a fake registration slip number
 */
export function generateSlipNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REG-${timestamp}-${random}`;
}

/**
 * Get current date formatted
 */
export function getCurrentDate() {
  return new Date().toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get current academic session
 */
export function getAcademicSession() {
  return '2024/2025 - Semester 2';
}

/**
 * Format date from ISO string
 */
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get time slot duration in hours
 */
export function getCourseDuration(startTime, endTime) {
  const [startH] = startTime.split(':').map(Number);
  const [endH] = endTime.split(':').map(Number);
  return endH - startH;
}
