import { FC, useState } from "react";
import { VideoProps, DateProps } from "./types/ListsProps";

const DateTime: FC<DateProps> = (props) => {
  return <p className="date">{props.date}</p>;
};

const withDateTimePretty = (WrapperComponent: FC<DateProps>) => {
  return (props: DateProps) => {
    const { date } = props;
    const currentDate = new Date(date);
    const nowDate = new Date();

    const diff = +nowDate - +currentDate;
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    let value;
    if (diffMinutes > 1440) {
      value = `${diffDays} дней назад`;
    } else if (diffMinutes > 60) {
      value = `5 часов назад`;
    } else {
      value = `12 минут назад`;
    }

    return <WrapperComponent date={value} />;
  };
};
const DateTimePretty = withDateTimePretty(DateTime);
function Video(props: VideoProps) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <DateTimePretty date={props.date} />
    </div>
  );
}

function VideoList(props: { list: VideoProps[] }) {
  return props.list.map((item, index) => (
    <Video key={index} url={item.url} date={item.date} />
  ));
}

const App: FC = () => {
  const [list, setList] = useState<VideoProps[]>([
    {
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-07-31 13:24:00",
    },
    {
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2024-02-02 14:10:00",
    },
    {
      url: "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-02-03 23:16:00",
    },
    {
      url: "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-03 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-01 16:17:00",
    },
    {
      url: "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-12-02 05:24:00",
    },
  ]);

  return <VideoList list={list} />;
};

export default App;
