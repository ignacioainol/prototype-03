import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../Store';
import axios from 'axios';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const UserListScreen = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <h1>Users</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => navigate(`/admin/user/${user._id}`)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
