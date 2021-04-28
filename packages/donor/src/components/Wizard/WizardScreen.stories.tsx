import WizardScreen, { WizardScreenProps } from "./WizardScreen";
import { ButtonVariant } from "../basic/Button";

export default {
  component: WizardScreen,
  title: "Components V2/Wizard Screen",
  argTypes: {
    pages: { table: { disable: true } },
    onPageChange: { table: { disable: true } },
    onCompleteClick: { table: { disable: true } },

    className: { table: { disable: true } },
    buttonClassName: { table: { disable: true } },
    pageClassName: { table: { disable: true } },
    dir: {
      control: {
        type: "radio",
      },
      options: ["ltr", "rtl"],
    },
    onButtonClick: {
      control: {
        type: "radio",
      },
      options: ["next", "back"],
    },
    currentStep: {
      control: {
        type: "number",
        max: 2,
        min: 0,
      },
    },
    initialStep: { table: { disable: true } },
  },
};

const baseArgs: WizardScreenProps = {
  pages: [
    {
      content:
        "אפליקציה זו מיועדת עבור תורמי הטרומבוציטים של זכרון מנחם המגיעים העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
      backgroundColor: "antiquewhite",
    },
    {
      content:
        "אפליקציה זו מיועדת עבור תורמי הטרומבוציטים של זכרון מנחם המגיעים העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
      backgroundColor: "lightblue",
    },
    "אפליקציה זו מיועדת עבור תורמי הטרומבוציטים של זכרון מנחם המגיעים העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
  ],
  buttonText: "אישור והמשך",
  buttonVariant: ButtonVariant.outlined,
  completeText: "סיים",
  completeVariant: ButtonVariant.contained,
  showStepperButtons: true,
  onButtonClick: "next",
};
export const Wizard = (args: WizardScreenProps) => (
  <div
    style={{ height: "500px", width: "300px", border: "2px black solid" }}
    dir={args.dir}
  >
    <WizardScreen {...args} />
  </div>
);

Wizard.args = baseArgs;
