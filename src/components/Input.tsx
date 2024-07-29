import { useState } from "react";
import { Box, Textarea } from "@chakra-ui/react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
function Input({
  submit,
  mergeCommander,
  setMergeCommander,
  loading,
}: {
  submit: Function;
  mergeCommander: boolean;
  setMergeCommander: Function;
  loading: boolean;
}) {
  const [input, setInput] = useState("");
  return (
    <Box m="1rem">
      <Textarea
        m="0"
        height="80vh"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name="cards_search"
        id="cards_search"
      ></Textarea>
      <div>
        <Button
          isLoading={loading}
          mt="1rem"
          onClick={() => {
            submit(
              input
                .split(/\n/)
                .filter((str) => str !== "")
                .map((item) => `"${item}"`)
            );
          }}
          colorScheme="purple"
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}

export default Input;
