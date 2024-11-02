import { useEffect, useState } from "react";
import { useStyles } from "./EventsStyles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../materialUI-common";
import {
  Alert,
  Avatar,
  CssBaseline,
  MenuItem,
} from "@mui/material";
import { Grid, TextField, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import LoadingScreen from "../loading_screen/LoadingScreen";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IEvent } from "../../types";
import { useAppSelector } from "../../hooks/store";
import { useEventActions } from "../../store/event/useEventActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { createEvent } from "../../services/event/EventService";
import { useNavigate } from "react-router-dom";

/*Configuración del textfield de tipo select option*/
interface EventSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const EventSelect: React.FC<EventSelectProps> = ({ value, onChange }) => {
  const eventTypes = ["VIAJE", "HOGAR", "PAREJA", "COMIDA", "OTRO"];

  return (
    <TextField
      select
      value={value}
      onChange={onChange}
      sx={{
        ...useStyles.textField,
        "& .MuiInputBase-input": { paddingLeft: "10px" },
      }}
      required
      fullWidth
      variant="standard"
      id="event-name"
      label=""
    >
      {eventTypes.map((eventType) => (
        <MenuItem key={eventType} value={eventType}>
          {eventType}
        </MenuItem>
      ))}
    </TextField>
  );
};

const EventForm: React.FC = () => {
  const navigate = useNavigate();
  
  // Imagen
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewImage(null);
    }
  };

  /*Configuración del textfield de tipo select option*/
  const [selectedEvent, setSelectedEvent] = useState("");
  const handleEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEvent(event.target.value);
  };
  /*Configuración del textfield multiline de descripción */
  const [rows, setRows] = useState(1);
  const handleFocus = () => {
    setRows(3);
  };
  // const handleBlur = () => {
  //   setRows(1);
  // };

  /*Configuración del LoaderScreen*/
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Simula una carga de datos con un retraso
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400); // 1.4 segundos

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  // Slice recuperados de la store de event y user
  const user = useAppSelector((state) => state.user);
  const event = useAppSelector((state) => state.event);

  // Actions para actualizar slice event en la store
  const { updateEvent } = useEventActions();

  // State para manejar alertas
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  // React-hook-form
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<IEvent>();

  useEffect(() => {
    console.log('eventStore', event);
  }, [event])

  // botón Guardar Cambios, se edita en la bd y se actualiza el event en la store
  const onSubmit: SubmitHandler<IEvent> = async (data) => {
    const { name, description } = data;
    try {
      if (data) {
        //Renombrando la imagen
        let renamedFile = null;
        if (selectedFile) {
          const fileExtension = selectedFile.name.split(".").pop();
          const newFileName = `${name}${selectedEvent}.${fileExtension}`;
          renamedFile = new File([selectedFile], newFileName);
        }

        const eventForm: IEvent = {
          name,
          description,
          type: selectedEvent,
          owner_id: user.id,
        };

        try {
          const response = await createEvent(eventForm, renamedFile);
          updateEvent(response);
          setAlert({
            type: "success",
            message: "Creación de evento satisfactoria.",
          });
          reset();
          setSelectedFile(null);
          setTimeout(() => {
            navigate('/event-details')
          }, 1000)
        } catch (e) {
          console.error(e);
          setAlert({
            type: "error",
            message: "Error en la creación del evento.",
          });
        }

      }
    } catch (e) {
      setAlert({
        type: "error",
        message: "Error en la creación del evento.",
      });
    }
  };

  return (
    <>
      <CssBaseline />
      {loading ? (
        <LoadingScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <Grid
            container
            component="main"
            flexDirection="row"
            sx={{ width: "sm", height: "md" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              component={Paper}
              elevation={1}
              sx={useStyles.paper}
            >
              <Box sx={useStyles.boxPaper}>
                <Typography variant="h4" sx={useStyles.bodyH2}>
                  Crear evento
                </Typography>

                <Divider variant="middle" />
                <Avatar
                  sx={useStyles.profileImage}
                  src={previewImage || ""}
                  alt={"Imagen del evento"}
                />
                <Grid item xs={12}>
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={useStyles.profileButton}
                    >
                      {selectedFile ? selectedFile.name : 'Seleccionar imagen'}
                    </Button>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </Grid>

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        Nombre del evento{" "}
                      </Typography>
                      <TextField
                        sx={{
                          ...useStyles.textField,
                          "& .MuiInputBase-input": { paddingLeft: "10px" },
                        }}
                        required
                        fullWidth
                        variant="standard"
                        id="event-name"
                        label=""
                        autoComplete=""
                        {...register("name", { required: true, minLength: 4 })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        Descripción del evento{" "}
                      </Typography>
                      <TextField
                        sx={{
                          ...useStyles.textField,
                          "& .MuiInputBase-input": { paddingLeft: "10px" },
                        }}
                        required
                        fullWidth
                        multiline
                        rows={rows}
                        variant="standard"
                        id="description"
                        label=""
                        autoComplete=""
                        onFocus={handleFocus}
                        // onBlur={handleBlur}
                        {...register("description", {
                          required: true,
                          minLength: 3,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        {" "}
                        Tipo de evento{" "}
                      </Typography>
                      <EventSelect
                        value={selectedEvent}
                        onChange={handleEventChange}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={useStyles.button}
                    disabled={!isValid}
                  >
                    Crear evento
                  </Button>
                </Box>
                {alert.type === "success" && (
                  <Alert severity="success">{alert.message}</Alert>
                )}
                {alert.type === "error" && (
                  <Alert severity="error">{alert.message}</Alert>
                )}
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default EventForm;
