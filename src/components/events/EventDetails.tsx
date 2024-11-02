import { useEffect, useState } from "react";
import { useStyles } from "./EventsStyles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../materialUI-common";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { Alert, Avatar, Badge, Card, CardContent, CardHeader, CssBaseline, MenuItem, Modal, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import {
  Alert,
  Avatar,
  Badge,
  Card,
  CardHeader,
  CssBaseline,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  CardContent,
  Modal,
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, TextField, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
// import { editUser, getUserByEmail } from '../../services/user/UserService';
// import { IUserWithId, TEditUser } from '../../types';
// import { useUserActions } from "../../store/user/useUserActions";
// import CONSTANTS from '../../constants';
// import { DEFAULT_USER_STATE } from '../../store/user/Userslice';
import LoadingScreen from "../loading_screen/LoadingScreen";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IEvent, IEventWithId, IUserWithId, TEventDataEdit, TInvitationCreate } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks/store";
import { useEventActions } from "../../store/event/useEventActions";
import { editEvent, getEventById } from "../../services/event/EventService";
import CONSTANTS from "../../constants";
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getContactsByUserId } from "../../services/user/UserService";
import { useContactsActions } from "../../store/contacts/useContactsActions";
import { useInvitationsActions } from "../../store/invitations/useInvitationsActions";
import { createInvitationInBd } from "../../services/invitation/InvitationService";


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

