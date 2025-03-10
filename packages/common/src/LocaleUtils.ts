import { Hospital, BloodType } from "./types";

export function getHospitalName(hospital: Hospital) {
  switch (hospital) {
    case Hospital.TEL_HASHOMER:
      return "תל השומר";
    case Hospital.ASAF_HAROFE:
      return "אסף הרופא";
    case Hospital.BEILINSON:
      return "בילינסון";
    case Hospital.HADASA:
      return "הדסה";
    case Hospital.ICHILOV:
      return "איכילוב";
    case Hospital.RAMBAM:
      return 'רמב"ם';
    case Hospital.SOROKA:
      return "סורוקה";

    default:
      console.error("No hospital name for", hospital);
      return hospital;
  }
}
export const getBloodTypeTranslation = (bloodType: BloodType) => {
  switch (bloodType) {
    case BloodType.AB_MINUS:
      return "AB-";
    case BloodType.AB_PLUS:
      return "AB+";
    case BloodType.A_MINUS:
      return "A-";
    case BloodType.A_PLUS:
      return "A+";
    case BloodType.B_MINUS:
      return "B-";
    case BloodType.B_PLUS:
      return "B+";
    case BloodType.O_MINUS:
      return "O-";
    case BloodType.O_PLUS:
      return "O+";
    case BloodType.NOT_SURE:
      return "לא ידוע";

    default:
      console.error("No blood type name for", bloodType);
      return bloodType;
  }
};
