import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Text,
  FormControl,
  FormLabel,
  Switch,
  Spinner,
} from "@chakra-ui/react";
import setsymbolsinfo from "../utils/setsymbolsinfo.json";
import { buildManaSymbols, buildSetymbols } from "../utils/builderFunctions";
import { COLORLESS_ICON } from "../utils/constants";

function Output({ cards, sets, mergeCommander, setMergeCommander, loading }) {
  const cmc: { [key: string]: any } = {};
  for (const card of cards) {
    if (card.mana_cost) {
      cmc[card.name] = card.mana_cost;
    } else {
      cmc[card.name] = COLORLESS_ICON;
    }
  }

  return (
    <Box m="1rem">
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="commander" mb="0">
          Merge Commanger Sets
        </FormLabel>
        <Switch
          id="commander"
          isChecked={mergeCommander}
          onChange={() => setMergeCommander(!mergeCommander)}
        />
      </FormControl>

      {loading ? (
        <Spinner color="purple.500" />
      ) : (
        cards &&
        Object.keys(sets)
          .sort((a, b) => sets[b].size - sets[a].size)
          .map((key) => (
            <Card marginBottom="1rem">
              <CardHeader>
                <Heading size="sm" display="flex" alignItems="center">
                  {buildSetymbols(key as keyof typeof setsymbolsinfo)}
                  <Text marginLeft={".25rem"} fontSize="lg">
                    {key}
                  </Text>
                </Heading>
              </CardHeader>

              <CardBody paddingTop={0}>
                {[...sets[key]].map((item) => (
                  <Box display="flex" alignItems="center">
                    {buildManaSymbols(cmc[item])}
                    <Text
                      display="inline-block"
                      marginLeft={".25rem"}
                      fontSize="sm"
                    >
                      {item}
                    </Text>
                  </Box>
                ))}
              </CardBody>
            </Card>
          ))
      )}
    </Box>
  );
}

export default Output;
