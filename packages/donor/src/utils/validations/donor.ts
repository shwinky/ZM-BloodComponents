import {Donor} from "@zm-blood-components/common"
import vest, { test, enforce } from "vest";
import { IVestResult } from "vest/vestResult";

export  default vest.create((data: Donor) => {
  test("username", "Username is required", () => {
    enforce(data.username).isNotEmpty();
  });
}) as (donor: Donor) => keyof Donor;