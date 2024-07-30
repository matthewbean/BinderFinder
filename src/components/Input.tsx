import { useState } from "react";
import { Box, Heading, Textarea } from "@chakra-ui/react";
import { Button, FormLabel } from "@chakra-ui/react";
function Input({
  submit,
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
      <Heading size="md">Card List</Heading>
      <FormLabel fontSize="sm" htmlFor="cards_search" mb="0">
        Enter one card per line
      </FormLabel>
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
