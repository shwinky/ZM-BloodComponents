import styles from "./Stepper.module.scss";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import classnames from "classnames";

interface StepperProps {
  step: number;
  numberOfSteps: number;
  handleNext?: () => void;
  handleBack?: () => void;
  hideButtons?: boolean;
  dir?: PageDirection;
}

export default function Stepper(props: StepperProps) {
  const componentClassName = classnames(styles.component, {
    [styles.disableButtons]: props.hideButtons,
  });

  return (
    <MobileStepper
      variant="dots"
      steps={props.numberOfSteps}
      position="static"
      activeStep={props.step}
      className={componentClassName}
      dir={props.dir || "rtl"}
      nextButton={
        <Button
          size="small"
          className={styles.button}
          onClick={props.handleNext}
          disabled={props.hideButtons || props.step === props.numberOfSteps - 1}
        >
          <KeyboardArrowLeft />
        </Button>
      }
      backButton={
        <Button
          size="small"
          className={styles.button}
          onClick={props.handleBack}
          disabled={props.hideButtons || props.step === 0}
        >
          <KeyboardArrowRight />
        </Button>
      }
    />
  );
}
