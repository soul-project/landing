import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

export default function PlatformNameField() {
  return (
    <Field name="name">
      {({ field, form }: FieldProps<string>) => (
        <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
          <FormLabel>Name</FormLabel>
          <Input
            {...field}
            placeholder="enter your platform name"
            variant="filled"
          />
          {form.errors.name && (
            <FormErrorMessage>{String(form.errors.name)}</FormErrorMessage>
          )}
        </FormControl>
      )}
    </Field>
  );
}
