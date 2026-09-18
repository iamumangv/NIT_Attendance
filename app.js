/**
 * NIT Raipur - Chemical Eng (Sec-C) Attendance & Bunk Manager
 * Pure JavaScript Application Logic
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA DEFINITIONS & TIMETABLE SCHEMA (NIT Raipur FN-4 Sec-C Autumn 2026)
  // =========================================================================

  const FACULTY_DIRECTORY = [
    {
      subject: "Engineering Mechanics",
      name: "Dr. Ankur Gupta",
      phone: "9893259226",
      email: "agupta.mech@nitrr.ac.in",
      dept: "Mechanical Engineering"
    },
    {
      subject: "Data Structure",
      name: "Dr. Satish Kumar",
      phone: "7987262724",
      email: "satishkumarvatsa@gmail.com",
      dept: "Computer Applications"
    },
    {
      subject: "Physics-II & Lab",
      name: "Dr. Amit Kumar Prasad",
      phone: "7978704155",
      email: "p.ramiee@gmail.com",
      dept: "Physics"
    },
    {
      subject: "Computer Programming & Lab",
      name: "Dr. Satish Kumar",
      phone: "7987262724",
      email: "satishkumarvatsa@gmail.com",
      dept: "Computer Applications"
    },
    {
      subject: "Environment & Ecology & Lab",
      name: "Prof. Shyama Prasad Mahapatra",
      phone: "8249897499",
      email: "spmahapatra.chy@nitrr.ac.in",
      dept: "Chemistry"
    },
    {
      subject: "Mathematics-I",
      name: "Dr. Madasu Krishna Prasad / Dr. Lavudya Bhaskar",
      phone: "9575508447 / 8639241147",
      email: "madaspra.maths@nitrr.ac.in",
      dept: "Mathematics"
    },
    {
      subject: "Mentor Department (Physics)",
      name: "Prof. S.M. Saini (HOD)",
      phone: "-",
      email: "hod.phy@nitrr.ac.in",
      dept: "Department of Physics"
    },
    {
      subject: "Conveners / Assistance",
      name: "Dr. K.S. Ojha / Dr. Harikrishnan M.P. / Dr. R.K. Bhardwaj",
      phone: "-",
      email: "ksojha.phy@nitrr.ac.in",
      dept: "Physics"
    }
  ];

  // Base Weekly Timetable (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const WEEKLY_SCHEDULE = {
    // MONDAY
    1: [
      {
        id: "mon-p1-p2",
        period: "I & II",
        time: "09:00 - 10:40 AM",
        type: "lab",
        // Batch conditional:
        getSubject: (batch) => batch === "C1" ? "Physics-II Lab" : "Environment & Ecology Lab",
        getFaculty: (batch) => batch === "C1" ? "Dr. Amit Kumar Prasad" : "Prof. Shyama Prasad Mahapatra",
        isLab: true,
        countWeight: 2
      },
      {
        id: "mon-p3-p4",
        period: "III & IV",
        time: "10:40 - 12:20 PM",
        type: "lab",
        getSubject: (batch) => batch === "C1" ? "Environment & Ecology Lab" : "Physics-II Lab",
        getFaculty: (batch) => batch === "C1" ? "Prof. Shyama Prasad Mahapatra" : "Dr. Amit Kumar Prasad",
        isLab: true,
        countWeight: 2
      },
      {
        id: "mon-recess",
        period: "RECESS",
        time: "01:00 - 02:00 PM",
        isRecess: true,
        subject: "Lunch Break / Recess"
      },
      {
        id: "mon-p6",
        period: "VI",
        time: "02:00 - 02:50 PM",
        subject: "Data Structure",
        faculty: "Dr. Satish Kumar",
        countWeight: 1
      },
      {
        id: "mon-p7",
        period: "VII",
        time: "02:50 - 03:40 PM",
        subject: "Mathematics-I",
        faculty: "Dr. M. Krishna Prasad / Dr. L. Bhaskar",
        countWeight: 1
      },
      {
        id: "mon-p8",
        period: "VIII",
        time: "03:40 - 04:30 PM",
        subject: "Engineering Mechanics",
        faculty: "Dr. Ankur Gupta",
        countWeight: 1
      },
      {
        id: "mon-p9",
        period: "IX",
        time: "04:30 - 05:15 PM",
        subject: "Computer Programming",
        faculty: "Dr. Satish Kumar",
        countWeight: 1
      }
    ],

    // TUESDAY
    2: [
      {
        id: "tue-p1",
        period: "I",
        time: "09:00 - 09:50 AM",
        subject: "Data Structure",
        faculty: "Dr. Satish Kumar",
        countWeight: 1
      },
      {
        id: "tue-p2",
        period: "II",
        time: "09:50 - 10:40 AM",
        subject: "Mathematics-I",
        faculty: "Dr. M. Krishna Prasad / Dr. L. Bhaskar",
        countWeight: 1
      },
      {
        id: "tue-p3",
        period: "III",
        time: "10:40 - 11:30 AM",
        subject: "Physics-II",
        faculty: "Dr. Amit Kumar Prasad",
        countWeight: 1
      },
      {
        id: "tue-p4",
        period: "IV",
        time: "11:30 - 12:20 PM",
        subject: "Environment & Ecology",
        faculty: "Prof. Shyama Prasad Mahapatra",
        countWeight: 1
      },
      {
        id: "tue-recess",
        period: "RECESS",
        time: "01:00 - 02:00 PM",
        isRecess: true,
        subject: "Lunch Break / Recess"
      },
      {
        id: "tue-p6-p7",
        period: "VI & VII",
        time: "02:00 - 03:40 PM",
        type: "lab",
        getSubject: (batch) => batch === "C1" ? "Engineering Mechanics Lab" : "Self Study / Library",
        getFaculty: (batch) => batch === "C1" ? "Dr. Ankur Gupta" : "-",
        isBatchSpecific: true,
        activeBatch: "C1",
        isLab: true,
        countWeight: 2
      },
      {
        id: "tue-p8-p9",
        period: "VIII & IX",
        time: "03:40 - 05:15 PM",
        type: "lab",
        getSubject: (batch) => batch === "C2" ? "Engineering Mechanics Lab" : "Self Study / Library",
        getFaculty: (batch) => batch === "C2" ? "Dr. Ankur Gupta" : "-",
        isBatchSpecific: true,
        activeBatch: "C2",
        isLab: true,
        countWeight: 2
      }
    ],

    // WEDNESDAY
    3: [
      {
        id: "wed-p3",
        period: "III",
        time: "10:40 - 11:30 AM",
        subject: "Computer Programming",
        faculty: "Dr. Satish Kumar",
        countWeight: 1
      },
      {
        id: "wed-p4",
        period: "IV",
        time: "11:30 - 12:20 PM",
        subject: "Engineering Mechanics",
        faculty: "Dr. Ankur Gupta",
        countWeight: 1
      },
      {
        id: "wed-p5",
        period: "V",
        time: "12:20 - 01:00 PM",
        subject: "Engineering Mechanics",
        faculty: "Dr. Ankur Gupta",
        countWeight: 1
      },
      {
        id: "wed-recess",
        period: "RECESS",
        time: "01:00 - 02:00 PM",
        isRecess: true,
        subject: "Lunch Break / Recess"
      },
      {
        id: "wed-p6",
        period: "VI",
        time: "02:00 - 02:50 PM",
        subject: "Data Structure",
        faculty: "Dr. Satish Kumar",
        countWeight: 1
      },
      {
        id: "wed-p7",
        period: "VII",
        time: "02:50 - 03:40 PM",
        subject: "Physics-II",
        faculty: "Dr. Amit Kumar Prasad",
        countWeight: 1
      },
      {
        id: "wed-p8",
        period: "VIII",
        time: "03:40 - 04:30 PM",
        subject: "Mathematics-I",
        faculty: "Dr. M. Krishna Prasad / Dr. L. Bhaskar",
        countWeight: 1
      },
      {
        id: "wed-p9",
        period: "IX",
        time: "04:30 - 05:15 PM",
        subject: "Environment & Ecology",
        faculty: "Prof. Shyama Prasad Mahapatra",
        countWeight: 1
      }
    ],

    // THURSDAY
    4: [
      {
        id: "thu-p3-p4",
        period: "III & IV",
        time: "10:40 - 12:20 PM",
        subject: "Computer Programming Lab",
        faculty: "Dr. Satish Kumar",
        isLab: true,
        countWeight: 2
      },
      {
        id: "thu-recess",
        period: "RECESS",
        time: "01:00 - 02:00 PM",
        isRecess: true,
        subject: "Lunch Break / Recess"
      },
      {
        id: "thu-p6",
        period: "VI",
        time: "02:00 - 02:50 PM",
        subject: "Mathematics-I",
        faculty: "Dr. M. Krishna Prasad / Dr. L. Bhaskar",
        countWeight: 1
      },
      {
        id: "thu-p7",
        period: "VII",
        time: "02:50 - 03:40 PM",
        subject: "Computer Programming",
        faculty: "Dr. Satish Kumar",
        countWeight: 1
      },
      {
        id: "thu-p8",
        period: "VIII",
        time: "03:40 - 04:30 PM",
        subject: "Physics-II",
        faculty: "Dr. Amit Kumar Prasad",
        countWeight: 1
      },
      {
        id: "thu-p9",
        period: "IX",
        time: "04:30 - 05:15 PM",
        subject: "Environment & Ecology",
        faculty: "Prof. Shyama Prasad Mahapatra",
        countWeight: 1
      }
    ],

    // FRIDAY
    5: [
      {
        id: "fri-recess",
        period: "RECESS",
        time: "01:00 - 02:00 PM",
        isRecess: true,
        subject: "Lunch Break / Recess"
      },
      {
        id: "fri-p6-p7-p8",
        period: "VI, VII & VIII",
        time: "02:00 - 04:30 PM",
        subject: "Data Structure Lab",
        faculty: "Dr. Satish Kumar",
        isLab: true,
        countWeight: 3
      },
      {
        id: "fri-p9-p10",
        period: "IX & X",
        time: "04:30 - 06:00 PM",
        subject: "NCC / NSS",
        faculty: "Officer In-charge",
        isActivity: true,
        countWeight: 2
      }
    ],

    // SATURDAY & SUNDAY: Off
    6: [],
    0: []
  };

  // =========================================================================
  // 2. APP STATE & LOCAL STORAGE SYNC
  // =========================================================================

  const STORAGE_KEY = "nitrr_attendance_app_v1";

  const todayNow = new Date();
  let AppState = {
    selectedDate: new Date(todayNow.getFullYear(), todayNow.getMonth(), todayNow.getDate()), // Opens present date first
    currentViewMonth: todayNow.getMonth(),
    currentViewYear: todayNow.getFullYear(),
    batch: "C1", // 'C1' or 'C2'
    targetPercentage: 75,
    // attendanceMap: { "YYYY-MM-DD": { isHoliday: false, periods: { [periodId]: "present" | "absent" | "cancelled" | "none" }, extraClasses: [...] } }
    attendanceMap: {}
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        AppState.batch = parsed.batch || "C1";
        AppState.targetPercentage = parsed.targetPercentage || 75;
        AppState.attendanceMap = parsed.attendanceMap || {};
      }
    } catch (e) {
      console.warn("Could not load stored state, initializing fresh:", e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        batch: AppState.batch,
        targetPercentage: AppState.targetPercentage,
        attendanceMap: AppState.attendanceMap
      }));
    } catch (e) {
      console.error("Failed to save state:", e);
    }
  }

  // Helper date formatter
  function formatDateKey(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function parseDateKey(dateKey) {
    const parts = dateKey.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  // =========================================================================
  // 3. UI ELEMENT REFERENCES
  // =========================================================================

  const DOM = {
    batchC1Btn: document.getElementById("batchC1Btn"),
    batchC2Btn: document.getElementById("batchC2Btn"),
    openTimetableBtn: document.getElementById("openTimetableBtn"),
    openFacultyBtn: document.getElementById("openFacultyBtn"),
    openSettingsBtn: document.getElementById("openSettingsBtn"),
    
    // Overall Stats
    overallRingProgress: document.getElementById("overallRingProgress"),
    overallPercentageText: document.getElementById("overallPercentageText"),
    totalAttended: document.getElementById("totalAttended"),
    totalClasses: document.getElementById("totalClasses"),
    statPresentCount: document.getElementById("statPresentCount"),
    statAbsentCount: document.getElementById("statAbsentCount"),
    statCancelledCount: document.getElementById("statCancelledCount"),
    advisorIcon: document.getElementById("advisorIcon"),
    advisorHeadline: document.getElementById("advisorHeadline"),
    advisorMessage: document.getElementById("advisorMessage"),

    // Calendar
    prevMonthBtn: document.getElementById("prevMonthBtn"),
    nextMonthBtn: document.getElementById("nextMonthBtn"),
    currentMonthYear: document.getElementById("currentMonthYear"),
    jumpTodayBtn: document.getElementById("jumpTodayBtn"),
    calendarDaysGrid: document.getElementById("calendarDaysGrid"),

    // Subjects Widget
    subjectBreakdownList: document.getElementById("subjectBreakdownList"),
    subjectCountBadge: document.getElementById("subjectCountBadge"),

    // Selected Day Schedule
    selectedDateMonth: document.getElementById("selectedDateMonth"),
    selectedDateNum: document.getElementById("selectedDateNum"),
    selectedDayName: document.getElementById("selectedDayName"),
    selectedDayStatusPill: document.getElementById("selectedDayStatusPill"),
    selectedFullDateStr: document.getElementById("selectedFullDateStr"),
    periodsList: document.getElementById("periodsList"),

    // Day Quick Actions
    markAllPresentBtn: document.getElementById("markAllPresentBtn"),
    markAllAbsentBtn: document.getElementById("markAllAbsentBtn"),
    toggleHolidayBtn: document.getElementById("toggleHolidayBtn"),
    addExtraClassBtn: document.getElementById("addExtraClassBtn"),

    // Modals
    timetableModal: document.getElementById("timetableModal"),
    closeTimetableModal: document.getElementById("closeTimetableModal"),
    facultyModal: document.getElementById("facultyModal"),
    closeFacultyModal: document.getElementById("closeFacultyModal"),
    facultyListGrid: document.getElementById("facultyListGrid"),
    settingsModal: document.getElementById("settingsModal"),
    closeSettingsModal: document.getElementById("closeSettingsModal"),
    extraClassModal: document.getElementById("extraClassModal"),
    closeExtraClassModal: document.getElementById("closeExtraClassModal"),
    cancelExtraClassBtn: document.getElementById("cancelExtraClassBtn"),
    extraClassForm: document.getElementById("extraClassForm"),
    extraSubjectSelect: document.getElementById("extraSubjectSelect"),
    customSubjectField: document.getElementById("customSubjectField"),
    customSubjectInput: document.getElementById("customSubjectInput"),
    extraTimeSlot: document.getElementById("extraTimeSlot"),
    extraInitialStatus: document.getElementById("extraInitialStatus"),
    extraClassModalDate: document.getElementById("extraClassModalDate"),

    // Settings Inputs
    targetCriteriaInput: document.getElementById("targetCriteriaInput"),
    exportDataBtn: document.getElementById("exportDataBtn"),
    importDataInput: document.getElementById("importDataInput"),
    resetAllDataBtn: document.getElementById("resetAllDataBtn"),

    // Toast
    toastContainer: document.getElementById("toastContainer")
  };

  // =========================================================================
  // 4. CORE ATTENDANCE COMPUTATIONS & BUNK-O-METER
  // =========================================================================

  // Complete Curriculum Course List (NIT Raipur FN-4 Sec-C)
  const SEMESTER_SUBJECTS = [
    { name: "Data Structure", type: "Theory", icon: "fa-code" },
    { name: "Mathematics-I", type: "Theory", icon: "fa-square-root-variable" },
    { name: "Physics-II", type: "Theory", icon: "fa-atom" },
    { name: "Engineering Mechanics", type: "Theory", icon: "fa-gears" },
    { name: "Computer Programming", type: "Theory", icon: "fa-laptop-code" },
    { name: "Environment & Ecology", type: "Theory", icon: "fa-leaf" },
    { name: "Physics-II Lab", type: "Lab", icon: "fa-flask" },
    { name: "Environment & Ecology Lab", type: "Lab", icon: "fa-vial" },
    { name: "Engineering Mechanics Lab", type: "Lab", icon: "fa-wrench" },
    { name: "Computer Programming Lab", type: "Lab", icon: "fa-terminal" },
    { name: "Data Structure Lab", type: "Lab", icon: "fa-network-wired" },
    { name: "NCC / NSS", type: "Activity", icon: "fa-flag" }
  ];

  function calculateAllStats() {
    let totalClasses = 0;
    let totalAttended = 0;
    let totalAbsent = 0;
    let totalCancelled = 0;

    // Pre-populate with all curriculum subjects so they are always visible
    const subjectMap = {};
    SEMESTER_SUBJECTS.forEach(s => {
      subjectMap[s.name] = {
        attended: 0,
        total: 0,
        absent: 0,
        type: s.type,
        icon: s.icon
      };
    });

    function registerSubjectClass(subName, status, weight = 1) {
      if (!subName || subName === "Self Study / Library" || subName === "Lunch Break / Recess") return;
      if (!subjectMap[subName]) {
        subjectMap[subName] = { attended: 0, total: 0, absent: 0, type: "Extra", icon: "fa-star" };
      }

      if (status === "present") {
        totalAttended += weight;
        totalClasses += weight;
        subjectMap[subName].attended += weight;
        subjectMap[subName].total += weight;
      } else if (status === "absent") {
        totalAbsent += weight;
        totalClasses += weight;
        subjectMap[subName].absent += weight;
        subjectMap[subName].total += weight;
      } else if (status === "cancelled") {
        totalCancelled += weight;
      }
    }

    // Iterate across all marked dates in attendanceMap
    for (const [dateKey, dayData] of Object.entries(AppState.attendanceMap)) {
      if (dayData.isHoliday) {
        totalCancelled += 1;
        continue;
      }

      const dateObj = parseDateKey(dateKey);
      const dayOfWeek = dateObj.getDay();
      const basePeriods = WEEKLY_SCHEDULE[dayOfWeek] || [];

      // Process standard periods
      basePeriods.forEach(p => {
        if (p.isRecess) return;
        const sub = p.getSubject ? p.getSubject(AppState.batch) : p.subject;
        // Check if period is batch restricted
        if (p.isBatchSpecific && p.activeBatch !== AppState.batch) {
          return;
        }

        const status = (dayData.periods && dayData.periods[p.id]) || "none";
        const weight = p.countWeight || 1;
        registerSubjectClass(sub, status, weight);
      });

      // Process extra classes
      if (dayData.extraClasses && Array.isArray(dayData.extraClasses)) {
        dayData.extraClasses.forEach(extra => {
          registerSubjectClass(extra.subject, extra.status, 1);
        });
      }
    }

    const overallPct = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0;
    const target = AppState.targetPercentage;

    return {
      totalClasses,
      totalAttended,
      totalAbsent,
      totalCancelled,
      overallPct,
      target,
      subjectMap
    };
  }

  // Calculate Safe Bunk or Required Classes to reach Target %
  function getBunkAdvice(attended, total, targetPct) {
    if (total === 0) {
      return { type: "empty", text: "No classes yet" };
    }

    const currentPct = (attended / total) * 100;
    const targetFrac = targetPct / 100;

    if (currentPct >= targetPct) {
      const safeBunks = Math.floor((attended - targetFrac * total) / targetFrac);
      if (safeBunks > 0) {
        return {
          type: "safe",
          bunks: safeBunks,
          text: `Can bunk ${safeBunks}`
        };
      } else {
        return {
          type: "borderline",
          bunks: 0,
          text: `On track (Don't bunk)`
        };
      }
    } else {
      const reqClasses = Math.ceil((targetFrac * total - attended) / (1 - targetFrac));
      return {
        type: "danger",
        needed: reqClasses,
        text: `Need ${reqClasses} classes`
      };
    }
  }

  // =========================================================================
  // 5. RENDER FUNCTIONS
  // =========================================================================

  function updateHeaderStats() {
    const stats = calculateAllStats();

    // Overall Ring & Percentage
    const roundedPct = Math.round(stats.overallPct * 10) / 10;
    DOM.overallPercentageText.textContent = `${stats.totalClasses > 0 ? roundedPct : 0}%`;
    DOM.overallRingProgress.setAttribute("stroke-dasharray", `${roundedPct}, 100`);

    // Ring Color based on status
    if (stats.totalClasses === 0) {
      DOM.overallRingProgress.style.stroke = "var(--primary)";
    } else if (roundedPct >= stats.target) {
      DOM.overallRingProgress.style.stroke = "var(--success)";
    } else if (roundedPct >= stats.target - 10) {
      DOM.overallRingProgress.style.stroke = "var(--warning)";
    } else {
      DOM.overallRingProgress.style.stroke = "var(--danger)";
    }

    DOM.totalAttended.textContent = stats.totalAttended;
    DOM.totalClasses.textContent = stats.totalClasses;
    DOM.statPresentCount.textContent = stats.totalAttended;
    DOM.statAbsentCount.textContent = stats.totalAbsent;
    DOM.statCancelledCount.textContent = stats.totalCancelled;

    // Target Advisor Box
    const advice = getBunkAdvice(stats.totalAttended, stats.totalClasses, stats.target);
    if (stats.totalClasses === 0) {
      DOM.advisorHeadline.textContent = `Target: ${stats.target}% Attendance Criteria`;
      DOM.advisorHeadline.className = "advisor-title";
      DOM.advisorMessage.innerHTML = `Tap on any class period below to mark <strong>Present</strong> or <strong>Absent / Spik</strong>.`;
      DOM.advisorIcon.className = "fa-solid fa-graduation-cap";
    } else if (advice.type === "safe") {
      DOM.advisorHeadline.textContent = `Safe Zone (${roundedPct}%)`;
      DOM.advisorHeadline.className = "advisor-title safe-bunk-text";
      DOM.advisorMessage.innerHTML = `Awesome! <strong>You can safely bunk ${advice.bunks} more class${advice.bunks > 1 ? "es" : ""}</strong> and still stay above ${stats.target}%.`;
      DOM.advisorIcon.className = "fa-solid fa-face-smile-beam";
      DOM.advisorIcon.style.color = "var(--success)";
    } else if (advice.type === "borderline") {
      DOM.advisorHeadline.textContent = `Borderline Zone (${roundedPct}%)`;
      DOM.advisorHeadline.className = "advisor-title";
      DOM.advisorMessage.innerHTML = `Attendance is close to ${stats.target}%. <strong>Do not skip any classes right now!</strong>`;
      DOM.advisorIcon.className = "fa-solid fa-triangle-exclamation";
      DOM.advisorIcon.style.color = "var(--warning)";
    } else {
      DOM.advisorHeadline.textContent = `Attendance Shortage Alert (${roundedPct}%)`;
      DOM.advisorHeadline.className = "advisor-title danger-bunk-text";
      DOM.advisorMessage.innerHTML = `Warning: Below ${stats.target}%. <strong>Must attend next ${advice.needed} class${advice.needed > 1 ? "es" : ""}</strong> without missing any.`;
      DOM.advisorIcon.className = "fa-solid fa-skull-crossbones";
      DOM.advisorIcon.style.color = "var(--danger)";
    }

    // Render Subject-wise breakdown list
    renderSubjectCards(stats);
  }

  function renderSubjectCards(stats) {
    DOM.subjectBreakdownList.innerHTML = "";
    const subjects = Object.entries(stats.subjectMap);
    DOM.subjectCountBadge.textContent = `${subjects.length} Subjects`;

    // Sort: marked subjects with lowest percentage first, then unmarked subjects
    subjects.sort((a, b) => {
      if (a[1].total === 0 && b[1].total > 0) return 1;
      if (a[1].total > 0 && b[1].total === 0) return -1;
      const pctA = a[1].total > 0 ? (a[1].attended / a[1].total) : 1;
      const pctB = b[1].total > 0 ? (b[1].attended / b[1].total) : 1;
      return pctA - pctB;
    });

    subjects.forEach(([subName, data]) => {
      const hasClasses = data.total > 0;
      const pct = hasClasses ? Math.round((data.attended / data.total) * 100) : null;
      const advice = getBunkAdvice(data.attended, data.total, stats.target);

      let pctClass = "pct-neutral";
      let fillClass = "fill-neutral";
      let pctDisplay = "-";

      if (hasClasses) {
        pctDisplay = `${pct}%`;
        if (pct < stats.target) {
          pctClass = "pct-danger";
          fillClass = "fill-danger";
        } else if (pct < stats.target + 8) {
          pctClass = "pct-warning";
          fillClass = "fill-warning";
        } else {
          pctClass = "pct-safe";
          fillClass = "fill-safe";
        }
      }

      const iconClass = data.icon || "fa-book";
      const typeTag = data.type || "Theory";

      const card = document.createElement("div");
      card.className = `subject-item-card ${hasClasses ? 'has-data' : 'no-data'}`;
      card.innerHTML = `
        <div class="subject-item-top">
          <div class="sub-name-wrap">
            <span class="sub-icon"><i class="fa-solid ${iconClass}"></i></span>
            <div class="sub-text-col">
              <span class="sub-title" title="${subName}">${subName}</span>
              <span class="sub-type-badge">${typeTag}</span>
            </div>
          </div>
          <span class="sub-percentage-pill ${pctClass}">${pctDisplay}</span>
        </div>
        <div class="subject-item-progress-bar">
          <div class="progress-fill ${fillClass}" style="width: ${hasClasses ? Math.min(pct, 100) : 0}%;"></div>
        </div>
        <div class="subject-item-meta">
          <span class="sub-count-txt"><strong>${data.attended}</strong> / ${data.total} <small>Attended</small></span>
          <span class="sub-bunk-advice ${advice.type === 'safe' ? 'safe-bunk-text' : advice.type === 'danger' ? 'danger-bunk-text' : 'muted-bunk-text'}">
            ${advice.text}
          </span>
        </div>
      `;
      DOM.subjectBreakdownList.appendChild(card);
    });
  }

  // Render Calendar Month Grid
  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function renderCalendar() {
    const year = AppState.currentViewYear;
    const month = AppState.currentViewMonth;

    DOM.currentMonthYear.textContent = `${MONTH_NAMES[month]} ${year}`;
    DOM.calendarDaysGrid.innerHTML = "";

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const today = new Date();
    const todayKey = formatDateKey(today);
    const selectedKey = formatDateKey(AppState.selectedDate);

    // 1. Previous Month Spillover Days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const cell = document.createElement("div");
      cell.className = "cal-day-cell other-month";
      cell.innerHTML = `<span class="cal-day-number">${dayNum}</span>`;
      DOM.calendarDaysGrid.appendChild(cell);
    }

    // 2. Current Month Days
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const curDate = new Date(year, month, day);
      const dateKey = formatDateKey(curDate);
      const dayOfWeek = curDate.getDay();

      const cell = document.createElement("div");
      cell.className = "cal-day-cell";
      if (dateKey === selectedKey) cell.classList.add("selected");
      if (dateKey === todayKey) cell.classList.add("today");

      // Check attendance status for dot indicator
      const dayData = AppState.attendanceMap[dateKey];
      let dotHtml = "";

      if (dayData) {
        if (dayData.isHoliday) {
          dotHtml = `<div class="cal-day-status-indicator"><span class="status-dot dot-holiday" title="Holiday/Off"></span></div>`;
        } else {
          // Count present and absent
          let pCount = 0;
          let aCount = 0;
          if (dayData.periods) {
            Object.values(dayData.periods).forEach(st => {
              if (st === "present") pCount++;
              if (st === "absent") aCount++;
            });
          }
          if (dayData.extraClasses) {
            dayData.extraClasses.forEach(ex => {
              if (ex.status === "present") pCount++;
              if (ex.status === "absent") aCount++;
            });
          }

          if (pCount > 0 && aCount === 0) {
            dotHtml = `<div class="cal-day-status-indicator"><span class="status-dot dot-perfect" title="All Present"></span></div>`;
          } else if (aCount > 0 && pCount === 0) {
            dotHtml = `<div class="cal-day-status-indicator"><span class="status-dot dot-bunk" title="All Absent"></span></div>`;
          } else if (pCount > 0 && aCount > 0) {
            dotHtml = `<div class="cal-day-status-indicator"><span class="status-dot dot-partial" title="Partial Attendance"></span></div>`;
          }
        }
      }

      cell.innerHTML = `
        <span class="cal-day-number">${day}</span>
        ${dotHtml}
      `;

      cell.addEventListener("click", () => {
        AppState.selectedDate = new Date(year, month, day);
        renderCalendar();
        renderScheduleForSelectedDay();
      });

      DOM.calendarDaysGrid.appendChild(cell);
    }

    // 3. Next Month Fillers
    const totalRendered = firstDayIndex + totalDaysInMonth;
    const remainingCells = (7 - (totalRendered % 7)) % 7;
    for (let nextDay = 1; nextDay <= remainingCells; nextDay++) {
      const cell = document.createElement("div");
      cell.className = "cal-day-cell other-month";
      cell.innerHTML = `<span class="cal-day-number">${nextDay}</span>`;
      DOM.calendarDaysGrid.appendChild(cell);
    }
  }

  // Render Schedule For The Currently Selected Day
  function renderScheduleForSelectedDay() {
    const selDate = AppState.selectedDate;
    const dateKey = formatDateKey(selDate);
    const dayOfWeek = selDate.getDay();

    const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = DAY_NAMES[dayOfWeek];

    // Update Header Text
    DOM.selectedDateMonth.textContent = MONTH_NAMES[selDate.getMonth()].slice(0, 3).toUpperCase();
    DOM.selectedDateNum.textContent = selDate.getDate();
    DOM.selectedDayName.textContent = dayName;
    DOM.selectedFullDateStr.textContent = `${dayName}, ${selDate.getDate()} ${MONTH_NAMES[selDate.getMonth()]} ${selDate.getFullYear()}`;

    // Day Data
    if (!AppState.attendanceMap[dateKey]) {
      AppState.attendanceMap[dateKey] = {
        isHoliday: (dayOfWeek === 0 || dayOfWeek === 6), // Weekends default to holiday/off
        periods: {},
        extraClasses: []
      };
    }

    const dayRecord = AppState.attendanceMap[dateKey];

    // Holiday Status Pill
    if (dayRecord.isHoliday) {
      DOM.selectedDayStatusPill.textContent = "Holiday / No Classes";
      DOM.selectedDayStatusPill.className = "day-status-pill is-holiday";
      DOM.toggleHolidayBtn.innerHTML = `<i class="fa-solid fa-calendar-check"></i> Restore Classes`;
    } else {
      DOM.selectedDayStatusPill.textContent = "Regular Schedule";
      DOM.selectedDayStatusPill.className = "day-status-pill";
      DOM.toggleHolidayBtn.innerHTML = `<i class="fa-solid fa-mug-hot"></i> Holiday`;
    }

    DOM.periodsList.innerHTML = "";

    // If day is holiday
    if (dayRecord.isHoliday) {
      DOM.periodsList.innerHTML = `
        <div class="schedule-empty-state">
          <div class="empty-icon"><i class="fa-solid fa-mug-hot"></i></div>
          <h3 class="empty-title">Holiday / Day Off</h3>
          <p class="empty-desc">Classes are suspended or it's a weekend. Tap "Restore Classes" if you had attendance today.</p>
        </div>
      `;
      return;
    }

    const basePeriods = WEEKLY_SCHEDULE[dayOfWeek] || [];

    if (basePeriods.length === 0 && (!dayRecord.extraClasses || dayRecord.extraClasses.length === 0)) {
      DOM.periodsList.innerHTML = `
        <div class="schedule-empty-state">
          <div class="empty-icon"><i class="fa-solid fa-bed"></i></div>
          <h3 class="empty-title">No Timetable Classes</h3>
          <p class="empty-desc">No regular scheduled classes on ${dayName}. You can add extra classes if conducted.</p>
        </div>
      `;
      return;
    }

    // Render regular periods
    basePeriods.forEach(p => {
      const card = document.createElement("div");

      if (p.isRecess) {
        card.className = "period-card is-recess";
        card.innerHTML = `
          <div class="period-meta-slot">
            <div class="period-num-badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24;"><i class="fa-solid fa-utensils"></i></div>
            <div class="period-details">
              <span class="period-subject-name" style="color: #fbbf24;">Lunch Break / Recess</span>
              <div class="period-subinfo">
                <span class="period-time"><i class="fa-regular fa-clock"></i> 01:00 - 02:00 PM</span>
                <span>Campus Cafeteria / Hostel</span>
              </div>
            </div>
          </div>
        `;
        DOM.periodsList.appendChild(card);
        return;
      }

      const subjectName = p.getSubject ? p.getSubject(AppState.batch) : p.subject;
      const facultyName = p.getFaculty ? p.getFaculty(AppState.batch) : (p.faculty || "-");

      // Check if period is inactive for current batch (e.g. Mech Lab batch split)
      if (p.isBatchSpecific && p.activeBatch !== AppState.batch) {
        card.className = "period-card state-cancelled";
        card.innerHTML = `
          <div class="period-meta-slot">
            <div class="period-num-badge">${p.period}</div>
            <div class="period-details">
              <span class="period-subject-name">${subjectName} <span class="badge-tag">Other Batch</span></span>
              <div class="period-subinfo">
                <span class="period-time"><i class="fa-regular fa-clock"></i> ${p.time}</span>
                <span>Free Slot for Batch ${AppState.batch}</span>
              </div>
            </div>
          </div>
        `;
        DOM.periodsList.appendChild(card);
        return;
      }

      // Period Status
      const status = dayRecord.periods[p.id] || "none";
      let statusClass = "pill-none";
      let statusText = "Not Marked";
      let statusIcon = '<i class="fa-solid fa-minus"></i>';
      let cardState = "";

      if (status === "present") {
        statusClass = "pill-present";
        statusText = "Present";
        statusIcon = '<i class="fa-solid fa-check"></i>';
        cardState = "state-present";
      } else if (status === "absent") {
        statusClass = "pill-absent";
        statusText = "Absent / Spik";
        statusIcon = '<i class="fa-solid fa-xmark"></i>';
        cardState = "state-absent";
      } else if (status === "cancelled") {
        statusClass = "pill-cancelled";
        statusText = "Cancelled";
        statusIcon = '<i class="fa-solid fa-ban"></i>';
        cardState = "state-cancelled";
      }

      card.className = `period-card ${cardState}`;
      card.innerHTML = `
        <div class="period-meta-slot">
          <div class="period-num-badge">${p.period}</div>
          <div class="period-details">
            <span class="period-subject-name">
              ${subjectName}
              ${p.isLab ? `<span class="lab-tag"><i class="fa-solid fa-flask"></i> Lab (${p.countWeight} Hrs)</span>` : ''}
              ${p.isActivity ? `<span class="lab-tag" style="background: rgba(234, 179, 8, 0.2); color: #fef08a; border-color: rgba(234, 179, 8, 0.4);"><i class="fa-solid fa-flag"></i> Activity</span>` : ''}
            </span>
            <div class="period-subinfo">
              <span class="period-time"><i class="fa-regular fa-clock"></i> ${p.time}</span>
              <span class="period-faculty"><i class="fa-solid fa-chalkboard-user"></i> ${facultyName}</span>
            </div>
          </div>
        </div>
        <div class="period-action-wrap">
          <div class="period-status-pill ${statusClass}">
            ${statusIcon} ${statusText}
          </div>
        </div>
      `;

      // Tap to cycle status: none -> present -> absent -> none
      card.addEventListener("click", () => {
        cyclePeriodStatus(dateKey, p.id);
      });

      DOM.periodsList.appendChild(card);
    });

    // Render extra classes if any
    if (dayRecord.extraClasses && dayRecord.extraClasses.length > 0) {
      dayRecord.extraClasses.forEach((extra, index) => {
        const extraCard = document.createElement("div");
        let statusClass = "pill-none";
        let statusText = "Not Marked";
        let statusIcon = '<i class="fa-solid fa-minus"></i>';
        let cardState = "";

        if (extra.status === "present") {
          statusClass = "pill-present";
          statusText = "Present";
          statusIcon = '<i class="fa-solid fa-check"></i>';
          cardState = "state-present";
        } else if (extra.status === "absent") {
          statusClass = "pill-absent";
          statusText = "Absent / Spik";
          statusIcon = '<i class="fa-solid fa-xmark"></i>';
          cardState = "state-absent";
        }

        extraCard.className = `period-card ${cardState}`;
        extraCard.innerHTML = `
          <div class="period-meta-slot">
            <div class="period-num-badge" style="background: rgba(79, 140, 255, 0.2); color: #93c5fd;"><i class="fa-solid fa-star"></i></div>
            <div class="period-details">
              <span class="period-subject-name">
                ${extra.subject}
                <span class="extra-tag">Extra Class</span>
              </span>
              <div class="period-subinfo">
                <span class="period-time"><i class="fa-regular fa-clock"></i> ${extra.timeSlot}</span>
              </div>
            </div>
          </div>
          <div class="period-action-wrap">
            <div class="period-status-pill ${statusClass}">
              ${statusIcon} ${statusText}
            </div>
            <button class="period-more-btn delete-extra-btn" title="Remove Extra Class" data-index="${index}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `;

        // Tap on card cycles extra class status
        extraCard.addEventListener("click", (e) => {
          if (e.target.closest(".delete-extra-btn")) return;
          cycleExtraClassStatus(dateKey, index);
        });

        // Delete extra class handler
        const delBtn = extraCard.querySelector(".delete-extra-btn");
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          dayRecord.extraClasses.splice(index, 1);
          saveState();
          renderScheduleForSelectedDay();
          updateHeaderStats();
          renderCalendar();
          showToast("Extra class removed");
        });

        DOM.periodsList.appendChild(extraCard);
      });
    }
  }

  // Cycle Status function: None -> Present -> Absent -> None
  function cyclePeriodStatus(dateKey, periodId) {
    if (!AppState.attendanceMap[dateKey]) {
      AppState.attendanceMap[dateKey] = { isHoliday: false, periods: {}, extraClasses: [] };
    }
    const current = AppState.attendanceMap[dateKey].periods[periodId] || "none";
    let nextStatus = "present";

    if (current === "none") {
      nextStatus = "present";
    } else if (current === "present") {
      nextStatus = "absent";
    } else if (current === "absent") {
      nextStatus = "none";
    }

    if (nextStatus === "none") {
      delete AppState.attendanceMap[dateKey].periods[periodId];
    } else {
      AppState.attendanceMap[dateKey].periods[periodId] = nextStatus;
    }

    saveState();
    renderScheduleForSelectedDay();
    updateHeaderStats();
    renderCalendar();
  }

  function cycleExtraClassStatus(dateKey, extraIndex) {
    const extra = AppState.attendanceMap[dateKey].extraClasses[extraIndex];
    if (!extra) return;

    if (extra.status === "none") extra.status = "present";
    else if (extra.status === "present") extra.status = "absent";
    else extra.status = "none";

    saveState();
    renderScheduleForSelectedDay();
    updateHeaderStats();
    renderCalendar();
  }

  // Populate Faculty Directory Modal
  function renderFacultyDirectory() {
    DOM.facultyListGrid.innerHTML = "";
    FACULTY_DIRECTORY.forEach(fac => {
      const card = document.createElement("div");
      card.className = "faculty-card";
      card.innerHTML = `
        <span class="fac-subject-tag">${fac.subject}</span>
        <h4 class="fac-name">${fac.name}</h4>
        <div class="fac-contact-row">
          ${fac.phone !== "-" ? `<a href="tel:${fac.phone.split('/')[0].trim()}" class="fac-link"><i class="fa-solid fa-phone"></i> ${fac.phone}</a>` : ''}
          ${fac.email !== "-" ? `<a href="mailto:${fac.email.split('&')[0].trim()}" class="fac-link"><i class="fa-solid fa-envelope"></i> ${fac.email}</a>` : ''}
          <span style="color: var(--text-dim); font-size: 0.72rem;"><i class="fa-solid fa-building"></i> ${fac.dept}</span>
        </div>
      `;
      DOM.facultyListGrid.appendChild(card);
    });
  }

  // Simple Toast Manager
  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = "toast";
    let icon = '<i class="fa-solid fa-circle-check" style="color: var(--success);"></i>';
    if (type === "error") icon = '<i class="fa-solid fa-circle-exclamation" style="color: var(--danger);"></i>';
    toast.innerHTML = `${icon} <span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // =========================================================================
  // 6. EVENT LISTENERS & USER INTERACTIONS
  // =========================================================================

  function initEventListeners() {
    // Batch Switcher
    DOM.batchC1Btn.addEventListener("click", () => {
      AppState.batch = "C1";
      DOM.batchC1Btn.classList.add("active");
      DOM.batchC2Btn.classList.remove("active");
      saveState();
      renderScheduleForSelectedDay();
      updateHeaderStats();
      showToast("Switched to Batch C1 Timetable");
    });

    DOM.batchC2Btn.addEventListener("click", () => {
      AppState.batch = "C2";
      DOM.batchC2Btn.classList.add("active");
      DOM.batchC1Btn.classList.remove("active");
      saveState();
      renderScheduleForSelectedDay();
      updateHeaderStats();
      showToast("Switched to Batch C2 Timetable");
    });

    // Month Navigation
    DOM.prevMonthBtn.addEventListener("click", () => {
      AppState.currentViewMonth--;
      if (AppState.currentViewMonth < 0) {
        AppState.currentViewMonth = 11;
        AppState.currentViewYear--;
      }
      renderCalendar();
    });

    DOM.nextMonthBtn.addEventListener("click", () => {
      AppState.currentViewMonth++;
      if (AppState.currentViewMonth > 11) {
        AppState.currentViewMonth = 0;
        AppState.currentViewYear++;
      }
      renderCalendar();
    });

    DOM.jumpTodayBtn.addEventListener("click", () => {
      const today = new Date();
      AppState.selectedDate = today;
      AppState.currentViewMonth = today.getMonth();
      AppState.currentViewYear = today.getFullYear();
      renderCalendar();
      renderScheduleForSelectedDay();
    });

    // Day Quick Actions
    DOM.markAllPresentBtn.addEventListener("click", () => {
      const dateKey = formatDateKey(AppState.selectedDate);
      const dayOfWeek = AppState.selectedDate.getDay();
      const basePeriods = WEEKLY_SCHEDULE[dayOfWeek] || [];

      if (!AppState.attendanceMap[dateKey]) {
        AppState.attendanceMap[dateKey] = { isHoliday: false, periods: {}, extraClasses: [] };
      }
      AppState.attendanceMap[dateKey].isHoliday = false;

      basePeriods.forEach(p => {
        if (!p.isRecess && (!p.isBatchSpecific || p.activeBatch === AppState.batch)) {
          AppState.attendanceMap[dateKey].periods[p.id] = "present";
        }
      });

      if (AppState.attendanceMap[dateKey].extraClasses) {
        AppState.attendanceMap[dateKey].extraClasses.forEach(ex => ex.status = "present");
      }

      saveState();
      renderScheduleForSelectedDay();
      updateHeaderStats();
      renderCalendar();
      showToast("All classes marked Present!");
    });

    DOM.markAllAbsentBtn.addEventListener("click", () => {
      const dateKey = formatDateKey(AppState.selectedDate);
      const dayOfWeek = AppState.selectedDate.getDay();
      const basePeriods = WEEKLY_SCHEDULE[dayOfWeek] || [];

      if (!AppState.attendanceMap[dateKey]) {
        AppState.attendanceMap[dateKey] = { isHoliday: false, periods: {}, extraClasses: [] };
      }
      AppState.attendanceMap[dateKey].isHoliday = false;

      basePeriods.forEach(p => {
        if (!p.isRecess && (!p.isBatchSpecific || p.activeBatch === AppState.batch)) {
          AppState.attendanceMap[dateKey].periods[p.id] = "absent";
        }
      });

      if (AppState.attendanceMap[dateKey].extraClasses) {
        AppState.attendanceMap[dateKey].extraClasses.forEach(ex => ex.status = "absent");
      }

      saveState();
      renderScheduleForSelectedDay();
      updateHeaderStats();
      renderCalendar();
      showToast("All classes marked Absent / Spik", "error");
    });

    DOM.toggleHolidayBtn.addEventListener("click", () => {
      const dateKey = formatDateKey(AppState.selectedDate);
      if (!AppState.attendanceMap[dateKey]) {
        AppState.attendanceMap[dateKey] = { isHoliday: false, periods: {}, extraClasses: [] };
      }
      AppState.attendanceMap[dateKey].isHoliday = !AppState.attendanceMap[dateKey].isHoliday;
      saveState();
      renderScheduleForSelectedDay();
      updateHeaderStats();
      renderCalendar();
      showToast(AppState.attendanceMap[dateKey].isHoliday ? "Day marked as Holiday" : "Holiday removed");
    });

    // Modals Handling
    DOM.openTimetableBtn.addEventListener("click", () => {
      DOM.timetableModal.classList.add("active");
    });
    DOM.closeTimetableModal.addEventListener("click", () => {
      DOM.timetableModal.classList.remove("active");
    });

    DOM.openFacultyBtn.addEventListener("click", () => {
      DOM.facultyModal.classList.add("active");
      renderFacultyDirectory();
    });
    DOM.closeFacultyModal.addEventListener("click", () => {
      DOM.facultyModal.classList.remove("active");
    });

    DOM.openSettingsBtn.addEventListener("click", () => {
      DOM.targetCriteriaInput.value = AppState.targetPercentage;
      DOM.settingsModal.classList.add("active");
    });
    DOM.closeSettingsModal.addEventListener("click", () => {
      DOM.settingsModal.classList.remove("active");
    });

    // Close modal on outside click
    document.querySelectorAll(".modal-overlay").forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
      });
    });

    // Target Criteria Input Change
    DOM.targetCriteriaInput.addEventListener("input", (e) => {
      const val = Number(e.target.value);
      if (val >= 50 && val <= 100) {
        AppState.targetPercentage = val;
        saveState();
        updateHeaderStats();
      }
    });

    // Export Backup JSON
    DOM.exportDataBtn.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `NITRR_Attendance_Backup_${formatDateKey(new Date())}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Attendance backup downloaded!");
    });

    // Import Backup JSON
    DOM.importDataInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported.attendanceMap) {
            AppState.attendanceMap = imported.attendanceMap;
            if (imported.batch) AppState.batch = imported.batch;
            if (imported.targetPercentage) AppState.targetPercentage = imported.targetPercentage;

            saveState();
            renderCalendar();
            renderScheduleForSelectedDay();
            updateHeaderStats();
            DOM.settingsModal.classList.remove("active");
            showToast("Backup restored successfully!");
          } else {
            showToast("Invalid backup file format", "error");
          }
        } catch (err) {
          showToast("Error reading file", "error");
        }
      };
      reader.readAsText(file);
    });

    // Reset All Records
    DOM.resetAllDataBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all attendance records? This cannot be undone.")) {
        AppState.attendanceMap = {};
        saveState();
        renderCalendar();
        renderScheduleForSelectedDay();
        updateHeaderStats();
        DOM.settingsModal.classList.remove("active");
        showToast("All records reset successfully");
      }
    });

    // Extra Class Modal Open/Close/Submit
    DOM.addExtraClassBtn.addEventListener("click", () => {
      const dateKey = formatDateKey(AppState.selectedDate);
      DOM.extraClassModalDate.textContent = `Adding class for ${DOM.selectedFullDateStr.textContent}`;
      DOM.extraClassModal.classList.add("active");
    });
    DOM.closeExtraClassModal.addEventListener("click", () => {
      DOM.extraClassModal.classList.remove("active");
    });
    DOM.cancelExtraClassBtn.addEventListener("click", () => {
      DOM.extraClassModal.classList.remove("active");
    });

    DOM.extraSubjectSelect.addEventListener("change", (e) => {
      if (e.target.value === "Other") {
        DOM.customSubjectField.style.display = "block";
      } else {
        DOM.customSubjectField.style.display = "none";
      }
    });

    DOM.extraClassForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const dateKey = formatDateKey(AppState.selectedDate);
      let subject = DOM.extraSubjectSelect.value;
      if (subject === "Other") {
        subject = DOM.customSubjectInput.value.trim() || "Extra Class";
      }
      const timeSlot = DOM.extraTimeSlot.value.trim() || "Extra Slot";
      const status = DOM.extraInitialStatus.value;

      if (!AppState.attendanceMap[dateKey]) {
        AppState.attendanceMap[dateKey] = { isHoliday: false, periods: {}, extraClasses: [] };
      }
      if (!AppState.attendanceMap[dateKey].extraClasses) {
        AppState.attendanceMap[dateKey].extraClasses = [];
      }

      AppState.attendanceMap[dateKey].extraClasses.push({
        id: `extra-${Date.now()}`,
        subject,
        timeSlot,
        status
      });

      saveState();
      DOM.extraClassModal.classList.remove("active");
      DOM.extraClassForm.reset();
      DOM.customSubjectField.style.display = "none";

      renderScheduleForSelectedDay();
      updateHeaderStats();
      renderCalendar();
      showToast(`Added extra class for ${subject}!`);
    });
  }

  // =========================================================================
  // 7. APP INITIALIZATION
  // =========================================================================

  function initApp() {
    loadState();

    // Set initial batch button state
    if (AppState.batch === "C2") {
      DOM.batchC2Btn.classList.add("active");
      DOM.batchC1Btn.classList.remove("active");
    } else {
      DOM.batchC1Btn.classList.add("active");
      DOM.batchC2Btn.classList.remove("active");
    }

    initEventListeners();
    renderCalendar();
    renderScheduleForSelectedDay();
    updateHeaderStats();
    initPwaAndStorage();
  }

  // =========================================================================
  // 8. PWA SERVICE WORKER & PERSISTENT STORAGE MANAGER
  // =========================================================================

  let deferredPrompt = null;

  function initPwaAndStorage() {
    const installBtn = document.getElementById("installAppBtn");

    // 1. Request Persistent Storage from Browser
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().then((persistent) => {
        if (persistent) {
          console.log("Storage will not be cleared except by explicit user action");
        } else {
          console.log("Storage may be cleared under storage pressure");
        }
      });
    }

    // 2. Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('PWA ServiceWorker registered successfully:', reg.scope);
          })
          .catch((err) => {
            console.log('ServiceWorker registration failed:', err);
          });
      });
    }

    // 3. Catch Install Prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (installBtn) {
        installBtn.style.display = 'inline-flex';
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            showToast('NIT Attendance App Installed!');
            installBtn.style.display = 'none';
          }
          deferredPrompt = null;
        } else {
          // If already installed or browser doesn't support direct trigger
          showToast('Tap browser menu (⋮ or Share) -> "Add to Home Screen" to install!', 'info');
        }
      });
    }

    window.addEventListener('appinstalled', () => {
      if (installBtn) installBtn.style.display = 'none';
      showToast('App installed on home screen!');
    });
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
