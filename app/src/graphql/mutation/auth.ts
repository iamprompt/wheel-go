import { gql } from '@apollo/client'

export const Login = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`

export const RefreshToken = gql`
  mutation RefreshToken($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`

export const Register = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      accessToken
      refreshToken
    }
  }
`
