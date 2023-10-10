import classNames from "classnames/bind";

import type { AuthorInfo } from "types";

import styles from "./Author.module.scss";

const cx = classNames.bind(styles);
const Author = ({ name, src }: AuthorInfo) => {
  return (
    <div
      className={cx("author")}
      data-tooltip-text={name}
    >
      <img
        src={src}
        alt=""
      />
    </div>
  );
};

export default Author;
