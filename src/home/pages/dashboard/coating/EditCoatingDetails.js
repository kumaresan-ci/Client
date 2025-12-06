import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  MenuItem,
  Grid,
  FormGroup,
  Typography,
  TextField,
  Select,
  Checkbox,
  Modal,
  FormControl,
  OutlinedInput,
  ListItemText,
  ListSubheader,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/joy/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "../../../pages/pagestyle.scss";
import upsImage from "../../../../assets/Pagesimage/ups-image.jpg";

const groupedNames = [
  { label: "Inside Food - Grade Locqur" },
  { label: "Vinyl Sizing" },
  { label: "White" },
  { type: "header", label: "Varnish" },
  { type: "item", label: "Glass Finish" },
  { type: "item", label: "Matte Finish" },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// Component Row for Today's Work Table
const ComponentRow = ({
  component,
  name,
  onDataChange,
  selected,
  onCheckChange,
}) => (
  <>
    <Grid size={12} sx={{ borderBottom: "1px solid #dcdddd" }} />

    <Grid size={1}>
      <div className="Box-table-checkbox">
        <Checkbox
          checked={selected}
          onChange={(e) => onCheckChange(name, e.target.checked)}
          {...label}
        />
      </div>
    </Grid>

    <Grid size={2}>
      <div className="Box-table-content">
        <TextField
          id="outlined-size-small"
          name=""
          size="small"
          value={component.sheetSize}
          onChange={(e) => onDataChange(name, "sheetSize", e.target.value)}
        />
      </div>
    </Grid>

    <Grid size={2}>
      <div className="Box-table-text">{name}</div>
    </Grid>

    <Grid size={2}>
      <div className="Box-table-content">
        <TextField
          id="outlined-size-small"
          name=""
          size="small"
          type="number"
          value={component.noOfSheets}
          onChange={(e) => onDataChange(name, "noOfSheets", e.target.value)}
        />
      </div>
    </Grid>

    <Grid size={3}>
      <div className="Box-table-multiselect">
        <FormControl sx={{ width: "80%" }}>
          <Select
            multiple
            value={component.coatingType || []}
            onChange={(e) => onDataChange(name, "coatingType", e.target.value)}
            input={<OutlinedInput />}
            renderValue={(selected) => selected.join(", ")}
            size="small"
          >
            {groupedNames.map((item, index) =>
              item.type === "header" ? (
                <ListSubheader key={index}>{item.label}</ListSubheader>
              ) : (
                <MenuItem key={index} value={item.label}>
                  <Checkbox
                    checked={component.coatingType?.includes(item.label)}
                  />
                  <ListItemText primary={item.label} />
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </div>
    </Grid>

    {/* Status Column*/}
    <Grid size={2}>
      <div className="Box-table-content">
        <ToggleButtonGroup
          value={component.status || "No"}
          exclusive
          onChange={(e) => onDataChange(name, "status", e.target.value)}
          size="small"
        >
          <ToggleButton
            value="Yes"
            sx={{
              backgroundColor: component.status === "Yes" ? "green" : "",
              color: component.status === "Yes" ? "white" : "",
              "&.Mui-selected": {
                backgroundColor: "green",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
              },
            }}
          >
            Yes
          </ToggleButton>
          <ToggleButton
            value="No"
            sx={{
              backgroundColor: component.status === "No" ? "red" : "",
              color: component.status === "No" ? "white" : "",
              "&.Mui-selected": {
                backgroundColor: "red",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkred",
                },
              },
            }}
          >
            No
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Grid>
  </>
);

// Reusable Labeled Field: wraps a label and form control
const LabeledField = ({ label, children }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <Typography className="label-text">{label}</Typography>
    {children}
  </Box>
);

// Reusable Time Input for hours/minutes/seconds
const TimeInput = ({ label, value, onChange, min, max }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
    <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#666" }}>
      {label}
    </Typography>
    <TextField
      type="number"
      value={value}
      onChange={onChange}
      onFocus={(e) => e.target.select()}
      inputProps={{
        min: min,
        max: max,
        maxLength: 2,
        style: {
          textAlign: "center",
          fontSize: "24px",
          fontWeight: 700,
          padding: "8px 4px",
          fontFamily: "monospace",
        },
      }}
      sx={{
        width: "80px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          fontSize: "24px",
        },
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
      }}
    />
  </Box>
);

function EditCoatingDetails() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    listOfJobs: "",
    shift: "",
    machineSpeed: "",
    machineName: "",
    saleOrderNumber: "",
    totalQty: "",
    operatorName: "",
  });

  // Components State
  const [components, setComponents] = useState({
    Lid: {
      sheetSize: "780 × 1024 × 0.24",
      noOfSheets: "",
      coatingType: [],
      status: "No",
    },
    Body: {
      sheetSize: "780 × 1024 × 0.24",
      noOfSheets: "",
      coatingType: [],
      status: "No",
    },
    Bottom: {
      sheetSize: "780 × 1024 × 0.24",
      noOfSheets: "",
      coatingType: [],
      status: "No",
    },
    "Lid & Body": {
      sheetSize: "780 × 1024 × 0.24",
      noOfSheets: "",
      coatingType: [],
      status: "No",
    },
    "Lid & Body & Bottom": {
      sheetSize: "780 × 1024 × 0.24",
      noOfSheets: "",
      coatingType: [],
      status: "No",
    },
    "Body & Bottom": {
      sheetSize: "780 × 1024 × 0.24",
      noOfSheets: "",
      coatingType: [],
      status: "No",
    },
  });

  const [selectedComponents, setSelectedComponents] = useState({});

  const [jobTimes, setJobTimes] = useState({
    startTime: "00:00:00",
    endTime: "00:00:00",
    changeOverTime: "00:00:00",
  });

  const handleTimeChange = (field, value) => {
    setJobTimes({ ...jobTimes, [field]: value });
  };

  const [timePickerOpen, setTimePickerOpen] = useState(null);
  const [tempTime, setTempTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const openTimePicker = (field) => {
    const currentValue = jobTimes[field];
    const [h, m, s] = currentValue.split(":").map(Number);
    setTempTime({ hours: h || 0, minutes: m || 0, seconds: s || 0 });
    setTimePickerOpen(field);
  };

  const closeTimePicker = () => {
    setTimePickerOpen(null);
  };

  const saveTime = (field) => {
    const formatted = `${String(tempTime.hours).padStart(2, "0")}:${String(
      tempTime.minutes
    ).padStart(2, "0")}:${String(tempTime.seconds).padStart(2, "0")}`;
    handleTimeChange(field, formatted);
    closeTimePicker();
  };

  // Direct text input for time fields
  const handleTimeInputChange = (type, value) => {
    let cleanValue = value.toString().slice(0, 2);
    let numValue =
      cleanValue === ""
        ? 0
        : parseInt(cleanValue.replace(/^0+/, "") || "0", 10);
    if (type === "hours") {
      numValue = Math.max(0, Math.min(23, numValue));
    } else {
      numValue = Math.max(0, Math.min(59, numValue));
    }
    setTempTime({ ...tempTime, [type]: numValue });
  };

  const [downtimeOpen, setDowntimeOpen] = useState(false);
  const [downtimeData, setDowntimeData] = useState({
    completedWorks: 0,
    pendingWorks: 0,
    reasonForPending: "Maintenance",
  });

  const handleDowntimeChange = (field, value) => {
    setDowntimeData({ ...downtimeData, [field]: value });
  };

  const handleDowntimeOpen = () => setDowntimeOpen(true);
  const handleDowntimeClose = () => setDowntimeOpen(false);

  const handleDowntimeSubmit = () => {
    console.log("Downtime data:", downtimeData);
    // Send to API here
    setDowntimeOpen(false);
  };

  const [open, setOpen] = useState(false);

  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [processId, setProcessId] = useState(null);
  const [submissionData, setSubmissionData] = useState({
    totalSheets: "",
    wastageSheets: "",
    operatorName: "",
  });

  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: 0,
    maxWidth: "90vw",
    maxHeight: "90vh",
  };

  // Handle Form Change
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Component Data Change
  const handleComponentChange = (componentName, field, value) => {
    setComponents((prev) => ({
      ...prev,
      [componentName]: {
        ...prev[componentName],
        [field]: value,
      },
    }));
  };

  // Handle Component Selection
  const handleComponentCheck = (componentName, isChecked) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [componentName]: isChecked,
    }));
  };

  const handleCancel = () => {
    setFormData({
      listOfJobs: "",
      shift: "",
      machineSpeed: "",
      machineName: "",
      saleOrderNumber: "",
      totalQty: "",
      operatorName: "",
    });
  };

  const generateProcessId = () => {
    const id = Math.floor(Math.random() * 10000000);
    setProcessId(id);
    return id;
  };

  const handleSubmitClick = () => {
    const selectedCompsArray = Object.entries(selectedComponents)
      .filter(([_, selected]) => selected)
      .map(([name]) => ({
        name,
        ...components[name],
      }));

    if (selectedCompsArray.length === 0) {
      alert("Please select at least one component");
      return;
    }

    // Open modal
    generateProcessId();
    setSubmitModalOpen(true);
  };

  const handleModalSubmit = () => {
    if (!submissionData.totalSheets || !submissionData.operatorName) {
      alert("Please fill all required fields");
      return;
    }

    const selectedCompsArray = Object.entries(selectedComponents)
      .filter(([_, selected]) => selected)
      .map(([name]) => ({
        name,
        ...components[name],
      }));

    const payload = {
      ...formData,
      components: selectedCompsArray,
      submissionData: submissionData,
      processId: processId,
    };

    console.log("Final Payload:", payload);
    alert("Coating details submitted successfully!");

    // Close modal and reset
    setSubmitModalOpen(false);
    setSubmissionData({
      totalSheets: "",
      wastageSheets: "",
      operatorName: "",
    });
  };

  const handleModalClose = () => {
    setSubmitModalOpen(false);
  };

  const handleSubmissionDataChange = (field, value) => {
    setSubmissionData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box className="Dashboard-con">
      <Box className="breadcrump-con">
        <Box
          className="main-title"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="main-inner-txts"
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <Link
              style={{ color: "#0a85cb", textDecoration: "none" }}
              to={"/planning"}
            >
              Coating
            </Link>
            <KeyboardArrowRightIcon sx={{ color: "#0a85cb" }} />
            <div>Edit</div>
          </div>
        </Box>
      </Box>

      <Box className="page-layout" sx={{ marginTop: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2.5}>
            {/* Row 1: List of Jobs, Shift, Machine Speed, Machine Name */}
            <Grid size={2}>
              <FormGroup>
                <Typography mb={1}>List of Jobs</Typography>
                <Select
                  labelId="list-jobs-label"
                  id="list-jobs"
                  value={formData.listOfJobs}
                  size="small"
                  displayEmpty
                  onChange={(e) =>
                    handleFormChange("listOfJobs", e.target.value)
                  }
                  renderValue={
                    formData.listOfJobs !== "" ? undefined : () => "Select Job"
                  }
                >
                  <MenuItem value="">Select Job</MenuItem>
                  <MenuItem value="Lid & Body">Lid & Body</MenuItem>
                  <MenuItem value="Body">Body</MenuItem>
                  <MenuItem value="Complete">Complete</MenuItem>
                </Select>
              </FormGroup>
            </Grid>

            <Grid size={2}>
              <FormGroup>
                <Typography mb={1}>Shift</Typography>
                <Select
                  labelId="shift-label"
                  id="shift"
                  value={formData.shift}
                  size="small"
                  displayEmpty
                  onChange={(e) => handleFormChange("shift", e.target.value)}
                  renderValue={
                    formData.shift !== "" ? undefined : () => "A - Shift"
                  }
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="A - Shift">A - Shift</MenuItem>
                  <MenuItem value="B - Shift">B - Shift</MenuItem>
                  <MenuItem value="C - Shift">C - Shift</MenuItem>
                </Select>
              </FormGroup>
            </Grid>

            <Grid size={2}>
              <FormGroup>
                <Typography mb={1}>Machine Speed</Typography>
                <TextField
                  id="machine-speed"
                  size="small"
                  type="number"
                  value={formData.machineSpeed}
                  onChange={(e) =>
                    handleFormChange("machineSpeed", e.target.value)
                  }
                  placeholder="1000"
                />
              </FormGroup>
            </Grid>

            <Grid size={2}>
              <FormGroup>
                <Typography mb={1}>Machine Name</Typography>
                <Select
                  labelId="machine-name-label"
                  id="machine-name"
                  value={formData.machineName}
                  size="small"
                  displayEmpty
                  onChange={(e) =>
                    handleFormChange("machineName", e.target.value)
                  }
                  renderValue={
                    formData.machineName !== ""
                      ? undefined
                      : () => "Coating - TDM"
                  }
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Coating - TDM">Coating - TDM</MenuItem>
                  <MenuItem value="Coating - TDM 2">Coating - TDM 2</MenuItem>
                  <MenuItem value="Coating - TDM 3">Coating - TDM 3</MenuItem>
                </Select>
              </FormGroup>
            </Grid>

            {/* Row 2: Sale Order Number, Total Qty */}
            <Grid size={2}>
              <FormGroup>
                <Typography mb={1}>Sale Order Number</Typography>
                <TextField
                  id="sale-order-number"
                  size="small"
                  value={formData.saleOrderNumber}
                  onChange={(e) =>
                    handleFormChange("saleOrderNumber", e.target.value)
                  }
                />
              </FormGroup>
            </Grid>

            <Grid size={2}>
              <FormGroup>
                <Typography mb={1}>Total Qty</Typography>
                <TextField
                  id="total-qty"
                  size="small"
                  type="number"
                  value={formData.totalQty}
                  onChange={(e) => handleFormChange("totalQty", e.target.value)}
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            background: "#fff",
            mt: 3,
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <Grid container spacing={0.5}>
            {/* HEADER SECTION - WITH TITLE AND OPERATOR */}
            <Grid size={12}>
              <div
                className="Box-table-title"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: "16px",
                }}
              >
                <span>Today's Work - ({new Date().toLocaleDateString()})</span>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography>Operator Name</Typography>
                  <Select
                    value={formData.operatorName}
                    onChange={(e) =>
                      handleFormChange("operatorName", e.target.value)
                    }
                    size="small"
                    sx={{ minWidth: 180 }}
                    displayEmpty
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="samay (47)">samay (47)</MenuItem>
                    <MenuItem value="sunil (57)">sunil (57)</MenuItem>
                    <MenuItem value="brindha (1065)">brindha (1065)</MenuItem>
                  </Select>
                </Box>
              </div>
            </Grid>

            {/* Table Headers */}
            <Grid size={1}>
              <div className="Box-table-subtitle">Process</div>
            </Grid>

            <Grid size={2}>
              <div className="Box-table-subtitle">Sheet Size</div>
            </Grid>

            <Grid size={2}>
              <div className="Box-table-subtitle">Component</div>
            </Grid>

            <Grid size={2}>
              <div className="Box-table-subtitle">No of Sheets</div>
            </Grid>

            <Grid size={3}>
              <div className="Box-table-subtitle">Coating Type</div>
            </Grid>

            <Grid size={2}>
              <div className="Box-table-subtitle">Status</div>
            </Grid>

            {/* Component Rows */}
            {Object.entries(components).map(([key, component]) => (
              <ComponentRow
                key={key}
                component={component}
                name={key}
                onDataChange={handleComponentChange}
                selected={selectedComponents[key] || false}
                onCheckChange={handleComponentCheck}
              />
            ))}

            <Box
              sx={{
                mt: 2,
                pt: 1,
                pl: 3,
                display: "flex",
                gap: 4,
                alignItems: "flex-end",
              }}
            >
              {/* Start Time */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{ fontSize: "15px", fontWeight: 500, color: "#666" }}
                >
                  Start Time
                </Typography>
                <Box
                  onClick={() => openTimePicker("startTime")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: "3px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: "#f9f9f9",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "#0a85cb",
                      boxShadow: "0 2px 8px rgba(10, 133, 203, 0.1)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#3B3B3B",
                      fontFamily: "monospace",
                    }}
                  >
                    {jobTimes.startTime}
                  </Typography>
                </Box>
              </Box>

              {/* End Time */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{ fontSize: "15px", fontWeight: 500, color: "#666" }}
                >
                  End Time
                </Typography>
                <Box
                  onClick={() => openTimePicker("endTime")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: "3px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: "#f9f9f9",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "#0a85cb",
                      boxShadow: "0 2px 8px rgba(10, 133, 203, 0.1)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#3B3B3B",
                      fontFamily: "monospace",
                    }}
                  >
                    {jobTimes.endTime}
                  </Typography>
                </Box>
              </Box>

              {/* Change Over Time */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{ fontSize: "15px", fontWeight: 500, color: "#666" }}
                >
                  Change Over Time
                </Typography>
                <Box
                  onClick={() => openTimePicker("changeOverTime")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: "3px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: "#f9f9f9",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "#0a85cb",
                      boxShadow: "0 2px 8px rgba(10, 133, 203, 0.1)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#3B3B3B",
                      fontFamily: "monospace",
                    }}
                  >
                    {jobTimes.changeOverTime}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>

        {/* Completed Process Modal */}
        <Modal
          open={submitModalOpen}
          onClose={handleModalClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              maxWidth: "550px",
              width: "90%",
              position: "relative",
              outline: "none",
            }}
          >
            {/* Header with Title and Close Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                py: 3,
              }}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: "18px", color: "#2e7d32" }}
              >
                Completed Process -{" "}
                <span style={{ color: "#000" }}>{processId}</span>
              </Typography>
              <IconButton
                onClick={handleModalClose}
                sx={{
                  color: "#666",
                  padding: "4px",
                  "&:hover": { background: "#f5f5f5" },
                }}
              >
                <CloseIcon sx={{ fontSize: "24px" }} />
              </IconButton>
            </Box>

            {/* Divider */}
            <Box sx={{ height: "2px", background: "#e0e0e0", width: "100%" }} />

            {/* Form Fields Container */}
            <Box
              sx={{
                px: 7,
                py: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <LabeledField label="Total No of Sheets">
                <TextField
                  size="small"
                  type="number"
                  value={submissionData.totalSheets}
                  onChange={(e) =>
                    handleSubmissionDataChange("totalSheets", e.target.value)
                  }
                  placeholder="Enter total sheets"
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      fontSize: "13px",
                    },
                  }}
                />
              </LabeledField>

              <LabeledField label="Total No of Wastage Sheets">
                <TextField
                  size="small"
                  type="number"
                  value={submissionData.wastageSheets}
                  onChange={(e) =>
                    handleSubmissionDataChange("wastageSheets", e.target.value)
                  }
                  placeholder="Enter wastage sheets"
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      fontSize: "13px",
                    },
                  }}
                />
              </LabeledField>

              <LabeledField label="Operator Name">
                <TextField
                  size="small"
                  value={submissionData.operatorName}
                  onChange={(e) =>
                    handleSubmissionDataChange("operatorName", e.target.value)
                  }
                  placeholder="Enter operator name"
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      fontSize: "13px",
                    },
                  }}
                />
              </LabeledField>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                px: 3,
                py: 2,
              }}
            >
              <Button variant="outlined" color="danger" onClick={handleCancel} sx={{ minWidth: 100 }}>
                Cancel
              </Button>
              <Button
                variant="solid"
                color="primary"
                onClick={handleModalSubmit}
                sx={{
                  minWidth: 100,
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Downtime Modal */}
        <Modal
          open={downtimeOpen}
          onClose={handleDowntimeClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              maxWidth: "550px",
              width: "90%",
              position: "relative",
              outline: "none",
            }}
          >
            {/* Header with Title and Close Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                py: 3,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Downtime
              </Typography>
              <IconButton
                onClick={handleDowntimeClose}
                sx={{
                  color: "#666",
                  padding: "4px",
                  "&:hover": { background: "#f5f5f5" },
                }}
              >
                <CloseIcon sx={{ fontSize: "24px" }} />
              </IconButton>
            </Box>

            {/* Divider */}
            <Box sx={{ height: "2px", background: "#e0e0e0", width: "100%" }} />

            {/* Form Fields Container */}
            <Box
              sx={{
                px: 7,
                py: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <LabeledField label="Reason for delay">
                <TextField
                  select
                  size="small"
                  value={downtimeData.reasonForPending}
                  onChange={(e) =>
                    handleDowntimeChange("reasonForPending", e.target.value)
                  }
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      fontSize: "13px",
                    },
                  }}
                >
                  <MenuItem value="Maintenance">Maintenance</MenuItem>
                  <MenuItem value="Machine Issue">Machine Issue</MenuItem>
                  <MenuItem value="Material Issue">Material Issue</MenuItem>
                  <MenuItem value="Labor Issue">Labor Issue</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </LabeledField>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                px: 3,
                py: 2,
              }}
            >
              <Button variant="outlined" color="danger" onClick={handleDowntimeClose} sx={{ minWidth: 100 }}>
                Cancel
              </Button>
              <Button
                variant="solid"
                color="primary"
                onClick={handleDowntimeSubmit}
                sx={{
                  minWidth: 100,
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* File Preview Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <img
              src={upsImage}
              alt="preview"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            />
          </Box>
        </Modal>

        {/* Time Picker Modal */}
        <Modal
          open={Boolean(timePickerOpen)}
          onClose={closeTimePicker}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              padding: "24px",
              maxWidth: "380px",
              width: "90%",
              outline: "none",
            }}
          >
            {/* Title */}
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#333",
                mb: 3,
                textAlign: "center",
              }}
            >
              Select Time
            </Typography>

            {/* Time Display */}
            <Box
              sx={{
                background: "#f0f7ff",
                borderRadius: "8px",
                padding: "16px",
                mb: 3,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "40px",
                  fontWeight: 700,
                  color: "#0a85cb",
                  fontFamily: "monospace",
                  letterSpacing: "4px",
                }}
              >
                {String(tempTime.hours).padStart(2, "0")}:
                {String(tempTime.minutes).padStart(2, "0")}:
                {String(tempTime.seconds).padStart(2, "0")}
              </Typography>
            </Box>

            {/* Editable Input Fields */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                mb: 3,
                alignItems: "center",
              }}
            >
              {/* Hours Input */}
              <TimeInput
                label="Hours"
                value={tempTime.hours}
                onChange={(e) => handleTimeInputChange("hours", e.target.value)}
                min={0}
                max={23}
              />

              {/* Colon */}
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#0a85cb",
                  mt: 2,
                }}
              >
                :
              </Typography>

              {/* Minutes Input */}
              <TimeInput
                label="Minutes"
                value={tempTime.minutes}
                onChange={(e) => handleTimeInputChange("minutes", e.target.value)}
                min={0}
                max={59}
              />

              {/* Colon */}
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#0a85cb",
                  mt: 2,
                }}
              >
                :
              </Typography>

              {/* Seconds Input */}
              <TimeInput
                label="Seconds"
                value={tempTime.seconds}
                onChange={(e) => handleTimeInputChange("seconds", e.target.value)}
                min={0}
                max={59}
              />
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="solid" color="primary" onClick={closeTimePicker} sx={{ flex: 1, fontWeight: 600, padding: "10px" }}>
                Cancel
              </Button>
              <Button variant="solid" color="success" onClick={() => saveTime(timePickerOpen)} sx={{ flex: 1, fontWeight: 600, padding: "10px" }}>
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default EditCoatingDetails;
