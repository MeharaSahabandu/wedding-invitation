"use client";
import { useState } from "react";
const DAYS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }
export default function CalendarWidget({ eventDates = [] }: { eventDates?: string[] }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  function prev() { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); }
  function next() { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); }
  const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  const isEvent = (d: number) => eventDates.includes(`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`);
  const cells: (number|null)[] = [...Array(getFirstDay(year,month)).fill(null), ...Array.from({length:getDaysInMonth(year,month)},(_,i)=>i+1)];
  while (cells.length % 7 !== 0) cells.push(null);
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg></button>
        <span className="text-sm font-semibold text-gray-800">{MONTHS[month]} {year}</span>
        <button onClick={next} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg></button>
      </div>
      <div className="grid grid-cols-7 mb-2">{DAYS.map(d=><div key={d} className="text-center text-[10px] text-gray-400 font-medium py-1">{d}</div>)}</div>
      <div className="grid grid-cols-7 gap-y-1">{cells.map((day,i)=><div key={i} className="flex items-center justify-center h-8">{day?<button className={`w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors ${isToday(day)||isEvent(day)?"bg-orange-500 text-white font-semibold":"text-gray-700 hover:bg-gray-100"}`}>{day}</button>:null}</div>)}</div>
    </div>
  );
}
