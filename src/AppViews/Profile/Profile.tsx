import { useState, ChangeEvent, useEffect, useContext } from "react";
import { Card, TextField, CardContent, Collapse, CardHeader, colors, Button, IconButton, Box, Avatar, Container, Grid } from "@material-ui/core";
import { Edit, Save, ArrowBack } from "@material-ui/icons";
import { useFormik } from "formik";

import { AuthContext } from "../../Context";
import { useStyles } from "./styles";
import { baseUrl } from "../../Context/BaseApi/server";
import { initialValues, validationSchema } from "./formInitials";
import Layout from "../../Layout";
import { formatDate, renderItem } from "../../Utils";
import Alert from "../../Components/Alert";

export default function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  const { email, firstName, lastName, dateOfBirth } = user || {}

  const classes = useStyles();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [edit, setEdit] = useState<boolean>(false)

  const handleProfileImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = e.target.files;
    fileList && setProfileImage(fileList[0]);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues(user),
      validationSchema,
      enableReinitialize: true,
      onSubmit: (values, { resetForm }) => {
        try {
          const { firstName, lastName, dateOfBirth } = values;
          const data = new FormData();
          data.append("firstName", firstName);
          data.append("lastName", lastName);
          data.append("dateOfBirth", dateOfBirth);

          if (profileImage) {
            data.append("image", profileImage);
          }

          updateUser(data);
          setEdit(false)
        } catch (e) {
          Alert.error("Profile updation failed")
          console.log(e);
        }
      },
    });

  useEffect(() => {
    firstName && lastName && email && dateOfBirth &&
      setValues({
        firstName, lastName, email, dateOfBirth: formatDate(dateOfBirth)
      })

  }, [dateOfBirth, edit, email, firstName, lastName, setValues]);

  return (
    <Layout>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Container component="main" maxWidth="md" >
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
            <Card className={classes.overflow_visible}>
              <Box borderBottom={`1px solid ${colors.grey[300]}`} mb={2}>
                <CardHeader
                  action={
                    <>
                      {edit ? (
                        <Box>
                          <IconButton type="submit" color="primary" aria-label="settings">
                            <Save />
                          </IconButton>

                          <IconButton onClick={() => setEdit(false)} aria-label="settings">
                            <ArrowBack />
                          </IconButton>
                        </Box>
                      ) : (
                        <IconButton onClick={() => setEdit(true)} aria-label="settings">
                          <Edit />
                        </IconButton>
                      )}
                    </>
                  }
                  title="My Account"
                />
              </Box>

              <CardContent>
                <Collapse in={!edit} mountOnEnter unmountOnExit>
                  <Box display="flex" justifyContent="center" pb={5}>
                    <Avatar
                      className={classes.avatar}
                      src={user ? `${baseUrl}${user.profileImageUrl}` : ""}
                    />
                  </Box>

                  <Grid container spacing={2} justifyContent="center" alignContent="center">
                    <Grid item sm={12} md={6} xs={12}>
                      {renderItem("First Name", firstName || "")}
                    </Grid>

                    <Grid item sm={12} md={6} xs={12}>
                      {renderItem("Last Name", lastName || "")}
                    </Grid>

                    <Grid item sm={12} md={12} xs={12}>
                      {renderItem("Email", email || "")}
                    </Grid>

                    <Grid item sm={12} md={12} xs={12}>
                      {dateOfBirth && renderItem("Date of Birth", `${new Date(dateOfBirth).toDateString()}`)}
                    </Grid>
                  </Grid>
                </Collapse>

                <Collapse in={edit} mountOnEnter unmountOnExit>
                  <div className={classes.paper}>
                    <input
                      accept=".png, .jpg, .jpeg"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      name="image"
                      onChange={handleProfileImageUpload}
                    />
                    <label htmlFor="contained-button-file">
                      <Avatar
                        className={classes.avatar}
                        src={user && user.profileImageUrl && !profileImage
                          ? `${baseUrl}${user.profileImageUrl}`
                          : profileImage ? URL.createObjectURL(profileImage) : ""
                        }
                      />

                      {profileImage ? (
                        <Button
                          onClick={() => setProfileImage(null)}
                          // className={classes.close}
                          variant="outlined"
                          color="secondary"
                        >
                          Cancel
                        </Button>
                      ) : (
                        ""
                      )}
                    </label>

                    <Box className={classes.row}>
                      <Box width="50%">
                        <TextField
                          error={errors.firstName && touched.firstName ? true : false}
                          onBlur={handleBlur}
                          helperText={
                            errors.firstName && touched.firstName ? errors.firstName : ""
                          }
                          value={values.firstName}
                          onChange={handleChange}
                          name="firstName"
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoComplete="firstName"
                          autoFocus
                        />
                      </Box>
                      <Box width="50%" ml={2}>
                        <TextField
                          error={errors.lastName && touched.lastName ? true : false}
                          onBlur={handleBlur}
                          helperText={
                            errors.lastName && touched.lastName ? errors.lastName : ""
                          }
                          value={values.lastName}
                          onChange={handleChange}
                          name="lastName"
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          autoComplete="lastName"
                          autoFocus
                        />
                      </Box>
                    </Box>

                    <TextField
                      error={errors.email && touched.email ? true : false}
                      onBlur={handleBlur}
                      helperText={errors.email && touched.email ? errors.email : ""}
                      value={values.email}
                      onChange={handleChange}
                      name="email"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      autoFocus
                      disabled
                    />
                    <TextField
                      name="date_of_birth"
                      id="date"
                      error={errors.dateOfBirth && touched.dateOfBirth ? true : false}
                      onBlur={handleBlur}
                      helperText={
                        errors.dateOfBirth && touched.dateOfBirth
                          ? errors.dateOfBirth
                          : ""
                      }
                      value={values.dateOfBirth}
                      onChange={handleChange}
                      label="Birthday"
                      variant="outlined"
                      type="date"
                      margin="normal"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </div>
                </Collapse>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </form>
    </Layout >
  );
}
