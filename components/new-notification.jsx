import React from "react"
import { MdLabelImportant } from "react-icons/md"

const NewNotification = ({
  title,
  important,
  createdAt,
  viewed,
  id,
  setViewed,
}) => {
  const formatDate = (date) => {
    const min = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000 / 60
    )
    if (min <= 59 && min === 1) return min + "min ago"
    if (min <= 59) return min + "mins ago"

    const hour = Math.floor(min / 60)
    if (hour <= 23 && hour === 1) return hour + "hr ago"
    if (hour <= 23) return hour + "hrs ago"

    const day = Math.floor(hour / 24)
    if (day <= 30 && day === 1) return day + "day ago"
    if (day <= 30) return day + "days ago"
  }

  return (
    <div
      onClick={() => {
        setViewed(id)
      }}
      className={
        !viewed
          ? "bg-slate-100 hover:bg-white cursor-pointer flex items-center w-[200px] h-[40px] border-0 border-b-[0.5px] border-slate-300 border-solid text-[9px] p-[2px] box-border"
          : "cursor-pointer flex items-center w-[200px] h-[40px] border-0 border-b-[0.5px] border-slate-300 border-solid text-[9px] p-[2px] box-border"
      }
    >
      <div className="flex flex-col justify-between items-end w-full">
        <div className="flex justify-start items-center w-full max-h-[18px]">
          <div className="min-w-[18px]">
            {important && (
              <MdLabelImportant style={{ fontSize: 18, color: "gold" }} />
            )}
          </div>
          <div className="h-full min-w-[67px]">New message:</div>
          <span className="ml-[4px] hover:text-blue-500 text-ellipsis max-h-[18px] whitespace-nowrap overflow-hidden">
            {title.slice(0)}
          </span>
        </div>
        <span className="h-[5px] text-[9px]">{formatDate(createdAt)}</span>
      </div>
    </div>
  )
}
export default NewNotification