const EventDetails: React.FC = () => {
  //Modal para invitaciones
  const [openModalInvitation, setOpenModalInvitation] = useState(false);
  //Configuración de paginación para las tablas
  const [page, setPage] = useState(0);
  /*Configuración del textfield de tipo select option*/
  const [selectedEvent, setSelectedEvent] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(2);
  /*Configuración del LoaderScreen*/
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: {isValid},
    reset,
  } = useForm<IEvent>();

  //STORE
  const event = useAppSelector((state) => state.event);
  const user = useAppSelector((state) => state.user);
  const contacts = useAppSelector((state) => state.contacts);
  const invitations = useAppSelector((state) => state.invitations);

  const { updateEvent } = useEventActions();
  const { refreshContacts } = useContactsActions();
  const { createInvitation } = useInvitationsActions();

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

  useEffect(() => {
    // Simula una carga de datos con un retraso
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400); // 1.4 segundos

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  const fetchUserData = async () => {
    try {
      const contactsData = await getContactsByUserId(user.id);
      const contacts: IUserWithId[] | null | undefined = contactsData?.contacts;
      refreshContacts(contacts);
      const eventData: IEventWithId = await getEventById(event.event_id);
      updateEvent(eventData);
      setLoading(false);
      setSelectedEvent(event.type);
      reset(eventData);
    } catch (err) {
      console.error('Error al obtener los datos de evento desde el servidor', err);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log('cont', invitations);
  }, [invitations]);

  const handleInvitation = async (contactId: string) => {

    const invitation: TInvitationCreate = {
      eventId: event.event_id,
      contactId: contactId,
    }
    try {
      const response = await createInvitationInBd(invitation);
      console.log(response);
      if (response) {
        createInvitation(response);
      } else {
        console.error('Error guardando o trayendo la info de invitación')
      }
    } catch (e) {
      console.error('error', e);
    }

  }
  
  // botón Guardar Cambios, se edita en la bd y se actualiza el event en la store
  const onSubmit: SubmitHandler<IEvent> = async (data) => {
    const { name, description, type } = data;
    try {
      if (data) {
        let renamedFile = null;
        if (selectedFile) {
          const fileExtension = selectedFile.name.split(".").pop();
          const newFileName = `${name}${type}.${fileExtension}`;
          renamedFile = new File([selectedFile], newFileName);
        } else {
          console.error("No se seleccionó una imagen para tu evento");
        }
        const eventDataEdit: TEventDataEdit = {
          editForm: {
            name,
            description,
            type: selectedEvent,
          },
          eventId: event.event_id,
          picture: renamedFile,
        }
        const responseEventEdited: IEventWithId = await editEvent(eventDataEdit);
        updateEvent(responseEventEdited);
        setAlert({
          type: "success",
          message: "Actualización satisfactoria del evento.",
        });
      }
    } catch (e) {
      setAlert({
        type: "error",
        message: "Error en la edición del evento",
      });
    }
  };

  const handleEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEvent(event.target.value);
  };

  /*Configuración del textfield multiline de descripción */
  const [rows, setRows] = useState(1);

  const handleFocus = () => {
    setRows(3);
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
            {/*Left Content*/}
            <Grid
              item
              xs={8}
              sm={8}
              md={5}
              component={Paper}
              elevation={1}
              sx={useStyles.paper}
            >
              <Box
                sx={useStyles.boxPaper}
              >
                <Typography variant="h4" sx={useStyles.bodyH2}>
                  Crear evento
                </Typography>

                <Divider variant="middle" />
                <Avatar
                  sx={useStyles.profileImage}
                  src={previewImage ?? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${event.picture}`}
                  alt={'Imagen del evento'}
                  />
                <Grid item xs={12}>
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={useStyles.profileButton}
                    >
                      {selectedFile?.name ?? 'Imagen del Evento'}
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
                        Nombre del evento
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
                  {alert.type === "success" && (
                    <Alert severity="success">{alert.message}</Alert>
                  )}
                  {alert.type === "error" && (
                    <Alert severity="error">{alert.message}</Alert>
                  )}
                </Box>

                <Grid item xs={12} width={"100%"} mt={4}>
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <Button
                      variant="outlined"
                      sx={useStyles.button3}
                      onClick={() => setOpenModalInvitation(true)}
                    >
                      Enviar invitación
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={useStyles.button2}
                    >
                      Crear Actividad
                    </Button>
                  </Stack>
                </Grid>
              </Box>
            </Grid>

            {/*Right Content*/}
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              sx={useStyles.paper2}
            >
              <Grid
                item
                xs={12}
                component={Paper}
                elevation={1}
                sx={useStyles.paper3}
              >
                <Box sx={useStyles.boxPaper}>
                  <Card>
                    <CardHeader
                      sx={{}}
                      title={
                        <>
                          <span>Contactos del evento</span>
                          <Badge
                            badgeContent={/*contacts.length*/ 1}
                            color="secondary"
                            sx={{ ml: 3 }}
                          />
                        </>
                      }
                    />
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/*contacts.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    marginRight: 1,
                                  }}
                                  src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${item.profileImage}`}
                                  alt={item.name}
                                />
                                {item.name}
                              </div>
                            </TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                              <Button variant="outlined" onClick={() => null}>
                                <DeleteIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                              ))*/}
                        </TableBody>
                      </Table>
                      {/* <TablePagination
                        component="div"
                        count={contacts.length}
                        page={page}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                          setRowsPerPage(parseInt(e.target.value, 10));
                          setPage(0);
                        }}
                      /> */}
                    </TableContainer>
                  </Card>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                component={Paper}
                elevation={1}
                sx={useStyles.paper3}
              >
                <Box sx={useStyles.boxPaper}>
                  <Card>
                    <CardHeader
                      title={
                        <>
                          Actividades del evento
                          <Badge
                            badgeContent={/*activities.length*/ 1}
                            color="secondary"
                            sx={{ ml: 2 }}
                          ></Badge>
                        </>
                      }
                    />
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Acciones</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {/*contacts.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  marginRight: 1,
                                }}
                                src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${item.profileImage}`}
                                alt={item.name}
                              />
                              {item.name}
                            </div>
                          </TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>
                            <Button variant="outlined" onClick={() => null}>
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                            ))*/}
                      </TableBody>
                    </Table>
                  </Card>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                component={Paper}
                elevation={1}
                sx={useStyles.paper3}
              >
                <Box sx={useStyles.boxPaper}>
                  <Card>
                    <CardHeader
                      title={
                        <>
                          Invitaciones pendientes
                          <Badge
                            badgeContent={/*contacts.length*/ 1}
                            color="secondary"
                            sx={{ ml: 2 }}
                          ></Badge>
                        </>
                      }
                    />
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Acciones</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {/*contacts.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  marginRight: 1,
                                }}
                                src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${item.profileImage}`}
                                alt={item.name}
                              />
                              {item.name}
                            </div>
                          </TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>
                            <Button variant="outlined" onClick={() => null}>
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                            ))*/}
                      </TableBody>
                    </Table>
                  </Card>
                </Box>
              </Grid>
            </Grid>

            <Modal open={openModalInvitation} onClose={() => setOpenModalInvitation(false)}>
              <Card style={{ width: '80%', margin: 'auto', marginTop: 100, padding: 16, textAlign: "center" }}>
                <CardHeader
                    title={
                      <>
                        Invita a tus amigos
                      </>
                    }
                />
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} md={6} lg={6}>
                      <TableContainer component={Paper}>
                          <Typography variant="h6" component="div">
                              Tus contactos
                              <Badge badgeContent={contacts.length} color="secondary" sx={{ ml: 2 }}>
                              </Badge>
                          </Typography>
                          
                          <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell>Nombre</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Agregar</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {contacts
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((contact, index) => (
                              <TableRow key={index}>
                                <TableCell>{contact.id}</TableCell>
                                <TableCell>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar
                                      sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        marginRight: 1,
                                      }}
                                      src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${contact.profileImage}`}
                                      alt={contact.name}
                                    />
                                    {contact.name}
                                  </div>
                                </TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>
                                  <Button variant="outlined" onClick={() => handleInvitation(contact.id)}>
                                    <PersonAddIcon />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          </Table>
                          <TablePagination
                            component="div"
                            count={contacts.length}
                            page={page}
                            onPageChange={(_, newPage) => setPage(newPage)}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={(e) => {
                              setRowsPerPage(parseInt(e.target.value, 10));
                              setPage(0);
                            }}
                          />
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <TableContainer component={Paper}>
                        <Typography variant="h6" component="div">
                              Invitaciones a tu evento
                              <Badge badgeContent={contacts.length} color="secondary" sx={{ ml: 2 }}>
                              </Badge>
                        </Typography>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Id Invitacion</TableCell>
                              <TableCell>Nombre</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Estado</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {invitations
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((invitation, index) => (
                              <TableRow key={index}>
                                <TableCell>{invitation?.invitation_id}</TableCell>
                                <TableCell>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar
                                      sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        marginRight: 1,
                                      }}
                                      src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${invitation?.contact?.profileImage}`}
                                      alt={invitation?.contact?.name}
                                    />
                                    {invitation?.contact?.name}
                                  </div>
                                </TableCell>
                                <TableCell>{invitation?.contact?.email}</TableCell>
                                <TableCell>{invitation?.invitation_state}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          </Table>
                          <TablePagination
                            component="div"
                            count={contacts.length}
                            page={page}
                            onPageChange={(_, newPage) => setPage(newPage)}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={(e) => {
                              setRowsPerPage(parseInt(e.target.value, 10));
                              setPage(0);
                            }}
                          />
                      </TableContainer>
                    </Grid>
                  </Grid>
                  <Button variant="contained" onClick={() => setOpenModalInvitation(false)}>
                    <CloseIcon />
                  </Button>
                </CardContent>
              </Card>
            </Modal>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default EventDetails;