import * as d3 from "d3";
import type { RefObject } from "react";
import classNames from "classnames/bind";

import type { ClusterGraphElement } from "../ClusterGraph.type";
import { getStartYEndY } from "../ClusterGraph.util";
import { GRAPH_WIDTH } from "../ClusterGraph.const";
import styles from "../ClusterGraph.module.scss";

const cx = classNames.bind(styles);
// create tootip (HTML)
const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", cx("tooltip"))
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .text("Tooltip");

const calculateCirclePositions = (numOfCircles: number, startY: number, endY: number, gap: number) => {
  const positionStrategies = new Map<number, (start: number, end: number) => number[]>([
    [1, (start, end) => [(start + end) / 2]],
    [2, (start, end) => [(3 * start + end) / 4, (start + 3 * end) / 4]],
  ]);

  const strategy = positionStrategies.get(numOfCircles);

  return strategy ? strategy(startY, endY) : Array.from({ length: numOfCircles }, (_, i) => startY + i * gap);
};

export const drawSubGraph = (
  svgRef: RefObject<SVGSVGElement>,
  data: ClusterGraphElement[],
  detailElementHeight: number
) => {
  const allCirclePositions = data.reduce(
    (acc, clusterData, index) => {
      if (clusterData.selected.current.includes(index)) {
        const { startY, endY } = getStartYEndY(clusterData, index, detailElementHeight);
        const numOfCircles = clusterData.cluster.commitNodeList.length;
        const gap = (endY - startY) / (numOfCircles - 1);
        const circlePositions = calculateCirclePositions(numOfCircles, startY, endY, gap);

        const enrichedPositions = circlePositions.map((y, circleIndex) => ({ y, clusterData, circleIndex }));
        return acc.concat(enrichedPositions);
      }
      return acc;
    },
    [] as Array<{ y: number; clusterData: ClusterGraphElement; circleIndex: number }>
  );

  const circleRadius = 5;

  d3.select(svgRef.current)
    .selectAll(".circle-group")
    .data(allCirclePositions)
    .join("circle")
    .attr("class", cx("circle-group"))
    .attr("cx", GRAPH_WIDTH / 2 + 2)
    .attr("cy", (d) => d.y)
    .attr("r", circleRadius)
    .on("mouseover", (_, { clusterData, circleIndex }) => {
      const { commitNodeList } = clusterData.cluster;
      const targetIndex = commitNodeList.length - 1 - circleIndex;
      const info = commitNodeList[targetIndex].commit.message;
      tooltip.text(info);
      return tooltip.style("visibility", "visible");
    })
    .on("mousemove", (event) => {
      return tooltip.style("top", `${event.pageY - 10}px`).style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      return tooltip.style("visibility", "hidden");
    });
};
