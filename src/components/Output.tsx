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
import { OutputProps } from "../utils/types";

function Output({
  cards,
  sets,
  mergeCommander,
  setMergeCommander,
  loading,
}: OutputProps) {
  console.log(cards, sets);
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

  return (
    <Box m="1rem">
      <Heading size="md">Results</Heading>
      <Text fontSize="sm"></Text>
      <FormControl display="flex" alignItems="center">
        <FormLabel fontSize="sm" htmlFor="commander" mb="0">
          Merge Commander Sets
        </FormLabel>
        <Switch
          id="commander"
          size="sm"
          isChecked={mergeCommander}
          onChange={() => setMergeCommander(!mergeCommander)}
        />
      </FormControl>
      <Box
        p=".5rem"
        maxHeight="600px"
        overflowY="auto"
        border="solid 1px"
        borderColor="gray.200"
        borderRadius="5px"
        height="calc(100vh - 200px)"
      >
        {loading ? (
          <Spinner color="purple.500" />
        ) : (
          cards &&
          (Object.keys(sets) as Array<keyof typeof sets>)
            .sort((a, b) => sets[b].size - sets[a].size)
            .map((key) => (
              <Card margin="1rem">
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
                    <Card
                      border=".75rem solid black"
                      bg="green.50"
                      borderBottom="none"
                      borderRadius="5px 5px 0 0 "
                      marginBottom=".25rem"
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
                          className="libre-baskerville-bold"
                        >
                          {item}
                        </Text>
                        <Text>{buildManaSymbols(cmc[item])}</Text>
                      </Box>
                    </Card>
                  ))}
                </CardBody>
              </Card>
            ))
        )}
      </Box>
    </Box>
  );
}

export default Output;
