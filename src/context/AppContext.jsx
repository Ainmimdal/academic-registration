import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import {
  academicSessions,
  courseCatalog as initialCourses,
  studentProfile,
  lecturerProfile,
  adminProfile,
  pendingStudents as initialPendingStudents,
} from '../data/mockData';
import { calculateTotalCredits, checkPrerequisites, checkSeatAvailability } from '../utils/helpers';

const AppContext = createContext(null);

// Action types
const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_SESSION: 'SET_SESSION',
  ADD_COURSE: 'ADD_COURSE',
  REMOVE_COURSE: 'REMOVE_COURSE',
  CHANGE_COURSE_GROUP: 'CHANGE_COURSE_GROUP',
  CLEAR_SELECTED: 'CLEAR_SELECTED',
  SUBMIT_REGISTRATION: 'SUBMIT_REGISTRATION',
  APPROVE_REGISTRATION: 'APPROVE_REGISTRATION',
  REJECT_REGISTRATION: 'REJECT_REGISTRATION',
  RESET_REGISTRATION: 'RESET_REGISTRATION',
  SHOW_TOAST: 'SHOW_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  APPROVE_STUDENT: 'APPROVE_STUDENT',
  REJECT_STUDENT: 'REJECT_STUDENT',
};

const initialState = {
  user: null,
  selectedSession: academicSessions[0],
  courses: JSON.parse(JSON.stringify(initialCourses)),
  selectedCourses: [],
  selectedCourseGroups: {},
  registrationPhase: 'draft', // draft -> pending -> approved | rejected
  toasts: [],
  pendingStudents: JSON.parse(JSON.stringify(initialPendingStudents)),
  toastIdCounter: 0,
};

