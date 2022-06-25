import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  ModalFooter,
  useClipboard,
} from "@chakra-ui/react";

export default function AccessTokenModal({
  accessToken,
  isOpen,
  onClose,
}: Props) {
  const { hasCopied, onCopy } = useClipboard(accessToken);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="black" margin="auto 0px">
        <ModalHeader>Your access token</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup size="md">
            <Input
              pr="66px"
              type="text"
              value={accessToken}
              contentEditable={false}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={onCopy}>
                {hasCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

type Props = {
  accessToken: string;
  isOpen: boolean;
  onClose: () => void;
};
