import { FC } from 'react';

interface DateProps {
  dateString: string;
}

const Date: FC<DateProps> = ({ dateString }) => {
  return <time dateTime={dateString}>{dateString}</time>;
};

export default Date;