import * as d3 from "d3";
import classNames from "classnames/bind";

import type { SVGElementSelection } from "../ClusterGraph.type";
import styles from "../ClusterGraph.module.scss";

const cx = classNames.bind(styles);
export const drawCommitAmountCluster = (
  container: SVGElementSelection<SVGGElement>,
  graphHeight: number,
  clusterHeight: number
) => {
  const widthScale = d3.scaleLinear().range([0, graphHeight]).domain([0, 10]);
  container
    .append("rect")
    .attr("class", cx("cluster-graph-container__commit-amount-cluster"))
    .attr("width", (d) => widthScale(Math.min(d.clusterSize, 10)))
    .attr("height", clusterHeight)
    .attr("x", (d) => (graphHeight - widthScale(Math.min(d.clusterSize, 10))) / 2);
};
