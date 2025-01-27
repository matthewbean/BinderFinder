import { useEffect, useState } from "react";
import { Card, Heading, Box, Text, Spinner, Button } from "@chakra-ui/react";
import setsymbolsinfo from "../utils/setsymbolsinfo.json";
import {
  buildManaSymbols,
  buildSetymbols,
  makeColor,
} from "../utils/builderFunctions";
import { Switch } from "@/components/ui/switch";
import { OutputProps } from "../utils/types";
import Filters from "./Filters";

function Output({
  darkMode,
  cards,
  sets,
  mergeCommander,
  setMergeCommander,
  loading,
}: OutputProps) {
  const cmc: { [key: string]: any } = {};
  if (cards !== null) {
    for (const card of cards) {
      if (card.mana_cost) {
        cmc[card.name] = card.mana_cost;
      } else {
        cmc[card.name] = "";
      }
    }
  }

  const [filters, setFilters] = useState<
    { cardName: string; value: boolean }[]
  >([]);

  useEffect(() => {
    const filterData = cards.map((card) => {
      return {
        cardName: card.name,
        value: false,
      };
    });
    setFilters(filterData);
  }, []);

  return (
    <Box my="1rem">
      <Heading size="md" className="hide-print">
        Results
      </Heading>
      <Switch
        marginBottom="9px"
        className="hide-print"
        id="commander"
        size="sm"
        checked={mergeCommander}
        onChange={() => setMergeCommander(!mergeCommander)}
      >
        Merge Commander Sets
      </Switch>
      <Filters filters={filters} />
      <Box
        bg="bg"
        p="1rem"
        overflowY="auto"
        border="solid 1px"
        borderColor="bg.emphasized"
        borderRadius="5px"
        height="calc(100vh - 200px)"
        className="print-large"
      >
        {loading ? (
          <Box
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner color="teal" />
          </Box>
        ) : (
          cards &&
          (Object.keys(sets) as Array<keyof typeof sets>)
            .sort((a, b) => sets[b].size - sets[a].size)
            .map((key) => (
              <Card.Root className="no-flex" mb="1rem" p=".5rem" bg="bg.muted">
                <Card.Header p="1rem">
                  <Heading size="sm" display="flex" alignItems="center">
                    {buildSetymbols(
                      darkMode,
                      key as keyof typeof setsymbolsinfo
                    )}
                    <Text marginLeft={".25rem"} fontSize="lg">
                      {key}
                    </Text>
                  </Heading>
                </Card.Header>

                <Card.Body p="1rem" paddingTop={0}>
                  {[...sets[key]].map((item) => {
                    return (
                      <Card.Body
                        border="10px solid"
                        borderColor="black"
                        bg={makeColor(cmc[item], darkMode)}
                        borderBottom="none"
                        borderRadius="5px 5px 0 0 "
                        marginBottom=".25rem"
                        padding=".25rem"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          p=".25rem .5rem"
                        >
                          <Text
                            display="inline-block"
                            fontSize="sm"
                            color="black"
                            fontWeight="bold"
                            fontFamily="libre-baskerville-bold"
                          >
                            {item}
                          </Text>
                          <Box>{buildManaSymbols(cmc[item])}</Box>
                        </Box>
                      </Card.Body>
                    );
                  })}
                </Card.Body>
              </Card.Root>
            ))
        )}
      </Box>
      <Button
        className="hide-print"
        mt="1rem"
        variant="surface"
        colorPalette="gray"
        onClick={() => {
          window && window.print();
        }}
      >
        Print
      </Button>
    </Box>
  );
}

export default Output;
