import "reflect-metadata";
import cn from "classnames";
import classNames from "classnames/bind";
import { FiRefreshCcw } from "react-icons/fi";

import { throttle } from "utils";
import { useGlobalData } from "hooks";
import { sendRefreshDataCommand } from "services";

import styles from "./RefreshButton.module.scss";

const cx = classNames.bind(styles);
const RefreshButton = () => {
  const { loading, setLoading, selectedBranch } = useGlobalData();

  const refreshHandler = throttle(() => {
    setLoading(true);
    sendRefreshDataCommand(selectedBranch);
  }, 3000);

  return (
    <button
      type="button"
      className={cx(cn("refresh-button"))}
      onClick={refreshHandler}
    >
      <FiRefreshCcw
        className={cx(cn("refresh-button-icon"), cx({ "refresh-button-icon--loading": loading }))}
        stroke="white"
      />
    </button>
  );
};

export default RefreshButton;
