import React, { CSSProperties } from "react";
import Stepper from "../basic/Stepper";
import Button, { ButtonVariant } from "../basic/Button";
import styles from "./WizardScreen.module.scss";
import SwipeableViews from "react-swipeable-views";
import classnames from "classnames";

export interface WizardPage {
  content: React.ReactNode;
  buttonText?: string;
  backgroundColor?: string;
  buttonClassName?: string;
  className?: string;
}
const defaultWizardPageValues: WizardPage = {
  backgroundColor: "rgba(0,0,0,0)",
  content: undefined,
};

function isInstanceOfWizardPage(obj: any): obj is WizardPage {
  return typeof obj === "object" && "content" in obj;
}

export interface WizardScreenProps {
  pages: (React.ReactNode | WizardPage)[];
  onPageChange?: (index: number) => void;
  dir?: PageDirection;

  //-----Stepper props--------------------------------------
  showStepperButtons?: boolean;
  // initial page in case "currentStep" is not set
  initialStep?: number;
  // in case the user wants to manually set the stepper
  currentStep?: number;

  //-----Style props----------------------------------------
  pageClassName?: string;
  className?: string;
  buttonClassName?: string;

  //-----Action button--------------------------------------
  hideButton?: boolean;

  onButtonClick?: "next" | "back" | (() => void);
  buttonVariant: ButtonVariant;
  buttonText: string;

  onCompleteClick?: () => void;
  completeText?: string;
  completeVariant?: ButtonVariant;
}

export default function WizardScreen({
  pages,
  onPageChange,
  dir = "rtl",
  //-----Stepper props--------------------------------------
  showStepperButtons,
  initialStep = 0,
  currentStep,
  //-----Style props----------------------------------------
  pageClassName,
  className,
  buttonClassName,
  //-----Action button--------------------------------------
  buttonText,
  buttonVariant,
  onButtonClick,
  completeText,
  completeVariant,
  onCompleteClick,
  hideButton,
}: WizardScreenProps) {
  const [currentPageLocalState, setCurrentPageLocalIndex] = React.useState(
    initialStep
  );

  const computedPages = React.useMemo<WizardPage[]>(
    () =>
      pages.map((page) => {
        if (isInstanceOfWizardPage(page)) {
          const ret = page as WizardPage;
          ret.backgroundColor =
            ret.backgroundColor ?? defaultWizardPageValues.backgroundColor;

          return ret;
        }

        return {
          content: page,
          backgroundColor: "white",
          backgroundOpacity: 0,
        };
      }),
    [pages]
  );

  //allow the manually set the stepper or to let the component handle it
  const currentPageIndex = currentStep ?? currentPageLocalState;

  const componentStyle: CSSProperties = {
    //@ts-ignore
    "--pages-count": pages?.length?.toString() || "0",
    //@ts-ignore
    "--current-page": pages?.currentStep?.toString() || "0",

    background: computedPages[currentPageIndex].backgroundColor,
  };

  function handleNextClick() {
    const newPageIndex = Math.min(currentPageIndex + 1, pages.length - 1);
    setCurrentPageLocalIndex(newPageIndex);
    onPageChange?.(newPageIndex);
  }

  function handleBackClick() {
    const newPageIndex = Math.max(currentPageIndex - 1, 0);
    setCurrentPageLocalIndex(newPageIndex);
    onPageChange?.(newPageIndex);
  }

  function renderButton() {
    if (hideButton) return undefined;

    const pageButtonText = computedPages[currentPageIndex].buttonText;

    let buttonClick = onButtonClick;
    if (onButtonClick === "next") buttonClick = handleNextClick;
    else if (onButtonClick === "back") buttonClick = handleBackClick;

    let text = pageButtonText ?? buttonText;
    let variant = buttonVariant;

    if (pages.length - 1 === currentPageIndex) {
      text = pageButtonText ?? completeText ?? buttonText;
      variant = completeVariant ?? buttonVariant;
      buttonClick = onCompleteClick;
    }

    return (
      <Button
        onClick={buttonClick as () => void}
        title={text}
        variant={variant}
        isCentered={true}
        className={classnames(styles.button, buttonClassName)}
      />
    );
  }

  //todo animation speed + delayBeforeLeaveMS
  return (
    <div
      className={classnames(styles.component, className)}
      style={componentStyle}
    >
      <SwipeableViews
        className={styles.contentSection}
        index={currentPageIndex}
        disabled={currentStep !== undefined}
        onChangeIndex={setCurrentPageLocalIndex}
        dir={dir}
      >
        {computedPages.map((component, index) => (
          <section
            className={classnames(
              styles.page,
              pageClassName,
              component.className
            )}
            key={index}
          >
            {component.content}
          </section>
        ))}
      </SwipeableViews>

      <nav className={styles.stepperSection}>
        <Stepper
          step={currentPageIndex}
          numberOfSteps={pages?.length || 0}
          dir={dir}
          hideButtons={!showStepperButtons}
          handleNext={handleNextClick}
          handleBack={handleBackClick}
        />
        <div className={styles.buttonContainer}>{renderButton()}</div>
      </nav>
    </div>
  );
}
