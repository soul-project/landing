import React from "react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  FormLabel,
  FormControl,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Box,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { FieldArray, Field, FieldProps } from "formik";

import { FormValues } from "../form";

export default function RedirectUrisField({ redirectUris }: Props) {
  return (
    <FieldArray name="redirectUris">
      {({ remove, push }) => (
        <>
          <FormLabel>Redirect Uris</FormLabel>
          {redirectUris.map((_redirectUri, index) => (
            <Field key={index} name={`redirectUris.${index}`}>
              {({ field, form }: FieldProps<string, FormValues>) => {
                const errors = form.errors.redirectUris as string[] | undefined;
                const touched = form.touched.redirectUris as
                  | boolean[]
                  | undefined;
                return (
                  <FormControl
                    isInvalid={!!errors?.[index] && !!touched?.[index]}
                  >
                    <HStack>
                      <InputGroup>
                        <InputLeftElement>{index + 1}</InputLeftElement>
                        <Input
                          {...field}
                          placeholder="enter a redirect uri"
                          variant="filled"
                        />
                        {index > 0 && (
                          <InputRightElement>
                            <Box as="button" width="100%" height="100%">
                              <SmallCloseIcon onClick={() => remove(index)} />
                            </Box>
                          </InputRightElement>
                        )}
                      </InputGroup>
                    </HStack>
                    {errors?.[index] && (
                      <FormErrorMessage>{errors?.[index]}</FormErrorMessage>
                    )}
                  </FormControl>
                );
              }}
            </Field>
          ))}
          {redirectUris.length < 5 && (
            <Button onClick={() => push("")}>Add more redirect uris</Button>
          )}
        </>
      )}
    </FieldArray>
  );
}

type Props = {
  redirectUris: string[];
};
