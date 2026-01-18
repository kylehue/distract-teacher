import type { ApexOptions } from "apexcharts";
import type { GlobalThemeOverrides } from "naive-ui";

const baseThemeOverrides: GlobalThemeOverrides = {
   Tooltip: {
      padding: "4px 8px",
      peers: { Popover: { fontSize: "0.8em" } },
   },
   Tree: {
      nodeHeight: "34px",
      lineHeight: "0px",
      nodeWrapperPadding: "0",
   },
   Form: {
      feedbackFontSizeSmall: "0.6em",
      feedbackFontSizeMedium: "0.8em",
      feedbackFontSizeLarge: "1em",
      feedbackHeightSmall: "1.3em",
      feedbackHeightMedium: "1.5em",
      feedbackHeightLarge: "1.7em",
   },
   DataTable: {
      thColorSorting: "transparent",
      tdColorSorting: "transparent",
   },
};

export const lightThemeOverrides: GlobalThemeOverrides = {
   ...baseThemeOverrides,
   common: {
      primaryColor: "#8661ff",
      primaryColorHover: "#a27dff",
      primaryColorPressed: "#7e3ee6",
      primaryColorSuppl: "rgb(64, 40, 143)",
   },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
   ...baseThemeOverrides,
   common: {
      primaryColor: "#a27dff",
      primaryColorHover: "#af8fff",
      primaryColorPressed: "#9b61ff",
      primaryColorSuppl: "rgb(94, 67, 161)",
   },
};

export const apexChartOverrides: ApexOptions = {
   chart: {
      fontFamily: "Inter, sans-serif",
      background: "transparent",
   },
   xaxis: {
      labels: { style: { fontFamily: "Inter, sans-serif" } },
      title: {
         style: { fontFamily: "Inter, sans-serif", fontWeight: 500 },
      },
   },
   yaxis: {
      labels: { style: { fontFamily: "Inter, sans-serif" } },
      title: {
         style: { fontFamily: "Inter, sans-serif", fontWeight: 500 },
      },
   },
   colors: ["#8661ff"],
   tooltip: { style: { fontFamily: "Inter, sans-serif" } },
   legend: { fontFamily: "Inter, sans-serif" },
};