function updateCourseSeat(course, groupId, delta) {
  const groups = course.classGroups || [];
  const targetGroupId = groupId || groups[0]?.id;

  return {
    ...course,
    availableSeats: Math.max(0, course.availableSeats + delta),
    classGroups: groups.map((group) =>
      group.id === targetGroupId
        ? { ...group, availableSeats: Math.max(0, group.availableSeats + delta) }
        : group
    ),
  };
}

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      const { username, sessionId } = action.payload;
      let role = 'student';
      let profile = { ...studentProfile };
      const selectedSession = academicSessions.find((session) => session.id === sessionId) || academicSessions[0];

      if (username === 'demo_advisor' || username === 'demo_lecturer') {
        role = 'lecturer';
        profile = { ...lecturerProfile };
      } else if (username === 'demo_admin') {
        role = 'admin';
        profile = { ...adminProfile };
      }

      return {
        ...state,
        selectedSession,
        user: { username, role, profile: { ...profile, semester: selectedSession.semester } },
        courses: JSON.parse(JSON.stringify(initialCourses)),
        selectedCourses: [],
        selectedCourseGroups: {},
        registrationPhase: 'draft',
      };
    }

    case ACTIONS.SET_SESSION: {
      const selectedSession = academicSessions.find((session) => session.id === action.payload) || state.selectedSession;
      return {
        ...state,
        selectedSession,
        user: state.user
          ? { ...state.user, profile: { ...state.user.profile, semester: selectedSession.semester } }
          : state.user,
        courses: JSON.parse(JSON.stringify(initialCourses)),
        selectedCourses: [],
        selectedCourseGroups: {},
        registrationPhase: 'draft',
      };
    }

    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        selectedCourses: [],
        selectedCourseGroups: {},
        registrationPhase: 'draft',
      };

    case ACTIONS.ADD_COURSE: {
      const { courseId, groupId } = action.payload;
      if (state.selectedCourses.includes(courseId)) return state;
      
      const updatedCourses = state.courses.map((c) =>
        c.id === courseId ? updateCourseSeat(c, groupId, -1) : c
      );

      return {
        ...state,
        courses: updatedCourses,
        selectedCourses: [...state.selectedCourses, courseId],
        selectedCourseGroups: {
          ...state.selectedCourseGroups,
          [courseId]: groupId,
        },
      };
    }

    case ACTIONS.REMOVE_COURSE: {
      const courseId = action.payload;
      if (!state.selectedCourses.includes(courseId)) return state;
      const selectedGroupId = state.selectedCourseGroups[courseId];

      const updatedCourses = state.courses.map((c) =>
        c.id === courseId ? updateCourseSeat(c, selectedGroupId, 1) : c
      );
      const { [courseId]: removedGroup, ...remainingGroups } = state.selectedCourseGroups;

      return {
        ...state,
        courses: updatedCourses,
        selectedCourses: state.selectedCourses.filter((id) => id !== courseId),
        selectedCourseGroups: remainingGroups,
      };
    }

    case ACTIONS.CHANGE_COURSE_GROUP: {
      const { courseId, groupId } = action.payload;
      if (!state.selectedCourses.includes(courseId)) return state;

      const currentGroupId = state.selectedCourseGroups[courseId];
      if (currentGroupId === groupId) return state;

      const updatedCourses = state.courses.map((course) => {
        if (course.id !== courseId) return course;
        return updateCourseSeat(updateCourseSeat(course, currentGroupId, 1), groupId, -1);
      });

      return {
        ...state,
        courses: updatedCourses,
        selectedCourseGroups: {
          ...state.selectedCourseGroups,
          [courseId]: groupId,
        },
      };
    }

    case ACTIONS.CLEAR_SELECTED: {
      // Restore seat counts
      const restoredCourses = state.courses.map((course) => {
        const original = initialCourses.find((c) => c.id === course.id);
        return original ? { ...course, availableSeats: original.availableSeats } : course;
      });
      return {
        ...state,
        courses: restoredCourses,
        selectedCourses: [],
        selectedCourseGroups: {},
        registrationPhase: 'draft',
      };
    }

    case ACTIONS.SUBMIT_REGISTRATION: {
      const requestedCourses = state.selectedCourses.map((courseId) => {
        const course = state.courses.find((item) => item.id === courseId);
        const group = course?.classGroups?.find((item) => item.id === state.selectedCourseGroups[courseId]);
        return group ? `${course.code} (${group.label})` : course?.code;
      }).filter(Boolean);

      const updatedStudents = state.pendingStudents.map((student) =>
        student.studentId === studentProfile.id
          ? {
              ...student,
              coursesRequested: requestedCourses,
              totalCredits: calculateTotalCredits(state.selectedCourses.map((courseId) => state.courses.find((course) => course.id === courseId)).filter(Boolean)),
              submittedAt: new Date().toISOString(),
              status: 'pending',
            }
          : student
      );

      return {
        ...state,
        registrationPhase: 'pending',
        pendingStudents: updatedStudents,
      };
    }

    case ACTIONS.APPROVE_REGISTRATION:
      return {
        ...state,
        registrationPhase: 'approved',
      };

    case ACTIONS.REJECT_REGISTRATION:
      return {
        ...state,
        registrationPhase: 'rejected',
      };

    case ACTIONS.RESET_REGISTRATION:
      return {
        ...state,
        selectedCourses: [],
        selectedCourseGroups: {},
        registrationPhase: 'draft',
      };

    case ACTIONS.APPROVE_STUDENT: {
      const studentId = action.payload;
      const updatedStudents = state.pendingStudents.map((s) =>
        s.id === studentId ? { ...s, status: 'approved' } : s
      );
      // If this is the demo student, also update registration phase
      const student = state.pendingStudents.find((s) => s.id === studentId);
      const isMainStudent = student?.studentId === studentProfile.id;
      return {
        ...state,
        pendingStudents: updatedStudents,
        registrationPhase: isMainStudent ? 'approved' : state.registrationPhase,
      };
    }

    case ACTIONS.REJECT_STUDENT: {
      const studentId = action.payload;
      const updatedStudents = state.pendingStudents.map((s) =>
        s.id === studentId ? { ...s, status: 'rejected' } : s
      );
      const student = state.pendingStudents.find((s) => s.id === studentId);
      const isMainStudent = student?.studentId === studentProfile.id;
      return {
        ...state,
        pendingStudents: updatedStudents,
        registrationPhase: isMainStudent ? 'rejected' : state.registrationPhase,
      };
    }

    case ACTIONS.SHOW_TOAST: {
      const newToast = {
        id: state.toastIdCounter + 1,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
      return {
        ...state,
        toasts: [...state.toasts, newToast],
        toastIdCounter: state.toastIdCounter + 1,
      };
    }

    case ACTIONS.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = useCallback((username, sessionId = academicSessions[0].id) => {
    dispatch({ type: ACTIONS.LOGIN, payload: { username, sessionId } });
  }, []);

  const setSession = useCallback((sessionId) => {
    dispatch({ type: ACTIONS.SET_SESSION, payload: sessionId });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: ACTIONS.LOGOUT });
  }, []);

  const addCourse = useCallback((courseId, groupId) => {
    dispatch({ type: ACTIONS.ADD_COURSE, payload: { courseId, groupId } });
  }, []);

  const removeCourse = useCallback((courseId) => {
    dispatch({ type: ACTIONS.REMOVE_COURSE, payload: courseId });
  }, []);

  const changeCourseGroup = useCallback((courseId, groupId) => {
    dispatch({ type: ACTIONS.CHANGE_COURSE_GROUP, payload: { courseId, groupId } });
  }, []);

  const clearSelectedCourses = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_SELECTED });
  }, []);

  const submitRegistration = useCallback(() => {
    dispatch({ type: ACTIONS.SUBMIT_REGISTRATION });
  }, []);

  const approveRegistration = useCallback(() => {
    dispatch({ type: ACTIONS.APPROVE_REGISTRATION });
  }, []);

  const rejectRegistration = useCallback(() => {
    dispatch({ type: ACTIONS.REJECT_REGISTRATION });
  }, []);

  const resetRegistration = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_REGISTRATION });
  }, []);

  const approveStudent = useCallback((studentId) => {
    dispatch({ type: ACTIONS.APPROVE_STUDENT, payload: studentId });
  }, []);

  const rejectStudent = useCallback((studentId) => {
    dispatch({ type: ACTIONS.REJECT_STUDENT, payload: studentId });
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    dispatch({ type: ACTIONS.SHOW_TOAST, payload: { message, type } });
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      dispatch({ type: ACTIONS.DISMISS_TOAST, payload: state.toastIdCounter + 1 });
    }, 4000);
  }, [state.toastIdCounter]);

  const dismissToast = useCallback((id) => {
    dispatch({ type: ACTIONS.DISMISS_TOAST, payload: id });
  }, []);

  // Computed values
  const selectedCourseObjects = useMemo(() => {
    return state.selectedCourses.map((id) => {
      const course = state.courses.find((c) => c.id === id);
      if (!course) return null;

      const selectedGroupId = state.selectedCourseGroups[id] || course.classGroups?.[0]?.id;
      const selectedGroup = course.classGroups?.find((group) => group.id === selectedGroupId);

      return {
        ...course,
        selectedGroup,
        selectedGroupId,
        day: selectedGroup?.day || course.day,
        startTime: selectedGroup?.startTime || course.startTime,
        endTime: selectedGroup?.endTime || course.endTime,
        venue: selectedGroup?.venue || course.venue,
      };
    }).filter(Boolean);
  }, [state.selectedCourses, state.selectedCourseGroups, state.courses]);

  const totalCredits = useMemo(() => {
    return calculateTotalCredits(selectedCourseObjects);
  }, [selectedCourseObjects]);

  const validationResults = useMemo(() => {
    const maxCredits = studentProfile.maxCreditsPerSemester;
    const completedCourses = studentProfile.completedCourses;

    // Credit limit check
    const creditCheck = {
      label: 'Credit Hour Limit',
      passed: totalCredits <= maxCredits,
      detail: `You have taken ${totalCredits} / ${maxCredits} credits`,
    };

    // Prerequisite check
    const prereqIssues = [];
    selectedCourseObjects.forEach((course) => {
      const result = checkPrerequisites(course, completedCourses);
      if (!result.passed) {
        prereqIssues.push(`${course.code} requires ${result.missing.join(', ')}`);
      }
    });
    const prereqCheck = {
      label: 'Prerequisite',
      passed: prereqIssues.length === 0,
      detail: prereqIssues.length === 0
        ? `All prerequisites met`
        : prereqIssues.join('; '),
    };

    // Seat availability check
    const seatIssues = [];
    selectedCourseObjects.forEach((course) => {
      // Check the original seat count before selection
      const originalCourse = initialCourses.find((c) => c.id === course.id);
      if (originalCourse && originalCourse.availableSeats <= 0) {
        seatIssues.push(`${course.code} has no available seats`);
      }
    });
    const seatCheck = {
      label: 'Seat Availability',
      passed: seatIssues.length === 0,
      detail: seatIssues.length === 0
        ? `All courses have available seats`
        : seatIssues.join('; '),
    };

    return [creditCheck, prereqCheck, seatCheck];
  }, [selectedCourseObjects, totalCredits]);

  const allValidationsPassed = useMemo(() => {
    return validationResults.every((v) => v.passed);
  }, [validationResults]);

  const value = useMemo(() => ({
    ...state,
    selectedCourseObjects,
    totalCredits,
    validationResults,
    allValidationsPassed,
    maxCredits: studentProfile.maxCreditsPerSemester,
    academicSessions,
    login,
    setSession,
    logout,
    addCourse,
    removeCourse,
    changeCourseGroup,
    clearSelectedCourses,
    submitRegistration,
    approveRegistration,
    rejectRegistration,
    resetRegistration,
    approveStudent,
    rejectStudent,
    showToast,
    dismissToast,
  }), [state, selectedCourseObjects, totalCredits, validationResults, allValidationsPassed,
    login, setSession, logout, addCourse, removeCourse, changeCourseGroup, clearSelectedCourses,
    submitRegistration, approveRegistration, rejectRegistration, resetRegistration,
    approveStudent, rejectStudent, showToast, dismissToast]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
