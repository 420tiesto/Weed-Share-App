import * as React from "react"

const EmojiIcon = (props:any) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 17.958C4.06 17.958.042 13.94.042 9S4.06.042 9 .042 17.958 4.06 17.958 9 13.94 17.958 9 17.958ZM9 1.292C4.75 1.292 1.292 4.75 1.292 9S4.75 16.708 9 16.708 16.708 13.25 16.708 9 13.25 1.292 9 1.292Z"
      fill="#26E757"
    />
    <path
      d="M9 13.262a4.59 4.59 0 0 1-3.88-2.12.624.624 0 1 1 1.052-.674A3.35 3.35 0 0 0 9 12.014c1.149 0 2.207-.577 2.83-1.545a.623.623 0 0 1 .863-.187.624.624 0 0 1 .188.863 4.597 4.597 0 0 1-3.881 2.12L9 13.263ZM11.282 8.113a1.232 1.232 0 1 0 0-2.463 1.232 1.232 0 0 0 0 2.463ZM6.718 8.113a1.232 1.232 0 1 0 0-2.463 1.232 1.232 0 0 0 0 2.463Z"
      fill="#26E757"
    />
  </svg>
)

export default EmojiIcon;
