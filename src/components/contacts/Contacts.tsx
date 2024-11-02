import { useState, useEffect } from 'react';
import { Avatar, Badge, Button, Card, CardContent, CardHeader, Grid, Modal, Alert, Table, TablePagination, TableContainer, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '../../hooks/store'
import { useContactsActions } from '../../store/contacts/useContactsActions'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { TContactState, IUserWithId } from '../../types';
import { getContactsByUserId, getUserByEmail } from '../../services/user/UserService';
import CONSTANTS from '../../constants';
import LoadingScreen from '../loading_screen/LoadingScreen';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Paper } from '@mui/material';
import { useStyles } from './ContactsStyles';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../materialUI-common';

function Contacts() {
  // Para paginar
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Slices recuperados de la store
  const contacts = useAppSelector((state) => state.contacts)
  const user = useAppSelector((state) => state.user)

  // Actions para actualizar slice contacts en la store
  const { addContact, refreshContacts } = useContactsActions();

  // State para gestionar todo el componente
  const [contactState, setContactState] = useState<TContactState>({
    loading: true,
    email: '',
    contactInfo: null,
    modalOpen: false,
  })

  // State para manejar alertas
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  // Fetch para recuperar de la bd y actualizar la store
  const fetchUserData = async () => {
    try {
      const contactsData = await getContactsByUserId(user.id);
      const contacts: IUserWithId[] | null | undefined = contactsData?.contacts;
      refreshContacts(contacts);
      setContactState({
        ...contactState,
        loading: false,
      })
    } catch (err) {
      console.error('Error al obetener los datos del servidor', err);
      setContactState({
        ...contactState,
        loading: false,
      })
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log('store,', contacts);
  }, [contacts]);

  const handleSearch = async () => {
    try {
      const foundContact: IUserWithId = await getUserByEmail(contactState.email);
      const foundEmail = contacts.find(contact => contact.email === contactState.email);
      if (foundEmail) {
        setAlert({
          type: "error",
          message: "Este usuario ya está en tu lista de contactos"
        })
      } else {
        setContactState({
          ...contactState,
          contactInfo: foundContact,
          modalOpen: !!foundContact,
        })
      }
    } catch (error) {
      setContactState({
        ...contactState,
        contactInfo: null,
        modalOpen: false,
      })
      setAlert({
        type: "error",
        message: "Este usuario no existe"
      })
    }
  };

  return (
    <>
      {contactState.loading ? (
        <LoadingScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <Grid container component="main" /*justifyContent={'space-between'} */ sx={{ width: "sm", height: "md" }}>
            <Grid item xs={12} sm={4} md={5} component={Paper} elevation={1}
              sx={useStyles.paperLeft}>
              <Box
                sx={useStyles.boxPaperLeft}
              >
                <Typography variant="h6" component="h2" sx={useStyles.bodyH2}>
                  Nuevo contacto
                </Typography>
                <Typography variant="body2" component="p" sx={useStyles.bodyP}>
                  Ingresa el correo electrónico de tu amigo para agregarlo a tu lista de contactos
                </Typography>

                <Grid item xs={12}>
                  <TextField
                    sx={useStyles.textField}
                    fullWidth
                    variant='standard'
                    label="Correo electrónico a buscar"
                    value={contactState.email}
                    onChange={(e) =>
                      setContactState({
                        ...contactState,
                        email: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Button variant="contained" sx={useStyles.button} onClick={handleSearch}>
                  Buscar contacto
                </Button>

                <Modal open={contactState.modalOpen} onClose={() =>
                  setContactState({
                    ...contactState,
                    modalOpen: false,
                  })}>
                  <Card style={{ width: 400, margin: 'auto', marginTop: 100, padding: 16, textAlign: "center" }}>

                    <CardHeader title="Información de contacto" />
                    {contactState.contactInfo && (
                      <CardContent>
                        <Avatar
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            marginRight: 2,
                          }}
                          src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${contactState.contactInfo.profileImage}`}
                          alt={contactState.contactInfo.name}
                        />
                        <p>Nombre: {contactState.contactInfo.name}</p>
                        <p>Apellido: {contactState.contactInfo.lastName}</p>
                        <p>Correo electrónico: {contactState.contactInfo.email}</p>
                        <Button variant="contained" onClick={
                          () => {
                            setAlert({
                              type: "success",
                              message: "Usuario agregado"
                            })
                            addContact(contactState.contactInfo)
                            setContactState({
                              ...contactState,
                              modalOpen: false,
                            })
                          }}>
                          <PersonAddIcon />
                        </Button>
                        <Button variant="contained" onClick={() =>
                          setContactState({
                            ...contactState,
                            modalOpen: false,
                          })}>
                          <CloseIcon />
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                </Modal>

                {alert.type === "success" && (
                  <Alert severity="success">{alert.message}</Alert>
                )}
                {alert.type === "error" && (
                  <Alert severity="error">{alert.message}</Alert>
                )}
              </Box>
            </Grid>



            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1}
              sx={useStyles.paperRight}>
              <Box
                sx={useStyles.boxPaperRight}
              >
                <Card >
                  <CardHeader
                    title={
                      <>
                        Contactos
                        <Badge badgeContent={contacts.length} color="secondary" sx={{ ml: 2 }}>
                        </Badge>
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
                              <Button variant="outlined" onClick={() => null}>
                                <DeleteIcon />
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
                  
                </Card>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  )
}

export default Contacts;