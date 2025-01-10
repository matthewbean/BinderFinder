import { useState, useContext, useEffect } from "react";
import AlertContext from "../context/alertContext";
import supabase from "../utils/supabase";
import Input from "../components/Input";

import Output from "../components/Output";
import { Box } from "@chakra-ui/react";
import { AlertContextValue } from "../utils/types";
import { Container } from "@chakra-ui/react";

function Page() {
  const { createAlert }: AlertContextValue = useContext(AlertContext);
  const [cards, setCards] = useState<any>([]);
  const [mergeCommander, setMergeCommander] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(
    () =>
      setDarkMode(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      ),
    []
  );
  async function submit(names = []) {
    if (!loading) {
      if (names.length < 1) {
        createAlert({
          type: "error",
          title: "Error submitting list",
          description: "Please enter at least one card name",
        });
      } else {
        setLoading(true);
        let split = "name.ilike." + names.join(",name.ilike.");
        try {
          let { data } = await supabase
            .from("cards")
            .select("name,set_name,price,mana_cost")
            .or(split);
          setCards(data);
          let hasSet = new Set();
          data?.forEach((item) => hasSet.add(item.name.toLowerCase()));

          let notHave = names
            .map((item) => item.replaceAll('"', ""))
            .filter((item: string) => !hasSet.has(item.toLowerCase()));

          if (notHave.length > 0) {
            createAlert({
              type: "error",
              title: "Unable to find the following cards:",
              description: notHave.join(", "),
              duration: 5000,
            });
          }
        } catch (error) {
          createAlert({
            type: "error",
            title: "Unable to fetch binders",
            description:
              "There was an error fetching the binders, please try again later.",
          });
        }
      }

      setLoading(false);
    }
  }

  const sets: { [key: string]: any } = {};

  for (const card of cards) {
    for (const set_name of JSON.parse(card.set_name)) {
      if (mergeCommander && set_name.includes("Commander")) {
        if (sets["Commander"]) {
          sets.Commander.add(card.name);
        } else {
          sets.Commander = new Set<string>([card.name]);
        }
      } else {
        if (!sets[set_name]) {
          sets[set_name] = new Set<string>([card.name]);
        } else {
          sets[set_name].add(card.name);
        }
      }
    }
  }

  return (
    <>
      <Box bg="bg" minHeight="calc(100vh - 64px)">
        <Container>
          <Box className="flex" justifyContent="space-between" gap="4rem">
            <Box className="column hide-print" flexGrow="1">
              <Input submit={submit} loading={loading} />
            </Box>
            <Box className="column" flexGrow="1">
              <Output
                darkMode={darkMode}
                loading={loading}
                setMergeCommander={setMergeCommander}
                mergeCommander={mergeCommander}
                cards={cards}
                sets={sets}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default Page;
