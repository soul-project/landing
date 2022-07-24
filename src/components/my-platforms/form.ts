import * as Yup from "yup";

export const MAX_PLATFORM_REDIRECT_URIS = 5;

export type FormValues = {
  name: string;
  redirectUris: string[];
};

export const formSchema = Yup.object({
  name: Yup.string().required(),
  redirectUris: Yup.array()
    .of(Yup.string().required("A valid redirect uri must be provied"))
    .min(1)
    .max(MAX_PLATFORM_REDIRECT_URIS)
    .required(),
});
