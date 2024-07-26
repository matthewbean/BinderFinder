import { Box } from "@chakra-ui/react";
import setsymbolsinfo from "./setsymbolsinfo.json";

export function buildManaSymbols(string?: string) {
  if (!string) {
    return "";
  }

  const symbols: string[] = string.match(/(\{.\})|(\/\/)/g);

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
          style={{ display: "inline-block" }}
          src={`/card_symbols/${symbol}.svg`}
          height="14px"
          width="14px"
        />
      );
    }
  });
}
export function buildSetymbols(string?: keyof typeof setsymbolsinfo) {
  console.log(setsymbolsinfo[string]);
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
