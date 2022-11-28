import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

const animatedComponents = makeAnimated();

const options = [
  { value: "Ayşe", label: "Ayşe" },
  { value: "Yağmur", label: "Yağmur" },
  { value: "Yasemin", label: "Yasemin" },
  { value: "Öznur", label: "Öznur" },
  { value: "Ece", label: "Ece" },
  { value: "Aleyna", label: "Aleyna" },
  { value: "Aynur", label: "Aynur" },
  { value: "Gülsüm", label: "Gülsüm" },
];

export const Selectt = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
    console.log(selectedOptions);
 

  return (
    <>
      <Select
        defaultValue={[options[0], options[2]]}
        components={animatedComponents}
        isMulti
        options={options}
        onChange={(item) => setSelectedOptions(item)}
        className="select"
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isLoading={false}
        isRtl={false}
        closeMenuOnSelect={false}
      />
  <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
  
    </>
  );
};