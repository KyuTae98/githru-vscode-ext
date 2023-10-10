import classNames from "classnames/bind";

import type { SVGElementSelection } from "../ClusterGraph.type";
import styles from "../ClusterGraph.module.scss"

const cx = classNames.bind(styles);
export const drawClusterBox = (
  container: SVGElementSelection<SVGGElement>,
  graphWidth: number,
  clusterHeight: number
) => {
  container
    .append("rect")
    .attr("class", cx("cluster-graph-container__box"))
    .attr("width", graphWidth)
    .attr("height", clusterHeight);
};
