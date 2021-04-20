import WizardScreen, { WizardScreenProps } from "./WizardScreen";
import { ButtonVariant } from "../basic/Button";
import { MuiTestWrapper } from "../../__test__/TestUtils";

export default {
  component: WizardScreen,
  title: "Wizard Screen",
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
  <MuiTestWrapper>
    <div style={{ height: "500px", width: "300px", border: "2px black solid" }}>
      <WizardScreen {...args} />
    </div>
  </MuiTestWrapper>
);
Wizard.args = {
  ...baseArgs,
};
