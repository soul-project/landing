import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  ModalFooter,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { formSchema, FormValues } from "src/components/my-platforms/form";

import PlatformNameField from "./PlatformFormModal/PlatformNameField";
import RedirectUrisField from "./PlatformFormModal/RedirectUrisField";

export default function PlatformFormModal({
  isOpen,
  onClose,
  handleSubmit,
  initialValues,
  title,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="black" margin="auto 0px">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {initialValues ? (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={formSchema}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <ModalBody>
                  <VStack spacing="16px" alignItems="flex-start">
                    <PlatformNameField />
                    <RedirectUrisField redirectUris={values.redirectUris} />
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" isLoading={isSubmitting}>
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        ) : (
          <Spinner mt="30px" />
        )}
      </ModalContent>
    </Modal>
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
  title: string;
};
