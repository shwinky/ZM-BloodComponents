import React, { useState } from "react";
import styles from "./BookDonationScreen.module.scss";
import {
  AvailableAppointment,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import {
  DonationDay,
  groupDonationDays,
} from "../../utils/AppointmentsGrouper";
import Select from "../../components/basic/Select";
import Spinner from "../../components/basic/Spinner";
import ZMScreen from "../../components/basic/ZMScreen";
import AppointmentPicker from "../../components/AppointmentPicker";
import { DonationSlotToBook } from "../../navigation/app/LoggedInRouter";
import Illustration from "../../assets/images/home page-illustration.png";

export interface BookDonationScreenProps {
  availableAppointments: AvailableAppointment[];
  isFetching: boolean;
  firstName: string;
  onSlotSelected: (donationSlot: DonationSlotToBook) => void;
  defaultHospital: Hospital | "";
}

export default function BookDonationScreen({
  availableAppointments,
  isFetching,
  firstName,
  onSlotSelected,
  defaultHospital,
}: BookDonationScreenProps) {
  const [selectedHospital, setSelectedHospital] =
    useState<Hospital | "">(defaultHospital);

  const sortedDonationDays = React.useMemo(() => {
    const filteredResults = availableAppointments.filter(
      (x) => x.hospital === selectedHospital || !selectedHospital
    );
    return groupDonationDays(filteredResults);
  }, [availableAppointments, selectedHospital]);

  return (
    <ZMScreen
      hasBurgerMenu={true}
      className={styles.bookDonationScreen}
      fullWidth={true}
    >
      <div className={styles.welcomeTitle}>
        <img
          src={Illustration}
          alt={"illustration"}
          className={styles.illustration}
        />
        <div className={styles.name}>היי {firstName}</div>
        <div className={styles.welcomeText}>
          איזה כיף שבאת!
          <br />
          מתי יתאים לך לתרום?
        </div>
      </div>

      <div className={styles.screenContent}>
        <div className={styles.dropdownContainer}>
          <Select
            label={"הצג תורים ב:"}
            className={styles.dropdown}
            options={HospitalUtils.getAllHospitalOptions("הכל")}
            value={selectedHospital}
            onChange={setSelectedHospital}
            isDisabled={isFetching}
          />
        </div>

        {Donations(
          selectedHospital,
          isFetching,
          sortedDonationDays,
          onSlotSelected
        )}
      </div>
    </ZMScreen>
  );
}

function Donations(
  selectedHospital: Hospital | "",
  isFetching: boolean,
  donationDays: DonationDay[],
  onSlotSelected: (donationSlot: DonationSlotToBook) => void
) {
  if (isFetching) {
    return (
      <div className={styles.spinner}>
        <Spinner size={"2rem"} />
      </div>
    );
  }

  if (donationDays.length === 0) {
    if (!selectedHospital) {
      return (
        <div>
          <div>לא קיימים תורים פנויים</div>
          <div>כדאי לבדוק שוב בהמשך :)</div>
        </div>
      );
    }
    return (
      <div>
        <div>לא קיימים תורים פנויים לבית חולים זה</div>
        <div>כדאי לבדוק שוב בהמשך :)</div>
      </div>
    );
  }

  return (
    <>
      {donationDays.map((donationDay) => (
        <div className={styles.donationDayContainer} key={donationDay.day}>
          <AppointmentPicker
            donationDay={donationDay}
            onSlotSelected={onSlotSelected}
            showHospitalName={selectedHospital === ""}
          />
        </div>
      ))}
    </>
  );
}
