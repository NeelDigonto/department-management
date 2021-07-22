import React, { Fragment, useMemo, useState, useEffect, useRef } from "react";

import { useUserContext } from "../../contexts/UserContext";
import {
  FullName,
  FatherName,
  MotherName,
  PermanentAddress,
  LocalAddress,
  OfficialEmail,
  BloodGroup,
  PersonalEmail,
  MobileNumber,
  LandlineNumber,
  DateOfBirth,
  Gender,
  Department,
  Designation,
  DateOfJoining,
  Religion,
  Caste,
  Pan,
  BankName,
  SalaryAccount,
  IFSC,
  PF_AccountNumber,
  PassportNumber,
  DrivingLicense,
  LocationInCampus,
} from "./fields/ProfileFields";

import styles from "./Profile.module.css";

const Profile = ({}) => {
  return (
    <div className={styles.Profile__detail_items}>
      <Fragment>
        <FullName />
        <FatherName />
        <MotherName />
        <PermanentAddress />
        <LocalAddress />
        <OfficialEmail />
        <BloodGroup />
        <PersonalEmail />
        <MobileNumber />
        <LandlineNumber />
        <DateOfBirth />
        <Gender />
        <Department />
        <Designation />
        <DateOfJoining />
        <Religion />
        <Caste />
        <Pan />
        <BankName />
        <SalaryAccount />
        <IFSC />
        <PF_AccountNumber />
        <PassportNumber />
        <DrivingLicense />
        <LocationInCampus />
      </Fragment>
    </div>
  );
};

export default Profile;
