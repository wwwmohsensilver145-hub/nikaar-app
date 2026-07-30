import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as jalaali from "jalaali-js";

// ============ آیکون‌های SVG ============
const Icons = {
  Home: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  CheckSquare: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  Target: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Bell: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  Calendar: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>,
  Pill: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>,
  Wallet: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  FileText: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>,
  Sun: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  Moon: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
  Search: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Plus: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Trash2: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
  X: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  ChevronLeft: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6"/></svg>,
  ChevronRight: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6"/></svg>,
  Calculator: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>,
  Volume2: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
  TrendingUp: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  TrendingDown: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>,
  Sparkles: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
  Award: (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
};

// ============ توابع تاریخ شمسی ============
const jalaliMonths = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
const jalaliWeekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const jalaliWeekDaysFull = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

function toJalali(date) {
  const d = new Date(date);
  const j = jalaali.toJalaali(d);
  return `${j.jy}/${j.jm}/${j.jd}`;
}

function toJalaliFull(date) {
  const d = new Date(date);
  const j = jalaali.toJalaali(d);
  const dayOfWeek = d.getDay();
  const persianDay = (dayOfWeek + 1) % 7;
  return `${jalaliWeekDaysFull[persianDay]}، ${j.jd} ${jalaliMonths[j.jm - 1]} ${j.jy}`;
}

function toJalaliDisplay(dateStr) {
  if (!dateStr) return "";
  const j = jalaali.toJalaali(new Date(dateStr));
  return `${j.jd} ${jalaliMonths[j.jm - 1]} ${j.jy}`;
}

function getJalaliMonthDays(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return jalaali.isLeapJalaaliYear(jy) ? 30 : 29;
}

function getFirstDayOfJalaliMonth(jy, jm) {
  const g = jalaali.toGregorian(jy, jm, 1);
  const d = new Date(g.gy, g.gm - 1, g.gd);
  return (d.getDay() + 1) % 7;
}

function getCurrentJalali() {
  const d = new Date();
  return jalaali.toJalaali(d);
}

function toPersianNum(num) {
  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/\d/g, (d) => persian[parseInt(d)] || d);
}

function convertJalaliToGregorian(jalaliDateStr) {
  if (!jalaliDateStr) return "";
  const parts = jalaliDateStr.split("/");
  if (parts.length !== 3) return "";
  const [jy, jm, jd] = parts.map(Number);
  const g = jalaali.toGregorian(jy, jm, jd);
  return `${g.gy}-${String(g.gm).padStart(2, '0')}-${String(g.gd).padStart(2, '0')}`;
}

