import { useState } from "react";
import { Box, Heading, Textarea } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

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
      <Field label="Enter Cards">
        <Textarea
          colorPalette="teal"
          bg="bg"
          m="0"
          height="calc(100vh - 200px)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          name="cards_search"
          id="cards_search"
          borderColor="bg.emphasized"
        />
      </Field>
      <div>
        <Button
          loading={loading}
          mt="1rem"
          variant="surface"
          colorPalette="teal"
          onClick={() => {
            submit(
              input
                .split(/\n/)
                .filter((str) => str !== "")
                .map((item) => `"${item}"`)
            );
          }}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}

export default Input;
