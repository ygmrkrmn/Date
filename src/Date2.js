import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Button, Modal, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Autocomplete, Grid } from "@mui/material";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "pink",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const calendarSchema = yup.object().shape({
  title: yup.string("Geçersiz").required("Zorunlu alanları doldurunuz"),
  start: yup.string("Geçersiz").required("Zorunlu alanları doldurunuz"),
  end: yup.string("Geçersiz").required("Zorunlu alanları doldurunuz"),
});

const Date2 = () => {
  const namesData = [
    { label: "Çıraklık Programı", value: 1 },
    { label: "Fotoğraf Çekimi", value: 2 },
    { label: "Düğün", value: 3 },
    { label: "Gezi", value: 4 },
    { label: "Okul Bitişi", value: 5 },
  ];

  const [etkinlikBas, setEtkinlikBas] = useState("");
  const [baslangic, setBaslangic] = useState("");
  const [bitis, setBitis] = useState("");
  const [nam, setNam] = useState([]);
  const handleSelectedEvent = (event) => {
    setEtkinlikBas(event.title);
    setBaslangic(event.start);
    setBitis(event.end);
    setNam(event.resource.eventType);
    console.log(nam);

    handleOpen();
  };
  const [allEvents, setAllEvents] = useState([]);

  const [defaultValues, setDefaultValues] = useState({
    title: "",
    start: "",
    end: "",
    names: [],
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(calendarSchema),
    defaultValues,
  });

  const handleAddEvent = (data) => {
    console.log(data);

    if (data.start > data.end) {
      alert("Bitiş tarihi başlangıç tarihinden erken olamaz");
    } else if (data.start <= data.end) {
      const event = {
        title: data.title,
        start: data.start,
        end: data.end,
        resource: {
          eventType: data.names,
        },
      };
      setAllEvents([...allEvents, event]);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <form onSubmit={handleSubmit((data) => handleAddEvent(data))}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}></Grid>
          <Grid item xs={3}>
            <Controller
              control={control}
              name="names"
              render={({ field: { onChange, names, ref } }) => (
                <Autocomplete
                  options={namesData}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  multiple
                  value={names}
                  renderInput={(params) => (
                    <TextField fullWidth {...params} label="Etkinlik Tipleri" />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, title, ref } }) => (
                <TextField
                  fullWidth
                  type="text"
                  label="Etkinlik Detayı"
                  placeholder="Etkinlik Detayı "
                  variant="outlined"
                  value={title}
                  onChange={onChange}
                />
              )}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </Grid>

          <Grid item xs={5}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="start"
                  render={({ field: { onChange, start, ref } }) => (
                    <TextField
                      type="date"
                      label="Başlangıç Tarihi:"
                      placeholder="Başlangıç Tarihi: "
                      variant="outlined"
                      fullWidth
                      value={start}
                      InputLabelProps={{ shrink: true }}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.start && <p>{errors.start.message}</p>}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="end"
                  render={({ field: { onChange, end, ref } }) => (
                    <TextField
                      type="date"
                      label="Bitiş Tarihi:"
                      placeholder="Bitiş Tarihi: "
                      variant="outlined"
                      fullWidth
                      value={end}
                      InputLabelProps={{ shrink: true }}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.end && <p>{errors.end.message}</p>}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              type="submit"
              stlye={{ marginTop: "10px" }}
            >
              Ekle
            </Button>
          </Grid>

          <Grid xs={12}>
            <Calendar
              localizer={localizer}
              events={allEvents}
              startAccessor="start"
              onSelectEvent={(event) => handleSelectedEvent(event)}
              popup
              endAccessor="end"
              style={{ height: 500, margin: "50px" }}
            />
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid Container>
                <label>Etkinlik Tipi : </label>
                <label>
                  {nam.map((m) => {
                    return m.label + " ";
                  })}
                </label>
              </Grid>
              <Grid Container>
                <label>Etkinlik Başlığı : </label>
                <label>{etkinlikBas}</label>
              </Grid>
              <Grid Container>
                <label>Etkinlik Başlangıç Tarihi : </label>
                <label>{baslangic}</label>
              </Grid>
              <Grid Container>
                <label>Etkinlik Bitiş Tarihi : </label>
                <label>{bitis}</label>
              </Grid>
            </Box>
          </Modal>
        </Grid>
      </form>
    </Container>
  );
};

export default Date2;
