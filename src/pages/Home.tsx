import { useState, useContext } from "react";
import AlertContext from "../context/alertContext";
import supabase from "../utils/supabase";
import Input from "../components/Input";

import Output from "../components/Output";
import { Box } from "@chakra-ui/react";
function Page() {
  const { createAlert } = useContext(AlertContext);
  const [cards, setCards] = useState<any>([]);
  const [mergeCommander, setMergeCommander] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function submit(names = []) {
    if (!loading) {
      if (names.length < 1) {
        createAlert({
          status: "error",
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
              status: "error",
              title: "Unable to find the following cards:",
              description: notHave.join(", "),
            });
          }
        } catch (error) {
          createAlert({
            status: "error",
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
      <div className="flex">
        <div className="column hide-print">
          <Input submit={submit} loading={loading} />
        </div>
        <Box className="column">
          <Output
            loading={loading}
            setMergeCommander={setMergeCommander}
            mergeCommander={mergeCommander}
            cards={cards}
            sets={sets}
          />
        </Box>
      </div>
    </>
  );
}
export default Page;