// ============ کامپوننت DatePicker شمسی ============
function JalaliDatePicker({ value, onChange, placeholder, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempMonth, setTempMonth] = useState(() => {
    if (value) {
      const parts = value.split("/");
      if (parts.length === 3) return parseInt(parts[1]);
    }
    return getCurrentJalali().jm;
  });
  const [tempYear, setTempYear] = useState(() => {
    if (value) {
      const parts = value.split("/");
      if (parts.length === 3) return parseInt(parts[0]);
    }
    return getCurrentJalali().jy;
  });

  const daysInMonth = getJalaliMonthDays(tempYear, tempMonth);
  const firstDay = getFirstDayOfJalaliMonth(tempYear, tempMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const todayJ = getCurrentJalali();
  const isToday = (day) => todayJ.jy === tempYear && todayJ.jm === tempMonth && todayJ.jd === day;

  const prevMonth = () => {
    if (tempMonth === 1) { setTempMonth(12); setTempYear(tempYear - 1); }
    else setTempMonth(tempMonth - 1);
  };
  const nextMonth = () => {
    if (tempMonth === 12) { setTempMonth(1); setTempYear(tempYear + 1); }
    else setTempMonth(tempMonth + 1);
  };

  const selectDay = (day) => {
    const dateStr = `${tempYear}/${String(tempMonth).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl border text-right ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white/60 border-white/80 text-slate-800'} outline-none focus:ring-2 focus:ring-purple-400`}
      >
        {value || <span className="text-slate-400">{placeholder}</span>}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`absolute top-full mt-2 left-0 right-0 ${darkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-2xl p-3 z-50`}
            >
              <div className="flex justify-between items-center mb-2">
                <button type="button" onClick={prevMonth} className="p-1.5 bg-purple-500 text-white rounded-lg">
                  <Icons.ChevronRight className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm">{jalaliMonths[tempMonth - 1]} {toPersianNum(tempYear)}</span>
                <button type="button" onClick={nextMonth} className="p-1.5 bg-purple-500 text-white rounded-lg">
                  <Icons.ChevronLeft className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {jalaliWeekDays.map((d, i) => (
                  <div key={i} className={`text-[10px] font-bold ${i === 6 ? 'text-red-400' : 'text-gray-500'}`}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {blanks.map(i => <div key={`b${i}`}></div>)}
                {days.map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => selectDay(day)}
                    className={`p-1.5 rounded-lg text-xs transition-all ${
                      isToday(day) 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold' 
                        : darkMode ? 'hover:bg-white/10' : 'hover:bg-purple-100'
                    }`}
                  >
                    {toPersianNum(day)}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ کامپوننت اصلی ============
export default function App() {
  const [todos, setTodos] = useState([]);
  const [goals, setGoals] = useState([]);
  const [notes, setNotes] = useState("");
  const [reminders, setReminders] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [supplements, setSupplements] = useState([]);
  const [finances, setFinances] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [inputTodo, setInputTodo] = useState("");
  const [todoCategory, setTodoCategory] = useState("شخصی");
  const [todoPriority, setTodoPriority] = useState("متوسط");
  const [todoDate, setTodoDate] = useState("");
  const [inputGoal, setInputGoal] = useState("");
  const [reminderText, setReminderText] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [shiftType, setShiftType] = useState("صبح");
  const [supplementName, setSupplementName] = useState("");
  const [supplementTime, setSupplementTime] = useState("");
  const [supplementDate, setSupplementDate] = useState("");
  const [financeDesc, setFinanceDesc] = useState("");
  const [financeAmount, setFinanceAmount] = useState("");
  const [financeType, setFinanceType] = useState("درآمد");

  const currentJ = getCurrentJalali();
  const [jalaliMonth, setJalaliMonth] = useState(currentJ.jm);
  const [jalaliYear, setJalaliYear] = useState(currentJ.jy);

  const [calcDisplay, setCalcDisplay] = useState("0");
  const [calcPrev, setCalcPrev] = useState(null);
  const [calcOp, setCalcOp] = useState(null);
  const [calcWaiting, setCalcWaiting] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  const [activeAlarm, setActiveAlarm] = useState(null);
  const [shiftDay, setShiftDay] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("nikaar_data_v2");
    if (saved) {
      const data = JSON.parse(saved);
      setTodos(data.todos || []);
      setGoals(data.goals || []);
      setNotes(data.notes || "");
      setReminders(data.reminders || []);
      setShifts(data.shifts || []);
      setSupplements(data.supplements || []);
      setFinances(data.finances || []);
      setDarkMode(data.darkMode || false);
    }
  }, []);

  useEffect(() => {
    const data = { todos, goals, notes, reminders, shifts, supplements, finances, darkMode };
    localStorage.setItem("nikaar_data_v2", JSON.stringify(data));
  }, [todos, goals, notes, reminders, shifts, supplements, finances, darkMode]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const currentDate = now.toISOString().split('T')[0];

      reminders.forEach((r, i) => {
        if (!r.done && !r.triggered && r.date === currentDate && r.time === currentTime) {
          triggerAlarm(r, i);
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [reminders]);

  const triggerAlarm = (reminder, index) => {
    setActiveAlarm({ ...reminder, index });
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(" یادآوری نیکار", {
        body: reminder.text,
        icon: "",
        tag: `reminder-${index}`
      });
    }
    const updated = [...reminders];
    updated[index].triggered = true;
    setReminders(updated);
  };

  const addTodo = () => {
    if (inputTodo.trim()) {
      const gregorianDate = todoDate ? convertJalaliToGregorian(todoDate) : new Date().toISOString().split('T')[0];
      setTodos([...todos, {
        id: Date.now(),
        text: inputTodo, done: false,
        category: todoCategory,
        priority: todoPriority,
        date: gregorianDate,
        jalaliDate: todoDate || toJalali(new Date())
      }]);
      setInputTodo("");
      setTodoDate("");
    }
  };

  const toggleTodo = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const addGoal = () => {
    if (inputGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: inputGoal, done: false, date: new Date().toISOString().split('T')[0] }]);
      setInputGoal("");
    }
  };
  const toggleGoal = (id) => setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  
  const addReminder = () => {
    if (reminderText.trim() && reminderTime && reminderDate) {
      const gregorianDate = convertJalaliToGregorian(reminderDate);
      setReminders([...reminders, {
        id: Date.now(),
        text: reminderText,
        time: reminderTime,
        date: gregorianDate,
        jalaliDate: reminderDate,
        done: false, triggered: false
      }]);
      setReminderText("");
      setReminderTime("");
      setReminderDate("");
    }
  };
  
  const toggleReminder = (id) => setReminders(reminders.map(r => r.id === id ? { ...r, done: !r.done } : r));
  const addShift = (day) => {
    if (day && shiftType) {
      setShifts([...shifts, { id: Date.now(), day, type: shiftType }]);
    }
  };
  const addSupplement = () => {
    if (supplementName && supplementTime) {
      const gregorianDate = supplementDate ? convertJalaliToGregorian(supplementDate) : new Date().toISOString().split('T')[0];
      setSupplements([...supplements, {
        id: Date.now(),
        name: supplementName,
        time: supplementTime,
        date: gregorianDate,
        jalaliDate: supplementDate || toJalali(new Date()),
        done: false
      }]);
      setSupplementName("");
      setSupplementTime("");
      setSupplementDate("");
    }
  };
  const toggleSupplement = (id) => setSupplements(supplements.map(s => s.id === id ? { ...s, done: !s.done } : s));
  const addFinance = () => {
    if (financeDesc && financeAmount) {
      setFinances([...finances, {
        id: Date.now(),
        type: financeType,
        desc: financeDesc,
        amount: parseFloat(financeAmount),
        date: new Date().toISOString().split('T')[0]
      }]);
      setFinanceDesc("");
      setFinanceAmount("");
    }
  };
  const deleteById = (setter, list, id) => setter(list.filter(item => item.id !== id));

  const balance = finances.reduce((acc, item) => item.type === "درآمد" ? acc + item.amount : acc - item.amount, 0);
  const today = new Date().toISOString().split('T')[0];
  const todayTodos = todos.filter(t => t.date === today);
  const doneTodos = todayTodos.filter(t => t.done).length;
  const progressPercent = todayTodos.length > 0 ? Math.round((doneTodos / todayTodos.length) * 100) : 0;

  const calcInputDigit = (d) => {
    if (calcWaiting) {
      setCalcDisplay(String(d));
      setCalcWaiting(false);
    } else {
      setCalcDisplay(calcDisplay === "0" ? String(d) : calcDisplay + d);
    }
  };
  const calcInputDot = () => {
    if (calcWaiting) { setCalcDisplay("0."); setCalcWaiting(false); return; }
    if (!calcDisplay.includes(".")) setCalcDisplay(calcDisplay + ".");
  };
  const calcClear = () => { setCalcDisplay("0"); setCalcPrev(null); setCalcOp(null); setCalcWaiting(false); };
  const calcPerformOp = (nextOp) => {
    const val = parseFloat(calcDisplay);
    if (calcPrev == null) {
      setCalcPrev(val);
    } else if (calcOp) {
      const result = calculate(calcPrev, val, calcOp);
      setCalcDisplay(String(result));
      setCalcPrev(result);
    }
    setCalcWaiting(true);
    setCalcOp(nextOp);
  };
  const calculate = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : 0;
      default: return b;
    }
  };
  const calcEquals = () => {
    const val = parseFloat(calcDisplay);
    if (calcPrev != null && calcOp) {
      const result = calculate(calcPrev, val, calcOp);
      setCalcDisplay(String(result));
      setCalcPrev(null);
      setCalcOp(null);
      setCalcWaiting(true);
    }
  };
  const calcUseResult = () => {
    setFinanceAmount(calcDisplay);
    setShowCalc(false);
  };

  const bgMain = darkMode ? "bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900" : "bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50";
  const bgCard = darkMode ? "bg-white/5 backdrop-blur-xl border border-white/10" : "bg-white/80 backdrop-blur-xl border border-white/60";
  const textMain = darkMode ? "text-white" : "text-slate-800";
  const textMuted = darkMode ? "text-slate-400" : "text-slate-500";
  const inputBg = darkMode ? "bg-white/5 border-white/10 text-white placeholder-slate-500" : "bg-white/60 border-white/80 text-slate-800 placeholder-slate-400";

  const HomePage = () => {
    const todayDate = new Date();
    const jalaliFull = toJalaliFull(todayDate);
    const todayShift = shifts.find(s => s.day === today);

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <motion.div whileHover={{ scale: 1.02 }} className={`${bgCard} rounded-3xl p-6 shadow-2xl relative overflow-hidden`}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Icons.Sparkles className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-bold">سلام! 👋</h2>
            </div>
            <p className="text-purple-500 font-medium text-sm">{jalaliFull}</p>
            <div className="mt-3 flex items-center gap-2">
              <Icons.Calendar className="w-4 h-4 text-pink-500" />
              <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                شیفت: {todayShift ? todayShift.type : "ثبت نشده"}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className={`${bgCard} rounded-3xl p-6 shadow-2xl flex flex-col items-center`}>
          <div className="flex items-center gap-2 mb-3">
            <Icons.Award className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-semibold">پیشرفت امروز</h3>
          </div>
          <div className="relative w-36 h-36">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle cx="72" cy="72" r="60" stroke={darkMode ? "#374151" : "#e5e7eb"} strokeWidth="12" fill="none" />
              <motion.circle
                cx="72" cy="72" r="60"
                stroke="url(#progressGrad)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 60}
                initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - progressPercent / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.span
                  className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  {toPersianNum(progressPercent)}٪
                </motion.span>
              </div>
            </div>
          </div>
          <p className={`text-sm mt-2 ${textMuted}`}>
            {toPersianNum(doneTodos)} از {toPersianNum(todayTodos.length)} کار انجام شد
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Icons.CheckSquare, value: todos.filter(t => t.done).length, label: "انجام شده", color: "from-green-400 to-emerald-500" },
            { icon: Icons.Target, value: goals.filter(g => g.done).length, label: "اهداف", color: "from-purple-400 to-pink-500" },
            { icon: Icons.Wallet, value: balance.toLocaleString(), label: "موجودی", color: "from-blue-400 to-cyan-500" },
            { icon: Icons.Calendar, value: shifts.length, label: "شیفت", color: "from-orange-400 to-red-500" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${bgCard} rounded-2xl p-4 shadow-xl text-center cursor-pointer`}
            >
              <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${item.color} mb-2 shadow-lg`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg font-bold">{toPersianNum(item.value)}</p>
              <p className={`text-xs ${textMuted}`}>{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const BottomNav = () => {
    const tabs = [
      { id: "home", icon: Icons.Home, label: "خانه", color: "text-purple-500" },
      { id: "todos", icon: Icons.CheckSquare, label: "کارها", color: "text-green-500" },
      { id: "goals", icon: Icons.Target, label: "اهداف", color: "text-pink-500" },
      { id: "reminders", icon: Icons.Bell, label: "یادآور", color: "text-yellow-500" },
      { id: "shifts", icon: Icons.Calendar, label: "شیفت", color: "text-blue-500" },
      { id: "supplements", icon: Icons.Pill, label: "دارو", color: "text-red-500" },
      { id: "finances", icon: Icons.Wallet, label: "مالی", color: "text-emerald-500" },
      { id: "notes", icon: Icons.FileText, label: "یادداشت", color: "text-indigo-500" },
    ];

    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-xl shadow-2xl rounded-t-3xl px-1 py-2 flex justify-around items-center border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}
      >
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.85 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center px-2 py-1 rounded-xl transition-all relative ${activeTab === tab.id ? tab.color : textMuted}`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <tab.icon className="w-5 h-5 relative z-10" strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] mt-0.5 relative z-10 font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>
    );
  };

  const JalaliCalendar = () => {
    const daysInMonth = getJalaliMonthDays(jalaliYear, jalaliMonth);
    const firstDay = getFirstDayOfJalaliMonth(jalaliYear, jalaliMonth);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDay }, (_, i) => i);

    const prevMonth = () => {
      if (jalaliMonth === 1) { setJalaliMonth(12); setJalaliYear(jalaliYear - 1); }
      else setJalaliMonth(jalaliMonth - 1);
    };
    const nextMonth = () => {
      if (jalaliMonth === 12) { setJalaliMonth(1); setJalaliYear(jalaliYear + 1); }
      else setJalaliMonth(jalaliMonth + 1);
    };

    const todayJ = getCurrentJalali();
    const isTodayJ = (day) => todayJ.jy === jalaliYear && todayJ.jm === jalaliMonth && todayJ.jd === day;

    const getShiftForJalaliDay = (day) => {
      const g = jalaali.toGregorian(jalaliYear, jalaliMonth, day);
      const dateStr = `${g.gy}-${String(g.gm).padStart(2, '0')}-${String(g.gd).padStart(2, '0')}`;
      return shifts.find(s => s.day === dateStr);
    };

    const handleDayClick = (day) => {
      const g = jalaali.toGregorian(jalaliYear, jalaliMonth, day);
      const dateStr = `${g.gy}-${String(g.gm).padStart(2, '0')}-${String(g.gd).padStart(2, '0')}`;
      return dateStr;
    };

    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={prevMonth} className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
            <Icons.ChevronRight className="w-5 h-5" />
          </motion.button>
          <motion.h2 key={jalaliMonth} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold">
            {jalaliMonths[jalaliMonth - 1]} {toPersianNum(jalaliYear)}
          </motion.h2>
          <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={nextMonth} className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
            <Icons.ChevronLeft className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {jalaliWeekDays.map((d, i) => (
            <div key={i} className={`text-xs font-bold py-1 ${i === 6 ? 'text-red-400' : textMuted}`}>{d}</div>
          ))}
          {blanks.map(i => <div key={`b${i}`}></div>)}
          {days.map(day => {
            const shift = getShiftForJalaliDay(day);
            const isToday = isTodayJ(day);
            return (
              <motion.button
                key={day}
                type="button"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setShiftDay(handleDayClick(day))}
                className={`p-2 rounded-xl text-sm transition-all relative ${isToday ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold shadow-lg' : darkMode ? 'hover:bg-white/10' : 'hover:bg-purple-100'} ${shift ? 'ring-2 ring-pink-400' : ''}`}
              >
                {toPersianNum(day)}
                {shift && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"></div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const CalculatorModal = () => (
    <AnimatePresence>
      {showCalc && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCalc(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-3xl p-5 w-full max-w-xs shadow-2xl`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Icons.Calculator className="w-5 h-5 text-purple-500" />
                <h3 className="font-bold">ماشین حساب</h3>
              </div>
              <button type="button" onClick={() => setShowCalc(false)}><Icons.X className="w-5 h-5" /></button>
            </div>

            <div className={`${darkMode ? 'bg-black/40' : 'bg-gradient-to-br from-purple-50 to-pink-50'} rounded-2xl p-4 mb-3 text-right`}>
              <div className={`text-xs ${textMuted} h-4`}>{calcPrev !== null ? toPersianNum(calcPrev) + " " + (calcOp || "") : ""}</div>
              <div className="text-3xl font-bold truncate">{toPersianNum(calcDisplay)}</div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button type="button" onClick={calcClear} className="p-3 bg-red-500/20 text-red-500 rounded-xl font-bold">C</button>
              <button type="button" onClick={() => calcPerformOp("÷")} className={`p-3 ${calcOp === "÷" && calcWaiting ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-500'} rounded-xl font-bold`}>÷</button>
              <button type="button" onClick={() => calcPerformOp("×")} className={`p-3 ${calcOp === "×" && calcWaiting ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-500'} rounded-xl font-bold`}>×</button>
              <button type="button" onClick={() => calcPerformOp("-")} className={`p-3 ${calcOp === "-" && calcWaiting ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-500'} rounded-xl font-bold`}>-</button>

              {[7, 8, 9].map(n => (
                <button key={n} type="button" onClick={() => calcInputDigit(n)} className={`p-3 ${darkMode ? 'bg-white/10' : 'bg-slate-100'} rounded-xl font-bold`}>{toPersianNum(n)}</button>
              ))}
              <button type="button" onClick={() => calcPerformOp("+")} className={`p-3 ${calcOp === "+" && calcWaiting ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-500'} rounded-xl font-bold`}>+</button>

              {[4, 5, 6].map(n => (
                <button key={n} type="button" onClick={() => calcInputDigit(n)} className={`p-3 ${darkMode ? 'bg-white/10' : 'bg-slate-100'} rounded-xl font-bold`}>{toPersianNum(n)}</button>
              ))}
              <button type="button" onClick={calcEquals} className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl font-bold row-span-2">=</button>

              {[1, 2, 3].map(n => (
                <button key={n} type="button" onClick={() => calcInputDigit(n)} className={`p-3 ${darkMode ? 'bg-white/10' : 'bg-slate-100'} rounded-xl font-bold`}>{toPersianNum(n)}</button>
              ))}

              <button type="button" onClick={() => calcInputDigit(0)} className={`p-3 ${darkMode ? 'bg-white/10' : 'bg-slate-100'} rounded-xl font-bold col-span-2`}>{toPersianNum(0)}</button>
              <button type="button" onClick={calcInputDot} className={`p-3 ${darkMode ? 'bg-white/10' : 'bg-slate-100'} rounded-xl font-bold`}>.</button>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={calcUseResult}
              className="w-full mt-3 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg"
            >
              استفاده از نتیجه در مالی
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const AlarmModal = () => (
    <AnimatePresence>
      {activeAlarm && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring" }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 w-full max-w-xs shadow-2xl text-white text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="inline-block mb-4"
            >
              <Icons.Bell className="w-16 h-16" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">⏰ یادآوری!</h3>
            <p className="text-lg mb-4">{activeAlarm.text}</p>
            <p className="text-sm opacity-80 mb-6">{toPersianNum(activeAlarm.time)}</p>
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveAlarm(null)}
              className="w-full p-3 bg-white text-purple-600 rounded-xl font-bold"
            >
              متوجه شدم
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={`min-h-screen pb-24 font-sans transition-all ${bgMain} ${textMain}`} dir="rtl">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 rounded-2xl shadow-lg"
            >
              <Icons.Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">نیکار</h1>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9, rotate: 180 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-2xl shadow-lg ${darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-800/10 text-slate-700'}`}
          >
            {darkMode ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
          <Icons.Search className={`absolute right-3 top-3.5 w-5 h-5 ${textMuted}`} />
          <input
            type="text"
            placeholder="جستجو..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-3 pr-10 rounded-2xl border ${inputBg} backdrop-blur-xl focus:ring-2 focus:ring-purple-400 outline-none shadow-lg`}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "home" && <HomePage />}

            {activeTab === "todos" && (
              <div className={`${bgCard} rounded-3xl p-5 shadow-xl space-y-3`}>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} placeholder="کار جدید..." onKeyDown={(e) => e.key === "Enter" && addTodo()} className={`flex-1 px-4 py-3 rounded-xl border ${inputBg} outline-none focus:ring-2 focus:ring-purple-400`} />
                    <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={addTodo} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
                      <Icons.Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <div className="flex gap-2">
                    <select value={todoCategory} onChange={(e) => setTodoCategory(e.target.value)} className={`flex-1 px-3 py-2 rounded-xl border ${inputBg} outline-none text-sm`}>
                      <option value="شخصی">👤 شخصی</option>
                      <option value="کاری">💼 کاری</option>
                      <option value="تحصیلی">📚 تحصیلی</option>
                    </select>
                    <select value={todoPriority} onChange={(e) => setTodoPriority(e.target.value)} className={`flex-1 px-3 py-2 rounded-xl border ${inputBg} outline-none text-sm`}>
                      <option value="کم">🟢 کم</option>
                      <option value="متوسط">🟡 متوسط</option>
                      <option value="فوری"> فوری</option>
                    </select>
                  </div>
                  <JalaliDatePicker
                    value={todoDate}
                    onChange={setTodoDate}
                    placeholder="تاریخ (اختیاری)"
                    darkMode={darkMode}
                  />
                </div>
                <AnimatePresence>
                  {todos.filter(t => t.text.includes(searchQuery)).map((todo) => (
                    <motion.div
                      key={todo.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white/60'} shadow-sm`}
                    >
                      <div className="flex items-center gap-2 flex-wrap flex-1">
                        <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} className="w-5 h-5 accent-purple-500" />
                        <span className={todo.done ? "line-through opacity-50" : ""}>{todo.text}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-purple-500/30 text-purple-200' : 'bg-purple-100 text-purple-700'}`}>{todo.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${todo.priority === 'فوری' ? 'bg-red-500/20 text-red-500' : todo.priority === 'متوسط' ? 'bg-yellow-500/20 text-yellow-600' : 'bg-green-500/20 text-green-600'}`}>{todo.priority}</span>
                        {todo.jalaliDate && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-blue-500/30 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                             {todo.jalaliDate}
                          </span>
                        )}
                      </div>
                      <motion.button type="button" whileTap={{ scale: 0.8 }} onClick={() => deleteById(setTodos, todos, todo.id)} className="text-red-400 p-1">
                        <Icons.Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {activeTab === "goals" && (
              <div className={`${bgCard} rounded-3xl p-5 shadow-xl space-y-3`}>
                <div className="flex gap-2">
                  <input value={inputGoal} onChange={(e) => setInputGoal(e.target.value)} placeholder="هدف جدید..." onKeyDown={(e) => e.key === "Enter" && addGoal()} className={`flex-1 px-4 py-3 rounded-xl border ${inputBg} outline-none`} />
                  <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={addGoal} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
                    <Icons.Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                <AnimatePresence>
                  {goals.map((g) => (
                    <motion.div key={g.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 20 }} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white/60'}`}>
                      <div className="flex items-center gap-2 flex-1">
                        <input type="checkbox" checked={g.done} onChange={() => toggleGoal(g.id)} className="w-5 h-5 accent-pink-500" />
                        <span className={g.done ? "line-through opacity-50" : ""}>{g.text}</span>
                      </div>
                      <motion.button type="button" whileTap={{ scale: 0.8 }} onClick={() => deleteById(setGoals, goals, g.id)} className="text-red-400">
                        <Icons.Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {activeTab === "reminders" && (
              <div className={`${bgCard} rounded-3xl p-5 shadow-xl space-y-3`}>
                <div className={`${darkMode ? 'bg-yellow-500/10' : 'bg-yellow-50'} border ${darkMode ? 'border-yellow-500/30' : 'border-yellow-200'} rounded-xl p-3 text-xs`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icons.Volume2 className="w-4 h-4 text-yellow-600" />
                    <span className="font-bold">یادآور فعال</span>
                  </div>
                  <p className={textMuted}>در زمان تعیین‌شده، آلارم روی گوشی شما به‌صدا درمی‌آید.</p>
                </div>
                <div className="space-y-2">
                  <input value={reminderText} onChange={(e) => setReminderText(e.target.value)} placeholder="متن یادآوری..." className={`w-full px-4 py-3 rounded-xl border ${inputBg} outline-none`} />
                  <div className="flex gap-2">
                    <JalaliDatePicker
                      value={reminderDate}
                      onChange={setReminderDate}
                      placeholder="تاریخ"
                      darkMode={darkMode}
                    />
                    <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} className={`flex-1 px-4 py-3 rounded-xl border ${inputBg} outline-none`} />
                    <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={addReminder} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
                      <Icons.Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <AnimatePresence>
                  {reminders.filter(r => r.text.includes(searchQuery)).map((r) => (
                    <motion.div key={r.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white/60'}`}>
                      <div className="flex items-center gap-2 flex-1 flex-wrap">
                        <input type="checkbox" checked={r.done} onChange={() => toggleReminder(r.id)} className="w-5 h-5 accent-purple-500" />
                        <Icons.Bell className={`w-4 h-4 ${r.triggered ? 'text-green-500' : 'text-purple-500'}`} />
                        <span className={r.done ? "line-through opacity-50" : ""}>{r.text}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-purple-500/30' : 'bg-purple-100'}`}> {r.jalaliDate}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-pink-500/30' : 'bg-pink-100'}`}>⏰ {toPersianNum(r.time)}</span>
                      </div>
                      <motion.button type="button" whileTap={{ scale: 0.8 }} onClick={() => deleteById(setReminders, reminders, r.id)} className="text-red-400">
                        <Icons.Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {activeTab === "shifts" && (
              <div className={`${bgCard} rounded-3xl p-5 shadow-xl space-y-4`}>
                <JalaliCalendar />
                <div className="space-y-2">
                  <h3 className="font-bold flex items-center gap-2">
                    <Icons.Calendar className="w-4 h-4 text-purple-500" />
                    ثبت شیفت {shiftDay && `برای ${toPersianNum(toJalali(shiftDay))}`}
                  </h3>
                  <div className="flex gap-2">
                    <select value={shiftType} onChange={(e) => setShiftType(e.target.value)} className={`flex-1 px-3 py-2 rounded-xl border ${inputBg} outline-none`}>
                      <option value="صبح">☀️ صبح</option>
                      <option value="عصر">️ عصر</option>
                      <option value="شب">🌙 شب</option>
                    </select>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => { if (shiftDay) { addShift(shiftDay); setShiftDay(""); } }}
                      disabled={!shiftDay}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg disabled:opacity-50"
                    >
                      ثبت
                    </motion.button>
                  </div>
                </div>
                <AnimatePresence>
                  {shifts.map((s) => (
                    <motion.div key={s.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white/60'}`}>
                      <div>
                        <span className="font-bold">{toPersianNum(toJalali(s.day))}</span>
                        <span className={`text-xs mr-2 px-2 py-0.5 rounded-full ${darkMode ? 'bg-purple-500/30' : 'bg-purple-100'}`}>{s.type}</span>
                      </div>
                      <motion.button type="button" whileTap={{ scale: 0.8 }} onClick={() => deleteById(setShifts, shifts, s.id)} className="text-red-400">
                        <Icons.Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {activeTab === "supplements" && (
              <div className={`${bgCard} rounded-3xl p-5 shadow-xl space-y-3`}>
                <div className="space-y-2">
                  <input value={supplementName} onChange={(e) => setSupplementName(e.target.value)} placeholder="نام مکمل..." className={`w-full px-4 py-3 rounded-xl border ${inputBg} outline-none`} />
                  <div className="flex gap-2">
                    <JalaliDatePicker
                      value={supplementDate}
                      onChange={setSupplementDate}
                      placeholder="تاریخ"
                      darkMode={darkMode}
                    />
                    <input type="time" value={supplementTime} onChange={(e) => setSupplementTime(e.target.value)} className={`flex-1 px-4 py-3 rounded-xl border ${inputBg} outline-none`} />
                    <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={addSupplement} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
                      <Icons.Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <AnimatePresence>
                  {supplements.map((s) => (
                    <motion.div key={s.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white/60'}`}>
                      <div className="flex items-center gap-2 flex-1">
                        <input type="checkbox" checked={s.done} onChange={() => toggleSupplement(s.id)} className="w-5 h-5 accent-pink-500" />
                        <Icons.Pill className="w-4 h-4 text-pink-500" />
                        <span className={s.done ? "line-through opacity-50" : ""}>{s.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-blue-500/30' : 'bg-blue-100'}`}> {s.jalaliDate}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-pink-500/30' : 'bg-pink-100'}`}>⏰ {toPersianNum(s.time)}</span>
                      </div>
                      <motion.button type="button" whileTap={{ scale: 0.8 }} onClick={() => deleteById(setSupplements, supplements, s.id)} className="text-red-400">
                        <Icons.Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {activeTab === "finances" && (
              <div className={`${bgCard} rounded-3xl p-5 shadow-xl space-y-3`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-2xl text-center ${balance >= 0 ? 'bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-500/30' : 'bg-gradient-to-br from-red-400/20 to-pink-500/20 border border-red-500/30'}`}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {balance >= 0 ? <Icons.TrendingUp className="w-5 h-5 text-green-500" /> : <Icons.TrendingDown className="w-5 h-5 text-red-500" />}
                    <p className="text-sm">موجودی کل</p>
                  </div>
                  <p className="text-2xl font-bold">{toPersianNum(balance.toLocaleString())} تومان</p>
                </motion.div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCalc(true)}
                  className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Icons.Calculator className="w-5 h-5" />
                  ماشین حساب
                </motion.button>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <select value={financeType} onChange={(e) => setFinanceType(e.target.value)} className={`flex-1 px-3 py-2 rounded-xl border ${inputBg} outline-none`}>
                      <option value="درآمد">📈 درآمد</option>
                      <option value="هزینه">📉 هزینه</option>
                    </select>
                    <input value={financeAmount} onChange={(e) => setFinanceAmount(e.target.value)} type="number" placeholder="مبلغ" className={`flex-1 px-4 py-3 rounded-xl border ${inputBg} outline-none`} />
                  </div>
                  <div className="flex gap-2">
                    <input value={financeDesc} onChange={(e) => setFinanceDesc(e.target.value)} placeholder="توضیحات" className={`flex-1 px-4 py-3 rounded-xl border ${inputBg} outline-none`} />
                    <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={addFinance} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
                      <Icons.Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <AnimatePresence>
                  {finances.filter(f => f.desc.includes(searchQuery)).map((f) => (
                    <motion.div key={f.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white/60'}`}>
                      <div className="flex-1">
                        <p className={`font-bold flex items-center gap-1 ${f.type === 'درآمد' ? 'text-green-500' : 'text-red-500'}`}>
                          {f.type === 'درآمد' ? <Icons.TrendingUp className="w-4 h-4" /> : <Icons.TrendingDown className="w-4 h-4" />}
                          {toPersianNum((f.type === 'درآمد' ? '+' : '-') + f.amount.toLocaleString())}
                        </p>
                        <p className={`text-sm ${textMuted}`}>{f.desc}</p>
                      </div>
                      <motion.button type="button" whileTap={{ scale: 0.8 }} onClick={() => deleteById(setFinances, finances, f.id)} className="text-red-400">
                        <Icons.Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {activeTab === "notes" && (
              <div className={`${bgCard} rounded-3xl p-5 shadow-xl`}>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="یادداشت‌های شما..." rows={12} className={`w-full px-4 py-3 rounded-xl border ${inputBg} outline-none resize-none focus:ring-2 focus:ring-purple-400`} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <BottomNav />
        <CalculatorModal />
        <AlarmModal />
      </div>
    </div>
  );
}