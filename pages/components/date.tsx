import { FC } from "react"

type DateProps = {
  dateString: string
}

const Date = ({ dateString }: DateProps): React.ReactNode => {
  return <time dateTime={dateString}>{dateString}</time>
}

export default Date
