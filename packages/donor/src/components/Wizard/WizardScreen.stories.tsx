import WizardScreen, { WizardScreenProps } from "./WizardScreen";
import { ButtonVariant } from "../basic/Button";
import { MuiTestWrapper } from "../../__test__/TestUtils";
import Div100vh from "react-div-100vh";

export default {
  component: WizardScreen,
  title: "Wizard Screen",
};

const baseArgs: WizardScreenProps = {
  pages: [
    "אפליקציה זו מיועדת עבור תורמי הטרומבוציטים של זכרון מנחם המגיעים העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
    "אפליקציה זו מיועדת עבור תורמי הטרומבוציטים של זכרון מנחם המגיעים העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
    "אפליקציה זו מיועדת עבור תורמי הטרומבוציטים של זכרון מנחם המגיעים העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
  ],

  buttonText: "אישור והמשך",
  buttonVariant: ButtonVariant.outlined,
};
export const FirstStep = (args: WizardScreenProps) => (
  <MuiTestWrapper>
    <Div100vh>
      <WizardScreen {...args} />
    </Div100vh>
  </MuiTestWrapper>
);
FirstStep.args = {
  ...baseArgs,
  currentStep: 0,
  onPrev: undefined,
};

export const MiddleStep = (args: WizardScreenProps) => (
  <MuiTestWrapper>
    <Div100vh>
      <WizardScreen {...args} />
    </Div100vh>
  </MuiTestWrapper>
);
MiddleStep.args = baseArgs;

export const LastStep = (args: WizardScreenProps) => (
  <MuiTestWrapper>
    <Div100vh>
      <WizardScreen {...args} />
    </Div100vh>
  </MuiTestWrapper>
);
LastStep.args = {
  ...baseArgs,
  currentStep: 3,
  onNext: undefined,
  buttonVariant: ButtonVariant.contained,
};
