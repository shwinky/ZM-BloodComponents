import { Dialog } from "@material-ui/core";
import { useState } from "react";
import styles from "./Popup.module.scss";
import DialogActions from "@material-ui/core/DialogActions";
import Button, { ButtonVariant } from "../Button";
import Text from "../Text";

type PopupProps = {
  buttonApproveText: string;
  open: boolean;
  titleFirst: string;
  titleSecond?: string;
  className?: string;
  isLoading?: boolean;
  onBack?: () => void;
  onApproved: () => void;
};

export default function Popup({
  buttonApproveText,
  open,
  titleFirst,
  titleSecond,
  onBack,
  onApproved,
}: PopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClicked = () => {
    setIsLoading(true);
    onApproved();
    setIsLoading(false);
  };
  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "#272932",
          color: "#fff",
          height: "min-content",
          width: "90%",
        },
      }}
      open={open}
      onClose={onBack}
    >
      <div className={styles.popupContainer}>
        <div className={styles.popupText}>
          <Text>{titleFirst}</Text>
          <Text>{titleSecond}</Text>
        </div>
        <hr className={styles.header}></hr>
        <DialogActions>
          {onBack && (
            <Button
              onClick={onBack}
              title="חזרה"
              className={styles.backButton}
              variant={ButtonVariant.text}
            />
          )}
          <Button
            onClick={buttonClicked}
            title={buttonApproveText}
            className={styles.approveButton}
            isLoading={isLoading}
          />
        </DialogActions>
      </div>
    </Dialog>
  );
}
