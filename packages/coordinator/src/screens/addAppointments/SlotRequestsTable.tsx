import React from "react";
import { NewSlots } from "./AddAppointmentsScreenContainer";
import { LocaleUtils } from "@zm-blood-components/common";
import Button from "../../components/Button";
import Table from "../../components/Table";
import classnames from "classnames";

const donationTypeText = "סוג תרומה";
const hospitalText = "בית חולים";
const dateText = "תאריך";
const timeText = "שעה";
const slotsText = "כמות משבצות";

const PlateletsText = "טרומבוציטים";

const tableColumnNames = [
  donationTypeText,
  hospitalText,
  dateText,
  timeText,
  slotsText,
];

interface SlotRequestsTableProps {
  slotsArray: NewSlots[];
  deleteSlotsRequest: (key: string) => void;
  className?: string;
}

export default function SlotRequestsTable({
  slotsArray,
  deleteSlotsRequest,
  className,
}: SlotRequestsTableProps) {
  const slotDataToCells = React.useCallback(
    (data: NewSlots) => {
      return [
        PlateletsText,
        LocaleUtils.getHospitalName(data.hospital),
        data.donationStartTime.toDateString(),
        data.slots,
        <Button title="מחק" onClick={() => deleteSlotsRequest(data.key)} />,
      ];
    },
    [deleteSlotsRequest]
  );

  return (
    <Table
      headerContent={tableColumnNames}
      bodyContent={slotsArray}
      ConvertContentToCells={slotDataToCells}
      aria-label={"add donation slots table"}
      tableContainerClassName={classnames(slotDataToCells, className)}
    />
  );
}
