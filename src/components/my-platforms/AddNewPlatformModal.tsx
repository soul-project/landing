import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputLeftElement,
  HStack,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FieldArray } from "formik";
import * as Yup from "yup";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function AddNewPlatformModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="black" margin="auto 0px">
        <ModalHeader>Create new platform</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ name: "", redirectUris: [""] }}
          onSubmit={(values) => console.log(values)}
          validationSchema={Yup.object({
            name: Yup.string().required(),
            redirectUris: Yup.array()
              .of(Yup.string().required("A valid redirect uri must be provied"))
              .min(1)
              .max(5)
              .required(),
          })}
        >
          {({ values }) => (
            <Form>
              <ModalBody>
                <VStack spacing="16px" alignItems="flex-start">
                  <Field name="name">
                    {({ field, form }: FieldProps<string>) => (
                      <FormControl
                        isInvalid={!!form.errors.name && !!form.touched.name}
                      >
                        <FormLabel>Name</FormLabel>
                        <Input
                          {...field}
                          placeholder="enter your platform name"
                          variant="filled"
                        />
                        {form.errors.name && (
                          <FormErrorMessage>
                            {String(form.errors.name)}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    )}
                  </Field>
                  {/* TODO: Refactor and move this out into a separate component */}
                  <FieldArray name="redirectUris">
                    {({ remove, push }) => (
                      <>
                        <FormLabel>Redirect Uris</FormLabel>
                        {values.redirectUris.map((_redirectUri, index) => (
                          <Field key={index} name={`redirectUris.${index}`}>
                            {({
                              field,
                              form,
                            }: FieldProps<
                              string,
                              { redirectUris: string[] }
                            >) => {
                              const errors = form.errors.redirectUris as
                                | string[]
                                | undefined;
                              const touched = form.touched.redirectUris as
                                | boolean[]
                                | undefined;
                              return (
                                <FormControl
                                  isInvalid={
                                    !!errors?.[index] && !!touched?.[index]
                                  }
                                >
                                  <HStack>
                                    <InputGroup>
                                      <InputLeftElement>
                                        {index + 1}
                                      </InputLeftElement>
                                      <Input
                                        {...field}
                                        placeholder="enter a redirect uri"
                                        variant="filled"
                                      />
                                      {index > 0 && (
                                        <InputRightElement>
                                          <Box
                                            as="button"
                                            width="100%"
                                            height="100%"
                                          >
                                            <SmallCloseIcon
                                              onClick={() => remove(index)}
                                            />
                                          </Box>
                                        </InputRightElement>
                                      )}
                                    </InputGroup>
                                  </HStack>
                                  {errors?.[index] && (
                                    <FormErrorMessage>
                                      {errors?.[index]}
                                    </FormErrorMessage>
                                  )}
                                </FormControl>
                              );
                            }}
                          </Field>
                        ))}
                        {values.redirectUris.length < 5 && (
                          <Button onClick={() => push("")}>
                            Add more redirect uris
                          </Button>
                        )}
                      </>
                    )}
                  </FieldArray>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button type="submit">Submit</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
