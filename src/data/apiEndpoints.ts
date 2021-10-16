import axios from "axios";

const baseURL = "https://sourcepad-exam-frontend-api.herokuapp.com/api/";

const createURL = baseURL + "users";
const createProfileURL = baseURL + "profiles";
const signInURL = baseURL + "signin";

const getUserURL = createURL + "/";

const testURL = "https://jsonplaceholder.typicode.com/todos/1";

const testRequest = async () => {
  try {
    const response = await axios.get(testURL);

    return response;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (id: string | number) => {
  try {
    const response = await axios.get(getUserURL + id).catch(function (error) {
      if (error.response) {
        return {
          status: error.response.status,
          data: error.response.data.errors,
        };
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

// create user using axios to endpoint
const createUser = async (_email: string, _pw: string) => {
  const payload = {
    user: {
      email: _email,
      password: _pw,
      password_confirmation: _pw,
    },
  };

  try {
    const response = await axios
      .post(createURL, payload)
      .catch(function (error) {
        if (error.response) {
          return {
            status: error.response.status,
            data: error.response.data.errors,
          };
        }
      });
    return response;
  } catch (error) { }
};

// update profile...
const createProfile = async (__details: any) => {
  const payload = {
    profile: __details,
  };

  try {
    const response = await axios
      .post(createProfileURL, payload)
      .catch(function (error) {
        if (error.response) {
          return {
            status: error.response.status,
            data: error.response.data.errors,
          };
        }
      });

    return response;
  } catch (error) {
    console.error(error);
  }
};

//sigin
const signIn = async (_email: string, _pw: string) => {
  const payload = {
    credentials: {
      email: _email,
      password: _pw,
    },
  };
  try {
    const response = await axios
      .post(signInURL, payload)
      .catch(function (error) {
        if (error.response) {
          return {
            status: error.response.status,
            data: error.response.data.errors,
          };
        }
      });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export { createUser, createProfile, signIn, testRequest, getUser };
