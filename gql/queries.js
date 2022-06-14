import { gql } from "@apollo/client"

const USER_FIELDS = gql`
  fragment CommonUserFields on Notification {
    title
    body
    important
    createdAt
    viewed
  }
`

export const signIn = gql`
  mutation ($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        username
      }
    }
  }
`

export const createNotification = gql`
  ${USER_FIELDS}
  mutation ($data: NotificationInput!) {
    createNotification(data: $data) {
      data {
        id
        attributes {
          ...CommonUserFields
        }
      }
    }
  }
`

export const getNotifications = gql`
  ${USER_FIELDS}
  query {
    notifications {
      data {
        id
        attributes {
          ...CommonUserFields
        }
      }
    }
  }
`

export const register = gql`
  mutation ($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        username
      }
    }
  }
`
export const updateNotification = gql`
  ${USER_FIELDS}
  mutation ($id: ID!, $data: NotificationInput!) {
    updateNotification(id: $id, data: $data) {
      data {
        id
        attributes {
          ...CommonUserFields
        }
      }
    }
  }
`
