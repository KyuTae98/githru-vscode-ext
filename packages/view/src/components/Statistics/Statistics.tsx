import classNames from "classnames/bind";

import { AuthorBarChart } from "./AuthorBarChart";
import { FileIcicleSummary } from "./FileIcicleSummary";
import styles from "./Statistics.module.scss";

const cx = classNames.bind(styles);
const Statistics = () => {
  return (
    <div className={cx("statistics")}>
      <AuthorBarChart />
      <FileIcicleSummary />
    </div>
  );
};

export default Statistics;
