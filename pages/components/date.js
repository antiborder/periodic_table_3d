import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO('2014-02-11T11:30:30')
  return <time dateTime={dateString}>{dateString}</time>;
}