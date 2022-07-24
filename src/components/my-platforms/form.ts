import * as Yup from "yup";

export type FormValues = {
  name: string;
  redirectUris: string[];
};

export const formSchema = Yup.object({
  name: Yup.string().required(),
  redirectUris: Yup.array()
    .of(Yup.string().required("A valid redirect uri must be provied"))
    .min(1)
    .max(5)
    .required(),
});
