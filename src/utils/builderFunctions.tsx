import { Box } from "@chakra-ui/react";
import setsymbolsinfo from "./setsymbolsinfo.json";

type Color =
  | "#F2C8B8"
  | "#BACFC6"
  | "#BAD6E9"
  | "#B0AAAA"
  | "#F4F5F1"
  | "#D5BE89"
  | "#D6E0E5"
  | "#DE744B"
  | "#749E8C"
  | "#5A9DCA"
  | "#7D7474"
  | "#B1B89B"
  | "#B49140"
  | "#84A2B1";
const legend = new Map([
  ["R", "#F2C8B8"],
  ["G", "#BACFC6"],
  ["U", "#BAD6E9"],
  ["B", "#B0AAAA"],
  ["W", "#F4F5F1"],
  ["DR", "#DE744B"],
  ["DG", "#749E8C"],
  ["DU", "#5A9DCA"],
  ["DB", "#7D7474"],
  ["DW", "#B1B89B"],
]);

export function makeColor(str?: string, darkMode?: boolean): Color {
  let color: Color = darkMode ? "#84A2B1" : "#D6E0E5";

  if (str) {
    for (const letter of str) {
      if (legend.has(letter)) {
        if (color === "#D6E0E5" || color === "#84A2B1") {
          console.log((darkMode ? "D" : "") + letter);
          color = legend.get((darkMode ? "D" : "") + letter) as Color;
        } else if (legend.get(letter) !== color)
          return darkMode ? "#B49140" : "#D5BE89";
      }
    }
  }
  console.log(color);
  return color;
}

export function buildManaSymbols(string?: string) {
  if (!string) {
    return "";
  }

  const symbols: string[] | null = string.match(/(\{[^}]+\})|(\/\/)/g);

  if (!symbols) return "";
  return symbols.map((symbol) => {
    if (symbol === "//") {
      return (
        <Box
          fontSize="18px"
          marginInline=".25rem"
          display="inline"
          position="relative"
          bottom="1px"
        >
          //
        </Box>
      );
    } else {
      return (
        <img
          style={{
            boxShadow: "#000 -1px 1px",
            borderRadius: "500px",
            display: "inline-block",
            position: "relative",
            marginLeft: "0px",
            top: "-3px",
          }}
          src={`/card_symbols/${symbol.replace(/\//g, "|")}.svg`}
          height="18px"
          width="18px"
        />
      );
    }
  });
}
export function buildSetymbols(
  darkMode: boolean,
  string?: keyof typeof setsymbolsinfo
) {
  if (!string || !setsymbolsinfo[string]) {
    return "";
  }

  return (
    <img
      style={{
        display: "inline-block",
        height: "25px",
        width: "25px",
        filter: darkMode ? "invert(1)" : "",
      }}
      src={`/set_symbols/${setsymbolsinfo[string]}`}
    />
  );
}
