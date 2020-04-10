import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Navbar from './Navbar';
import Lists from './Lists';
import ApolloClient from 'apollo-client';
import { TextField, Button } from '@material-ui/core';

const Board = () => {
    return (
        <div style={{ maxWidth: '100%' }}>
            <Navbar />
            <Lists />
        </div>
    )

}

export default Board;
