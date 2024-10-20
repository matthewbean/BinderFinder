import { Box } from "@chakra-ui/react";
import setsymbolsinfo from "./setsymbolsinfo.json";

export function buildManaSymbols(string?: string) {
  if (!string) {
    return "";
  }

  const symbols: string[] | null = string.match(/(\{[^}]+\})|(\/\/)/g);
  console.log(symbols);
  if (!symbols) return "";
  return symbols.map((symbol) => {
    if (symbol === "//") {
      return (
        <Box
          fontSize="sm"
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
            display: "inline-block",
            position: "relative",
            marginLeft: "2px",
            top: "1px",
          }}
          src={`/card_symbols/${symbol.replace(/\//g, "|")}.svg`}
          height="18px"
          width="18px"
        />
      );
    }
  });
}
export function buildSetymbols(string?: keyof typeof setsymbolsinfo) {
  if (!string || !setsymbolsinfo[string]) {
    return "";
  }

  return (
    <img
      style={{ display: "inline-block", height: "25px", width: "25px" }}
      src={`/set_symbols/${setsymbolsinfo[string]}`}
    />
  );
}
